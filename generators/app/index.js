'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const copydir = require('copy-dir');
const util = require('./util');

module.exports = class extends Generator {
    prompting() { // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the first-class ${chalk.red('generator-toppro-vue-base')} generator!`));

        const prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'Please input project name (vue-base):',
                default: 'vue-base'
            },
            {
                type: 'list',
                name: 'uiLibrary',
                message: 'Please choose UI library:',
                choices: ['elementUI', 'iview']
            },
            {
                type: 'list',
                name: 'vueManage',
                message: 'Please choose vue manage tool:',
                choices: ['vuex', 'bus']
            },
            {
                type: 'list',
                name: 'jsTool',
                message: 'Please choose js tool library:',
                choices: ['lodash', 'underscore']
            }
        ];

        // 提示用户安装commitizen
        this.log(`User need do the following in the end: 
        \n${chalk.yellowBright('   npm install -g @commitlint/cli @commitlint/config-conventional')}`);

        return this.prompt(prompts).then(props => { // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    defaults() { // 检查当前目录是否和用户定义的projectName一致
        if (path.basename(this.destinationPath()) !== this.props.projectName) {
            this.log('Your generator must be inside a folder named ' +
          this.props.projectName +
          '\n' +
          "I'll automatically create this folder.");

            // 创建文新件夹
            this.destinationRoot(this.destinationPath(this.props.projectName));
        }
    }

    writing() {
        const changeFiles = ['package.json']; // 记录被修改的文件
        const pkg = this.fs.readJSON(this.templatePath('package.json'), {});

        if (this.props.uiLibrary === 'elementUI') { // Package.json 添加安装包定义
            pkg.dependencies['element-ui'] = '2.4.11';

            // Main.js 文件中引入安装包
            util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
            changeFiles.push('main.js');
        } else if (this.props.uiLibrary === 'iview') {
            pkg.dependencies.iview = '3.1.5';
        }

        // 户选择 vueManage
        if (this.props.vueManage === 'vuex') {
            pkg.dependencies.vuex = '3.0.1';
            util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);

            // 拷贝store 文件夹内容
            copydir.sync(this.templatePath('src/store_tpl'), this.destinationPath('src/store'));

            if (changeFiles.indexOf('main.js') === -1) {
                changeFiles.push('main.js');
            }
        } else if (this.props.vueManage === 'bus') {
            util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
            util.copyTpl.apply(this, ['src/bus_tpl.js', 'src/bus.js', this.props]);
            if (changeFiles.indexOf('main.js') === -1) {
                changeFiles.push('main.js');
            }
        }

        // 用户选择 js tool
        if (this.props.jsTool) {
            util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
            if (changeFiles.indexOf('main.js') === -1) {
                changeFiles.push('main.js');
            }
            if (this.props.jsTool === 'lodash') {
                pkg.dependencies.lodash = '4.17.11';
            } else if (this.props.jsTool === 'underscore') {
                pkg.dependencies.underscore = '1.9.1';
            }
        }


        // 拷贝指定目录到目标位置
        copydir.sync(this.templatePath(), this.destinationPath(), function (stat,
            filepath,
            filename) {
            const extendName = path.extname(filename);

            // _tpl结尾的为自定义模板，不需要拷贝到框架中
            if (filename && path.basename(filename, extendName).endsWith('_tpl')) {
                return false;
            }

            // 被改动的文件不需要重新被拷贝
            if (changeFiles.indexOf(filename) > -1) {
                return false;
            }

            return true;
        });

        // 修改包名
        pkg.name = this.props.projectName;

        // 修改package.json
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
};
