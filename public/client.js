

var onLoad = function () {

	var path = window.location.pathname;

	if(path.indexOf('/role/modulator') !== -1) {

		modulateRole.init();

	} else if(path.indexOf('/role/sequencer') !== -1) {

		
		changePage.sequencerNavigation();
		sequencerRole.init();
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
		// tools.submitForm();
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

// var pageTransitions = function () {
// 	Barba.Pjax.start();
// 	var HideShowTransition = Barba.BaseTransition.extend({
// 	  start: function() {
// 	  	Promise
// 	      .all([this.newContainerLoading, this.scrollOld()])
// 	      .then(this.moveDown.bind(this));
// 	  },
// 	  scrollOld: function () {
// 	  	 TweenLite.set(this.oldContainer, {
// 	        visibility: 'visible',
// 	        position: 'absolute',
// 	        left: 0,
// 	        top: 0,
// 	        right: 0,
// 	        height:'100%'
// 	      });
// 	  	$(this.oldContainer).promise();
// 	  },
// 	  moveDown: function() {
// 		var _this         = this;
// 		var animationTime = .3;
// 		var lastLink      = Barba.HistoryManager.prevStatus().url.split('/').pop();
// 		var currentLink   = Barba.HistoryManager.currentStatus().url.split('/').pop();
// 		console.log(Barba.HistoryManager.currentStatus().url.split('/'));
// 		var newContainerFrom = {
// 			visibility: 'visible',
// 			position  : 'fixed',
// 			left      : 0,
// 			top       : 0,
// 			right     : 0,
// 			height    :'100%',
// 			transform:'scale(1)',
// 		};
// 		var oldContainerTo = {
// 			top :0,
// 			left:0,
// 			opacity:1
// 		}
// 		var newContainerTo = {
// 			top:0,

// 			onComplete: function() {
// 				TweenLite.set(_this.newContainer, { clearProps: 'all' });
// 				onLoad();
// 				_this.done();
// 			}
// 		};

// 		if(currentLink == 'group') {
// 			oldContainerTo.top   = '100%';
// 			newContainerFrom.top = '-100%';
// 		} else if(currentLink == 'play') {
// 			if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
// 				oldContainerTo.top   = '100%';
// 				newContainerFrom.top = '-100%';
// 				newContainerTo.top   = 0;
// 			} else {
// 				oldContainerTo.left   = '-100%';
// 				newContainerFrom.left = '100%';
// 				newContainerTo.left   = 0;
// 			}
// 		} else if (currentLink == 'add') {
// 			oldContainerTo.left   = '100%';
// 			newContainerFrom.left = '-100%';
// 			newContainerTo.left   = 0;
// 		} else if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
// 			oldContainerTo.top   = '-100%';
// 			newContainerFrom.top = '100%';
// 			newContainerTo.top   = 0;
// 		}

// 			TweenLite.set(this.newContainer,newContainerFrom);
// 			TweenLite.to(this.oldContainer, animationTime, oldContainerTo);
// 			TweenLite.to(this.newContainer, animationTime, newContainerTo);
// 		},

	
// 	  finish: function () {
// 	  	onLoad();
// 	  	console.log('finish!');
// 		this.done();
		
// 	  }
	 
// 	});
	
// 	Barba.Pjax.getTransition = function() {
// 	  return HideShowTransition;
// 	};
	
// }


window.onload = function () {
	onLoad();

}

var socket = io();


socket.on('connect', function () {
	if(audioData) {
		console.log('going to join a room');

		socket.emit('joinRoom', audioData._id);
	
	}

	socket.on('testmessage', function (data) {
		console.log(data);
	})

})


// var socketFunc = {
// 	joinRoom: function () {
// 		console.log('trying to join room: ', audioData._id);
		

// 	}
// }
// var first = true;
// socket.on('connect', function () {
// 	setLive.infiniteSequencer();
// })
var body = document.querySelector('body');

var animate = {
	restartAnimations: function () {
		var animations = document.querySelectorAll('.fn-start-animation');
		
		for(var i = 0; i < animations.length;i++) {
				animations[i].classList.remove('animate-stagger');
				animations[i].style.opacity=0;
				window.setTimeout(function (item) {
					item.classList.add('animate-stagger');
					item.style.opacity=1;

				},5, animations[i])
		}

	},
	loginBackground: function() {
		console.log('login');
		
		var confettiWrapper = document.querySelector('.fn-confetti');
		var colors = ["#56009C", "#DF1977", "#3038F2","#FFFF00", "#FF5500"];
		var amount = Math.floor(Math.random() * 12) + 8;  
		console.log(amount);
		var randomLocation = function (item) {
			item.style.left            = Math.floor(Math.random() * 90) + 0 + 'vw';
			item.style.top             = Math.floor(Math.random() * 100) + 0 + '%';
		}
		var createShape = function () {
			var color        = colors[Math.floor(Math.random()*colors.length)];
			var shapes       = ['<svg width="34px" height="31px" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->    <desc>Created with Sketch.</desc>    <defs></defs>    <g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g id="iPhone-7-Copy-68" transform="translate(-172.000000, -33.000000)" class="place-color">            <g id="bg">                <g id="animated" transform="translate(10.000000, 33.000000)">                    <polygon id="Polygon" points="179 0 195.167961 11.7467111 188.992349 30.7532889 169.007651 30.7532889 162.832039 11.7467111"></polygon>                </g></g></g></g></svg>', '<svg width="62px" height="64px" viewBox="0 0 62 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-34.000000, -162.000000)" stroke-width="8" class="place-stroke"><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><path d="M43,134.408029 L69.6816418,176 L16.3183582,176 L43,134.408029 Z" id="Triangle-2" transform="translate(43.000000, 153.500000) rotate(-27.000000) translate(-43.000000, -153.500000) "></path></g></g></g></g></svg>', '<svg width="66px" height="66px" viewBox="0 0 66 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-45.000000, -45.000000)" stroke-width="14" class="place-stroke" ><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><circle id="Oval-22" cx="68" cy="45" r="26"></circle></g></g></g></g></svg>']
			var item         = document.createElement('div');

			item.innerHTML   = shapes[Math.floor(Math.random()*shapes.length)];;

			var svg          = item.querySelector('svg');
			var size         = Math.floor(Math.random() * 50) + 25;

			item.className   += "animate-shape animate-shape-in ";
			svg.style.width  = size + 'px';
			svg.style.height = size + 'px';
			var fill = svg.querySelector('.place-color');
			var stroke = svg.querySelector('.place-stroke');
			if(fill) {
				fill.style.fill = color;
			} else {
				stroke.style.fill = color;
			}
		
			// svg.setAttribute('transform', 'rotate('+Math.floor(Math.random() * 180) + 5 +')');

			randomLocation(item);


			confettiWrapper.appendChild(item);
			window.setTimeout(function () {
				randomLocation(item);
			},200)
			window.setInterval(function () {
				randomLocation(item)
			}, 20000)
		}


		var index = 0;
		var loop = function () {
			window.setTimeout(function () {
				createShape();
				index++;

				if(index < amount) {
					loop();
				}
			}, 500)
		}
		loop();

	},
	loginTransition: function () {

		window.setTimeout(function () {
			body.setAttribute('splash', 'finished');
		}, 200);


	},
}

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var tuna         = new Tuna(audioContext);	
var sched        = new WebAudioScheduler({ context: audioContext });
var holdTone = false;
var setOsc = {
	frequency: 220,
	type:'SINE',
	create:function (options) {
		var _oscillator = audioContext.createOscillator();
		return _oscillator;
	},
	setWavetype(osc, type) {
		osc.type = type
	},
	setFrequency(osc, freq) {
		osc.frequency.setValueAtTime(freq, 0);
	},
	setAllFrequency(arr, freq) {
		for(var i in arr) {
			arr[i].audio.frequency.setValueAtTime(freq, 0);
		}
	},
	connect:function(osc, dest) {
		osc.connect(dest);
	},
	start:function (osc) {
		osc.start(audioContext.currentTime + 2);
	}

}

var setVca = {
	create: function (value, index) {
		var _vca = audioContext.createGain();
		setVca.setValue(_vca, 0)
		return _vca;
	},
	connect: function (vca, dest) {
		vca.connect(dest)
	},
	setValue: function (vca, value) {
		vca.gain.linearRampToValueAtTime(value, audioContext.currentTime + 0.01);
	},
	holdAndSetValue: function (vca, value, holdTime) {
		window.setTimeout(function () {
			vca.gain.linearRampToValueAtTime(value, audioContext.currentTime + 0.01);
		}, holdTime );
	},
	setValueAtTime: function (vca, value, time) {
		// time =time / 1000;
		vca.gain.setTargetAtTime(value, time, 0.005);
		
	},
};

var activeSound = {
	running: false,
	currentStepIndex:0,
	createOscillator: function () {
		return oscillator;
	},
	setup: function () {
		
		// audioData.vca = setVca.create()

		// audioData.sources.forEach(function(source) {
		// 	source.audio = setOsc.create();
		// 	setOsc.setWavetype(source.audio, source.type);
		// 	setOsc.connect(source.audio, audioData.vca);
		// });
		// audioData.effects = {
		// 	chorus  : false,
		// 	pingpong: false,
		// 	tremelo : false,
		// 	wahwah  : false,
		// };
		// audioData.modulate.forEach(function(module) {
		// 	// dit kan korter door de filter meer globaal te bouwen. COnnect is overal het zelfde nl.
		// 	if(module.type == 'pingpong') {
		// 		var filter = new tuna.PingPongDelay(module.values);
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);
		// 		audioData.effects.pingpong = filter;

		// 	} else if (module.type == 'chorus') {
		// 		var filter = new tuna.Chorus(module.values);
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);
		// 		audioData.effects.chorus = filter;

		// 	} else if  (module.type == 'tremelo') {
		// 		var filter = new tuna.Tremolo(module.values);
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);
		// 		audioData.effects.tremelo = filter;

		// 	} else if (module.type == 'wahwah') {
		// 		var filter = new tuna.WahWah();
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);

		// 		audioData.effects.wahwah = filter;
		// 	}
			
		// });
		// activeSound.beforeUnload();

		// socket.on('startSequence', function (fulldelay) {
		// 	activeSound.startNormalSequence(fulldelay);
		// })
	},
	holdTone: function(start, freq) {
		var t0       = audioContext.currentTime;
		if(start) {
			holdTone = true;
			
			freq ? freq : audioData.steps[activeSound.currentStepIndex].frequency
			setOsc.setFrequency(audioData.sources[0].audio ,freq);
			setVca.setValueAtTime(audioData.vca, .5, t0)
		} else {
			holdTone = false;
			// setOsc.setFrequency(audioData.sources[0].audio ,880);
			// setVca.setValueAtTime(audioData.vca, 0, t0)
		}

	},
	startNormalSequence(fulldelay) {
		var steps       = audioData.steps.length;
		var maxDelay    = fulldelay;
		var perStep     = maxDelay / (steps+1);
		
		var loop = function () {
			
			if(!holdTone) {
				activeSound.currentStep(activeSound.currentStepIndex, perStep/1000);
			}

			setTimeout(function() {

				activeSound.currentStepIndex++;
				if(activeSound.currentStepIndex == steps) {
					console.log('restart', activeSound.currentStepIndex);
					activeSound.currentStepIndex = 0;
					console.log('restart', activeSound.currefmodulntStepIndex);
					
				} else {
					loop();
				}
			}, perStep)
		}
		loop();
	},
	currentStep: function (index, perStep, osc) {
		console.log(activeSound.currentStepIndex, index);
		setOsc.setFrequency(audioData.sources[0].audio ,audioData.steps[index].frequency);
		var t0       = audioContext.currentTime;
		var duration = (audioData.steps[index].duration * perStep)/100
		var t1       = t0 + duration;
		
		if(audioData.steps[index].duration > 90) {
			if(audioData.steps[index].active) {
				setVca.setValueAtTime(audioData.vca, .2, t0)
			} else {
				setVca.setValueAtTime(audioData.vca, 0, t0)
			}
		} else if(audioData.steps[index].active) {
			setVca.setValueAtTime(audioData.vca, .2, t0);
			setVca.setValueAtTime(audioData.vca, 0, t1)

		}

		

		activeSound.highlightStep(index);
	},
	pressStart: function () {
		body.setAttribute('press-play', 'open');
		var button = document.querySelector('.fn-press-play');

		button.addEventListener('click', function(e) {
			body.removeAttribute('press-play');
			
			audioData.sources.forEach(function(source) {
				setOsc.start(source.audio);
			});
		});
	},
	autoPress: function () {
		audioData.sources.forEach(function(source) {
			setOsc.start(source.audio);
		});
	},
	resetLoop () {
		activeSound.currentStep = 0;
		audioContext.close();
	},

	saveData: function () {
		$.ajax({
			type:'POST',
			data:JSON.stringify(audioData),
			contentType: 'application/json',
			url:'/role/data',
			succes: function (data) {
				console.log(JSON.stringify(data));
			}
		})
	},
	beforeUnload: function () {
		window.addEventListener('beforeunload', function(event) {
			activeSound.saveData();
		  //do something here
		}, false);
	},
	highlightStep: function (index) {
		var stepsItem   = document.querySelectorAll('.fn-sequencer-item');
		if(stepsItem.length) {
			stepsItem.forEach(function(step) {
				step.classList.remove('highlight');
			});
			stepsItem[index].classList.add('highlight')
		}
	},
	
	
}


var modulateRole = {
	init: function () {
		modulateRole.modulateEvents();
		activeSound.setup();
		// activeSound.pressStart();
		activeSound.autoPress();
		modulateRole.updateSteps();
	},
	updateSteps: function () {
		socket.on('updateSteps', function (newSteps) {
			audioData.steps = newSteps;
		})
		socket.on('holdStep', function (data) {
			console.log('received a holdstep', data);
			activeSound.holdTone(data.start, data.frequency)
		})
	},
	sliderStep: function () {
		var element    = document.querySelector('.slider-step-inner');
		var steps      = audioData.steps.length - 1;
		var percentage = (100 / steps) * activeSound.currentStep;
		percentage                       = 100 - percentage;
		element.style.width              = percentage + '%';
		element.style.transitionDuration = activeSound.delay/1000 + 's';
	},
	sliderPage: function () {
		var slider = document.querySelector('.fn-fullpage-slider');
		var slides = slider.querySelectorAll('.fn-fullpage-slide');

		var slideLeft  = slider.querySelector('[swipe-direction="left"]');
		var slideRight = slider.querySelector('[swipe-direction="right"]');
		var hammertime = new Hammer(slider, {			
		});
		hammertime.on('swipeleft', function(ev) {
			slideLeft.classList.add('slide-active');
			slideRight.classList.remove('slide-active');
		});
		hammertime.on('swiperight', function(ev) {
			slideLeft.classList.remove('slide-active');
			slideRight.classList.add('slide-active');
		});
	},
	modulateEvents: function () {
		var modulateButtons = document.querySelectorAll('.fn-modulate-btn');
		var modulateValue   = document.querySelector('.fn-modulate-value');
		var body            = document.querySelector('body');

		
		for(var i = 0; i < modulateButtons.length;i++) {
			
			modulateButtons[i].addEventListener('touchstart', function (e) {
				var type = e.currentTarget.getAttribute('data-type');
				e.currentTarget.classList.add('active');

				modulateValue.innerHTML = e.currentTarget.getAttribute('data-value') + '%';
			
				body.setAttribute('touch-active','modulate');
				body.setAttribute('current-touch', type);
				modulateRole.rotateEvent(e.currentTarget, modulateValue);
			})
		}
	},
	rotateEvent: function (item, modulateValue) {
		var phoneDirection = DeviceOrientationEvent.webkitCompassHeading;
		var page           = document.querySelector('.fn-overlay');	
		var type           = item.getAttribute('data-type');
		
		item.addEventListener('touchend', function (e) {
			e.target.classList.remove('active');
			
			body.removeAttribute('touch-active');
			body.removeAttribute('current-touch');

			window.removeEventListener('deviceorientation', rotateListener);
		})
	
		window.addEventListener('deviceorientation', rotateListener);

		function rotateListener(event) {

			page.style.webkitTransform = "rotate("+ event.webkitCompassHeading +"deg)";
			var compass    = event.webkitCompassHeading;
			var percentage = Math.floor((compass*100)/360);
			var value      = compass / 360;

			modulateValue.innerHTML = percentage + '%';
			var sendData = {
				type : type
			}
			for(var i = 0; i < audioData.modulate.length;i++) {
				if(audioData.modulate[i].type.toUpperCase() == type.toUpperCase()) {

					if(audioData.modulate[i].type == 'pingpong') {
						sendData.delayTimeLeft = audioData.effects.pingpong.delayTimeLeft = compass;
					} else if(audioData.modulate[i].type == 'chorus') {
						sendData.rate     = audioData.effects.chorus.rate = audioData.modulate[i].value = audioData.modulate[i].rate = percentage/10;
						sendData.feedback = audioData.modulate[i].feedback = audioData.effects.chorus.feedback = percentage/100;
					} else if(audioData.modulate[i].type == 'tremelo') {
						var value = percentage / 10;
						console.log(audioData.effects);
						sendData.intensity = sendData.rate = audioData.effects.tremelo.rate = audioData.effects.tremelo.intensity = value;
					} else if(audioData.modulate[i].type == 'wahwah') {
						var value = percentage / 100;
						console.log(audioData.effects);
						sendData.baseFrequency = audioData.effects.wahwah.baseFrequency = value;
					}
				} 
			}
			socket.emit('updateSound', {
				room: audioData._id,
				effect: sendData
			});

		}
	}
}
// this might be removed?

var body        = document.querySelector('body');


var sequencerRole = {
	init: function () {
		
		sequencerRole.clickActive();
		activeSound.setup();
		// activeSound.pressStart();
		activeSound.autoPress();
		sequencerRole.updateSound();
		sequencerRole.shEvent();
		sequencerRole.ppEvent();
	},
	updateSound: function () {
		socket.on('updateSound', function (newData) {
			
			console.log(newData);
			if(newData.effect.type == 'chorus') {
				audioData.effects.chorus.rate = newData.effect.rate;
				audioData.effects.chorus.feedback = newData.effect.feedback;
			} else if (newData.effect.type == 'pingpong') {
				audioData.effects.pingpong.delayTimeLeft = newData.effect.delayTimeLeft
			} else if (newData.effect.type == 'tremelo') {
				console.log(newData.effect, audioData.effects.tremelo);
				audioData.effects.tremelo.rate = newData.effect.intensity;
				audioData.effects.tremelo.intensity = newData.effect.intensity;
			} else if (newData.effect.type == 'wahwah') {
				console.log(newData.effect, audioData.effects.wahwah);
				audioData.effects.wahwah.baseFrequency = newData.effect.baseFrequency;
			} else {
				console.log('not created yet');
			}
		})
	},
	ppEvent:function () {
		var buttons = document.querySelectorAll('.fn-pp-button');
		buttons.forEach(function(button) {
			button.addEventListener('touchstart', function (e) {
				console.log('touchstart');
				activeSound.holdTone(true, e.currentTarget.getAttribute('pp-value'));
				button.classList.add('active');
				socket.emit('holdStep', {
					room: audioData._id,
					frequency: e.currentTarget.getAttribute('pp-value'),
					start:true
				});
			})
			button.addEventListener('touchend', function (e) {
				console.log('touchend');
				button.classList.remove('active');
				activeSound.holdTone(false);
				socket.emit('holdStep', {
					room: audioData._id,
					frequency: e.currentTarget.getAttribute('pp-value'),
					start:false
				});
			})
			button.addEventListener('touchcancel', function (e) {
				console.log('touchend');
				button.classList.remove('active');
				activeSound.holdTone(false);
				socket.emit('holdStep', {
					room: audioData._id,
					frequency: e.currentTarget.getAttribute('pp-value'),
					start:false
				});
			})
		});
	},
	shEvent: function () {
		var button = document.querySelector('.fn-seq-sh');
		button.addEventListener('touchstart', function (e) {
			console.log('touchstart');
			activeSound.holdTone(true);
			button.classList.add('active');
		})
		button.addEventListener('touchend', function (e) {
			console.log('touchend');
			button.classList.remove('active');
			activeSound.holdTone(false);
		})
		button.addEventListener('touchcancel', function (e) {
			console.log('touchend');
			button.classList.remove('active');
			activeSound.holdTone(false);
		})
	},
	isTouching: function (arr, val) {
		if(arr.indexOf(val) !== -1) {
			return true; 
		} else {
			return false;
		}
	},
	clickActive: function () {
		var stepsItem   = document.querySelectorAll('.fn-sequencer-item');

		for(var i = 0; i < stepsItem.length; i++) {
			$(stepsItem[i]).on('click', function (e) {

				var index = e.target.getAttribute('sequence-index');
				
				if(!e.target.classList.contains('fn-sequencer-item')) {
					index = e.target.parentNode.getAttribute('sequence-index')
				}
				audioData.steps[index].active = !audioData.steps[index].active;
				e.target.classList.toggle('active');
				
				socket.emit('updateSteps', {
					room: audioData._id,
					steps: audioData.steps
				});
			})
		}
		

	},
	events: function () {
		var stepsItem   = document.querySelectorAll('.fn-sequencer-item');
		var inputSlider = document.querySelector('.fn-frequency-input');

		for(var i = 0; i < stepsItem.length; i++ ) {
			stepsItem[i].addEventListener('touchstart', function (e) {
				var index = e.target.getAttribute('sequence-index');
				touches.push(e.target);

				window.setTimeout(function () {
					if(sequencerRole.isTouching(touches, e.target)) {
						body.setAttribute('touch-active', 'sequence');
						tooltip.getHelper('sawlight');
						e.target.classList.add('touching');
					} else {
						audioData.steps[index].active = !audioData.steps[index].active;
						e.target.classList.toggle('inactive');
					}
				}, 100)
			})
			var removeTouch = function (e) {
				body.setAttribute('touch-active', false);
				tooltip.removeHelper('sawlight');

				touches.splice( touches.indexOf(e.target), 1 );
				e.target.classList.remove('touching');
			}
			stepsItem[i].addEventListener('touchend', function (e) {
				removeTouch(e);
			})
			stepsItem[i].addEventListener('touchcancel', function (e) {
				removeTouch(e);
			})

		}
		
	},
	setFrequencyInputSlider: function (input) {
		var circle = document.querySelectorAll('.fn-inner-circle')[3];

		input.disabled = false;
		input.value = audioData.steps[3].frequency;

		input.addEventListener('input', function (e) {
			audioData.steps[3].frequency = e.target.value;
			var scale = (5*e.target.value)/audioData.steps[3].max;
			circle.style.transform = 'scale('+scale+')';


		})
	}	
}


var changePage = {
	showPage: function (page)  {
		var allPages = document.querySelectorAll('.fn-animate-page');
		
		for(var i = 0; i < allPages.length ; i++) {
			console.log(allPages[i]);
			// allPages[i].setAttribute('active', '')
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
			} else {
				allPages[i].setAttribute('active', false);
			}
		}
	},
	sequencerNavigation: function () {
		// also use hammertime for this?
		var buttons = document.querySelectorAll('.fn-nav-buttons');
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function (e) {
				console.log('going to: ', e.currentTarget, e.currentTarget.getAttribute('target-page'));
				changePage.showPage(e.currentTarget.getAttribute('target-page'));
				animate.restartAnimations();
			})
		};
	}
}
// var motion = {
// 	first:true,
// 	minDiff: 30,
// 	base:0,
// 	init: function () {
// 		motion.right();
// 		// motion.left();
// 		console.log('motion.init');
// 	},
// 	right: function () {
// 		window.addEventListener('deviceorientation', motion.motionEvent);
// 	},
// 	motionEvent: function (event, re) {
// 		if(motion.first) {
// 			motion.base  = event.alpha;        
// 			motion.first = false;              
// 		}
// 		var change = event.alpha - motion.base;

// 		if(change *-1 > motion.minDiff) {
// 			console.log('got it!');
// 			motion.changeLive();
// 			window.removeEventListener('deviceorientation', motion.motionEvent);
			
			

// 		}
// 	},
// 	changeLive: function () {
// 		$.post({
// 		 url: '/play/live',
// 		 data: {
// 		 	isLive: true
// 		 },
// 		 success: function(res){
// 		 	console.log('success', res);
// 		 	window.reload();
// 		  // window.location = res.redirectTo;
// 		 },
// 		 error: function (res) {
// 		 	console.log('error', res);
// 		 	// alert('too much')
// 		 	// window.location = res.redirectTo;
// 		 }
// 		});
// 	}
// }
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
		postData.request('/createGroup', 'POST', JSON.stringify(data), function (response) {
			window.location = '/role/' + response.role + '/' + response.userId + '/' + response.groupId;
		});
	},
	username: function () {
		console.log('username');
		var form  = document.querySelector('form');
		var input = form.querySelector('input[type="text"]');
		console.log(form);
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
	request: function (url, type, data, cb) {
		$.ajax({
			type:type,
			data: data,
			contentType: 'application/json',
			url:url,
			success: function (response) {
				cb(response)
				
			}
		})
	}
}
var tone = {
	init:function () {
		var distortion = new Tone.Distortion(1)


		var synth = new Tone.Synth({
	oscillator : {
  	type : 'sine',
    modulationType : 'sawtooth',
    modulationIndex : 3,
    harmonicity: 3.4
  },
  envelope : {
  	attack : 0.001,
    decay : 0.1,
    sustain: 1,
    release: 0.1
  }
}).chain(distortion, Tone.Master)

		var tones = [220,'B1','D1','E1','C2','B4','D2','E3']
var event = [
	{ time: 0, note : 220, dur : '4n'},
	{ time: '4n + 8n', note : 440, dur : '8n'},
	{ time: '2n', note : 550, dur : '16n'},
	{ time: '2n + 8t', note : 880, dur : '4n'}
]
var part = new Tone.Part(function(time, event){
	console.log('here');
	//the events will be given to the callback with the time they occur

	synth.triggerAttackRelease(event.note, event.dur, time)
}, event)

//start the part at the beginning of the Transport's timeline
part.start(0)

//loop the part 3 times
part.loop = 3
part.loopEnd = '1m'

		var playing = false;
		document.querySelector('.fn-seq-sh').addEventListener('click', function(e){
			console.log(playing);
			if (!playing){
				Tone.Transport.start('+0.1');
				playing=true;
			} else {
				Tone.Transport.stop()
				playing=false;
			}
		})
		document.querySelector('.fn-demo').addEventListener('click', function (e) {
			// console.log(synth.);
			synth.envelope.sustain = 0.001;
			
		})

	}
}

tone.init();
var tools = {
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
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

var tooltip = {
	getHelper: function (name) {
		var sawcookie = this.getCookie(name);
		if(sawcookie) {
			console.log('ive already seen this tooltip');
		} else {
			var item = document.querySelector('.fn-' + name);
			item.classList.remove('closed');

		}
	},
	removeHelper: function (name) {
		var text = document.querySelector('.fn-' + name);
		text.classList.add('closed');
		document.cookie = name + '=true';
	},
	getCookie : function (name) {
		name = name + '=';
		var decodedCookie = decodeURIComponent(document.cookie);

		var ca = decodedCookie.split(';');
		var result = '';
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            result =  c.substring(name.length, c.length);
	        }
	    }
	    return result;
	},
	createCookie: function (name, value) {
		document.cookie = name + '=' + value;
	}
};

var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  init: function () {
    console.log('tracker init');
    cameraTracker.camera();
  },
  camera: function () {
    var arr = [];
    var info  = document.querySelector('.fn-info');
    var video = document.querySelector('video');
    var meter = document.querySelector('.fn-tracking-meter');

    
    var tracker = new tracking.ColorTracker(['yellow']);

    tracking.track(video, tracker, { camera: true });

    tracker.on('track', function(event) {

      if(event.data[0]) {
        var biggest = 0;
        for(var i in event.data) {

          if(event.data[i].width > biggest) {
            biggest = event.data[i].width;
          }
          arr.push(biggest)
        }
      }
    });

    window.setInterval(function () {
      if(arr.length) {
        cameraTracker.audioInterval(arr, meter);
        arr = [];
      }
    },200)

  },

  audioInterval: function (arr, meter) {
    var avg = cameraTracker.calculateAverage(arr);

    var info  = document.querySelector('.fn-info');

    if(cameraTracker.first) {
      console.log('first');
      cameraTracker.first = false;
      cameraTracker.baseNum = avg;
      console.log(cameraTracker.first, cameraTracker.baseNum);
    }
    if(avg) {
        var a       = avg * cameraTracker.base;
        var newFreq = a / cameraTracker.baseNum;
        
        info.textContent = newFreq;

        if(newFreq > cameraTracker.maxValue) {
          newFreq = cameraTracker.maxValue;
        } else if( newFreq < 200) {
          newFreq = 220;
        }
        
        var b = 100 * newFreq;
        var percentage = b / cameraTracker.maxValue;
        
      

        cameraTracker.updateMeter(meter, percentage);
        
      } else {
        console.log('no colors detected');
      }
  },
  calculateAverage: function (arr) {
    var sum = 0;
    for(var i = 0; i < arr.length;i++) {
      sum += arr[i];
    }
    if(arr.length) {
      return sum / arr.length
    } else {
      return false;
    }
  },
  updateMeter: function (meter, value) {
    value = value - 50;
    value = value * 2;

    console.log('updateMeter');
    meter.style.width = value + '%';
    meter.style.height = value + '%';

  }

}
var user = {
	username: null
}