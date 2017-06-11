var audioSetup = {
		scale:[261.63,293.66, 329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.25,698.46,783.99,880.00,987.77,1046.50,1174.66],
		generate: function () {
			
			var type = ['slow', 'slow', 'slow', 'mid', 'fast'][Math.floor(Math.random()*3)];
			// type = 'fast';
			// first should always be fast
			if(type == 'fast') {
				audioSetup.scale = [28.20, 30.87,32.70,34.65,36.71,261.63,293.66, 329.63, 28.20, 30.87,32.70,34.65,36.71,261.63,293.66, 329.63]
				 
			} 
			var newSynth = {
				synth    : audioSetup.getSynth(type),
				adsr     : audioSetup.getADSR(type),
				steps    : audioSetup.getSteps(type),
				filters  : audioSetup.getFilters(type),
				wavetypes: audioSetup.getAllWavetypes(),
				scale    : audioSetup.scale,
				sustain  : audioSetup.getSustain(type)
			}
			
			newSynth.sources = audioSetup.getSources(type, newSynth.synth, audioSetup.getWavetype(type));
			console.log(newSynth, type);
			return newSynth;
		},
		getSources: function (type, synth, wavetype) {

			var data = [];
			
			for(var i = 0; i < 3; i++) {
				var active = i == 0? true : false;
				var source = {
					id: i,
					type:wavetype,
					newObj: true,
					active: active,
					detune:0,
					volume:1
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
			// var synths = {
			// 	slow: ['synth', 'amSynth', 'fmSynth'],
			// 	mid: ['synth', 'MonoSynth', 'pluck'],
			// 	fast: ['pluck', 'drum', 'drum'],
			// }

			// easier: fix maybe later
			var synths = {
				slow: ['synth'],
				mid: ['synth'],
				fast: [ 'drum'],
			}
			// hier ook de andere sources opbouwen.
			return synths[type][Math.floor(Math.random()*synths[type].length)];
			
		},
		getADSR: function (type) {
			var time = {
				fast: [0, .3],
				mid: [.3, 1],
				slow: [.3,1]
			}
			
			var adsr = {
				decay: {
					value: (Math.random() * time[type][1]) + time[type][0],
					max:4 },
				release: {
					value: ((Math.random() * time[type][1]) + time[type][0])*2,
					max:4
				},
				
				attack: {
					value: (Math.random() * time[type][1]) + time[type][0],
					max: 4}
			}
			return adsr;
		},
		getSustain: function (type) {
			var sustain = {
				fast: false,
				mid: [false, true],
				slow: [false, false, true]
			}
			return sustain[type][Math.floor(Math.random()*sustain[type].length)]
		},
 		randomNumber: function (low, high) {

			return Math.floor(Math.random() * high) + low;
		},
		getWavetype: function (type) {
			var wavetypes = ['sine', 'square', 'sawtooth', 'triangle'];
			return wavetypes[Math.floor(Math.random()*wavetypes.length)];
		},
		getAllWavetypes: function () {
			var wavetypes = ['sine', 'square', 'sawtooth', 'triangle', 'noise'];
			return wavetypes
		},
		getSteps: function (type) {
			console.log(type);
			var stepsChoices = {
				slow: [4,8],
				mid: [8],
				fast: [16]
			}
			
			var steps = stepsChoices[type][Math.floor(Math.random()*stepsChoices[type].length)];
			// var steps = 8;
			
			var data = [];
			for(var i = 0; i < steps; i++) {
				data.push({
					frequency: audioSetup.scale[Math.floor(Math.random()*audioSetup.scale.length)],
					active: Math.random() >= 0.5,
					min:0,
					max:1200,
				})
			};

			

			return data;
		},
		getSpeed: function () {
			var speed = ['1', '2', '3', '4'];
			return speed[0];
		},
		
		getFilters: function (type) {
			var array = [];
			
			var effects = [{
				    type: "pingpong",
				    values: {
				      feedback: Math.random()*3,
				      delayTime: Math.random()*3
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "chorus",
				    values: {
						feedback:Math.random()*2,
						delayTime: Math.random()*5
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "tremelo",
				    values: {
				      frequency: Math.floor(Math.random()*10),
				      depth: Math.random()*2
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "wahwah",
				    values: {
						baseFrequency: Math.floor(Math.random()*300) + 50,
						gain         : Math.random()*3
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "distortion",
				    values: {
						distortion: 3,
						oversample : ['none', '2x', '4x'][Math.floor(Math.random()*['none', '2x', '4x'].length)]
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "lowpass",
				    values: {
						frequency :  Math.floor(Math.random()*1500) + 0
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "highpass",
				    values: {
						type: 'highpass',
						frequency :  Math.floor(Math.random()*1500) + 0
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  },
				  {
				    type: "delay",
				    values: {
						delayTime: Math.random()
				    },
				    value: 0,
				    min: 0,
				    max: 50
				  }
				 
				]

			shuffle(effects);

			var getFilter = function (name) {
				for(var i in effects) {
					if(effects[i].type == name) {
						return effects[i]
					}
				}
			}
			
			if(type == 'amSynth') {
				array.push(getFilter('harmonicity'));
			} else if (type == 'drum' || type == 'pluck') {
				array.push(getFilter('delay'));
				array.push(getFilter('reverb'));
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
		}
	
	}


module.exports = audioSetup;