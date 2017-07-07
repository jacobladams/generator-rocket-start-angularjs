class AppController {
	title: string;

	constructor() {
		this.title = 'hello world';
		console.log('here');
	}
}

angular.module('<%=angularModuleName%>').component('<%=angularAppComponentName%>', {
	templateUrl: 'app.component.html',
	//template: '<h1>Title: {{$ctrl.title}}</h1>',
	controller: AppController
});
