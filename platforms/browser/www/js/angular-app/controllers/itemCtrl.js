define(['angularjs','db'],function(angularjs, db) {

	var itemCtrl = function($scope){

		$scope.init = function(item){
			this.item = item;
		}
		// $scope.achieved = achieved;
	};

	return itemCtrl;
});