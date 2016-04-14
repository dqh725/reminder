define(['angularjs'],function(angularjs){

	var DB_CONFIG = {
		name: 'DB',
		tables:[
			{
				name: 'todos',
				columns: [
					{name: 'id', type :'integer primary key'},
					{name: 'todo', type: 'text'},
					{name: 'description', type: 'text'},
					{name: 'finished', type: 'boolean'},
					{name: 'date', type: 'integer'}
				]
			}
		]
	};
	return DB_CONFIG;
});