

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

var socket = io();

var room = 'room1'
console.log('eyo');

socket.on('connect', function () {
	console.log('connect');
	socket.emit('message', {
		message: 'Init message',
		room: false
	})
	socket.emit('joinRoom', {
		room: room
	})
	socket.emit('update', {
		message: 'joining a room '
	})
	
	// if(roomNumber) {
	// 	var data = {
	// 		room: 'room' + roomNumber
	// 	}
	// 	socket.emit('join', data)
	// }
})





// var list = document.querySelector('.fn-list-demo');

// // window.setInterval(function () {
// // 	createItem();
// // },1000);
// var createItem = function () {
// 	console.log('startSequence');
// 	var listItem = document.createElement('li');
// 	var data = new Date().getTime();
// 	var text = document.createTextNode('start sequence!   ' + data);
// 	listItem.append(text);
// 	list.appendChild(listItem);
// }
// socket.on('startSequence', function (data) {
// 	createItem();
// })
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var tuna         = new Tuna(audioContext);	
var sched        = new WebAudioScheduler({ context: audioContext });


var tunaFilter = new tuna.PingPongDelay({
    wetLevel: 1, //0 to 1
    feedback: 0.3, //0 to 1
    delayTimeLeft: 0, //1 to 10000 (milliseconds)
    delayTimeRight: 0 //1 to 10000 (milliseconds)
});
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
	setInput: function (vca) {
		
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
var isplaying = false;

var activeSound = {
	running: false,
	create: function () {
		
		
	},
	createOscillator: function () {
		return oscillator;
	},
	setup: function () {
		
		if(audioData.vca === false) {
			audioData.vca = setVca.create()
			setVca.connect(audioData.vca, tunaFilter);
			tunaFilter.connect(audioContext.destination);
			
		}

		audioData.sources.forEach(function(source) {
			if(source.newObj) {
				!source.newObj;

				source.audio = setOsc.create();
				setOsc.setWavetype(source.audio, source.type);
				setOsc.connect(source.audio, audioData.vca);
				
				
			}
		});
		// audioData.connect()
	

		socket.on('startSequence', function (fulldelay) {
			if(!isplaying) {
				isplaying = true;
				activeSound.startNormalSequence();
			}
			// if(window.location.pathname.indexOf('sequencer') !== -1) {
			// 	activeSound.startSequence();
			// }
		})

		
	},
	startNormalSequence() {
		console.log('do start startNormalSequence');
		var steps    = audioData.steps.length;
		var maxDelay = 4000/1000;
		var perStep  = maxDelay / steps;
		var currentStep = 0;
		
		var loop = function () {
			console.log('calling currentstep', currentStep);
			activeSound.currentStep(currentStep, perStep);
			socket.emit('sequenceStepMod', {currentStep:currentStep, perStep:perStep});

			setTimeout(function() {

				currentStep++;
				if(currentStep == steps-1) {
					currentStep == 0;
					isplaying=false;
				} else {
					loop();
				}
			}, perStep * 1000)
		}
		loop();
	},
	currentStep: function (index, perStep) {
		console.log('currentStep');
		setOsc.setFrequency(audioData.sources[0].audio ,audioData.steps[index].frequency);
		var t0 = audioContext.currentTime;
		var t1 = t0 + (perStep /2);
		
		if(audioData.steps[index].active) {
			setVca.setValueAtTime(audioData.vca, 1, t0)
			setVca.setValueAtTime(audioData.vca, 0, t1)
		}

		activeSound.highlightStep(index);
	},
	pressStart: function () {
		activeSound.setup();
		body.setAttribute('press-play', 'open');
		var button = document.querySelector('.fn-press-play');
		button.addEventListener('click', function(e) {
			body.removeAttribute('press-play');
			
			audioData.sources.forEach(function(source) {
				setOsc.start(source.audio);
			});

		});
	
	},
	resetLoop () {
		activeSound.currentStep = 0;
		audioContext.close();
	},
	schedule: function (e) {
		// var steps    = audioData.steps.length;
		// var maxDelay = 4000/1000;
		// var perStep  = maxDelay / steps;
		// var t0       = e.playbackTime;
		
		// for(var i in audioData.steps) {
		// 	var delay = perStep * i;
		// 	var duration = perStep/2;
		// 	var freq = audioData.steps[i].frequency;
		// 	if(window.location.pathname.indexOf('sequencer') !== -1) {
		// 		freq = freq/2;

		// 	}

		// 	sched.insert(t0 + delay, activeSound.singleStep, {frequency:freq, duration: duration, currentStep: i} );	
		
			
		// }
	},
	startSequence() {
		// sched.start(activeSound.schedule);
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
	singleStep: function (e) {
		// var t0 = e.playbackTime;

		// var t1 = t0 + e.args.duration; 
		   
		// setOsc.setFrequency(audioData.sources[0].audio ,e.args.frequency);
		// if(audioData.steps[e.args.currentStep].active) {
		// 	setVca.setValueAtTime(audioData.vca, 1, t0)
		// 	setVca.setValueAtTime(audioData.vca, 0, t1)
		// }

		// activeSound.highlightStep(e.args.currentStep);

		// socket.emit('sequenceStepMod', {
		// 	step: audioData.steps[e.args.currentStep],
		// 	duration:e.args.duration,

		// })
		
		// if(parseInt(e.args.currentStep) ===  audioData.steps.length -1 && activeSound.updatedData) {
		// 	activeSound.updatedData = false;
		// 	
		// }

	},
	singleStepSocket: function () {
		socket.on('sequenceStepMod', function (data) {
			console.log('got something!');
			activeSound.currentStep(data.currentStep, data.perStep)
			// var t0 = audioContext.currentTime;
			// var t1 = t0 + data.duration; 
			   
			// setOsc.setFrequency(audioData.sources[0].audio ,data.step.frequency);
			
			// if(data.step.active) {
			// 	setVca.setValueAtTime(audioData.vca, 1, t0)
			// 	setVca.setValueAtTime(audioData.vca, 0, t1)
			// }

			// activeSound.highlightStep(e.args.currentStep);
		})	
	}
	
}


var modulateRole = {
	init: function () {
		// modulateRole.sliderStep();
		// modulateRole.sliderPage();
		// modulateRole.modulateEvents();
		activeSound.singleStepSocket();
		activeSound.pressStart();
		modulateRole.socketSequence();
		modulateRole.modulateEvents();
	},
	socketSequence: function () {
		activeSound.setup();
		socket.on('updateSteps', function (newSteps) {
			audioData.steps = newSteps;
		})
		// socket.on('sequenceStep', function (freq) {
		// 	setOsc.setFrequency(audioData.sources[0].audio ,freq);
		// })
		
	},
	events: function () {

	},
	sliderStep: function () {
		var element = document.querySelector('.slider-step-inner');
		var steps = audioData.steps.length - 1;
		var percentage = (100 / steps) * activeSound.currentStep;
		percentage = 100 - percentage;
		element.style.width = percentage + '%';
		element.style.transitionDuration = activeSound.delay/1000 + 's';
	},
	sliderPage: function () {
		var slider = document.querySelector('.fn-fullpage-slider');
		var slides = slider.querySelectorAll('.fn-fullpage-slide');

		var slideLeft = slider.querySelector('[swipe-direction="left"]');
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
				e.target.classList.add('active');
				modulateValue.innerHTML = e.target.getAttribute('data-value') + '%';
				
				
				body.setAttribute('touch-active','modulate');
				body.setAttribute('current-touch', type);
				modulateRole.rotateEvent(false);

			})
			modulateButtons[i].addEventListener('touchend', function (e) {
				var type = e.currentTarget.getAttribute('data-type');
				e.target.classList.remove('active');
				modulateValue.innerHTML = e.target.getAttribute('data-value') + '%';
				
				
				body.removeAttribute('touch-active');
				body.removeAttribute('current-touch');
				modulateRole.rotateEvent(true);

			})
		}
	},
	rotateEvent: function (stop) {
		
		var phoneDirection = DeviceOrientationEvent.webkitCompassHeading;

		var page = document.querySelector('.fn-overlay');
		window.addEventListener('deviceorientation', function (e) {
			

			page.style.webkitTransform = "rotate("+ e.webkitCompassHeading +"deg)";
			var compass = e.webkitCompassHeading;
			var value = compass / 360;
			console.log(compass);
			tunaFilter.delayTimeLeft = compass;
			// value = value * 5;
			

			// setVca.setValue(audioData.vca, value);
			// audioData.filter.delay = value;

			// var phoneDirection = DeviceOrientationEvent.alpha
			// als de phone direction 30 + of 30- gaat, weet je de richting + de hoeveelheid
			// maar opletten als de dinges meer dan 360 wordt


			// nulpunt: 350 - 10;
			// dieptepunt = 170 - 190
			// tussen 0 en 170 : naar rechts,
			// tussen 190 en 360 is naar links

			// overdrive is schudden!

		})
	}
}
var body        = document.querySelector('body');


var sequencerRole = {
	init: function () {
		sequencerRole.clickActive();
		activeSound.pressStart();
		// sequencerRole.testEvent();
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

				// activeSound.updatedData = true;

				var index = e.target.getAttribute('sequence-index');
				
				if(!e.target.classList.contains('fn-sequencer-item')) {
					index = e.target.parentNode.getAttribute('sequence-index')
				}


				audioData.steps[index].active = !audioData.steps[index].active;
				e.target.classList.toggle('inactive');

				socket.emit('updateSteps', audioData.steps);
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
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
		}

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