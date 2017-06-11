// // todo : 
// lowpass en reverb
// detune voor drum
// noise (weghalen? wat voegt dit nog toe?)
// - sockets -> test 
// - connect with groupmember (?)
// camera hand als pp + fallback
// volume en speed tilt
// - scss cleanup
// group.sources non active blijft spelen na even kutten android
// tooltips
// remove unused functions


// later:
// audiosetup.getsynth()

var audioContext = StartAudioContext(Tone.context, ".fn-start-sequece");

var audio = {
	sources:[],
	filters:[],	
	ppFreq:false,
	envelope:null,
	defTime: "8n",
	setup: function () {
		sources.setup();
		loop.waitSocket();
	},
	triggerAttack: function (freq, time) {
		audio.triggerRelease();
		freq = audio.ppFreq ? audio.ppFreq : freq;
		for(var i in audio.sources) {
			if(time) {
				audio.sources[i].triggerAttackRelease(freq, time )
			} else {
				
				audio.sources[i].triggerAttack(freq)
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

var recording = {
	buttons: null,
	isRecording: false,
	melody:[],
	startButton: null,
	setup: function () {
		recording.startButton = document.querySelector('.fn-seq-rec');
		recording.buttons = document.querySelectorAll('.btn-sequencer');

		recording.startButton.addEventListener('click', function (e) {
			recording.isRecording = !recording.isRecording;

			if(recording.isRecording) {
				
				e.currentTarget.classList.add('active');
				body.setAttribute('recording', 'true');
				
				tips.textboxContent('rec: 0/8');
				audio.triggerRelease();
				
				recording.buttons.forEach(function(button) {
					button.addEventListener('click', recording.event)
				});
			} else {
				recording.finishRecording(e);
			}
		})
	},
	event: function (e) {
		var index = parseInt(e.currentTarget.getAttribute('sequence-index'));
		
		recording.melody.push(data.group.scale[index]);
		audio.triggerAttack(data.group.scale[index], '8n');
		

		tips.textboxContent('rec: ' + recording.melody.length + '/8');

		if(recording.melody.length == 8) {
			recording.finishRecording(e);
		}
	},
	finishRecording: function (e) {
		recording.startButton.classList.remove('active');
		body.removeAttribute('recording', 'true');
		recording.isRecording = false;

		if(recording.melody.length == 0) {
			console.log('didnt record anything');
		} else {
			recording.updateMelody(recording.melody);
			
			recording.melody = [];
		}
		tips.textboxContent(false);
		
		recording.buttons.forEach(function(button) {
			button.removeEventListener('click', recording.event)
		});
	},
	updateMelody: function (melody) {
		var newMelody = recording.fillMelody(melody)
		for(var i in newMelody) {
			data.group.steps[i].active = true;
			data.group.steps[i].frequency = newMelody[i];
		}
		sequencer.updateActive();
	},
	fillMelody: function (melody) {
		var actualMeldoy = [];
		var n = i = 0;
		while(i < 8) {
			actualMeldoy.push(melody[n])
			i++;n++;
			if(n == melody.length) {
				n = 0;
			}
		}
		return actualMeldoy
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
	waitSocket: function () {
		socket.on('startSequence', function (fulldelay) {
			
			if(loop.stopped) {
				loop.start(fulldelay);
			}
		})
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
				console.log(data.group.sources[i]);
				sources.create[data.group.synth](i);

			}

		};
	},
	update: {
		wavetype: function (received) {
			for(var i in audio.sources) {

				if(audio.sources[i].id == received.id) {
					audio.sources[i].oscillator.type = received.value;
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
				sources.create[data.group.synth](received.id);
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
			// synth.triggerAttackRelease("C2", "8n");
		},
		parseData: function (id) {
			// fm synth
			// membrane
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
			
		var gainNode = Tone.context.createGain()
			
		for(var y in audio.filters) {
			gainNode.connect(audio.filters[y])
		}
		if(audio.filters.length == 0) {
			gainNode.connect(Tone.Master);
		}
		for(var i in audio.sources) {
			audio.sources[i].connect(gainNode);
			

		}

	},
	connectSingleSource: function (id) {
		for(var y in audio.filters) {
				// audio.sources[id].connect(audio.filters[y])
				for(var i in audio.sources) {
					if(audio.sources[i].id == id) {
						audio.sources[i].connect(audio.filters[y])
					}
				}
			}
	},
	create: {
		// max 2 eckte filters pp, rest is de synth vervormen.
		// meerdere filters kunnen aangeklikt wordne
		// filter 2 max op 20 zetten ipv 100
		pingpong: function (data) {
			var pingPong = new Tone.PingPongDelay(2 , 2).toMaster();;
		
			pingPong.wet.value = 0;
			audio.filters.pingpong = pingPong;
			
			// misschien moet je bij alles gewoon de wet aanpassen effect.wet.value = 0.5;

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
			// var hpFilter = new Tone.Filter(data.values.frequency, "highpass").toMaster();
			// // hpFilter.wet.value = 0;
			// // hpFilter.q.value = 1;
			// // hpFilter.rolloff = -96;
			// // audio.filters.highpass = hpFilter;
			// var autoFilter = new Tone.AutoFilter({
			// 	frequency    :0,
			// 	depth        :0,
			// }).toMaster().start();
			// autoFilter.filter.type = 'highpass';
			// autoFilter.wet.value = 0;
			// audio.filters.highpass = autoFilter;
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

