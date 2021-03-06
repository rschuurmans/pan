var drag = {
	init:function () {
		console.log('drag.init');
		drag.createDraggable('.fn-draggable', 'body');
		drag.createDrop('.fn-delete-box', '.fn-draggable')
	},
	createDraggable: function (element, area) {
		console.log('drag.createDraggable');
		interact(element).draggable({
			inertia: true,
			manualStart: true,
			restrict: {
				restriction: area,
				endOnly: true,
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			},
			autoScroll: false,
			onmove: function (event) {
				var target = event.target;
				
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
				target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}
		}).on('move', function (event) {
	
			var interaction = event.interaction;
			if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
				var original = event.currentTarget;
				var clone    = event.currentTarget.cloneNode(true);
				var x        = clone.offsetLeft;
				var y        = clone.offsetTop;
				
				clone.setAttribute('clonable','false');
				clone.style.position = "absolute";
				clone.style.left     = original.offsetLeft + "px";
				clone.style.top      = original.offsetTop + "px";
				clone.style.width    = original.offsetWidth + "px";
				clone.style.height   = original.offsetHeight + "px";
				clone.classList.add('fn-clone');

				original.parentElement.appendChild(clone);
				interaction.start({ name: 'drag' },event.interactable,clone);
			}

		})
	},
	createDrop: function (element, accept) {
		console.log('drag.createDrop');
		interact(element).dropzone({
			accept: accept,
			ondropactivate: function (event) {
				event.target.classList.add('active');
			},

			ondragenter: function (event) {
				event.relatedTarget.setAttribute('drag-status', 'dragIn');
			},
			
			ondrop: function (event) {
				module.deleteFromUser(event.relatedTarget.getAttribute('data-col'), event.relatedTarget.getAttribute('data-category'));
				event.target.classList.remove('active');
			},

			ondropdeactivate: function (event) {
			document.querySelector('.fn-clone').remove()
			event.target.classList.remove('active');
			}
		});

	}
}



var module = {
	addModule: function () {
		var modules = document.querySelectorAll('.fn-select-module');
		
		for(var i = 0; i < modules.length; i++) {
			modules[i].addEventListener('click',  module.addModuleEvent)
		}
	},
	addModuleEvent(event) {
		var category = tools.getParameterByName('category');
		var col      = tools.getParameterByName('col');
		var id       = event.target.getAttribute('module-id');

		if(id == null) {
			id = event.target.parentNode.getAttribute('module-id');
		}
		$.post({
		 url: '/play/add',
		 data: {
		 	moduleId: parseInt(id), 
		 	col: col,
		 	category: category
		 },
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	alert('too much')
		 	window.location = res.redirectTo;
		 }
		}); 

	},
	deleteFromUser: function (col, category) {
		$.post({
		 url: '/play/remove',
		 data: {col: col, category:category},
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	window.location = res.redirectTo;
		 }
		}); 
	}
}

window.onload = function () {
	console.log('window onload');
	drag.init();
	module.addModule();
	motion.init();
}
var motion = {
	first:true,
	minDiff: 30,
	base:0,
	init: function () {
		motion.right();
		// motion.left();
		console.log('motion.init');
	},
	right: function () {
		window.addEventListener('deviceorientation', motion.motionEvent);
	},
	motionEvent: function (event, re) {
		if(motion.first) {
			motion.base  = event.alpha;        
			motion.first = false;              
		}
		var change = event.alpha - motion.base;

		if(change *-1 > motion.minDiff) {
			console.log('got it!');
			motion.changeLive();
			window.removeEventListener('deviceorientation', motion.motionEvent);
			
			

		}
	},
	changeLive: function () {
		$.post({
		 url: '/play/live',
		 data: {
		 	isLive: true
		 },
		 success: function(res){
		 	console.log('success', res);
		 	window.reload();
		  // window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	console.log('error', res);
		 	// alert('too much')
		 	// window.location = res.redirectTo;
		 }
		});
	}
}

var tools = {
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
	}
}
