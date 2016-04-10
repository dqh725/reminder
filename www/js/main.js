require.config({ 
	baseUrl: "js",
	paths: {
		jquery: 'lib/jquery-1.12.0.min',
		angularjs: 'lib/angular-1.5.3.min'
	}
});


require(['index'], function (index) {
    index.initialize();
});

require(['app'], function(app){

});