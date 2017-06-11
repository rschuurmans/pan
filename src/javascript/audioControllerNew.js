// // todo : 
// reverb
// camera hand als pp + fallback
// volume en speed tilt
// - scss cleanup
// remove unused functions
// kijken naar tools van for element in met callback

// later:
// audiosetup.getsynth()

var audioContext = StartAudioContext(Tone.context, ".fn-start-sequece");

var audio = {
	sources:[],
	filters:[],	
	ppFreq:false,
	envelope:null,
	gain: null,
	defTime: "8n",
	setup: function () {
		sources.setup();
		listenStartSocket();
	},
	triggerAttack: function (freq, time) {
		audio.triggerRelease();
		freq = audio.ppFreq ? audio.ppFreq : freq;
		for(var i in audio.sources) {
			if(time) {
				audio.sources[i].triggerAttackRelease(freq, time )
				console.log(audio.sources[i]);
			} else {
				
				if(audio.sources[i].noise) {
					audio.sources[i].triggerAttack()
				} else {
					audio.sources[i].triggerAttack(freq)
				}
			}
		}
	},
	triggerRelease: function () {
		for(var i in audio.sources) {
			audio.sources[i].triggerRelease()
		}
	},
	triggerReleaseSingle: function (index) {
		audio.sources[index].triggerRelease()
	},
	setFrequency: function (freq) {
		for(var i in audio.sources) {
			audio.sources[i].setNote(freq);
		}
	}
}

var loop = {
	stopped: true,
	index:0,
	hold:false,
	holdTone: function(start, freq) {
		if(start) {
			if(loop.hold) {
				for(var i = 0; i < audio.sources.length;i++) {
					audio.sources[i].setNote(freq);
				}
			} else {
				loop.hold = true;
				audio.triggerAttack(freq);
			}
		} else {
			loop.hold=false;
			audio.triggerRelease();

		}
	},
	
	playStep: function (active, frequency, time) {
		if(active && !loop.hold && !recording.isRecording) {
			audio.triggerAttack(frequency);
			if(!data.group.sustain) {
				window.setTimeout(function () {
					audio.triggerRelease();
				}, time)
			}

		} 
	},
	increaseIndex: function () {
		loop.index++;
		if(loop.index == data.group.steps.length) {
			loop.index = 0;
		}
	},
	start: function () {
		loop.stopped = false;

		var delay = loop.calculateDelay(data.group.steps.length);

		var toneLoop = new Tone.Loop(function (time) {
			
			loop.playStep(data.group.steps[loop.index].active, data.group.steps[loop.index].frequency, time)

			events.showStep(loop.index);
			loop.increaseIndex();
			
		}, delay);

		toneLoop.start(0)
		Tone.Transport.start('+0.1');
	},

	calculateDelay: function (length) {
		switch(length) {
			case 4:
				return '2n';
				break;
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
	}
}


var sources = {
	setup:function () {
		sources.createSources();
		filters.setup();
		sources.setDetune();

	},
	createSources: function () {
		
		for(var i in data.group.sources) {
			if(data.group.sources[i].active) {
				if(data.group.sources[i].type == 'noise') {
					sources.create['noise'](i);
				} else {
					sources.create[data.group.synth](i);
				}

			}

		};
	},
	update: {
		wavetype: function (received) {
			
			if(received.value == 'noise') {
				if(data.group.sources[received.id].active) {
					sources.remove(received.id);
					sources.create.noise(received.id);
					filters.connectSingleSource(received.id);
				} else {
					data.group.sources[received.id].type = 'noise'
				}

			}  else {
				for(var i in audio.sources) {

					if(audio.sources[i].id == received.id) {
						
						if(audio.sources[i].noise) {
							sources.remove(received.id);
							sources.create[data.group.synth](received.id);
							filters.connectSingleSource(received.id);
						} else {
							audio.sources[i].oscillator.type = received.value;
						}
					}
				}
			}
		},
		phase: function (received) {
			for(var i in audio.sources) {
				if(audio.sources[i].id == received.id) {
					audio.sources[i].oscillator.phase = received.value;
				}
			}
		},		
		active: function (received) {
			if(received.value) {
				if(data.group.sources[received.id].type == 'noise') {
					sources.create['noise'](received.id);
				} else {
					sources.create[data.group.synth](received.id);
				}
				filters.connectSingleSource(received.id);
			} else {
				sources.remove(received.id);
			}
		},
		detune: function (received) {
			for(var i in audio.sources) {
				if(audio.sources[i].id == received.id) {
					if(audio.sources[i].detune) {
						audio.sources[i].detune.input.value = received.value;
					} else {
						audio.sources[i].oscillator.detune.input.value = received.value;
					}
				}
			}

		},
		volume: function (received) {
			for(var i in audio.sources) {
				if(audio.sources[i].id == received.id) {
					audio.sources[i].volume.input.value = received.value;
				}
			}
		},
	},
	changewavetype: function (id, value) {
		for(var i in audio.sources) {
			if(audio.sources[i].id == id) {
				audio.sources[i].oscillator.type = value;
			}
		}
	},
	create: {
		synth: function (id) {
			var synth = new Tone.Synth(sources.create.parseData(id))
			synth.id = id;
			audio.sources.push(synth)
			// audio.sources[0].triggerAttackRelease(400, '2n')
		},
		noise: function (id) {
			var noiseSynth = new Tone.NoiseSynth({
				envelope: {
					attack: data.group.adsr.attack.value,
					decay: data.group.adsr.decay.value,
					sustain: .1,
					release: data.group.adsr.release.value
				}
			});
			noiseSynth.id = id;
			audio.sources.push(noiseSynth);
		},
		amSynth: function (id) {
			var synth = new Tone.AMSynth(sources.create.parseData(id))
			synth.id = id;
		},
		
		fmSynth: function (id) {
			var synth = new Tone.Synth(sources.create.parseData(id))
			synth.id = id;
			audio.sources.push(synth)
		},
		
		drum: function (id) {
			data.group.sustain = false;
			var synth = new Tone.MembraneSynth();
			synth.id = id;
			audio.sources.push(synth)
		},
		parseData: function (id) {
			var sourceData = data.group.sources[id];
			var synthData = {
				oscillator: {
					type : sourceData.type
				},
				envelope: {
					attack: data.group.adsr.attack.value,
					decay: data.group.adsr.decay.value,
					sustain: .5,
					release: data.group.adsr.release.value
				}
			}
			
			return synthData 
		}
	},
	remove: function (id) {
		audio.triggerRelease(id)
		for(var i in audio.sources) {
			if(audio.sources[i].id == id) {
				audio.sources.splice(i, 1);
			}
		}
	},
	setDetune: function () {
		// use the data.group.set method as used in sequencer.holdtone
		// for(var i in audio.sources) {
		// 	audio.sources[i].detune.input.value = data.sources[parseInt(audio.sources[i].id)].detune;
		// };
			
	},
	setSingleDetune: function (index, value) {

	}
}

var filters = {
	setup: function () {
		for(var i in data.group.modulate) {
			filters.create[data.group.modulate[i].type](data.group.modulate[i])
		}
		filters.connect();
	},
	connect: function () {
			
		audio.gain = Tone.context.createGain()
			
		for(var y in audio.filters) {
			audio.gain.connect(audio.filters[y])
		}
		if(audio.filters.length == 0) {
			audio.gain.connect(Tone.Master);
		}
		for(var i in audio.sources) {
			audio.sources[i].connect(audio.gain);
		}
	},
	connectSingleSource: function (id) {
		for(var i in audio.sources) {
			if(audio.sources[i].id == id) {
				console.log('connecting', audio.sources[i]);
				audio.sources[i].connect(audio.gain)
			}
		}
	},
	create: {
		pingpong: function (data) {
			var pingPong = new Tone.PingPongDelay(2 , 2).toMaster();;
		
			pingPong.wet.value = 0;
			audio.filters.pingpong = pingPong;

		},
		tremelo: function (data) {
			var autoFilter = new Tone.AutoFilter({
				frequency    :data.values.frequency,
				depth        :data.values.depth,
			}).toMaster().start();
			autoFilter.wet.value = 0;
			audio.filters.tremelo = autoFilter;
		},
		chorus: function (data) {
			var chorus = new Tone.Chorus().toMaster();
			
			chorus.wet.value = 0;
			audio.filters.chorus = chorus
		},
		wahwah: function (data) {
			var autoWah = new Tone.AutoWah({
				baseFrequency:data.values.baseFrequency,
				octaves      :3,
				sensitivity  :0,
				Q            :data.values.q,
				gain         :data.values.gain,
				
			}).toMaster();
			autoWah.wet.value = 0;
			
			audio.filters.wahwah = autoWah;

		},
		lowpass: function (data) {
			var biquadFilter = Tone.context.createBiquadFilter().toMaster();
			biquadFilter.type = "lowshelf";
			biquadFilter.frequency.value = 2000;
			biquadFilter.gain.value = 0;
			audio.filters.lowpass = biquadFilter;
			
		},
		highpass: function(data) {
			var biquadFilter = Tone.context.createBiquadFilter().toMaster();
			biquadFilter.type = "highshelf";
			biquadFilter.frequency.value = 200;
			biquadFilter.gain.value = 0;
			audio.filters.highpass = biquadFilter;
			
		},
		
		delay: function (data) {
			var feedbackDelay = new Tone.FeedbackDelay(data.values.delayTime, 0.5).toMaster();
			feedbackDelay.wet.value = 0;
			audio.filters.delay = feedbackDelay;
		},
		distortion: function (data) {
			var dist = new Tone.Distortion({
				distortion: data.values.distortion,
				oversample: data.values.oversample
			}).toMaster();
			dist.wet.value = 0;
			audio.filters.distortion = dist;

		}
		

	},
	update: function (type, value) {
			console.log(type,value);
			if(type == 'highpass' || type == 'lowpass') {
				audio.filters[type].gain.value = value*2;
			} else {
				audio.filters[type].wet.value = value;
			}
			
	},
	
}

