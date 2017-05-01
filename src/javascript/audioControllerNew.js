var data = [
	{
	"id": 11,
	"title": "sequencer",
	"shortTitle": "SEQ",
	"category": "rythm",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 12,
	"title": "pressure pads",
	"shortTitle": "PP",
	"category": "rythm",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 9,
	"title": "VCA",
	"shortTitle": "VCA",
	"category": "modulate",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 10,
	"category": "modulate",
	"shortTitle": "MOD",
	"title": "envelope generator",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 4,
	"title": "delay",
	"shortTitle": "D",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 5,
	"title": "low pass filter",
	"shortTitle": "LPF",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 6,
	"title": "high pass filter",
	"shortTitle": "HPF",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 7,
	"title": "synthesizer voice",
	"shortTitle": "VCE",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 8,
	"title": "panning",
	"shortTitle": "PAN",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 3,
	"title": "VCO",
	"shortTitle": "VCO",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 1,
	"title": "clock modulator",
	"shortTitle": "CMOD",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 2,
	"title": "noise",
	"shortTitle": "NS",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 0,
	"title": "oscillator",
	"shortTitle": "OSC",
	"category": "source",
	"once": "false",
	"active": true,
	"parameters": [
	{
	"type":"waveType",
	"input":"radio",
	"value": "sine",
	"waveTypes": [
	{
	"type": "sine",
	"img": "ic_wave_sine.svg",
	"active":false
	},
	{
	"type": "sawtooth",
	"img": "ic_wave_sawtooth.svg",
	"active":false
	},
	{
	"type": "triangle",
	"img": "ic_wave_triangle.svg",
	"active":true
	},
	{
	"type": "square",
	"img": "ic_wave_square.svg",
	"active":false
	}
	]
	},
	{
	"type":"frequency",
	"input":"single-knob",
	"min":0,
	"max":22000,
	"value":500
	},
	{
	"type":"pitch",
	"input":"single-knob",
	"min":0,
	"max":22000,
	"value":500
	}
	],

	"color":"#56009C",
	"accentColor":"#FFFF00"
	}]

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

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
		osc.frequency.value = freq;
	},
	connect:function(osc) {
		osc.connect(audioContext.destination);
		
	},
	start:function (osc) {
		osc.start();
	}

}

var vca = {
	create: function (value, index) {
		var _vca = audioContext.createGain();
		_vca.gain.value = 0;
		return _vca;
	},
	setInput: function (vca) {
		
	},
	setOutput: function (vca) {

	},
	setValue: function (vca, value) {
		vca.gain.value = value;
	}
}	

var modules = {
	oscillator:[oscillator.create(), oscillator.create()],
	vca:[vca.create()]
}

var options = {
	OSC:  {
		waveform: function (value, index) {
			oscillator.setWavetype(modules.oscillator[index], value)
		},
		frequency: function (value, index) {
			oscillator.setFrequency(modules.oscillator[index], value);
		}, 
		pulseWidth: function (value, index) {
			console.log('change pulseWidth');
		},
		output: function (value, index) {
			console.log('change output');
		}
	},
	VCA: {
		input: function (value, index) {
			console.log('change input');
		},
		cvControl: function (value, index) {
			vca.setValue(modules.vca[index], value);
		},
		output: function (value, index) {
console.log('change output');
		}
	}
}

var synth = {
	
	init:function () {
		console.log('synth.init');
		
		oscillator.setWavetype(modules.oscillator[0], 'sine');
		oscillator.setFrequency(modules.oscillator[0], 440);

		vca.setValue(modules.vca[0], 1);

		modules.oscillator[0].start(0);
		modules.vca[0].connect(audioContext.destination);
		modules.oscillator[0].connect(modules.vca[0]);
		modules.oscillator[1].connect(modules.vca[0]);

		synth.getDOMModules();
		
	},
	getDOMModules: function () {
		var parameterDOM = document.querySelectorAll('.fn-parameter');
		
		for(var i = 0; i < parameterDOM.length;i++) {
			parameterDOM[i].addEventListener('input', function (e) {
				options[e.target.getAttribute('data-module')][e.target.getAttribute('data-target')](e.target.value, e.target.getAttribute('module-index'));
			})
		}
	}
}





// synth.init();

// window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

// var oscillator = window.audioContext.createOscillator();
// oscillator.frequency.value = 440;
// // oscillator.noteOn(window.audioContext.currentTime + 0.00);
// // oscillator.noteOff(window.audioContext.currentTime + 2.25);

// var gain = window.audioContext.createGain();
// gain.gain.setValueAtTime(0.05, window.audioContext.currentTime + 0.00);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.25);
// gain.gain.setValueAtTime(0.10, window.audioContext.currentTime + 0.50);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.75);
// gain.gain.setValueAtTime(0.20, window.audioContext.currentTime + 1.00);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.25);
// gain.gain.setValueAtTime(0.40, window.audioContext.currentTime + 1.50);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.75);
// gain.gain.setValueAtTime(0.80, window.audioContext.currentTime + 2.00);

// oscillator.start(0);
// gain.connect(audioContext.destination);
// oscillator.connect(gain);
            