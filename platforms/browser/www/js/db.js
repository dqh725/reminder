define(function(require){
	var storage = window.localStorage;
	var divider="$$$"
	var db={
		get_todo:function(){
			var value= window.localStorage.getItem("TODO").split(divider);
			formatted=[];
			for(var i=0;i<value.length; i++){
				if(value[i]!="")
					formatted.push(
						{
							selected:false,
							todo: value[i]
						}
					);
			}
			console.log(formatted);
			return formatted;
		},
		get_achieved:function(){
			var value = window.localStorage.getItem("DONE");
			return value.split(divider)
		},
		save_todo:function(formatted_list){
			raw=[]
			for(var i=0;i<formatted_list.length; i++){
				if(formatted_list[i].todo!="")
					raw.push(formatted_list[i].todo);
			};
			storage.removeItem("TODO");
			storage.setItem("TODO",raw.join(divider));
			console.log(window.localStorage.getItem("TODO"));
		},
		save_achieved:function(achieved){
			storage.removeItem("DONE");
			storage.setItem("DONE", achieved.join(divider));
			console.log(window.localStorage.getItem("DONE"));
		}
	}
	return db;
});