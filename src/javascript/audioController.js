var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var tuna         = new Tuna(audioContext);	
var sched        = new WebAudioScheduler({ context: audioContext });




var setLive = {
	infiniteSequencer: function () {
		// console.log('infiniteSequencer!');
		// var fulldelay = 4000;

		// window.setInterval(function () {
		// 	console.log('send a startSequence');
		// 	socket.emit('startSequence', fulldelay);
		// }, fulldelay)
	}
}
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
	allClientSequence:function () {
		// var fulldelay = 4000;

		// window.setInterval(function () {
		// 	console.log('send a startSequence');
		// 	socket.emit('startSequence', fulldelay);
		// }, fulldelay)
	},
	createOscillator: function () {
		return oscillator;
	},
	setup: function () {
		
		audioData.vca = setVca.create()

		audioData.sources.forEach(function(source) {
			source.audio = setOsc.create();
			setOsc.setWavetype(source.audio, source.type);
			setOsc.connect(source.audio, audioData.vca);
		});
		audioData.effects = {
			chorus: false,
			pingpong: false,
			tremelo : false,
			wahwah : false,
		};
		audioData.modulate.forEach(function(module) {
			if(module.type == 'pingpong') {
				
				var filter = new tuna.PingPongDelay(module.values);
				setVca.connect(audioData.vca, filter);
				filter.connect(audioContext.destination);

				audioData.effects.pingpong = filter;
			} else if (module.type == 'chorus') {

				console.log('happend');
				var filter = new tuna.Chorus(module.values);
				setVca.connect(audioData.vca, filter);
				filter.connect(audioContext.destination);

				audioData.effects.chorus = filter;
			} else if  (module.type == 'tremelo') {
				console.log(module.values);
				var filter = new tuna.Tremolo(module.values);
				
				setVca.connect(audioData.vca, filter);
				filter.connect(audioContext.destination);

				audioData.effects.tremelo = filter;
			} else if (module.type == 'wahwah') {
				console.log(module.values);
				// var f = new tuna.Tremolo(module.values);
				var filter = new tuna.WahWah();
				setVca.connect(audioData.vca, filter);
				filter.connect(audioContext.destination);

				audioData.effects.wahwah = filter;
			}
			
		});
		activeSound.beforeUnload();
		// audioData.connect()
	

		socket.on('startSequence', function (fulldelay) {
			activeSound.startNormalSequence(fulldelay);
			// console.log('got a startSequence', fulldelay);
			// if(!isplaying) {
			// 	isplaying = true;
			// 	if(window.location.pathname.indexOf('sequencer') !== -1) {
			// 		activeSound.startNormalSequence(fulldelay);
			// 	}
			// }
			// if(window.location.pathname.indexOf('sequencer') !== -1) {
			// 	activeSound.startSequence();
			// }
		})

		
	},
	startNormalSequence(fulldelay) {
		
		var steps    = audioData.steps.length;
		var maxDelay = fulldelay;
		var perStep  = maxDelay / (steps+1);

		var currentStep = 0;
		
		var loop = function () {
			
			activeSound.currentStep(currentStep, perStep/1000);
			// socket.emit('sequenceStepMod', {currentStep:currentStep, perStep:perStep/1000});

			setTimeout(function() {

				currentStep++;
				if(currentStep == steps) {
					currentStep == 0;
					
				} else {
					loop();
				}
			}, perStep)
		}
		loop();
	},
	currentStep: function (index, perStep) {
		
		setOsc.setFrequency(audioData.sources[0].audio ,audioData.steps[index].frequency);
		var t0 = audioContext.currentTime;
		var duration = (audioData.steps[index].duration * perStep)/100
		var t1 = t0 + duration;
		
		if(audioData.steps[index].duration > 90) {
			if(audioData.steps[index].active) {
				setVca.setValueAtTime(audioData.vca, .5, t0)
			} else {
				setVca.setValueAtTime(audioData.vca, 0, t0)
			}
		} else if(audioData.steps[index].active) {
			setVca.setValueAtTime(audioData.vca, .5, t0);
			setVca.setValueAtTime(audioData.vca, 0, t1)

		}


		// if(audioData.steps[index].active) {
		// 	setVca.setValueAtTime(audioData.vca, .5, t0)
			
		// 	if(audioData.steps[index].duration  < 90) {
		// 		setVca.setValueAtTime(audioData.vca, 0, t1);
		// 	} else {

		// 	}
		// } else if(audioData.steps[index].duration > 90) {

		// }
		

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
	saveData: function () {
		$.ajax({
			type:'POST',
			data:JSON.stringify(audioData),
			contentType: 'application/json',
			url:'/role/data',
			succes: function (data) {
				console.log('sucecs!');
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
		// modulateRole.sliderStep();
		// modulateRole.sliderPage();
		// modulateRole.modulateEvents();
		// activeSound.singleStepSocket();
		
		
		
		modulateRole.modulateEvents();
		activeSound.setup();
		activeSound.allClientSequence();
		activeSound.pressStart();
		modulateRole.updateSteps();
	},
	updateSteps: function () {
		console.log('waiting for updateSteps');
		socket.on('updateSteps', function (newSteps) {
			console.log('received updatesetps!');
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
			var compass = event.webkitCompassHeading;
			var percentage = Math.floor((compass*100)/360);
			
			var value = compass / 360;

			modulateValue.innerHTML =percentage+ '%';
			var sendData = {
				type:type
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

		// 	if(type === 'pingpong') {
		// 		audioData.effects.pingpong.delayTimeLeft = compass;
		// 		audioData.modules

		// 	} else if (type === 'Chorus') {
		// 		console.log(audioData.effects.chorus);
		// 		audioData.effects.chorus.rate = percentage/10;
		// 		audioData.effects.chorus.feedback = percentage/100;
		// 	}


		// 	audioData.modulate.forEach(function(module) {
		// 	console.log(module);
		// 	if(module.type == 'pingpong') {
				
		// 		var filter = new tuna.PingPongDelay(module.values);
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);

		// 		audioData.effects.pingpong = filter;
		// 	} else if (module.type == 'Chorus') {

		// 		console.log('happend');
		// 		var filter = new tuna.Chorus(module.values);
		// 		setVca.connect(audioData.vca, filter);
		// 		filter.connect(audioContext.destination);

		// 		audioData.effects.chorus = filter;
		// 	}
			
		// });


			socket.emit('updateSound', {
				room: audioData._id,
				effect: sendData
			});

		}

		// setTimeout(function () {
		// 	window.removeEventListener('rotateListener', myListener);
		// }, 1000)


		// var page = document.querySelector('.fn-overlay');
		// window.addEventListener('deviceorientation', function (e) {
			

			
			
			// tunaFilter.delayTimeLeft = compass;
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

		// })
		// item.addEventListener('touchend', function (f) {

		// 		console.log('shoudl stop now');
		// 		window.removeEventListener('deviceorientation');
		// 	})
	}
}
var body        = document.querySelector('body');


var sequencerRole = {
	init: function () {
		console.log('OM');
		sequencerRole.clickActive();
		activeSound.setup();
		activeSound.allClientSequence();
		activeSound.pressStart();
		// activeSound.autoPress();
		sequencerRole.updateSound();
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
		
			
			// audioData.effects = data.effects;
			// console.log(audioData.effects);
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

				// activeSound.updatedData = true;

				var index = e.target.getAttribute('sequence-index');
				
				if(!e.target.classList.contains('fn-sequencer-item')) {
					index = e.target.parentNode.getAttribute('sequence-index')
				}


				audioData.steps[index].active = !audioData.steps[index].active;
				e.target.classList.toggle('inactive');
				console.log('about to send and updateSteps');
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

