'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var copydir = require('copy-dir');
var util = require('./util');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-class ${chalk.red('generator-toppro-vue-base')} generator!`
      )
    );

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
        choices: ['elementUI', 'vux', 'vuetify', 'iview']
      },
      {
        type: 'confirm',
        name: 'axios',
        message: 'Use axios for http server?'
      },
      {
        type: 'confirm',
        name: 'lint',
        message: 'Use eslint to lint your code?'
      },
      {
        name: 'lintStyle',
        type: 'list',
        message: 'Pick an ESLint preset',
        when(answers) {
          return answers.lint;
        },
        choices: ['toppro-config-eslint']
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install node modules auto?'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  defaults() {
    // 检查当前目录是否和用户定义的projectName一致
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' +
          this.props.projectName +
          '\n' +
          "I'll automatically create this folder."
      );
      // 创建文新件夹
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  writing() {
    let changeFiles = ['package.json']; // 记录被修改的文件
    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});

    if (this.props.uiLibrary === 'elementUI') {
      // Package.json 添加安装包定义
      pkg.dependencies['element-ui'] = '^2.4.11';

      // Main.js 文件中引入安装包
      util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
      changeFiles.push('main.js');
    } else if (this.props.uiLibrary === 'vux') {
      let newPacage = {
        vux: '^2.9.2',
        'vux-loader': '^1.2.9'
      };
      pkg.dependencies = Object.assign(pkg.dependencies, newPacage);
      // Webpack.base.conf.js中增加vux 相关配置
      util.copyTpl.apply(this, [
        'build/webpack.base.conf_tpl.js',
        'build/webpack.base.conf.js',
        this.props
      ]);
      changeFiles.push('webpack.base.conf.js');
    }

    // 如用户选择 axios
    if (this.props.axios) {
      pkg.dependencies.axios = '^0.18.0';
      util.copyTpl.apply(this, ['src/main_tpl.js', 'src/main.js', this.props]);
      if (changeFiles.indexOf('main.js') === -1) {
        // ChangeFiles没有保存该文件则push 保存
        changeFiles.push('main.js');
      }
    } else {
      // 如用户不选择 axios则不需要拷贝axios.js文件
      changeFiles.push('axios.js');
    }

    // 如用户需要配置eslint
    if (this.props.lint) {
      let newPacage = {
        eslint: '^4.15.0',
        'eslint-config-toppro': '1.0.2',
        'eslint-friendly-formatter': '4.0.1',
        'eslint-plugin-html': '^5.0.0',
        'eslint-loader': '^1.7.1',
        'eslint-plugin-vue': '^4.0.0'
      };
      pkg.dependencies = Object.assign(pkg.dependencies, newPacage);
    } else {
      // 用户不配置eslint 就不需要拷贝下面两个文件
      changeFiles = changeFiles.concat(['.eslintrc.js', '.eslintignore']);
    }

    copydir.sync(this.templatePath(), this.destinationPath(), function(
      stat,
      filepath,
      filename
    ) {
      // _tpl结尾的为自定义模板，不需要拷贝到框架中
      let extendName = path.extname(filename);
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

  // Install() {
  //   if (this.props.install) {
  //     this.installDependencies({ bower: false });
  //   }
  // }
};
