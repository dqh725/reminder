define(['angularjs'],function(angularjs){

	var DB = function($q, DB_CONFIG){
		var self = this;
		self.db = null;
    self.lastId;
		self.init = function(){
       //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 2000000);
		  self.db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
      angular.forEach(DB_CONFIG.tables, function(table) {
          var columns = [];

          angular.forEach(table.columns, function(column) {
              columns.push(column.name + ' ' + column.type);
          });
          var q = 'DROP TABLE IF EXISTS TODOS';
          self.query(query);
          var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
          self.query(query);
          console.log('Table ' + table.name + ' initialized');
      });
		};

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
            		console.log("Returned rows = " + result.rows.length);
							  // this will be true since it was a select statement and so rowsAffected was 0
						    var len = result.rows.length;
						    console.log("todos table: " + len + " rows found.");
						    for (var i=0; i<len; i++){
						        console.log("Row = " + i + " ID = " + result.rows.item(i).id + " Data =  " + result.rows.item(i).todo);
						    }
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };
    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };


    self.fetch = function(result) {
        return result.rows.item(0);
    };


    self.insert = function(item){

      var deferred = $q.defer();
  	  self.db.transaction(function (tx) {  
				tx.executeSql(
					'INSERT INTO TODOS (todo, description, finished, date) VALUES (?, ?, ?, ?)',
					[item.todo, item.description, item.finished, item.date],
          function(tx, result){
            deferred.resolve(result)
          },
          function(e){
            console.log(e.message);
            deferred.reject(e)
          }
				);

			});
      return deferred.promise;
    };


    self.update = function(item){
      alert("before insert into db:"+JSON.stringify(item));
      self.db.transaction(function (tx) {  
        tx.executeSql(
          'UPDATE TODOS SET todo=?, description=?, finished=? WHERE id=?', 
          [item.todo, item.description, item.finished, item.id]
        );
      }, function(e){console.log(e.message)}, function(){console.log()});
    };
          



		return self;
	};
	return DB;
});
