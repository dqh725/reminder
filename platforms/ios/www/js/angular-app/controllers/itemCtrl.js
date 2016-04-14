define(['angularjs'],function(angularjs) {

	var itemCtrl=['$scope', 'todolist','$routeParams', function($scope, todolist, $routeParams) {
		$scope.item=null;
	  todolist.getById($routeParams.id).then(function(result){
        $scope.item = result;
    });

    $scope.update=function(){
    	console.log($scope.item.todo);
    	
    	todolist.update($scope.item)
    	console.log("finish");
    };


	}];

	return itemCtrl;
});