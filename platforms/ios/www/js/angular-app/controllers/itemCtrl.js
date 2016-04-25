define(['angularjs'],function(angularjs) {

	var itemCtrl=['$scope', 'todolist','$routeParams', function($scope, todolist, $routeParams) {
		$scope.item=null;

	    todolist.getById($routeParams.id).then(function(result){
            $scope.item = result;
            console.log($scope.item.description);
        });

        $scope.update=function(){
            try{
                var input1 = document.getElementById('input1').value;
                var input2 = document.getElementById('input2').value;
                console.log(input1);
                console.log(input2);
                $scope.item.todo = input1;
                $scope.item.description = input2;
            	todolist.update($scope.item);
                alert("Success!")
                
            }catch(err){
                alert(err);
            }
        };


	}];

	return itemCtrl;
});