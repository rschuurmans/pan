


var draggableElements = document.querySelectorAll('.fn-draggable');
var area             = document.querySelector('body');
var dropArea         = document.querySelector('.fn-delete-box');


console.log('drag.init');
// target elements with the "draggable" class

interact('.fn-draggable')
	.draggable({
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
			// keep the dragged position in the data-x/data-y attributes
			
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			// translate the element
			target.style.webkitTransform =
			target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (event) {
			console.log('drag ended', event);
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
		clone.style.left     = original.offsetLeft+"px";
		clone.style.top      = original.offsetTop+"px";
		clone.style.width      = original.offsetWidth+"px";
		clone.style.height      = original.offsetHeight+"px";
		clone.classList.add('fn-clone');
		// clone.className = clone.className.replace(/\bfn-draggable\b/,'fn-clone');
		original.parentElement.appendChild(clone);
		interaction.start({ name: 'drag' },event.interactable,clone);
	}

})





interact(dropArea).dropzone({
	// only accept elements matching this CSS selector
	accept: '.fn-draggable',
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,

	// listen for drop related events:

	ondropactivate: function (event) {
		console.log('ondropactivate' );
		event.target.classList.add('active');
	// add active dropzone feedback
	// event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget;
		// dropzoneElement = event.target;
		draggableElement.setAttribute('drag-status', 'dragIn');
	
	},
	ondragleave: function (event) {
	// console.log('ondragleave');
	// // remove the drop feedback style
	// 	event.target.classList.remove('drop-target');
	// 	event.relatedTarget.classList.remove('can-drop');
	// 	event.relatedTarget.textContent = 'Dragged out';
	},
	ondrop: function (event) {
	// console.log('ondrop');
	console.log(event.relatedTarget.getAttribute('module-id'));
	console.log(event.relatedTarget);
	module.deleteFromUser(event.relatedTarget.getAttribute('module-id'));
	event.target.classList.remove('active');
	},
	ondropdeactivate: function (event) {
	var clone = document.querySelector('.fn-clone');
	clone.remove()
	event.target.classList.remove('active');
	}
});
