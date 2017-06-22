var tools = {
	events: function (selector, type,  callback) {

	},
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
		}

	},
	setGroup: function () {
		var allgroups = false;
		if(allgroups) {

		} else {
			return 0;
		}
	},
	increaseOrMax: function (value) {
		value.increasable++;
		
		if(value.increasable == value.max) {
			value.increasable = value.min;
		}

		return value.increasable;
	},
	addClasses: function (element, classes) {
		for(var i in classes) {
			element.classList.add(classes[i])
		}
	},
	submitForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var username = form.querySelector('.fn-username').value;
			$.post('/login', {username:username})
		})
	},
	getParameterByName: function (name, url) {
		// code: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
		if (!url) {
	      url = window.location.href;
	    }
	    
	    name = name.replace(/[\[\]]/g, "\\$&");
	    
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	        
	    if (!results) return null;
	    if (!results[2]) return '';
	    
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	eachDomElement: function (selector,callback) {
		var items   = document.querySelectorAll(selector);

		for(var i = 0; i < items.length;i++) {
			callback(items[i])
		}
	},
	getPercentage: function (value, max) {
		return (value*100)/max;
	},
	percentageToValue: function (perc, max) {
		return (perc * max) / 100
	},
	valueInObject: function (obj,param,  value) {
		var match = false;
		obj.forEach(function(elem) {
			if(elem[param] == value) {
				match = elem
			}
		});
		return match;
	},
	groupOrGroups: function () {

	},
	contains(thing, has) {
		if(thing.indexOf(has) !== -1) {
			return true;
		} else {
			return false;
		}
	},
	
	
	dataFromGroup: function ( groupId, callback ) {
		for(var i in data.group) {

			if(data.group[i]._id == groupId) {
				callback(data.group[i])
			}
		}
		// if(group == 'all') {
		// 	for(var i in data.group) {
		// 		callback(data.group[i][parameter])
		// 	}
		// } else {
		// 	callback(data.group[group][parameter])
		// }
	},
	pathObj: function (obj, path) {
		

		if(typeof path === 'string') path = path.split('.');

		  if(path.length === 0) return obj;
		  return tools.pathObj(obj[path[0]], path.slice(1));
	},
	currentGroupId: function () {
		// return tools.pathObj(data, 'group.0._id');
		
		var path = window.location.pathname.split('/');
		return path[path.length - 1];
	},
	get: function (name) {
		name = name + '=';
		var decodedCookie = decodeURIComponent(document.cookie);
		return true;
		// var ca = decodedCookie.split(';');
		// var result = '';
	 //    for(var i = 0; i <ca.length; i++) {
	 //        var c = ca[i];
	 //        while (c.charAt(0) == ' ') {
	 //            c = c.substring(1);
	 //        }
	 //        if (c.indexOf(name) == 0) {
	 //            result =  c.substring(name.length, c.length);
	 //        }
	 //    }
	 //    return result;
	}
}
