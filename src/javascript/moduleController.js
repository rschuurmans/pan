
var module = {
	addModule: function () {
		
		// console.log('module.addmodule');
		// var modules = document.querySelectorAll('.fn-select-module');
		
		// for(var i = 0; i < modules.length; i++) {
		// 	modules[i].addEventListener('click',  module.addModuleEvent)
		// }
	},
	addModuleEvent(event) {
		// console.log(event);
		// var category = tools.getParameterByName('category');
		// var col      = tools.getParameterByName('col');
		// var id       = event.target.getAttribute('module-id');

		// if(id == null) {
		// 	id = event.target.parentNode.getAttribute('module-id');
		// }
		// $.post({
		//  url: '/play/add',
		//  data: {
		//  	moduleId: parseInt(id), 
		//  	col: col,
		//  	category: category
		//  },
		//  success: function(res){
		//  	console.log('success', res);
		//   window.location = res.redirectTo;
		//  },
		//  error: function (res) {
		//  	alert('too much')
		//  	window.location = res.redirectTo;
		//  }
		// }); 

	},
	deleteFromUser: function (id) {
		$.post({
		 url: '/play/remove',
		 data: {id:id},
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	window.location = res.redirectTo;
		 }
		}); 
	}
}
