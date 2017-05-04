
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var tuna = new Tuna(audioContext);


var oscillator = {
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

var vca = {
	create: function (value, index) {
		var _vca = audioContext.createGain();
		console.log(audioContext);
		// vca.setValue(_vca, 0)
		vca.setValue(_vca, 1)
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
		time =time / 1000;
		vca.gain.linearRampToValueAtTime(value, audioContext.currentTime + time);
	},
};
console.log(newdata);

var activeSound = {
	offset: .50,
	frequencies:[],
	delay: 200,
	currentStep:0,
	create: function () {
		activeSound.startSequence();
	},
	createOscillator: function () {
		return oscillator;
	},
	setup: function () {
		// console.log(newdata.modulate[i]);
		
		


		// newdata.modulate[0].filter.connect(newdata.modulate[1].filter);
		// newdata.modulate[1].filter.connect(newdata.modulate[2].filter);
		// newdata.modulate[2].filter.connect(newdata.modulate[3].filter);
		// newdata.modulate[3].filter.connect(audioContext.destination);

		newdata.vca = vca.create();

		for(var i in newdata.source) {
			// if newdata.newobj = true (so it's not already an oscillator)
				newdata.source[i].audio = oscillator.create();
				oscillator.setWavetype(newdata.source[i].audio, 'sine');
				// oscillator.connect(newdata.source[i].audio, filter1);
				
				// for(var y in newdata.modulate) {
				// 	if(newdata.modulate[y].type == 'Chorus') {
				// 		newdata.modulate[y].filter = new tuna.Chorus(newdata.modulate[y].values);
				// 		newdata.modulate[y].filter.connect(audioContext.destination);
				// 		oscillator.connect(newdata.source[i].audio, newdata.modulate[y].filter)
				// 	} else if(newdata.modulate[y].type == 'Delay') {
				// 		newdata.modulate[y].filter = new tuna.Delay(newdata.modulate[y].values);
				// 		newdata.modulate[y].filter.connect(audioContext.destination);
				// 		oscillator.connect(newdata.source[i].audio, newdata.modulate[y].filter)
				// 	} else if(newdata.modulate[y].type == 'Overdrive') {
				// 		newdata.modulate[y].filter = new tuna.Overdrive(newdata.modulate[y].values);
				// 		newdata.modulate[y].filter.connect(audioContext.destination);
				// 		oscillator.connect(newdata.source[i].audio, newdata.modulate[y].filter)
				// 	} else if(newdata.modulate[y].type == 'Tremolo') {
				// 		newdata.modulate[y].filter = new tuna.Tremolo(newdata.modulate[y].values);
				// 		newdata.modulate[y].filter.connect(audioContext.destination);
				// 		oscillator.connect(newdata.source[i].audio, newdata.modulate[y].filter)
				// 	}
				// }
				oscillator.connect(newdata.source[i].audio, newdata.vca);
				oscillator.start(newdata.source[i].audio);
		};
		newdata.filter = new tuna.Chorus(newdata.modulate[0].values);
		console.log(newdata.filter);

		vca.connect(newdata.vca, newdata.filter);
		newdata.filter.connect(audioContext.destination);
		activeSound.startSequence();
		
	},
	pressStart: function () {
		var body   = document.querySelector('body');
		var button = document.querySelector('.fn-press-play');

		body.setAttribute('press-play', 'open');
		var clicked = false;

		button.addEventListener('click', function (e) {
			if(!clicked) {
				clicked = true;

				body.setAttribute('press-play', 'closed');

				activeSound.setup();

				
				
			}

		})
	},
	resetLoop () {
		activeSound.currentStep = 0;
		audioContext.close();
	},
	startSequence() {
		var loop = function () {
			window.setTimeout(function () {

				if(newdata.steps[activeSound.currentStep].active) {
					oscillator.setAllFrequency(newdata.source, newdata.steps[activeSound.currentStep].frequency)
					vca.setValue(newdata.vca, 1);
					var soundDelay = audioContext.currentTime + activeSound.delay / 2;

					vca.holdAndSetValue(newdata.vca, 0, soundDelay);
				}
				// modulateRole.sliderStep();
				activeSound.currentStep++;

				if(activeSound.currentStep < newdata.steps.length) {
					loop();
				} else {
					// activeSound.resetLoop();
					activeSound.currentStep = 0;
					loop();
				}
			}, activeSound.delay)
		};

		loop();

	

	},
	updates: function () {
		// var inputs = document.querySelectorAll('.fn-frequency-input');
		// for(var i = 0; i < inputs.length;i++) {
		// 	inputs[i].addEventListener('input', function (e) {
		// 		var index    = e.target.getAttribute('input-index');
		// 		var newValue = e.target.value;

		// 		newdata.steps[index].frequency = newValue;

		// 		// 70 is used for the problem with the gradient and the circle. 30% of the div is cut off.
		// 		var percentage = (70*newValue) / newdata.steps[index].max;

		// 		var knob = document.querySelectorAll('.knob')[index];
		// 		knob.style.background = 'radial-gradient(rgba(0,0,0,0)  ' + percentage + '%, red '+ percentage + '% )';


		// 	})
		// }
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

var touches = [];

var modulateRole = {
	init: function () {
		modulateRole.sliderStep();
		modulateRole.sliderPage();
		modulateRole.modulateEvents();
	},
	events: function () {
	},
	sliderStep: function () {
		var element = document.querySelector('.slider-step-inner');
		var steps = newdata.steps.length - 1;
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
			console.log(ev, ev.type, slideLeft);
			slideLeft.classList.add('slide-active');
			slideRight.classList.remove('slide-active');
		});
		hammertime.on('swiperight', function(ev) {
			console.log(ev, ev.type);
			slideLeft.classList.remove('slide-active');
			slideRight.classList.add('slide-active');
		});
	},
	modulateEvents: function () {
		console.log('ome');
		var modulateButtons = document.querySelectorAll('.fn-modulate-btn');
		var modulateValue = document.querySelector('.fn-modulate-value');
		console.log(modulateValue);
		var body            = document.querySelector('body');
		console.log('ths',window.DeviceOrientationEvent);
		for(var i = 0; i < modulateButtons.length;i++) {
			console.log(modulateButtons[i]);
			modulateButtons[i].addEventListener('click', function (e) {
				var type = e.currentTarget.getAttribute('data-type');
				e.target.classList.add('active');
				modulateValue.innerHTML = e.target.getAttribute('data-value') + '%';
				console.log(modulateValue, e.target.getAttribute('data-value'));
				console.log('click');
				body.setAttribute('touch-active','modulate');
				body.setAttribute('current-touch', type);
				modulateRole.rotateEvent();

			})
		}
	},
	rotateEvent: function () {
		
		var phoneDirection = DeviceOrientationEvent.webkitCompassHeading;
		console.log(DeviceOrientationEvent);

		var page = document.querySelector('.fn-overlay');
		console.log('startingpoint', phoneDirection);
		window.addEventListener('deviceorientation', function (e) {
			

			page.style.webkitTransform = "rotate("+ e.webkitCompassHeading +"deg)";
			var compass = e.webkitCompassHeading;
			var value = compass / 360;
			value = value * 5;
			

			vca.setValue(newdata.vca, value);
			newdata.filter.delay = value;

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

var sequencerRole = {
	init: function () {
		sequencerRole.events();
	},
	isTouching: function (arr, val) {
		if(arr.indexOf(val) !== -1) {
			return true; 
		} else {
			return false;
		}
	},
	events: function () {
		var stepsItem   = document.querySelectorAll('.fn-sequencer-item');
		var body        = document.querySelector('body');
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
						newdata.steps[index].active = !newdata.steps[index].active;
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
		input.value = newdata.steps[3].frequency;

		input.addEventListener('input', function (e) {
			newdata.steps[3].frequency = e.target.value;
			var scale = (5*e.target.value)/newdata.steps[3].max;
			circle.style.transform = 'scale('+scale+')';


		})
	}	
}
activeSound.pressStart();


console.log(window.location.pathname.indexOf('sequence') !== -1, window.location.pathname);
if(window.location.pathname.indexOf('sequence') !== -1) {
	sequencerRole.init(); 
} else {
	modulateRole.init();
}
