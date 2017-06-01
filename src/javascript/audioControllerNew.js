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


var audioContext = Tone.context;

var audio = {
	sources:[],
	envelope:null,
	defTime: "8n",
	setup: function () {
		audio.testValues();
		sources.setup();
		loop.waitSocket();
		// loop.startWithoutSocket();
	},
	triggerAttack: function (freq, time) {
		for(var i in audio.sources) {
			if(time) {
				audio.sources[i].triggerAttackRelease(freq, audio.defTime, time )
			} else {
				audio.sources[i].triggerAttack(freq)
			}
		}
	},
	testValues: function() {
		data.adsr = {
			atack : 0.5,
			decay: 0.9,
			release:1,
			sustain:2
		}
		
	}
}

var events = {
	showStep: function (index) {
		var steps   = document.querySelectorAll('.fn-sequencer-item');

		if(steps.length) {
			steps.forEach(function(step) {
				step.classList.remove('highlight');
			});
			steps[index].classList.add('highlight')
		}
	},
	showRotate: function (item) {
		// this should be somewhere else
		loop.holdTone(true, parseInt(item.getAttribute('frequency')));
		// this is fine
		body.setAttribute('rotate-active', true);
		item.parentNode.classList.add('rotate-active');
		events.sizeRotate(parseInt(item.getAttribute('frequency')))
	},
	sizeRotate: function (value) {
		var percentage  = (tools.getPercentage(value, 1200) * 70) / 100;
		var circleSize  = percentage / 10;
		var extraCircle = deviceRotation.currentItem.querySelector('.rotate-extra-circle');
		 
		 extraCircle.style.transform='scale( '+ circleSize*2 +')';
		 extraCircle.style.borderWidth = percentage/2 + 'px';
	},
	hideRotate: function (item) {
		body.removeAttribute('rotate-active');
		item.parentNode.classList.remove('rotate-active');
		item.querySelector('.rotate-extra-circle').style.borderWidth = item.querySelector('.rotate-extra-circle').style.transform = null;
	},
	updateStepBorder: function(item) {
		var percentage = 70 * parseInt(item.getAttribute('frequency'));
		percentage = percentage / parseInt(item.getAttribute('max'));
		
		item.style.background = "-moz-radial-gradient(rgba(0,0,0,5) "+percentage+"%, #3038F2 "+percentage+"%)";
		item.style.background = "-webkit-radial-gradient(rgba(0,0,0,5) "+percentage+"%, #3038F2 "+percentage+"%)";
	},
	
}

var sequencer = {
	init: function() {

		tools.eachDomElement('.fn-sequencer-item', function (item) {
			var hammertime = new Hammer(item, {})
			sequencer.changeFrequency(hammertime);
			sequencer.toggleActive(hammertime)
		})
		sequencer.sampleHold();
	},
	sampleHold: function () {
		var button = document.querySelector('.fn-seq-sh');

		var openGate = function () {
			
			loop.holdTone(true);
			button.classList.add('active');
		}
		var closeGate = function () {
			
			button.classList.remove('active');
			loop.holdTone(false);
		}
		button.addEventListener('touchstart', openGate)
		button.addEventListener('moousedown', openGate)
		button.addEventListener('mouseup', openGate)
		button.addEventListener('touchend', closeGate)
		button.addEventListener('touchcancel', closeGate)
	},
	changeFrequency: function (hammertime) {
		var item = null;
		var closeFreq = function () {
			deviceRotation.stopListen(function (value) {

				sequencer.updateFrequency(item, value)
			});
			events.showRotate(item);
		}
		var openFreq = function (e) {
			e.preventDefault();
			item = e.target;
			deviceRotation.listen(item);
			events.hideRotate(item);

			e.target.addEventListener('touchend', closeFreq)
			e.target.addEventListener('touchcancel', closeFreq)
		}
		hammertime.on('press', function (e) {
			openFreq(e);
		})
	},
	toggleActive: function (hammertime) {
		hammertime.on('tap', function (e) {
			var index = e.target.getAttribute('sequence-index');

			data.steps[index].active = !data.steps[index].active;
			
			e.target.classList.toggle('active');

			socket.emit('updateSteps', {
				room: data._id,
				steps: data.steps
			});
		});
	},
	
	updateFrequency: function(item, newfrequency) {
		var freq = parseInt(item.getAttribute('frequency')) + newfrequency;
		
		freq < 0 ? freq = 0 : false;
		
		item.setAttribute('frequency', freq)
		loop.holdTone(false);

		events.updateStepBorder(item);
	},
		
}

var loop = {
	stopped: true,
	index:0,
	hold:false,
	holdTone: function(start, freq) {
		if(start) {
			loop.hold = true;
			
			freq ? freq : data.steps[loop.index].frequency;
			
			audio.triggerAttack(freq);
		} else {
			loop.hold = false;
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
		if(active && !loop.hold) {
			audio.triggerAttack(frequency, time)
		}
	},
	increaseIndex: function () {
		loop.index++;
		if(loop.index == data.steps.length) {
			loop.index = 0;
		}
	},
	start: function () {
		loop.stopped = false;

		var delay = loop.calculateDelay(data.steps.length);

		var toneLoop = new Tone.Loop(function (time) {
			
			loop.playStep(data.steps[loop.index].active, data.steps[loop.index].frequency, time)

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
var adsr = {
	update: function (type, value) {
		// usage: adsr.update('sustain', 0.1);
		
		data.adsr[type] = value;
		var string = '[envelope][' + type + ']';
		for(var i in audio.sources) {
			audio.sources[i].envelope[type] = value;
		}
	}
}

var pp = {
	setup: function () {
		tools.eachDomElement('.fn-pp-button', function (button) {
			button.addEventListener('touchstart',pp.openGate)
			button.addEventListener('touchend',pp.closeGate)
			button.addEventListener('touchcancel', pp.closeGate)
		});
	},
	openGate: function (e) {
		var value = e.currentTarget.getAttribute('pp-value');

		loop.holdTone(true, value);
		e.currentTarget.classList.add('active');
		pp.sendSocket(true);
	},
	closeGate: function(e) {
		var value = e.currentTarget.getAttribute('pp-value');

		e.currentTarget.classList.remove('active');
		loop.holdTone(false);
		pp.sendSocket(false, value)
	},
	sendSocket: function (start, value) {
		socket.emit('holdStep', {
			room: data._id,
			frequency: value,
			start:start
		});
	}

}

var filters = {

}

var sources = {
	setup:function () {
		sources.createSources();
		sources.setDetune();
	
	},
	createSources: function () {
		
		for(var i in data.sources) {
			if(data.sources[i].active) {
				sources.create(i);
			}

		};
	},
	update: function (received) {
		console.log('updating this', received);
		console.log();
		data.sources[received.id][received.type] == received.value;
		if(received.type == 'active') {

			sources.toggleActive(received.id, received.value)
		} else if(received.type == 'detune') {
			sources.updateDetune(received.id, received.value);
		} else if (received.type == 'waveType') {
			sources.changeWavetype(received.id, received.value);
		}
		// data.sources = received.sources;
		// for(var i in received.sources) {
		// 	for(var y in audio.sources) {
		// 		if(audio.sources[y].id == i) {
		// 			audio.sources[y].detune.input.value = received.sources[i].detune;
		// 		}
		// 	}
		// }
	},
	changeWavetype: function (id, value) {
		for(var i in audio.sources) {
			console.log(audio.sources[i].id == id, audio.sources[i].id , id);
			if(audio.sources[i].id == id) {
				audio.sources[i].oscillator.type = value;
				console.log(audio.sources[i].oscillator.type ,value);
			}
		}
	},
	toggleActive: function (id, active) {
		console.log('acitve?', active);
		if(active) {
			sources.create(id);
		} else {
			sources.remove(id);
		}
	},
	updateDetune: function (id, value) {
		for(var i in audio.sources) {
			console.log(audio.sources[i].id == id, audio.sources[i].id , id);
			if(audio.sources[i].id == id) {
				audio.sources[i].detune.input.value = value;
			}
		}
	},
	create: function (id) {
		var sourceData = data.sources[id];

		var synth = new Tone.Synth({
			type:sourceData.type,
			envelope: {
				attack: data.adsr.attack,
				decay: data.adsr.decay,
				sustain: data.adsr.sustain,
				release: data.adsr.release
			}
		}).toMaster();
		synth.id = id;
		console.log(synth, id);
		audio.sources.push(synth)
	},
	remove: function (id) {
		console.log('removing this');
		for(var i in audio.sources) {
			console.log(audio.sources[i] == id, audio.sources[i] , id);
			if(audio.sources[i].id == id) {
				console.log('removing:', audio.sources[i]);
				audio.sources.splice(i, 1);
				console.log('after:', audio.sources);
			}
		}
	},
	setDetune: function () {
		for(var i in audio.sources) {
			audio.sources[i].detune.input.value = data.sources[parseInt(audio.sources[i].id)].detune;
		};
			
	},
	setSingleDetune: function (index, value) {

	}
}

var modulate = {
	events: function() {
		var form = document.querySelector('.fn-form-modulate');
		
		

		
		form.querySelector('.fn-active').addEventListener('change', function (e) {
			var currentData = modulate.getCurrentData();
			console.log('e', e.currentTarget.checked, currentData);
			currentData.active = e.currentTarget.checked;

			modulate.sendSocket({value: currentData.active, type: 'active', id: currentData.id});
		});
		form.querySelector('.fn-slider').addEventListener('change', function (e){
			var currentData = modulate.getCurrentData();
			currentData.detune = e.currentTarget.value;
			modulate.sendSocket({value: currentData.detune, type: 'detune', id: currentData.id});
		})
		inputEvent.radioSlider();

		
	
		
	},
	sendSocket: function (newdata) {
		console.log('sending this socket', newdata);
		
		socket.emit('updateSources', {
			room: data._id,
			data: newdata
		});

	},
	changeWavetype: function (newtype) {
		var currentData = modulate.getCurrentData();
		currentData.type = newtype;
		modulate.sendSocket({value: currentData.type, type: 'waveType', id: currentData.id});

	},
	changeDetune: function (newvalue) {
		
	},
	getCurrentData : function () {
		var form = document.querySelector('.fn-form-modulate');
		var thisdata = data.sources[parseInt(form.getAttribute('active-index'))];
		console.log('thisdata', thisdata);
		return thisdata
	},
	waveType: function () {
		var form = document.querySelector('.fn-wavetype');
		form.querySelector('.fn-input');
	}
}

