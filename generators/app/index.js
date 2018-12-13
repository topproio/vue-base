'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var copydir = require('copy-dir');

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
        choices: ['elementUI', 'VUX', 'vuetify', 'iview']
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
    let that = this;
    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});

    if (this.props.uiLibrary === 'elementUI') {
      // Package.json 添加安装包定义
      pkg.dependencies['element-ui'] = '^2.4.11';

      // Main.js 文件中引入安装包
      this.fs.copyTpl(
        this.templatePath('src/main_tpl.js'),
        this.destinationPath('src/main.js'),
        {
          uiLibrary: 'element-ui'
        }
      );
    } else if (this.props.uiLibrary === 'VUX') {
      pkg.dependencies.vux = '^2.9.2';
      pkg.dependencies['vux-loader'] = '^1.2.9';
      // Webpack.base.conf.js中增加VUX 相关配置
      this.fs.copyTpl(
        this.templatePath('build/webpack.base.conf_tpl.js'),
        this.destinationPath('build/webpack.base.conf.js'),
        {
          uiLibrary: 'vux'
        }
      );
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
      // Package.json 因多出需要改动，为避免冲突提示，这里不做改动，最后集中修改一次
      if (stat === 'file' && filename === 'package.json') {
        return false;
      }

      // Element UI 库前面已经修改main.js，这里不需要再次改动，避免冲突提示
      if (that.props.uiLibrary === 'elementUI') {
        if (filename === 'main.js') {
          return false;
        }
      }

      // VUX UI 库前面已经修改配置，这里不需要再次改动，避免冲突提示
      if (that.props.uiLibrary === 'VUX') {
        if (filename === 'webpack.base.conf.js') {
          return false;
        }
      }

      if (that.props.lint) {
        pkg.dependencies.eslint = '^4.15.0';
        pkg.dependencies['eslint-config-toppro'] = '1.0.2';
        pkg.dependencies['eslint-friendly-formatter'] = '4.0.1';
        pkg.dependencies['eslint-plugin-html'] = '^5.0.0';
        pkg.dependencies['eslint-loader'] = '^1.7.1';
        pkg.dependencies['eslint-plugin-vue'] = '^4.0.0';
      } else if (filename === '.eslintrc.js' || filename === '.eslintignore') {
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
  //   this.installDependencies({ bower: false });
  // }
};
