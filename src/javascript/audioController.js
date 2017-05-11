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

