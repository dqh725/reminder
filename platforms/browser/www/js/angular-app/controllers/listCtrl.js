define(['angularjs'],function(angularjs) {

	var listCtrl = function($scope, todolist){


		$scope.list = [];
		// $scope.achieved = achieved;
		$scope.show="todo";
		$scope.all=0;


    todolist.all().then(function(results){
        $scope.list = results;
        console.log($scope.list[0])
    });

		$scope.toggle=function(list){
			if($scope.all==0)
				for(var i=0;i<$scope.list.length; i++)
					list[i].selected=true;
			else
				for(var i=0;i<$scope.list.length; i++)
					list[i].selected=false;
			$scope.all = 1 - $scope.all;
		};

		$scope.addEvent = function(todo){
			item={}
			item.finished=false;
			item.description="";
			item.date=Date.now();
			item.todo =todo;
			$scope.list.push(item);
			$scope.todo=null;
			todolist.insert(item);
		};
		$scope.achieve = function($index){
			// $scope.achieved.push($scope.list[$index].todo);
			$scope.list[$index].finished = true;
			// console.log($scope.achieved);
			// db.save_list($scope.list);
		};
		$scope.is_todo = function(){
			return $scope.show=="todo";
		};

		$scope.current = function(value){
			$scope.show=value;
		};

		$scope.todo_list = function(){
			new_list=[];
			for(var i=0; i<$scope.list.length; i++){
				if(!$scope.list[i].finished)
					new_list.push($scope.list[i]);
			}
			return new_list;
		};

		$scope.achieve_chosen = function(list){
		//don't dynamically delete item in the list. instead create a new array.
			for(var i=0; i< list.length;i++){
				if(list[i].selected==true){
					$scope.list[i].finished= true;
				}					
			};
			// db.save_list($scope.list);
		};

		$scope.delete_chosen = function(list){
			new_list = []
			for(var i=0; i< list.length;i++){
				if(list[i].selected!=true){
					new_list.push(list[i]);
				}		
			}
			$scope.list = new_list;
			// db.save_list($scope.list);
		};

	};

	return listCtrl;
});