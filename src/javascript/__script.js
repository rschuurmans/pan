

var onLoad = function () {

	switch(window.location.pathname) {
		case '/role/modulator':
			console.log('at modulator');
			
			modulateRole.init();
			break;
		case '/role/sequencer':
			console.log('at sequencer');
			
			sequencerRole.init();
			break;
		default:
			console.log('at nothing');
			break;

	}

	// tools.autoSubmit();
	// drag.init();
	// formLoad.init();

	// drag.init();
	// motion.init();
	
	// touchController.init();
	
	// switch(window.location.pathname) {
	// 	case '/play/tracker':
	// 		// cameraTracker.init();
			
	// 		break;
	// 	case '/play':
	// 		audio.init();
	// 		// tools.autoSubmit();
	// 		break;
	// 	case '/create':
	// 		tools.autoSubmit();
	// 		break;
	// 	case '/play/add':
			
	
	// 		console.log('dis');
	// 		break;
	// 	default:
	// 		console.log('no special pathname');
	// 		break;
	// }
}

var pageTransitions = function () {
	Barba.Pjax.start();
	var HideShowTransition = Barba.BaseTransition.extend({
	  start: function() {
	  	Promise
	      .all([this.newContainerLoading, this.scrollOld()])
	      .then(this.moveDown.bind(this));
	  },
	  scrollOld: function () {
	  	 TweenLite.set(this.oldContainer, {
	        visibility: 'visible',
	        position: 'absolute',
	        left: 0,
	        top: 0,
	        right: 0,
	        height:'100%'
	      });
	  	$(this.oldContainer).promise();
	  },
	  moveDown: function() {
		var _this         = this;
		var animationTime = .3;
		var lastLink      = Barba.HistoryManager.prevStatus().url.split('/').pop();
		var currentLink   = Barba.HistoryManager.currentStatus().url.split('/').pop();
		console.log(Barba.HistoryManager.currentStatus().url.split('/'));
		var newContainerFrom = {
			visibility: 'visible',
			position  : 'fixed',
			left      : 0,
			top       : 0,
			right     : 0,
			height    :'100%',
			transform:'scale(1)',
		};
		var oldContainerTo = {
			top :0,
			left:0,
			opacity:1
		}
		var newContainerTo = {
			top:0,

			onComplete: function() {
				TweenLite.set(_this.newContainer, { clearProps: 'all' });
				onLoad();
				_this.done();
			}
		};

		if(currentLink == 'group') {
			oldContainerTo.top   = '100%';
			newContainerFrom.top = '-100%';
		} else if(currentLink == 'play') {
			if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
				oldContainerTo.top   = '100%';
				newContainerFrom.top = '-100%';
				newContainerTo.top   = 0;
			} else {
				oldContainerTo.left   = '-100%';
				newContainerFrom.left = '100%';
				newContainerTo.left   = 0;
			}
		} else if (currentLink == 'add') {
			oldContainerTo.left   = '100%';
			newContainerFrom.left = '-100%';
			newContainerTo.left   = 0;
		} else if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
			oldContainerTo.top   = '-100%';
			newContainerFrom.top = '100%';
			newContainerTo.top   = 0;
		}

			TweenLite.set(this.newContainer,newContainerFrom);
			TweenLite.to(this.oldContainer, animationTime, oldContainerTo);
			TweenLite.to(this.newContainer, animationTime, newContainerTo);
		},

	
	  finish: function () {
	  	onLoad();
	  	console.log('finish!');
		this.done();
		
	  }
	 
	});
	
	Barba.Pjax.getTransition = function() {
	  return HideShowTransition;
	};
	
}


window.onload = function () {
	pageTransitions();
	onLoad();

}
