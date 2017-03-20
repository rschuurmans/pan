var module = {
	addModule: function () {
		console.log('addModule');
		var modules = document.querySelectorAll('.fn-select-module');
		
		for(var i = 0; i < modules.length; i++) {
			
			modules[i].addEventListener('click',  module.addModuleEvent)
		}
	},
	addModuleEvent(event) {
		var location = window.location.pathname.split("/")[3];

		var id = event.target.getAttribute('module-id');
		if(id == null) {
			id = event.target.parentNode.getAttribute('module-id');
		}
		$.post({
		 url: '/play/add',
		 data: {
		 	moduleId: parseInt(id), 
		 	gridPlace: {
			 	row: location[0],
			 	col: location[1]
			}
		 },
		 success: function(res){
		  console.log('evaluate response and show alert');
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	alert('too much')
		 	window.location = res.redirectTo;
		 }
		}); 

	},
	deleteFromUser: function (moduleId) {
		$.post({
		 url: '/play/remove',
		 data: {moduleId: moduleId},
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	console.log(res.error);
		 	window.location = res.redirectTo;
		 }
		}); 
	}
}

window.onload = function () {
	console.log('window onload');
	drag.init();
	module.addModule();
}