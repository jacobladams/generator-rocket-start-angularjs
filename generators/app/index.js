'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');



module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.argument('appname', { type: String, required: true });
		//this.appname = _.kebabCase(this.appname);

		// this.option('includeutils', {
		//    desc: 'Optionally includes Angular-UI Utils library.',
		//    type: Boolean,
		//    default: false
		// });
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the incredible ' + chalk.red('Rocket Start AngularJS') + ' generator!'
		));

		// const prompts = [{
		//   type: 'confirm',
		//   name: 'someAnswer',
		//   message: 'Would you like to enable this option?',
		//   default: true
		// }];


		const prompts = [{
			type: 'input',
			name: 'version',
			message: 'Version Number',
			default: '1.0.0'
		}, {
			type: 'input',
			name: 'author',
			message: 'Author',
		}, {
			type: 'input',
			name: 'angularModuleName',
			message: 'AngularJS Module Name',
			default: _.kebabCase(this.options.appname)
		}, {
			type: 'input',
			name: 'angularAppComponentName',
			message: 'AngularJS App Component Name',
			default: 'app'
		}, {
			type: 'confirm',
			name: 'includeDotNetFiles',
			message: 'include .NET Project Files?',
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


		// var createGuid = function() {
		// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		// 	var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		// 	return v.toString(16);
		// 	});
		// }

		// const projectGuid = createGuid();
		const vsProjectGuid = uuidv4();
		const currentYear = new Date().getFullYear;


		var templateGlob = [
			`${this.templatePath()}/**`,
			`!${this.templatePath()}/Properties/`,
			`!${this.templatePath()}/_Project.csproj`,
			`!${this.templatePath()}/Web.config`
		];

		var data = {
			projectName: this.options.appname,
			version: this.props.version,
			author: this.props.author,
			angularModuleName: this.props.angularModuleName,
			angularAppComponentName: this.props.angularAppComponentName,
			angularAppComponentTag: _.kebabCase(this.props.angularAppComponentName),
			vsProjectGuid: vsProjectGuid,
			currentYear: currentYear
		};

		const rootFolder = this.destinationPath() + '/' + this.options.appname
		//const rootFolder = this.destinationPath();

		this.fs.copyTpl(templateGlob, rootFolder, data);

		if (this.props.includeDotNetFiles) {
			this.fs.copyTpl(`${this.templatePath()}/_Project.csproj`, `${rootFolder}/${this.options.appname}.csproj`, data);
			this.fs.copyTpl(`${this.templatePath()}/Properties/**`, rootFolder, data);
			this.fs.copyTpl(`${this.templatePath()}/Web.config`, `${rootFolder}/Web.config`, data);
		}
	}

	//   install() {
	//     this.installDependencies();
	//   }
};
