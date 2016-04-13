// // local storage in the device or browser, read and update

// define(["starter"], function(starter){



// 	function populateDB(tx) {
// 	    tx.executeSql('DROP TABLE IF EXISTS DEMO');
// 	    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
// 	    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
// 	    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
// 	}

// 	function errorCB(err) {
// 	    console.log("Error processing SQL: "+err);
// 	}

// 	function successCB() {
// 	  console.log("success!");
// 	}

// 	function querySuccess(tx, results) {
// 	  console.log("Returned rows = " + results.rows.length);
// 	  // this will be true since it was a select statement and so rowsAffected was 0
//     var len = results.rows.length;
//     console.log("DEMO table: " + len + " rows found.");
//     for (var i=0; i<len; i++){
//         console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
//     }
    
// 	}

// 	function openDB(){
// 		var database = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
// 		return database;
// 	}

// 	function get_list(){
// 		var database = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
// 		console.log(database.transaction(queryDB, errorCB));
// 	}

// 	function initialise(){
// 		var database = openDB();
// 		database.transaction(populateDB, errorCB, successCB);
// 		return database;
// 	}

// 	function queryDB(tx){
// 		tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);

// 	}







// 	// var getkey = function(){
// 	// 	var dt = new Date();
// 	// 	return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
// 	// };

// 	var db={
// 		selectRow:function(query, callBack){ // <-- extra param
// 			var database = initialise()
// 		  var result = [];
// 		  database.transaction(function (tx) {
// 		      tx.executeSql(query, [], function(tx, rs){
// 		         for(var i=0; i<rs.rows.length; i++) {
// 		            var row = rs.rows.item(i)
// 		            result[i] = { 
// 		            	id: row['id'],
// 		              name: row['data']
// 		            }
// 		         }
// 		          for (var i=0; i<rs.rows.length; i++){
// 					      console.log("Row = " + i + " ID = " + result[i].id + " Data =  " + result[i].data);
// 					    }
// 		         callBack(result); // <-- new bit here
// 		      }, errorCB);
// 		   });
// 		},

// 		get_list: function(){
// 			var result=[]
// 			return [];
// 		},


// 		save_list:function(list){
// 			storage.removeItem("LIST");
// 			var JSONstring = JSON.stringify(list);
// 			storage.setItem("LIST", JSONstring);
// 			console.log(storage.getItem("LIST"))
// 		},

// 		add_item:function(item){
// 			var database = openDB();
// 			database.transaction(function(tx){
// 				tx.executeSql("INSERT INTO Todos values (?)", JSON.stringify(item));
// 			},function(e){
// 				console.log('Transaction error: ' + e.message);
// 			},function(){
// 				db.executeSql('SELECT COUNT(*) FROM tt', [], function(res) {
//       	console.log('Check SELECT result: ' + JSON.stringify(res.rows.item(0)));
//     });
// 			})
// 		}
// 	}
// 	return db;
// });