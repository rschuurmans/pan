var audioSetup = {
	generate: function () {
		
		var type = ['slow', 'slow', 'slow', 'mid', 'fast'][Math.floor(Math.random()*3)];
		
		var newSynth = {
			synth    : audioSetup.getSynth(type),
			adsr     : audioSetup.getADSR(type),
			wavetypes: audioSetup.getwavetypes(type),
			sources: audioSetup.getSources(type, newSynth.synth, newSynth.wavetypes),
			steps    : audioSetup.getSteps(type),
			filters  : audioSetup.getFilters(type)
		}
		return newSynth;
	},
	getSources: function (type, synth, wavetype) {

		var data = [];
		console.log(synth, wavetype);
		for(var i = 0; i < 3; i++) {
			var active = i == 0? true : false;
			var source = {
				id: i,
				type:wavetype,
				newObj: true,
				active: active,
				detune:0
			}
			if(synth == 'omniSynth') {
				source.detune = i * 10;
				source.active = true
			}
			data.push(source)
		}
		return data;
	},
	getSynth: function (type) {
		var synths = {
			slow: ['synth', 'amSynth', 'fmSynth', 'MonoSynth'],
			mid: ['synth', 'MonoSynth', 'pluck'],
			fast: ['pluck', 'drum', 'drum'],
		}
		// hier ook de andere sources opbouwen.
		return synths[type][Math.floor(Math.random()*synths[type].length)];
	},
	getADSR: function (type) {
		var time = {
			fast: [0, .3],
			mid: [.3, 1],
			slow: [1,3]
		}
		var sustain = {
			fast: false,
			mid: [false, true],
			slow: [false, true, true]
		}
		var adsr = {
			attack: (Math.random() * time[type][1]) + time[type][0],
			decay: (Math.random() * time[type][1]) + time[type][0],
			release: (Math.random() * time[type][1]) + time[type][0],
			sustain: sustain[type][Math.floor(Math.random()*sustain[type].length)]
		}
		return adsr;
	},
	randomNumber: function (low, high) {

		return Math.floor(Math.random() * high) + low;
	},
	getwavetypes: function (type) {
		var wavetypes = ['sine', 'square', 'sawtooth', 'triangle'];
		return wavetypes[Math.floor(Math.random()*wavetypes.length)];
	},
	getSteps: function (type) {
		var steps = {
			slow: [4,8],
			mid: [8,16],
			fast: [16,32]
		}
		return steps[type][Math.floor(Math.random()*steps[type].length)];
	},
	getSpeed: function () {
		var speed = ['1', '2', '3', '4'];
		return speed[0];
	},
	getFilters: function (type) {
		var array = [];
		var effects = ['pingpong', 'tremelo', 'chorus', 'wahwah', 'lowpass', 'highpass', 'delay', 'reverb', 'lowpass', 'highpass'];

		shuffle(effects);

		if(type == 'amSynth') {
			array.push('harmonicity');
		} else if (type == 'drum' || type == 'pluck') {
			array.push('delay');
			array.push('reverb');
		}
		var filter = effects[Math.floor(Math.random()*effects.length)];
		for(var i = 0; i < effects.length;i++) {
			if(array.indexOf(effects[i]) == -1)  {
				array.push(effects[i]);
			}
			if(array.length == 4) {
				break;
			}

		}
		

		// // shuffle function : https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
		function shuffle(a) {
		    var j, x, i;
		    for (i = a.length; i; i--) {
		        j = Math.floor(Math.random() * i);
		        x = a[i - 1];
		        a[i - 1] = a[j];
		        a[j] = x;
		    }
		}
		
		return array;
	},
	
}


module.exports = audioSetup;