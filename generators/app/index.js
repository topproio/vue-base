'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');
var copydir = require('copy-dir');
var mkdirp = require('mkdirp');

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
        choices: ['elementUI', 'VUX', 'vuetify', 'vue-material']
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
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  writing() {
    copydir.sync(this.templatePath(), this.destinationPath(), function(
      stat,
      filepath,
      filename
    ) {
      if (stat === 'file' && filename === 'package.json') {
        return false;
      }

      if (stat === 'file' && filename === 'webpack.base.conf.js') {
        return false;
      }

      return true;
    });

    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});

    if (this.props.uiLibrary === 'elementUI') {
      // Package.json 添加安装包定义
      pkg.dependencies['element-ui'] = '^2.4.11';

      this.fs.copyTpl(
        this.templatePath('build/webpack.base.conf.js'),
        this.destinationPath('build/webpack.base.conf.js'),
        {
          uiLibrary: 'element-ui'
        }
      );
      // Main.js 文件中引入安装包

      let content = `
      import ElementUI from "element-ui";
      import "element-ui/lib/theme-chalk/index.css";
      Vue.use(ElementUI);
      `;
      this.fs.append(this.destinationPath('src/main.js'), content, {
        separator: '\n\n/* add for element UI*/'
      });

      // This.fs.copyTpl(
      //   this.templatePath('src/main.js'),
      //   this.destinationPath('src/main.js'),
      //   {
      //     uiImportFile: `import ElementUI from "element-ui";
      //                    import "element-ui/lib/theme-chalk/index.css"
      //                   `
      //   }
      // );
    } else if (this.props.uiLibrary === 'VUX') {
      pkg.dependencies.vux = '^2.9.2';
      pkg.dependencies['vue-loader'] = '^13.3.0';
      this.fs.copyTpl(
        this.templatePath('build/webpack.base.conf.js'),
        this.destinationPath('build/webpack.base.conf.js'),
        {
          uiLibrary: 'vux'
        }
      );
    }

    pkg.name = this.props.projectName;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  // Install() {
  //   this.installDependencies({ bower: false });
  // }
};
