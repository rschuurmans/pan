// // todo : 
// - adsr
// 	update
// - filters
// 	update
// 	init
// - save data to backend
// - sockets
// - leave group on leave website
// - presstart ios 
// - border size sequencer based on value
// - test rotate steps frequency
// - scss cleanup
// - start rotate listener at open
// - tilt for volume
// - visual connect with sequencer/modulator
// - group.sources is just one in modulator
// tooltips/tutorial
// remove unused functions
// ipv decay een knop om de toon te holden
// check if this is the way S&H actually works
// also: sample and hold doesnt work if step is not active - problem?


var audioContext = StartAudioContext(Tone.context, ".fn-start-sequece");
var audio = {
	sources:[],
	filters:[],
	scale: [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
	envelope:null,
	defTime: "8n",
	setup: function () {
		audio.testValues();
		sources.setup();
		loop.waitSocket();
		// loop.startWithoutSocket();
	},
	triggerAttack: function (freq, time) {
		audio.triggerRelease();
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

	testValues: function() {
		
		
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
				
				recording.buttons.forEach(function(button) {
					button.addEventListener('click', recording.event)
				});
			} else {
				recording.finishRecording(e);
			}
		})
	},
	event: function (e) {
		var index = e.currentTarget.getAttribute('sequence-index');

		recording.melody.push(audio.scale[index]);
		audio.triggerAttack(audio.scale[index], '8n');
		

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
	startWithoutSocket: function () {
		loop.start(4000);
	},
	playStep: function (active, frequency, time) {
		
		if(active && !loop.hold && !recording.isRecording) {
			audio.triggerAttack(frequency);
			if(!data.group.adsr[0].value) {
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
				
				sources.create[data.group.synth.type](i);

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
		
		active: function (received) {
			if(received.value) {
				sources.create[data.group.synth.type](received.id);
				filters.connectSingleSource(received.id);
			} else {
				sources.remove(received.id);
			}
		},
		detune: function (received) {
			for(var i in audio.sources) {
				if(audio.sources[i].id == received.id) {
					audio.sources[i].detune.input.value = received.value;
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
		},
		amSynth: function (id) {
			var synth = new Tone.AMSynth(sources.create.parseData(id))
			synth.id = id;

			audio.sources.push(synth)

		},
		fmSynth: function (id) {
			
			var sourceData = data.group.sources[id];
			
			var synth = new Tone.FMSynth({
				oscillator: {
					type: sourceData.type
				},
				harmonicity:1,
				modulationIndex:1,
				envelope: {
					attack: data.group.adsr.attack,
					decay: data.group.adsr.decay,
					sustain: .5,
					release: data.group.adsr.release
				}
			});

			// could be a filteR: harmonicity:1 icm modulationIndex

			synth.id = id;

			audio.sources.push(synth)
		},
		
		MembraneSynth: function (id) {
			data.group.adsr[0].value = false;
			for(var i in data.group.steps) {
				data.group.steps[i].frequency = data.group.steps[i].frequency - 400;
			}

			var synth = new Tone.MembraneSynth();
			synth.id = id;

			audio.sources.push(synth)
			synth.triggerAttackRelease("C2", "8n");
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
					attack: data.group.adsr.attack,
					decay: data.group.adsr.decay,
					sustain: .5,
					release: data.group.adsr.release
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
			// var polySynth = new Tone.PolySynth(4, Tone.Synth).chain(distortion, tremolo, Tone.Master)
		for(var i in audio.sources) {
			for(var y in audio.filters) {
				audio.sources[i].connect(audio.filters[y])
			}

		}

	},
	connectSingleSource: function (id) {
		for(var y in audio.filters) {
				audio.sources[id].connect(audio.filters[y])
			}
		},
	create: {
		pingpong: function (data) {
			var pingPong = new Tone.PingPongDelay(2 , 2).toMaster();;
			console.log(pingPong.wet);
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
			var chorus = new Tone.Chorus({
				frequency:0,
				delayTime: data.values.delayTime,
				depth: data.values.delayTime/2,
				feedback: data.values.feedback
			}).toMaster();
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
		lowpass: function () {
			// ik hoor hier geen verschil
			// var filter = new Tone.Filter(100, "lowshelf").toMaster();
			// console.log(filter);
			// audio.filters.push(filter)
		},
		distortion: function (data) {
			var dist = new Tone.Distortion({
				distortion: data.values.distortion,
				oversample: data.values.oversample
			}).toMaster();
			dist.wet.value = 0;
			audio.filters.distortion = dist;

		},
		

	},
	update: function (type, value) {
			console.log('receiving an update for', type, value);
			audio.filters[type].wet.value = value/100;
			console.log(audio.filters[type]);
	}
}

