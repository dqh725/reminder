define(['angularjs'],function(angularjs) {

	var listCtrl = function($scope, todolist){


		$scope.list = [];
		// $scope.achieved = achieved;
		$scope.show="todo";
		$scope.all=0;


    todolist.all().then(function(results){
        $scope.list = results;
        //console.log($scope.list[0])
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
			item.finished=0;
			item.description="";
			item.date=Date.now();
			item.todo =todo;
			$scope.todo=null;
			todolist.insert(item).then(function(insertId){
        item.id= insertId;
        $scope.list.push(item);
        //console.log($scope.list[0])
    	});



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
		
			for(var i=0; i< list.length; i++){
				if(list[i].selected==true){
					list[i].finished=1;
					console.log("start");
					alert("now should be finished:"+list[i].finished);
					todolist.update(list[i]);
				}			
			}
			$scope.list = list;


		};

		$scope.delete_chosen = function(list){
			new_list = []
			for(var i=0; i< list.length;i++){
				if(list[i].selected!=true){
					new_list.push(list[i]);
				}		
				else{
					todolist.remove(list[i].id)
				}
			}
			$scope.list = new_list;
			// db.save_list($scope.list);
		};

	};

	return listCtrl;
});