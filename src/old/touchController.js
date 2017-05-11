var touchController = {
	petMin: 200,
	petMax: 250,
	currentTangible:false,
	init:function () {
		touchController.createRotate();
		// console.log('touch');
		
		// window.addEventListener('touchstart', function (e) {
			
		// 	console.log(e.touches);

		// 	// check of touch meer is dan 1 
		// 	// if(e.touches.length >= 2) {
		// 	// 	var thisTouch = e.touches[e.touches.length - 1];
		// 	// 	var prevTouch = e.touches[e.touches.length - 2] ;
				
		// 	// 	var isTangible = touchController.isTangible(thisTouch, prevTouch);
		// 	// 	console.log(isTangible);
		// 	// 	if(isTangible) {
		// 	// 		window.addEventListener('touchend', function (ev) {
		// 	// 			// var thisNewTouch = 
		// 	// 			console.log(ev);
		// 	// 		}) 
		// 	// 	}
		// 	// }
		// 	// console.log(e.touches.length);
		// 	// var thisTouch - e
		// 	// for(var i = 0; i < e.touches.length;i++ ) {
		// 	// 	console.log(e.touches[i]);
		// 	// }


		// 	// check of touch meer is dan 2
		// 	// huidige touch (is laatste) vergelijken met huidige touch - 1;
		// 	// diff ongeveer gelijk aan diff tussen de tangible object touch points.
		// 	// controleren op resolutie mogelijk problemen hier.




		// // 	 var touch;

		// // 	  if (ev.targetTouches.length >= 1) {

		// // 	     touch = ev.targetTouches.item(0);
		// // 	  }
		// // 	  else {
		// // 	     touch = ev.touches.item(0);
		// // 	  }
			
		// // console.log(touch);
		// 	// for(var i in e.touches) {
		// 	// 	// console.log(e.touches[i].touchList);
		// 	// 	// console.log(e.touches[i].screenX);
		// 	// 	// console.log(e.touches[i].identifier);
		// 	// }
			
		// })
	},
	createRotate: function () {
		var angle = 0;
		console.log(angle);
		interact('.fn-rotate').gesturable({
		  onmove: function (event) {
		  	console.log('move');
		    var arrow = document.querySelector('.fn-rotate-inner');

		    angle += event.da;

		    arrow.style.webkitTransform =
		    arrow.style.transform =
		      'rotate(' + angle + 'deg)';

		    // document.getElementById('angle-info').textContent =
		    //   angle.toFixed(2) + '°';
		  }
		});

	},
	isTangible: function (thisTouch, prevTouch) {
		var diff = touchController.difference(thisTouch.pageX, prevTouch.pageX, thisTouch.pageY, prevTouch.pageY);
		
		return diff > touchController.petMin && diff < touchController.petMax;
	},
	difference:function (x1, x2, y1,y2) {

		// based on :http://www.mathopenref.com/coorddist.html
		var x = Math.max(x1, x2) - Math.min(x1, x2);
		var y = Math.max(y1, y2) - Math.min(y1, y2);
		
		return Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));

	},
	removeDefaultGestures() {
		window.ontouchmove = function(e){	
			// e.preventDefault();	
			// e.stopPropagation();
		}
	}
}