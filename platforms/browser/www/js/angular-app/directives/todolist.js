define(function(require) {
	var todoListElement = function(){
		return {
			restrict: "E",
			scope:{
				lifo: '='
			},
			templateUrl: 'js/angular-app/directives/todolist.html'
		};
	};
	return todoListElement;

});