//angular controller and model

define(
  ['angularRoute',
  'DB_CONFIG',
  'DB', 
  'listCtrl'], 
  
  function(
    angularRoute,
    DB_CONFIG,
    DB,
    listCtrl){


  var app = angular.module('myApp',['ngRoute']);
  app.run(function(DB) {
    DB.init();
    console.log('database init!');
  });
  app.constant('DB_CONFIG', DB_CONFIG);

	app
  .factory('DB',DB)
  .factory('todolist', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM todos')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM todos WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    self.insert=function(item){
      DB.insert(item);
    }
    
    return self;
  });


	app.controller('listCtrl', listCtrl);
  // app.controller('itemCtrl', itemCtrl);

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