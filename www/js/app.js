//angular controller and model

define(['angularjs','db'], function(angularjs, db){
	var app = angular.module("myApp", []);
	app.factory('list',function(){
		return db.get_todo();
	});

	app.factory('achieved',function(){
		return db.get_achieved();
	});

	var updateDB=function(list, achieved){
		db.save_todo(list);
		db.save_achieved(achieved);
	};
	app.controller('myCtrl', function($scope, list, achieved){
		$scope.list = list;
		$scope.achieved = achieved;
		$scope.show="todo";
		$scope.all=0;
		$scope.toggle=function(){
			if($scope.all==0)
				for(var i=0;i<$scope.list.length; i++)
					$scope.list[i].selected=true;
			else
				for(var i=0;i<$scope.list.length; i++)
					$scope.list[i].selected=false;
			$scope.all = 1 - $scope.all;
		};
		$scope.addEvent = function(todo){
			item={}
			item.selected=false;
			item.todo =todo;
			$scope.list.push(item);
			$scope.todo=null;
			updateDB($scope.list, $scope.achieved);
		};
		$scope.achieve = function($index){
			$scope.achieved.push($scope.list[$index].todo);
			$scope.list.splice($index, 1); 
			console.log($scope.achieved);
			updateDB($scope.list, $scope.achieved)
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
		};
		$scope.achieve_chosen = function(list){
		//don't dynamically delete item in the list. instead create a new array.
			new_list = []
			for(var i=0; i< list.length;i++){
				console.log(list[i].selected);
				if(list[i].selected==true){
					$scope.achieved.push(list[i].todo);
				}		
				else{
					new_list.push(list[i]);
				}
				
			};
			$scope.list = new_list;
			console.log(new_list);
			updateDB($scope.list, $scope.achieved);
		};
		$scope.delete_chosen = function(list){
			new_list = []
			for(var i=0; i< list.length;i++){

				if(list[i].selected!=true){
					new_list.push(list[i]);
				}		
			};
			$scope.list = new_list;
			updateDB($scope.list, $scope.achieved);
		}

	});

	return app;
});