//angular controller and model

define(
  ['angularRoute',
  'DB_CONFIG',
  'DB', 
  'listCtrl',
  'itemCtrl'], 
  
  function(
    angularRoute,
    DB_CONFIG,
    DB,
    listCtrl,
    itemCtrl){


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
        return DB.insert(item)
        .then(function(result){
            return result.insertId;
        });
    };

    self.remove = function(id){
      var q ="DELETE FROM Todos WHERE id = "+id
      DB.query(q);
    };

    self.update = function(item){
      DB.update(item);
      // return DB.update(item)
      // .then(function(result){
      //     return result;
      // });
    };
    
    return self;
  });


	app.controller('listCtrl', listCtrl);
  app.controller('itemCtrl', itemCtrl);

  app.config(['$routeProvider',
    function($routeProvider, $compileProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'js/angular-app/views/list.html',
          controller: 'listCtrl'
        }).
        when('/:id', {
          templateUrl: 'js/angular-app/views/item-detail.html',
          controller: 'itemCtrl'
        })
        .otherwise({ redirectTo: '/' });;

    }]);

	return app;
});