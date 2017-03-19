var module = {
	deleteFromUser: function (moduleId) {
		var button = document.querySelector('.fn-test');
		var form   = document.querySelector('.fn-form-module');
		
		button.value = moduleId;
		
		form.submit();
		
		
	}
}

