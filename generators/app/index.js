'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var copydir = require('copy-dir');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the first-class ${chalk.red('generator-toppro-vue-base')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (vue-base):'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    copydir.sync(this.templatePath(), this.destinationPath(), function(stat, filepath, filename){
      if(stat === 'file' && filename === 'package.json') {
        return false;
      }
      return true;
    }, );
  
    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});

    pkg.name = this.props.projectName;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

  }

  install() {
    this.installDependencies({bower: false});
  }
};
