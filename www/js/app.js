define(['angularjs'], function(angularjs){
	var app = angular.module("myApp", []);
	app.controller('myCtrl', function($scope){
		$scope.list = [];
		$scope.achieved = [];
		$scope.show="todo";
		$scope.addEvent = function(todo){
			$scope.list.push(todo);
			$scope.todo=null;
		};
		$scope.achieve = function($index){
			$scope.achieved.push($scope.list[$index]);
			$scope.list.splice($index, 1); 
			console.log($scope.achieved)
		};
		$scope.is_todo = function(){
			return $scope.show=="todo";
		};
		$scope.is_achieve = function(){
			return $scope.show=="achieve";
		};
		$scope.show_todo = function(){
			$scope.show="todo";
		};
		$scope.show_achieve = function(){
			$scope.show="achieve";
		}

	});
	return app;
})