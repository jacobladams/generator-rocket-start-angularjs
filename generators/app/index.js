'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
// const _ = require('lodash'),



module.exports = class extends Generator {
	// constructor() {
	// 	super(arguments);
	// 	this.argument('appname', { type: String, required: true });
    //     this.appname = _.kebabCase(this.appname);

    //     this.option('includeutils', {
    //        desc: 'Optionally includes Angular-UI Utils library.',
    //        type: Boolean,
    //        default: false
    //     });
	// }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('generator-rocket-start-angularjs') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // this.fs.copyTpl(
    //   	this.templatePath('dummyfile.txt'),
	// 	this.destinationPath('dummyfile.txt'),
	// 	{foo: 'hello world'}
	// );
	console.log('template path: '+ this.templatePath()+ '/**')
	this.fs.copyTpl(
      	this.templatePath()+ '/**',
			this.destinationPath(),
		{
			// foo: 'hello world',
			// bar: 'hello' + this.props.someAnswer,
			projectName: 'rocket-start-angularjs',
			version: '0.0.1',
			author: 'jacobladams',
			angularModuleName: 'rocket-start',
			angularAppComponentName: 'app',
			angularAppComponentTag: 'app'
			// angularAppComponentTag: _.kebabCase('fooBarBazApp')

		}
		// {
		// 	foo: 'hello world',
		// 	bar: 'hello' + this.props.someAnswer,
		// 	projectName: 'foobaz',
		// 	version: '0.0.1',
		// 	author: 'the bard',
		// 	angularModuleName: 'FooBaz',
		// 	angularAppComponentName: 'fooBarBazApp',
		// 	angularAppComponentTag: 'foo-bar-baz-app'
		// 	// angularAppComponentTag: _.kebabCase('fooBarBazApp')

		// }
	);
  }

//   install() {
//     this.installDependencies();
//   }
};
