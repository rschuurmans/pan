
var audioContext = Tone.context;
var tuna         = new Tuna(audioContext);	
var sched        = new WebAudioScheduler({ context: audioContext });
var holdTone = false;
var setOsc = {
	frequency: 220,
	type:'SINE',
	create:function (type) {
		// var _oscillator = audioContext.createOscillator();
		// var _oscillator = new Tone.Oscillator(frequency, type).toMaster().start();
		// var _oscillator = new Tone.Oscillator(frequency, type).toMaster();
		var _oscillator = new Tone.Synth({
	oscillator : {
  	type : type,
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
}).chain(Tone.Master)
			
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
	stopped: true,
	currentStepIndex:0,
	createOscillator: function () {
		return oscillator;
	},
	setup: function () {
		// tone.js supports multiple oscillators and shit. check this out.
		StartAudioContext(Tone.context, "#playButton").then(function (e) {
			console.log('click');
			audioData.sources.forEach(function(source) {
			source.audio = setOsc.create(source.type);
			
			// source.audio.triggerAttackRelease(440, '4n', 0)
		});
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

		socket.on('startSequence', function (fulldelay) {
			if(activeSound.stopped) {
				activeSound.startNormalSequence(fulldelay);
			}
		})
		});
		window.setTimeout(function () {
			$('#playButton').trigger('touchstart');
		$('#playButton').trigger('touchend');
	}, 2000)

	},
	holdTone: function(start, freq) {
		audioData.sources[0].audio.triggerAttack('c4');
		if(start) {
			holdTone = true;
			
			freq ? freq : audioData.steps[activeSound.currentStepIndex].frequency
			audioData.sources[0].audio.triggerAttack(freq);
		} else {
			holdTone = false;
			// setOsc.setFrequency(audioData.sources[0].audio ,880);
			// setVca.setValueAtTime(audioData.vca, 0, t0)
		}

	},
	calculateDelay(length) {
		switch(length) {
			case 8:
				return '4n';
				break;
			case 16:
				return '8n'	;
				break;
			case 32:
				return '16n';
				break;
		}

	},
	startNormalSequence(fulldelay) {
		
		activeSound.stopped = false;
		var delay = activeSound.calculateDelay(audioData.steps.length);

		var loop = new Tone.Loop(function(time){
			
			
			var step = audioData.steps[activeSound.currentStepIndex];
			if(step.active && !holdTone) {
				audioData.sources[0].audio.triggerAttackRelease(step.frequency, "8n", time)
			}
			activeSound.highlightStep(activeSound.currentStepIndex);
			activeSound.currentStepIndex++;
			if(activeSound.currentStepIndex == audioData.steps.length) {
				activeSound.currentStepIndex = 0;
			}
		}, delay)

		loop.start(0)
		Tone.Transport.start('+0.1');

	
	},
	currentStep: function (index, perStep, osc) {
		// can be removed because of the implementation of tone.js
		
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
		// activeSound.autoPress();
		modulateRole.updateSteps();
	},
	updateSteps: function () {
		socket.on('updateSteps', function (newSteps) {
			audioData.steps = newSteps;
		})
		socket.on('holdStep', function (data) {
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
						sendData.intensity = sendData.rate = audioData.effects.tremelo.rate = audioData.effects.tremelo.intensity = value;
					} else if(audioData.modulate[i].type == 'wahwah') {
						var value = percentage / 100;
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
		
		// sequencerRole.clickActive();
		// sequencerRole.seqEvents();
		
		activeSound.setup();
		// activeSound.pressStart();
		// activeSound.autoPress();
		sequencerRole.updateSound();
		sequencerRole.steps.setup();
		sequencerRole.shEvent();
		sequencerRole.pp.setup();
		deviceRotation.start();
	},
	steps : {
		setup:function () {
			console.log('steps init');
			tools.eachDomElement('.fn-sequencer-item', function (item) {
				var hammertime = new Hammer(item, {})
				sequencerRole.steps.changeFrequency(hammertime);
				sequencerRole.steps.toggleActive(hammertime)
			})





		},
		toggleActive: function (hammertime) {
			
			hammertime.on('tap', function (e) {
				var index = e.target.getAttribute('sequence-index');
				audioData.steps[index].active = !audioData.steps[index].active;
				
				e.target.classList.toggle('active');

				socket.emit('updateSteps', {
					room: audioData._id,
					steps: audioData.steps
				});
			});
		},
		updateFrequency: function(item, newfrequency) {
			

			var freq = parseInt(item.getAttribute('frequency')) + newfrequency;
			freq < 0 ? freq = 0 : false;
			item.setAttribute('frequency', freq)
			activeSound.holdTone(false);
			sequencerRole.steps.updateStepBorder(item);

		},
		changeFrequency: function (hammertime) {
			var item = null;
			var closeFreq = function () {
				deviceRotation.stopListen(function (value) {

					sequencerRole.steps.updateFrequency(item, value)
				});
				sequencerRole.steps.visual(false, item);
			}
			var openFreq = function (e) {
				e.preventDefault();
				item = e.target;
				// deviceRotation.start(e.target);
				deviceRotation.listen(item);
				sequencerRole.steps.visual(true, item);
				e.target.addEventListener('touchend', closeFreq)
				e.target.addEventListener('touchcancel', closeFreq)
			}
			hammertime.on('press', function (e) {
				openFreq(e);
			})
	

		},
		visualStep: function (item, value) {
			var number      = parseInt(item.getAttribute('frequency'))  +value;


			var percentage  = (tools.getPercentage(number, 1200) * 70) / 100;
			var circleSize  = percentage / 10;
			var extraCircle = deviceRotation.currentItem.querySelector('.rotate-extra-circle');
			 
			 extraCircle.style.transform='scale( '+ circleSize*2 +')';
			 extraCircle.style.borderWidth = percentage/2 + 'px';
		},
		updateStepBorder: function (item) {
			console.log(item);
			var percentage = 70 * parseInt(item.getAttribute('frequency'));
			percentage = percentage / parseInt(item.getAttribute('max'));
			
			item.style.background = "-moz-radial-gradient(rgba(0,0,0,5) "+percentage+"%, #3038F2 "+percentage+"%)";
			item.style.background = "-webkit-radial-gradient(rgba(0,0,0,5) "+percentage+"%, #3038F2 "+percentage+"%)";
		},
		visual: function (start, item) {
			var body = document.querySelector('body');
			activeSound.holdTone(true, parseInt(item.getAttribute('frequency')));
			if(start) {
				body.setAttribute('rotate-active', true);
				// document.querySelector('.grid-item:nth-of-type(' + item.getAttribute('sequence-index') + ')').classList.add('rotate-active');
				item.parentNode.classList.add('rotate-active');
				// deviceRotation.currentItem.classList.add('rotate-active');
				sequencerRole.steps.visualStep(item, 0)
				
			} else {
				body.removeAttribute('rotate-active');
				item.parentNode.classList.remove('rotate-active');
				item.querySelector('.rotate-extra-circle').style.borderWidth = item.querySelector('.rotate-extra-circle').style.transform = null;
				


			}
		},
		


	},
	pp: {
		setup: function () {
			tools.eachDomElement('.fn-pp-button', function (button) {
				button.addEventListener('touchstart',sequencerRole.pp.openGate)
				button.addEventListener('touchend',sequencerRole.pp.closeGate)
				button.addEventListener('touchcancel', sequencerRole.pp.closeGate)
			});
		},
		openGate: function (e) {
			var value = e.currentTarget.getAttribute('pp-value');
			activeSound.holdTone(true, value);
			e.currentTarget.classList.add('active');
			sequencerRole.pp.sendSocket(true);
		},
		closeGate: function(e) {
			var value = e.currentTarget.getAttribute('pp-value');
			e.currentTarget.classList.remove('active');
			activeSound.holdTone(false);
			sequencerRole.pp.sendSocket(false, value)
		},
		sendSocket: function (start, value) {
			socket.emit('holdStep', {
				room: audioData._id,
				frequency: value,
				start:start
			});
		}
	},
	
	updateSound: function () {
		socket.on('updateSound', function (newData) {
			
			if(newData.effect.type == 'chorus') {
				audioData.effects.chorus.rate = newData.effect.rate;
				audioData.effects.chorus.feedback = newData.effect.feedback;
			} else if (newData.effect.type == 'pingpong') {
				audioData.effects.pingpong.delayTimeLeft = newData.effect.delayTimeLeft
			} else if (newData.effect.type == 'tremelo') {
				
				audioData.effects.tremelo.rate = newData.effect.intensity;
				audioData.effects.tremelo.intensity = newData.effect.intensity;
			} else if (newData.effect.type == 'wahwah') {
				
				audioData.effects.wahwah.baseFrequency = newData.effect.baseFrequency;
			} else {
				console.log('not created yet');
			}
		})
	},
	ppEvent:function () {

	},
	shEvent: function () {
		var button = document.querySelector('.fn-seq-sh');
		var openGate = function () {
			
			activeSound.holdTone(true);
			button.classList.add('active');
		}
		var closeGate = function () {
			
			button.classList.remove('active');
			activeSound.holdTone(false);
		}
		// this could be replaced by hammer.js
		button.addEventListener('touchstart', openGate)
		button.addEventListener('moousedown', openGate)
		button.addEventListener('mouseup', openGate)
		button.addEventListener('touchend', closeGate)
		button.addEventListener('touchcancel', closeGate)
		
	},
	isTouching: function (arr, val) {
		if(arr.indexOf(val) !== -1) {
			return true; 
		} else {
			return false;
		}
	},
	stepEvents: function () {

		var stepsItem   = document.querySelectorAll('.fn-sequencer-item');

		for(var i = 0; i < stepsItem.length;i++) {

			var hammertime = new Hammer(stepsItem[i], {})
			sequencerRole.holdFrequency(hammertime);
			sequencerRole.clickActive(hammertime);
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


