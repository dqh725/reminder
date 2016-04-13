require.config({ 
	//the root path to use for all module lookups
	baseUrl: "js",
	// path mappings for module names not found directly under baseUrl.
	paths: {
		jquery: 'lib/jquery-1.12.0.min',
		angularjs: 'lib/angular-1.5.3.min',
		app: 'angular-app/app',
		listCtrl: 'angular-app/controllers/listCtrl',
		//todoListElement: 'angular-app/directives/todolist'
		angularRoute: 'lib/angular-route.min'
	},

	shim:{
		angularRoute: ['angularjs'],
	}

});

require(['starter','app'],function (starter,app) {
    starter.initialize();
});

