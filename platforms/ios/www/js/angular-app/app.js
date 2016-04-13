//angular controller and model

define(['angularRoute','db', 'listCtrl'], 
  function(angularRoute, db, listCtrl){
  //console.log(require.defined("angularjs"));
  console.log(require.defined('angularRoute'))
  console.log(require.defined('angularjs'))

  var app = angular.module('myApp',['ngRoute']);
	app.factory('list',db.get_list);

	app.controller('listCtrl', listCtrl);
  app.controller('itemCtrl', listCtrl);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'js/angular-app/views/list.html',
          controller: 'listCtrl'
        }).
        otherwise({
          redirectTo: 'js/angular-app/views/item-detail.html',
          controller: 'itemCtrl'
        });
    }]);

	return app;
});