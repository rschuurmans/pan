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