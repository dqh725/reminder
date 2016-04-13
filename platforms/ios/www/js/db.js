// local storage in the device or browser, read and update

define(["starter"], function(starter){



function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err);
}

function successCB() {
    alert("success!");
}

var database = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
database.transaction(populateDB, errorCB, successCB);





	// var getkey = function(){
	// 	var dt = new Date();
	// 	return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
	// };

	var db={

		get_list: function(){
			var database = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
			var result=[]

			database.executeSql("SELECT * from TODOS", [], function (res) {
			  console.log('got stringlength: ' + res.rows.item(0).stringlength);
			}, function(error) {
			  console.log('SELECT error: ' + error.message);
			});
			return [];
		},


		save_list:function(list){
			storage.removeItem("LIST");
			var JSONstring = JSON.stringify(list);
			storage.setItem("LIST", JSONstring);
			console.log(storage.getItem("LIST"))
		},

		add_item:function(item){
			var database = openDB();
			database.transaction(function(tx){
				tx.executeSql("INSERT INTO Todos values (?)", JSON.stringify(item));
			},function(e){
				console.log('Transaction error: ' + e.message);
			},function(){
				db.executeSql('SELECT COUNT(*) FROM tt', [], function(res) {
      	console.log('Check SELECT result: ' + JSON.stringify(res.rows.item(0)));
    });
			})
		}
	}
	return db;
});