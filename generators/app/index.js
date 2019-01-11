'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const copydir = require('copy-dir');
const extend = require('deep-extend');
const util = require('./util');

module.exports = class extends Generator {
    prompting() {
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
                choices: ['elementUI', 'iview', 'no need']
            },
            {
                type: 'list',
                name: 'vueManage',
                message: 'Please choose state management tool:',
                choices: ['vuex', 'bus', 'no need']
            },
            {
                type: 'list',
                name: 'jsTool',
                message: 'Please choose js tool library:',
                choices: ['lodash', 'underscore', 'no need']
            },
            {
                type: 'confirm',
                name: 'unitTest',
                message: 'Set up unit tests?',
                choices: ['lodash', 'underscore', 'no need']
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    defaults() {
        if (path.basename(this.destinationPath()) !== this.props.projectName) {
            this.log('It will create ' + this.props.projectName + ' later');
            this.destinationRoot(this.destinationPath(this.props.projectName));
        }
    }

    writing() {
        const changeFiles = ['package.json']; // 记录被修改的文件
        const pkg = this.fs.readJSON(this.templatePath('package.json'), {});

        util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
        util.copyTpl.apply(this, ['.babelrc_tpl', '.babelrc', this.props]);
        if (this.props.uiLibrary === 'elementUI') {
            pkg.dependencies['element-ui'] = '^2.4.11';
        } else if (this.props.uiLibrary === 'iview') {
            pkg.dependencies.iview = '^3.1.5';
        }

        if (this.props.vueManage === 'vuex') {
            pkg.dependencies.vuex = '^3.0.1';
            copydir.sync(this.templatePath('src/store_tpl'), this.destinationPath('src/store'));
        } else if (this.props.vueManage === 'bus') {
            util.copyTpl.apply(this, ['src/bus_tpl.js', 'src/bus.js', this.props]);
        }

        if (this.props.jsTool) {
            if (this.props.jsTool === 'lodash') {
                pkg.dependencies.lodash = '^4.17.11';
            } else if (this.props.jsTool === 'underscore') {
                pkg.dependencies.underscore = '^1.9.1';
            }
        }

        if (this.props.unitTest) {
            util.copyTpl.apply(this, ['build/webpack.test.conf_tpl.js', 'build/webpack.test.conf.js']);
            util.copyTpl.apply(this, ['config/test.env_tpl.js', 'config/test.env.js']);
            copydir.sync(this.templatePath('test_tpl'), this.destinationPath('test'));
            const pkgList = {
                'babel-plugin-istanbul': '^4.1.1',
                'babel-polyfill': '^6.26.0',
                'babel-register': '^6.22.0',
                'chai': '^4.1.2',
                'cross-env': '^5.0.1',
                'cross-spawn': '^5.0.1',
                'phantomjs-prebuilt': '^2.1.14',
                'sinon': '^4.0.0',
                'sinon-chai': '^2.8.0',
                'karma': '^1.4.1',
                'karma-coverage': '^1.1.1',
                'karma-mocha': '^1.3.0',
                'karma-phantomjs-launcher': '^1.0.2',
                'karma-phantomjs-shim': '^1.4.0',
                'karma-sinon-chai': '^1.3.1',
                'karma-sourcemap-loader': '^0.3.7',
                'karma-spec-reporter': '0.0.31',
                'karma-webpack': '^2.0.2',
                'mocha': '^3.2.0',
            };

            pkg.scripts['unit'] = 'cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run';
            pkg.scripts['test'] = 'npm run unit';
            pkg.scripts['lint'] = 'eslint --ext .js,.vue src test/unit';
            extend(pkg.devDependencies, pkgList);
        }

        /*
         * if (changeFiles.indexOf('main.js') === -1) {
         *     changeFiles.push('main.js');
         * }
         */

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
