var postData = {
	groupList: function () {
		var listItems    = document.querySelectorAll('.fn-grouplist-item');
		var randomButton = document.querySelector('.fn-random');

		listItems.forEach(function(listItem) {
			listItem.addEventListener('click', function (e) {
				postData.groupListPost({
					username:user.username,
					id: e.currentTarget.getAttribute('group-id'), 
					newGroup:false
				})
				
			})
		});

		randomButton.addEventListener('click', function(e) {
			e.preventDefault();
			postData.groupListPost({
				username:user.username, 
				newGroup:true
			})
		});
	},
	groupListPost: function (data) {
		
		var query = "username=" + data.username + "&newGroup=" + data.newGroup + "&id=" + data.id;

		postData.postRequest('/createGroup', data,  function (response) {
			
			window.location = '/role/' + response.role + '/' + response.userId + '/' + response.groupId;
		});
	},
	username: function () {
		var form  = document.querySelector('form');
		var input = form.querySelector('input[type="text"]');
		postData.formSubmit(form, input, function () {
			changePage.showPage('group-list');
		})
	},
	formSubmit: function (form, input, cb) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			user.username = input.value.trim();
			cb();
			
		})
	},
	saveAudioData: function () {
		
		postData.postRequest('/role/save', data.group, function (res) {
		})
	},

	leaveGroup: function () {
		var send =  {
			group:data.group,
			role:data.user.role,
			groupid: data.group._id
		};
		postData.postRequest('/role/leave',send, function (res) {
			
			data = res;
		})
	},

	request: function (url, type, query, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
		        // Request finished. Do processing here.
		        
		        cb(JSON.parse(xhr.response))
		    }
		}
		xhr.send(query); 
		
	},
	postRequest(url, data, success) {
		
	    var params = typeof data == 'string' ? data : Object.keys(data).map(
	            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
	        ).join('&');

	    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	    xhr.open('POST', url);
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState>3 && xhr.status==200) { success(JSON.parse(xhr.response)); }
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	    xhr.send(params);

	    return xhr;
	}
}