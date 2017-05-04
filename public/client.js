// var socket = io.connect('http://localhost:3000');

// socket.on('startAudio', function (data) {
// 	console.log('starting the audio');
// 	console.log(data);
// })
// // setTimeout(function () {
// // 	socket.emit('news', 'big news')
// // }, 2000	)
// //   socket.on('news', function (data) {
    
// //     socket.emit('my other event', { my: 'data' });
// //   });

// var audioContext = new (window.AudioContext || window.webkitAudioContext)();


// var VCO = (function(context) {
//   function VCO(){
//     this.oscillator = context.createOscillator();
//     this.oscillator.type = 'square';
//     this.setFrequency(440);
//     this.oscillator.start(0);
//     this.oscillator.connect(context.destination)
//   };

//   VCO.prototype.setFrequency = function(frequency) {
//     this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
//   };

//   VCO.prototype.setType = function (type) {
//   	this.oscillator.type = type
//   }

  

//   return VCO;
// })(audioContext);

// // var activeModules = document.querySelectorAll('.fn-overview-module');

// // for(var i = 0; i < activeModules.length; i++) {
// // 	// console.log(activeModules[i]);
// // 	switch(activeModules[i].getAttribute('data-type')) {
// // 		case 'oscillator': 
// // 			var vco = new VCO;
// // 			vco.setType('sine');
// // 			console.log('happesn');
// // 			break;


// // 	}
// // }
// // var vco = new VCO;
// // 		vco.setType('sine');

// var audio = {
// 	init:function () {
// 		console.log('audio.init@');
		
		

		

		
	
// 		// wait for message from server untill osc is added

// 	},
// 	oscillator:function () {

// 	}
// 	// getActiveModules: function () {
// 	// 	console.log(document.cookie.split(';'));
// 	// }

// }


// var data = [
// 	{
// 	"id": 11,
// 	"title": "sequencer",
// 	"shortTitle": "SEQ",
// 	"category": "rythm",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 12,
// 	"title": "pressure pads",
// 	"shortTitle": "PP",
// 	"category": "rythm",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 9,
// 	"title": "VCA",
// 	"shortTitle": "VCA",
// 	"category": "modulate",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 10,
// 	"category": "modulate",
// 	"shortTitle": "MOD",
// 	"title": "envelope generator",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 4,
// 	"title": "delay",
// 	"shortTitle": "D",
// 	"category": "filter",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 5,
// 	"title": "low pass filter",
// 	"shortTitle": "LPF",
// 	"category": "filter",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 6,
// 	"title": "high pass filter",
// 	"shortTitle": "HPF",
// 	"category": "filter",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 7,
// 	"title": "synthesizer voice",
// 	"shortTitle": "VCE",
// 	"category": "filter",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 8,
// 	"title": "panning",
// 	"shortTitle": "PAN",
// 	"category": "filter",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 3,
// 	"title": "VCO",
// 	"shortTitle": "VCO",
// 	"category": "source",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 1,
// 	"title": "clock modulator",
// 	"shortTitle": "CMOD",
// 	"category": "source",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 2,
// 	"title": "noise",
// 	"shortTitle": "NS",
// 	"category": "source",
// 	"once": "false",
// 	"connectedTo": "",
// 	"active": true,
// 	"parameters": [{

// 	}],
// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	},
// 	{
// 	"id": 0,
// 	"title": "oscillator",
// 	"shortTitle": "OSC",
// 	"category": "source",
// 	"once": "false",
// 	"active": true,
// 	"parameters": [
// 	{
// 	"type":"waveType",
// 	"input":"radio",
// 	"value": "sine",
// 	"waveTypes": [
// 	{
// 	"type": "sine",
// 	"img": "ic_wave_sine.svg",
// 	"active":false
// 	},
// 	{
// 	"type": "sawtooth",
// 	"img": "ic_wave_sawtooth.svg",
// 	"active":false
// 	},
// 	{
// 	"type": "triangle",
// 	"img": "ic_wave_triangle.svg",
// 	"active":true
// 	},
// 	{
// 	"type": "square",
// 	"img": "ic_wave_square.svg",
// 	"active":false
// 	}
// 	]
// 	},
// 	{
// 	"type":"frequency",
// 	"input":"single-knob",
// 	"min":0,
// 	"max":22000,
// 	"value":500
// 	},
// 	{
// 	"type":"pitch",
// 	"input":"single-knob",
// 	"min":0,
// 	"max":22000,
// 	"value":500
// 	}
// 	],

// 	"color":"#56009C",
// 	"accentColor":"#FFFF00"
// 	}]

// var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// var oscillator = {
// 	frequency: 220,
// 	type:'SINE',
// 	create:function (options) {
// 		var _oscillator = audioContext.createOscillator();

// 		return _oscillator;
// 	},
// 	setWavetype(osc, type) {
// 		osc.type = type
// 	},
// 	setFrequency(osc, freq) {
// 		osc.frequency.value = freq;
// 	},
// 	connect:function(osc) {
// 		osc.connect(audioContext.destination);
		
// 	},
// 	start:function (osc) {
// 		osc.start();
// 	}

// }

// var vca = {
// 	create: function (value, index) {
// 		var _vca = audioContext.createGain();
// 		_vca.gain.value = 0;
// 		return _vca;
// 	},
// 	setInput: function (vca) {
		
// 	},
// 	setOutput: function (vca) {

// 	},
// 	setValue: function (vca, value) {
// 		vca.gain.value = value;
// 	}
// }	

// var modules = {
// 	oscillator:[oscillator.create(), oscillator.create()],
// 	vca:[vca.create()]
// }

// var options = {
// 	OSC:  {
// 		waveform: function (value, index) {
// 			oscillator.setWavetype(modules.oscillator[index], value)
// 		},
// 		frequency: function (value, index) {
// 			oscillator.setFrequency(modules.oscillator[index], value);
// 		}, 
// 		pulseWidth: function (value, index) {
// 			console.log('change pulseWidth');
// 		},
// 		output: function (value, index) {
// 			console.log('change output');
// 		}
// 	},
// 	VCA: {
// 		input: function (value, index) {
// 			console.log('change input');
// 		},
// 		cvControl: function (value, index) {
// 			vca.setValue(modules.vca[index], value);
// 		},
// 		output: function (value, index) {
// console.log('change output');
// 		}
// 	}
// }

// var synth = {
	
// 	init:function () {
// 		console.log('synth.init');
		
// 		oscillator.setWavetype(modules.oscillator[0], 'sine');
// 		oscillator.setFrequency(modules.oscillator[0], 440);

// 		vca.setValue(modules.vca[0], 1);

// 		modules.oscillator[0].start(0);
// 		modules.vca[0].connect(audioContext.destination);
// 		modules.oscillator[0].connect(modules.vca[0]);
// 		modules.oscillator[1].connect(modules.vca[0]);

// 		synth.getDOMModules();
		
// 	},
// 	getDOMModules: function () {
// 		var parameterDOM = document.querySelectorAll('.fn-parameter');
		
// 		for(var i = 0; i < parameterDOM.length;i++) {
// 			parameterDOM[i].addEventListener('input', function (e) {
// 				options[e.target.getAttribute('data-module')][e.target.getAttribute('data-target')](e.target.value, e.target.getAttribute('module-index'));
// 			})
// 		}
// 	}
// }





// // synth.init();

// // window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

// // var oscillator = window.audioContext.createOscillator();
// // oscillator.frequency.value = 440;
// // // oscillator.noteOn(window.audioContext.currentTime + 0.00);
// // // oscillator.noteOff(window.audioContext.currentTime + 2.25);

// // var gain = window.audioContext.createGain();
// // gain.gain.setValueAtTime(0.05, window.audioContext.currentTime + 0.00);
// // gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.25);
// // gain.gain.setValueAtTime(0.10, window.audioContext.currentTime + 0.50);
// // gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.75);
// // gain.gain.setValueAtTime(0.20, window.audioContext.currentTime + 1.00);
// // gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.25);
// // gain.gain.setValueAtTime(0.40, window.audioContext.currentTime + 1.50);
// // gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.75);
// // gain.gain.setValueAtTime(0.80, window.audioContext.currentTime + 2.00);

// // oscillator.start(0);
// // gain.connect(audioContext.destination);
// // oscillator.connect(gain);
//             

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

var drag = {
	init:function () {
		if(document.querySelector('.fn-draggable')) {
			drag.createDraggable('.fn-draggable', 'body');
			drag.createDrop('.fn-delete-box', '.fn-draggable');
		}
	},
	createDraggable: function (element, area) {
		console.log('drag.createDraggable');
		interact(element).draggable({
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
				
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
				target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
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
				original.setAttribute('drag-status', 'ghost');
				clone.style.left     = original.offsetLeft + "px";
				clone.style.top      = original.offsetTop + "px";
				clone.style.width    = original.offsetWidth + "px";
				clone.style.height   = original.offsetHeight + "px";
				clone.classList.add('fn-clone');

				original.parentElement.appendChild(clone);
				interaction.start({ name: 'drag' },event.interactable,clone);
			}

		})
	},
	createDrop: function (element, accept) {
		console.log('drag.createDrop');
		interact(element).dropzone({
			accept: accept,
			ondropactivate: function (event) {
				console.log(event.target);
				event.target.classList.add('active');
			},

			ondragenter: function (event) {
				event.relatedTarget.setAttribute('drag-status', 'dragIn');
			},
			
			ondrop: function (event) {
				console.log('dropped it', event);
				module.deleteFromUser(event.relatedTarget.getAttribute('module-id'));
				event.target.classList.remove('active');
			},

			ondropdeactivate: function (event) {
				console.log('ondropdeactivate');
				document.querySelector('li[drag-status="ghost"]').setAttribute('drag-status', 'none');
				
				document.querySelector('.fn-clone').remove()
				event.target.classList.remove('active');
			}
		});

	}
}



var module = {
	addModule: function () {
		
		// console.log('module.addmodule');
		// var modules = document.querySelectorAll('.fn-select-module');
		
		// for(var i = 0; i < modules.length; i++) {
		// 	modules[i].addEventListener('click',  module.addModuleEvent)
		// }
	},
	addModuleEvent(event) {
		// console.log(event);
		// var category = tools.getParameterByName('category');
		// var col      = tools.getParameterByName('col');
		// var id       = event.target.getAttribute('module-id');

		// if(id == null) {
		// 	id = event.target.parentNode.getAttribute('module-id');
		// }
		// $.post({
		//  url: '/play/add',
		//  data: {
		//  	moduleId: parseInt(id), 
		//  	col: col,
		//  	category: category
		//  },
		//  success: function(res){
		//  	console.log('success', res);
		//   window.location = res.redirectTo;
		//  },
		//  error: function (res) {
		//  	alert('too much')
		//  	window.location = res.redirectTo;
		//  }
		// }); 

	},
	deleteFromUser: function (id) {
		$.post({
		 url: '/play/remove',
		 data: {id:id},
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	window.location = res.redirectTo;
		 }
		}); 
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
// http://webaudioplayground.appspot.com/#


// var currentStep = 0;
// var steps = 8;
// var audioContext = new (window.AudioContext || window.webkitAudioContext)();
// var label = document.querySelector('.fn-step-label');

// var oscillator = audioContext.createOscillator();
// oscillator.type = 'square';
// oscillator.frequency.value = 440;
// oscillator.start();

// var filter = audioContext.createBiquadFilter()
// filter.connect(audioContext.destination)
// filter.type = 'lowpass'
// filter.frequency.value = 2000;
// filter.Q.value = 0;
// filter.gain.value = 0;

// oscillator.connect(filter)

// function init () {
// 	console.log('start');

// 	// var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 	// var oscillator = audioContext.createOscillator();
// 	// oscillator.type = 'square';
// 	// oscillator.frequency.value = 440;
// 	// oscillator.start();

// 	// var filter = audioContext.createBiquadFilter()
// 	// filter.connect(audioContext.destination)
// 	// filter.type = 'highpass'
// 	// filter.frequency.value = 200
// 	// filter.fre
// 	// oscillator.connect(filter)
// }
// init();
// var frequencies = [440,440,440,440,440,440,440,440];
// var createSequencer = function () {
// 	var loop = function () {
// 		setTimeout(function () {
// 			label.textContent = 'step: ' + currentStep;
// 			oscillator.frequency.value = frequencies[currentStep];
// 		}, 1000)
// 	}
// }

// document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// 	filter.gain.value = e.target.value;
// })


// // 		var testInput = document.querySelector('.fn-test');
// // 		testInput.value = delay;
// // 		testInput.addEventListener('change', function (e) {
// // 			console.log(e.target.value);
// // 			console.log(currentStep);
// // 			frequencies[currentStep] = e.target.value;
// // 		})

// // 		document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// // 			biquadFilter.frequency.value = e.target.value;
// // 			console.log(biquadFilter);
// // 		})

// // 		var clickCanvas = document.querySelector('.fn-click-canvas');
// // 		clickCanvas.addEventListener('click', function (e) {
// // 			console.log(e.clientX);
// // 			frequencies[currentStep] = e.clientX*2;
// // 		})
// // 	}

// // var rollen = {
// // 	init:function () {
// // 		rollen.createStep();
// // 	},
// // 	createStep: function () {
// // 		var label = document.querySelector('.fn-step-label');
// // 		label.textContent = 'yo';
// // 		var steps = 8;
// // 		var currentStep = 0;
// // 		var delay = 200;
// // 		var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// // 		var oscillator = audioContext.createOscillator();
		
// // 		var biquadFilter = audioContext.createBiquadFilter();
// // 		biquadFilter.type = 'lowpass';
// // 		biquadFilter.frequency.value = 100;
// // 		biquadFilter.gain.value = 20;
// // 		biquadFilter.Q.value = 20;

// // 		oscillator.start(0);

// // 		oscillator.connect(biquadFilter);
// // 		biquadFilter.connect(audioContext.destination)

// // 		var frequencies = [440,440,440,440,440,440,440,440];
// // 		var sequencer = function() {
// // 			setTimeout(function () {
// // 				label.textContent = 'step: ' + currentStep;
// // 				oscillator.frequency.value = frequencies[currentStep];
// // 				currentStep++;

// // 				if(currentStep < steps) {
// // 					sequencer()
// // 				} else {
// // 					currentStep = 0;
// // 					sequencer();
// // 				}
// // 			}, delay)
// // 		}
// // 		sequencer();

// // 		var testInput = document.querySelector('.fn-test');
// // 		testInput.value = delay;
// // 		testInput.addEventListener('change', function (e) {
// // 			console.log(e.target.value);
// // 			console.log(currentStep);
// // 			frequencies[currentStep] = e.target.value;
// // 		})

// // 		document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// // 			biquadFilter.frequency.value = e.target.value;
// // 			console.log(biquadFilter);
// // 		})

// // 		var clickCanvas = document.querySelector('.fn-click-canvas');
// // 		clickCanvas.addEventListener('click', function (e) {
// // 			console.log(e.clientX);
// // 			frequencies[currentStep] = e.clientX*2;
// // 		})
// // 	}
// // }
// // rollen.init();

// // 	// start rol 1
// // 	// show stepsequencer
// // 	// create oscillator
// // 	// play stepsequencer with oscilator at same pitch
// // 	// change step sequencer according to click location
// // 	// record audio and take pitch from that.
// // 	// encrease the amount of steps
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
var onLoad = function () {
	tools.autoSubmit();
	drag.init();

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
