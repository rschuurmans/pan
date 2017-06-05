
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		changePage.onboarding()
		// changePage.init();
		deviceRotation.start();
		tips.init();

		if(path.indexOf('sequencer') !== -1) {
			sequencer.init();
			pp.setup();
			
		} else {
			cameraTracker.init();
			modulator.init();
			// changePage.sequencerNavigation();
			// modulateSocket();
			// changePage.selector();
			// inputEvent.slider();
			// modulate.events();
		}
	} else  if(path.indexOf('/demo') !== -1) { 
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
		changePage.init();
	}
	
}
window.onload = function () {
	console.log('load');
	init();

}

var socket = io();


socket.on('connect', function () {
	if(window.hasOwnProperty( "data" )) {
		console.log('going to join a room');

		socket.emit('joinRoom', data._id);
	
	}

	socket.on('updateSources', function (received) {
		console.log('received a updateSources', received);
		sources.update(received);
	})
	

	
	
})


var modulateSocket = function () {
	socket.on('updateSteps', function (received) {
		console.log('received a socket', received);
		data.steps[received.index] = received.step;
	})
}
var body = document.querySelector('body');

var animate = {
	splashDelay:100,
	shapeDelay:300,
	restartAnimations: function () {
		var animations = document.querySelectorAll('.fn-start-animation');
		
		for(var i = 0; i < animations.length;i++) {
				animations[i].classList.remove('animate-stagger');
				animations[i].style.opacity = 0;
				
				window.setTimeout(function (item) {
					item.classList.add('animate-stagger');
					item.style.opacity=  1;

				},5, animations[i])
		}

	},
	loginBackground: function() {
		var confettiWrapper = document.querySelector('.fn-confetti');
		var colors          = ["#56009C", "#DF1977", "#3038F2","#FFFF00", "#FF5500"];
		var amount          = Math.floor(Math.random() * 32) + 20;  

		
		var randomLocation = function (item) {
			item.style.left            = Math.floor(Math.random() * 90) + 0 + 'vw';
			item.style.top             = Math.floor(Math.random() * 100) + 0 + '%';
		}

		var createShape = function () {
			var color        = colors[Math.floor(Math.random() * colors.length)];
			var shapes       = ['<svg width="34px" height="31px" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->    <desc>Created with Sketch.</desc>    <defs></defs>    <g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g id="iPhone-7-Copy-68" transform="translate(-172.000000, -33.000000)" class="place-color">            <g id="bg">                <g id="animated" transform="translate(10.000000, 33.000000)">                    <polygon id="Polygon" points="179 0 195.167961 11.7467111 188.992349 30.7532889 169.007651 30.7532889 162.832039 11.7467111"></polygon>                </g></g></g></g></svg>', '<svg width="62px" height="64px" viewBox="0 0 62 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-34.000000, -162.000000)" stroke-width="8" class="place-stroke"><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><path d="M43,134.408029 L69.6816418,176 L16.3183582,176 L43,134.408029 Z" id="Triangle-2" transform="translate(43.000000, 153.500000) rotate(-27.000000) translate(-43.000000, -153.500000) "></path></g></g></g></g></svg>', '<svg width="66px" height="66px" viewBox="0 0 66 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-45.000000, -45.000000)" stroke-width="14" class="place-stroke" ><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><circle id="Oval-22" cx="68" cy="45" r="26"></circle></g></g></g></g></svg>']
			var item         = document.createElement('div');

			item.innerHTML   = shapes[Math.floor(Math.random() * shapes.length)];;

			var svg          = item.querySelector('svg');
			var size         = Math.floor(Math.random() * 50) + 25;

			item.className   += "block-confetti";
			svg.style.width  = size + 'px';
			svg.style.height = size + 'px';

			var fill   = svg.querySelector('.place-color');
			var stroke = svg.querySelector('.place-stroke');
			fill ? fill.style.fill = color : stroke.style.fyll = color;
			
			randomLocation(item);

			confettiWrapper.appendChild(item);
			window.setTimeout(function () {
				randomLocation(item);
			},200)
			window.setInterval(function () {
				randomLocation(item)
			}, 20000)
		}

		var index = 0;

		var loop = function () {
			window.setTimeout(function () {
				createShape();
				index++;

				if(index < amount) {
					loop();
				}
			}, animate.shapeDelay)
		}
		loop();

	},
	loginTransition: function () {
		var container = document.querySelector('.fn-splash');

		window.setTimeout(function () {
			container.classList.remove('splashtransition-active');
			body.setAttribute('splash', 'finished')
			animate.shapeDelay = 1000;
		}, animate.splashDelay);


	},
}

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




var events = {
	showStep: function (index) {
		var steps   = document.querySelectorAll('.fn-sequencer-item');

		if(steps.length && !recording.isRecording) {
			steps.forEach(function(step) {
				step.classList.remove('highlight');
			});
			steps[index].classList.add('highlight')
		} else {
			steps.forEach(function(step) {
				step.classList.remove('highlight')
			});
		}
	},
	showRotate: function (item) {
		body.setAttribute('rotate-active', true);
		item.parentNode.classList.add('rotate-active');
		events.sizeRotate(sequencer.getItemStep(item).frequency);
	},
	sizeRotate: function (value, item) {
		if(item) {
			var percentage  = (tools.getPercentage(value, 1200) * 70) / 100;
			var circleSize  = percentage / 10;

			var extraCircle = item.querySelector('.rotate-extra-circle');
			 extraCircle.style.transform='scale( '+ circleSize*2 +')';
			 extraCircle.style.borderWidth = percentage/2 + 'px';
		} else {
			var circles = document.querySelectorAll('.rotate-extra-circle');
			for(var i = 0;i < circles.length;i++) {
				circles[i].style.transform = 'scale(0)';
				circles[i].style.borderWidth = '0px';

			}

		}
	},
	hideRotate: function (item) {
		
		body.removeAttribute('rotate-active');
		item.parentNode.classList.remove('rotate-active');
		item.querySelector('.rotate-extra-circle').style.borderWidth = item.querySelector('.rotate-extra-circle').style.transform = null;
	},
	updateStepLocation: function () {
		// to be implemented, dot as in filter
	},
	
	
	
}



var modulator = {
	init: function () {
		var filters = document.querySelectorAll('.fn-modulate-btn');
      
	      filters.forEach(function(button) {
	        button.addEventListener('click', function(e) {
	          cameraTracker.trackElement(e.currentTarget);
	        });
	      });
	      
	      changePage.selector();
	      modulator.events.init();
	},
	events:  {
		init: function () {
			var form = document.querySelector('.fn-form-modulate');

			form.addEventListener('input', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
			form.addEventListener('change', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
		},
		active: function (element, index) {
			data.group.sources[index].active = element.checked;
			console.log(element.checked);
			modulator.events.sendSocket({
				value: element.checked,
				type: 'active', 
				id: index});

		},
		wavetype: function (element, index) {
			console.log('update waetype', element, index);
			data.group.sources[index].type = element.wavetype;
			modulator.events.sendSocket({
				value: element.getAttribute('wavetype'),
				type: 'wavetype', 
				id: index});

		},
		detune: function (element, index) {
			console.log('update detune', element, index);
			data.group.sources[index].detune = element.value;
			modulator.events.sendSocket({
				value: element.value,
				type: 'detune', 
				id: index});
		},
		sendSocket: function (newdata) {
			console.log('updating', newdata);
			sources.update[newdata.type](newdata)
			socket.emit('updateSources', {
				room: data.group._id,
				data: newdata
			});
		}
	},
	fillData: function (index) {
		inputEvent.slider();

		var elementData  = data.group.sources[parseInt(index)]
		var form         = document.querySelector('.fn-form-modulate');
		var wavetypes    = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');

		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider').value             = elementData.detune;
		form.querySelector('.fn-active').checked           = elementData.active;
		form.querySelector('.fn-slider-bg').style.clipPath = "polygon(0 0, "+elementData.detune +" % 0, "+elementData.detune+"% 100%, 0% 100%)";

		wavetypes.forEach(function(wavetype) {
			if(wavetype.getAttribute('wavetype') == elementData.type) {
				wavetype.checked = true;
			} else {
				wavetype.checked = false;
			}
		});

		inputEvent.setSliderBg(elementData.detune);
		inputEvent.radioSlider();

		
	},
	updateData: function (index) {
		
		
	},
}
var sequencer = {
	isRecording: false,
	newMelody: [],
	init: function() {
		tools.eachDomElement('.fn-sequencer-item', function (item) {
			events.updateStepLocation(item)
			var hammertime = new Hammer(item, {})
			sequencer.changeFrequency(hammertime);
			sequencer.toggleActive(hammertime)
		})
		recording.setup();
		adsr.changeEvent();
	},
	getItemStep : function (item) {
		var step = data.group.steps[parseInt(item.getAttribute('sequence-index'))];
		return step;
	},	
	
	receiveNewValue: function (newValue, item) {
		var frequency = sequencer.calculateFrequency(newValue, parseInt(item.getAttribute('max')));
		
		loop.holdTone(true, frequency)

	},
	calculateFrequency: function (perc, max) {

		var value = (perc * max) / 100;
		return value;
	
	},
	calculatePercentage: function (item) {
		var step = sequencer.getItemStep(item);
		console.log(step);
		var perc = (step.frequency * 100) / step.max;
		console.log('percentage is ', perc);
		
		return perc;
	
	},
	
	changeFrequency: function (hammertime) {
		var item = null;
		var closeFreq = function () {
			deviceRotation.stopListen(function (value) {
				sequencer.updateFrequency(item, value)
			});

			events.hideRotate(item);
		}
		var openFreq = function (e) {
			e.preventDefault();
			item = e.target;
			var percentage = sequencer.calculatePercentage(item);
			console.log(e.target);
			deviceRotation.listen(item, 'frequency', percentage);
			
			events.showRotate(item);
			loop.holdTone(true, sequencer.getItemStep(e.target).frequency);

			e.target.addEventListener('mouseup', closeFreq)
			e.target.addEventListener('touchend', closeFreq)
			e.target.addEventListener('touchcancel', closeFreq)
		}
		hammertime.on('press', function (e) {
			openFreq(e);
		})
	},
	toggleActive: function (hammertime) {
		hammertime.on('tap', function (e) {
			console.log(e.target);
			if(!recording.isRecording) {
				var index = e.target.getAttribute('sequence-index');
				tips.increaseTip('clickActive');
				console.log(data.group.steps[index], index);
				data.group.steps[index].active = !data.group.steps[index].active;
				
				e.target.classList.toggle('active');
				sequencer.sendSocket(data.group.steps[index], index)
			}
		
		});
	},
	updateActive: function () {
		var steps = document.querySelectorAll('.btn-sequencer');
		for(var i = 0; i < steps.length;i++) {
			if(data.group.steps[i].active) {
				steps[i].classList.add('active')
			} else {
				steps[i].classList.remove('active')
			}
		}
	},
	updateFrequency: function(item, newValue) {
		var frequency = sequencer.calculateFrequency(newValue, sequencer.getItemStep(item).max);
		events.updateStepLocation(item);

		var step = sequencer.getItemStep(item);
		step.frequency = frequency;

		sequencer.sendSocket(step, parseInt(item.getAttribute('sequence-index')))
		
		
		item.setAttribute('frequency', frequency)
		loop.holdTone(false);

		// 
	},
	sendSocket: function (step, index) {
		console.log(step);
		socket.emit('updateSteps', {
			room: data.group._id,
			step: data.group.steps[index],
			index: index
		});
	}
}
var adsr = {
	update: function (type, value) {
		// usage: adsr.update('sustain', 0.1);
		console.log('updating this in adsr', type, value);
		data.group.adsr[type] = value;
		var string = '[envelope][' + type + ']';
		for(var i in audio.sources) {
			audio.sources[i].envelope[type] = value;
		}
	},
	saveValue: function (percentage, item) {
		// var value = data.group.adsr[]
		console.log('saving this new value ', percentage, item);

	},
	changeEvent: function () {
		var sustainButton = document.querySelector('.fn-sustain');
		sustainButton.addEventListener('change', function (e) {
			console.log(e.currentTarget.value, e.currentTarget.checked);
			data.group.adsr[0].value = e.currentTarget.checked;
		})

		tools.eachDomElement('.fn-adsr-button', function (item) {
			var closeRotate = function () {
				deviceRotation.stopListen(function (percentage, item) {
					
					var type = item.getAttribute('type');
					var value = (percentage*parseInt(item.getAttribute('max')))/100;

					adsr.update(type, value);

					item.removeEventListener('mouseup', closeRotate)
					item.removeEventListener('touchend', closeRotate)
					item.removeEventListener('touchcancel', closeRotate)

				});
			};
			var openRotate = function (e) {

				var currentItem = e.target.getAttribute('type') ? e.target : e.target.parentNode;
				var type        = currentItem.getAttribute('type')
				var value       = data.group.adsr[type];
				
				var max = parseInt(currentItem.getAttribute('max'))
				var percentage = (value *100)/max;

				deviceRotation.listen(currentItem, 'adsr', percentage);

				e.target.addEventListener('mouseup', closeRotate)
				e.target.addEventListener('touchend', closeRotate)
				e.target.addEventListener('touchcancel', closeRotate)
			}
			var hammertime = new Hammer(item, {})
			hammertime.on('press', function (e) {
				e.preventDefault();
		
				openRotate(e);
			})
		})
		
	},
	receiveNewValue: function (perc, item) {
		
		var circle = item.querySelector('.rotate-extra-circle');
		circle.style.transform = 'scale('+( perc * 3)/100 +')';
	},
	
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
			room: data.group._id,
			frequency: value,
			start:start
		});
	}

}


var modulate = {
	
	sendSocket: function (newdata) {
		
		socket.emit('updateSources', {
			room: data.group._id,
			data: newdata
		});

	},
	changewavetype: function (newtype) {
		var currentData = modulate.getCurrentData();
		currentData.type = newtype;
		modulate.sendSocket({value: currentData.type, type: 'wavetype', id: currentData.id});

	},
	changeDetune: function (newvalue) {
		
	},
	getCurrentData : function () {
		var form = document.querySelector('.fn-form-modulate');
		var thisdata = data.group.sources[parseInt(form.getAttribute('active-index'))];
		return thisdata
	},
	wavetype: function () {
		var form = document.querySelector('.fn-wavetype');
		form.querySelector('.fn-input');
	}
}


var changePage = {
	showPage : function (page) {
		var allPages = document.querySelectorAll('.fn-changepage-page');
		body.setAttribute('current-page', page);

		for(var i = 0; i < allPages.length ; i++) {
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
				var pageIndex = parseInt(allPages[i].getAttribute('order'));
				body.setAttribute('current-index', pageIndex);

				changePage.setOrigin(allPages, pageIndex)
				
			} else {
				allPages[i].setAttribute('active', false);
			}
		}

	},
	setOrigin: function (pages, activeIndex) {
		for(var i = 0; i < pages.length;i++) {

			if(parseInt(pages[i].getAttribute('order')) == activeIndex) {
			} else if (parseInt(pages[i].getAttribute('order')) > activeIndex) {
				pages[i].setAttribute('origin', 'right')
			} else if (parseInt(pages[i].getAttribute('order')) < activeIndex ) {
				pages[i].setAttribute('origin', 'left')
			}
			pages[i].classList.add('pagetransition-slide')
		}
	},
	init: function () {
		var buttons = document.querySelectorAll('.fn-changepage-btn');
		changePage.setOrigin(document.querySelectorAll('.fn-changepage-page'), 0)
		for(var i = 0; i < buttons.length;i++) {
			buttons[i].addEventListener('click', function(e) {
				console.log(e.currentTarget);
				changePage.showPage(e.currentTarget.getAttribute('target-page'))
			});
		}
	},
	onboarding: function () {
		changePage.init();
		changePage.showPage('alert')
		// changePage.showPage('osc');
		// audio.setup();
		
		var buttonSeq = document.querySelector('.fn-start-sequence');
		if(buttonSeq) {
			buttonSeq.addEventListener('click', function () {
				audio.setup();
				changePage.showPage('sequencer')
			})
		}
		var buttonCalibrate = document.querySelector('.fn-start-calibrate');
		if(buttonCalibrate) {
			buttonCalibrate.addEventListener('click', function () {
				// document.querySelector('.fn-page-container').classList.remove(fil
				audio.setup();
				// cameraTracker.calibrate();
				changePage.showPage('calibrate')
			})
			
		}

		
	},
	selector: function (){
		var buttons = document.querySelectorAll('.fn-selector-buttons');
		changePage.showElement('0');

		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function (e) {
				changePage.showElement(e.currentTarget.getAttribute('target-element'));
			})
		};
	},
	showElement: function (index, button) {
		modulator.fillData(index);

		var buttons = document.querySelectorAll('.fn-selector-buttons');

		body.setAttribute('current-element', index)

		document.querySelector('.fn-active-bar-container').setAttribute('active', index);

		for(var i = 0; i < buttons.length ; i++) {
			if(i == index) {
				buttons[i].classList.add('active');
			} else {
				buttons[i].classList.remove('active');
			}
			
		}
	}
	
}



// 	swipeSlider: function (callback) {
// 		var panels = document.querySelectorAll('.fn-slider-item');
// 		var slider = document.querySelector('.fn-slider');
// 		var sensitivity = 25;
// 		var activeSlide = 0;
// 		var slideCount = panels.length;
// 		var timer;
// 		console.log(slideCount);

		
// 		// slider from: https://codepen.io/dangodev/pen/bpjrRg?editors=0011
// 		var goTo =  function (number) {
// 			console.log('go to', number);
// 			if( number < 0 ) {
// 				activeSlide = 0;
// 			} else if( number > slideCount - 1 ) {
// 				console.log('last');
// 				activeSlide = slideCount - 1;
// 			} else {
// 				activeSlide = number;
// 			}

// 			slider.classList.add( 'is-animating');

// 			var percentage = -( 100 / slideCount ) * activeSlide;

// 			slider.style.transform = 'translateX( ' + percentage + '% )';
// 			console.log(percentage, slider);
// 			clearTimeout( timer );
// 			callback(activeSlide)

// 			timer = setTimeout( function() {
// 				slider.classList.remove( 'is-animating' );
// 			}, 400 );

// 		}

// 		var sliderManager = new Hammer.Manager(slider);
// 		sliderManager.add(new Hammer.Pan({threshold: 0, pointers:0}))
// 		sliderManager.on('pan', function (e) {

// 		var percentage           = 100 / slideCount * e.deltaX / window.innerWidth;
// 		var percentageCalculated = percentage - 100 / slideCount * activeSlide;

// 		slider.style.transform = 'translateX( ' + percentageCalculated + '% )';

// 		if( e.isFinal ) {
// 			if( e.velocityX > 1 ) {
// 				goTo( activeSlide - 1 );
// 			} else if( e.velocityX < -1 ) {
// 				goTo( activeSlide + 1 )
// 			} else {
// 				if( percentage <= -( sensitivity / slideCount ) ) {
// 					goTo( activeSlide + 1 );
// 				}
// 				else if( percentage >= ( sensitivity / slideCount ) ) {
// 					goTo( activeSlide - 1 );
// 				} else {
// 					goTo( activeSlide );
// 				}
				
// 			}
// 		}
// 		})
			  
// 	},	
	
// 	swipePages: function (startPage) {
// 		changePage.showPage(startPage);
		
// 		var body       = document.querySelector('body');
// 		var hammertime = new Hammer(body, {});
// 		hammertime.on('swipeleft', function(ev) {
// 			changePage.showPage('osc');
// 		});
// 		hammertime.on('swiperight', function(ev) {
// 			changePage.showPage('filters');
// 		});
// 	},



var inputEvent = {
	slider: function () {
		var slider = document.querySelector('.fn-slider');
		
		
		slider.addEventListener('input', function (e) {
			inputEvent.setSliderBg(e.currentTarget.value);
		})
	},

	setSliderBg: function (value) {
		var sliderBg = document.querySelector('.fn-slider-bg');
		sliderBg.style.clipPath = 'polygon(0 0, '+value+'% 0, '+value+'% 100%, 0% 100%)';
	},
	radioSlider: function () {
		var radioWrapper = document.querySelector('.fn-radio-slider');
		var inputs = radioWrapper.querySelectorAll('.fn-input');
		
		inputs.forEach(function(element) {
			inputEvent.radioSliderEvent(element, radioWrapper)
		});
	},
	radioSliderEvent: function (element, radioWrapper) {
		if(element.checked) {
			radioWrapper.setAttribute('active-radio', element.id);
		}
		element.addEventListener('change', function (e) {
			radioWrapper.setAttribute('active-radio', e.currentTarget.id);
		})
	},
	sources: function (index) {
		var form = document.querySelector('.fn-form-modulate');
	}
}

var deviceRotation = {
		firstTime   : null,
		startCompass: null,
		lastCompass : null,
		timesRotated: 0,
		newValue    : null,
		type:null,
		currentItem: null,
		startPerc: null,
		start: function (item) {
			window.addEventListener('deviceorientation', deviceRotation.event);
			
		},
		stop:function (callback) {
			window.removeEventListener('deviceorientation', deviceRotation.event);
			
			callback(deviceRotation.newValue, deviceRotation.currentItem)

			deviceRotation.firstTime    = null;
			
			deviceRotation.timesRotated = 0;
			deviceRotation.lastCompass  = null;
			
		},
		listen:function (item, type, perc) {
			console.log('start listening', item, type);
			deviceRotation.currentItem = item;
			deviceRotation.type = type;
			deviceRotation.startPerc = perc;
		},
		stopListen:function (callback) {
			console.log('stop listen');
			callback(deviceRotation.newValue, deviceRotation.currentItem)

			deviceRotation.startCompass = null;
			deviceRotation.lastCompass  = null;
			deviceRotation.currentItem  = null;
			deviceRotation.timesRotated = 0;
			deviceRotation.type         = null;
			deviceRotation.newValue     = null;
			deviceRotation.currentItem  = null;
			deviceRotation.startPerc    = null;;
			
		},
		calibrated: function (timestamp) {
			if(!deviceRotation.firstTime) {
				deviceRotation.firstTime = timestamp;
				return false;
			} else {
				if((timestamp - deviceRotation.firstTime) > 500) {
					return true;
				} else {
					return false;
				}
			}
		},
		checkAroundCompass: function(currentCompass) {
			if(deviceRotation.lastCompass) {
				if(Math.abs(currentCompass - deviceRotation.lastCompass) > 100 ?  true : false) {
					if(deviceRotation.lastCompass > currentCompass) {
							deviceRotation.timesRotated++;
						} else {
							deviceRotation.timesRotated--;
						}
				}
			}
		},
		sendValues: function (value) {
			if(deviceRotation.type == 'frequency') {
				sequencer.receiveNewValue(value, deviceRotation.currentItem);
			} else if (deviceRotation.type == 'adsr') {
				adsr.receiveNewValue(value, deviceRotation.currentItem);
			}
		},
		getValue: function (currentCompass) {
			var value = (deviceRotation.timesRotated * 360) + (currentCompass - deviceRotation.startCompass);
			
			if(value > 50) {
				value = 50;
			} else if (value < -50) {
				value = -50;
			}
			value = value + 50;
			var difference = 50 - deviceRotation.startPerc ;
			value = value - difference;
			return value;
		},
		event: function (e) {
			if(deviceRotation.calibrated(e.timeStamp) && deviceRotation.currentItem) {
				if(!deviceRotation.startCompass) {
					deviceRotation.startCompass = e.webkitCompassHeading;
				} else {
					deviceRotation.checkAroundCompass(e.webkitCompassHeading);
					var value =deviceRotation.newValue = deviceRotation.getValue(e.webkitCompassHeading);
					

					deviceRotation.sendValues(value);
					deviceRotation.lastCompass = e.webkitCompassHeading;
				}


			}



		},
		
		
		
	}

var postData = {
	groupList: function () {
		var listItems    = document.querySelectorAll('.fn-grouplist-item');
		var randomButton = document.querySelector('.fn-random');

		listItems.forEach(function(listItem) {
			listItem.addEventListener('click', function (e) {
				postData.groupListPost({
					username:user.username,
					id: e.currentTarget.getAttribute('group-id'), 
					newGroup:false
				})
				
			})
		});

		randomButton.addEventListener('click', function(e) {
			e.preventDefault();
			postData.groupListPost({
				username:user.username, 
				newGroup:true
			})
		});
	},
	groupListPost: function (data) {
		console.log(data);
		var query = "username=" + data.username + "&newGroup=" + data.newGroup + "&id=" + data.id;

		postData.request('/createGroup', 'POST', query, function (response) {
			window.location = '/role/' + response.role + '/' + response.userId + '/' + response.groupId;
		});
	},
	username: function () {
		console.log('username');
		var form  = document.querySelector('form');
		var input = form.querySelector('input[type="text"]');
		console.log(form);
		postData.formSubmit(form, input, function () {
			changePage.showPage('group-list');
		})
	},
	formSubmit: function (form, input, cb) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			user.username = input.value.trim();
			cb();
			
		})
	},
	request: function (url, type, query, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
		        // Request finished. Do processing here.
		        console.log(xhr);
		        cb(JSON.parse(xhr.response))
		    }
		}
		xhr.send(query); 
		
	}
}
var tips = {
	textDOM: null,
	allTips:[],
	tipMemory:null,
	currentTip: 0,
	init:function () {
		tips.textDOM = document.querySelector('.fn-info');
		tips.tipMemory =tips.textDOM.innerHTML;
		tips.allTips = data.tips;


	},
	increaseTip: function (cond) {
		console.log('trying to increase tip ', cond);
		console.log(data.tips);
		// for(var i in data.tips) {
		// 	console.log(data.tips[i].cond, cond, data.tips[i].cond == cond );
		// 	if(data.tups[i].cond)
		// }
		if(cond == 'clickActive' && tips.currentTip == 0) {
			tips.newTip();
		} else if(cond == 'changefreq' && tips.currentTip == 1) {
			tips.newTip();
		} else if(cond == 'rec' && tips.currentTip == 2) {
			tips.newTip();
		} else if(cond == 'adsr' && tips.currentTip == 3) {
			tips.newTip();
		}

	},
	newTip: function () {
		tips.currentTip++;
		tips.textDOM.classList.add('tip-animation')
		setTimeout(function () {
			tips.textDOM.innerHTML = tips.tipMemory = data.tips[tips.currentTip].text;
		}, 250)

	},
	textboxContent: function (content) {
		var box = document.querySelector('.fn-info');
		
		console.log(box, content);
		if(!content) {
			box.innerHTMLv= tips.tipMemory;
		} else {
			box.innerHTML = content;
		}

	}
}
var tools = {
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
		}

	},
	submitForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var username = form.querySelector('.fn-username').value;
			$.post('/login', {username:username})
		})
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
	eachDomElement: function (selector,callback) {
		var items   = document.querySelectorAll(selector);

		for(var i = 0; i < items.length;i++) {
			callback(items[i])
		}
	},
	getPercentage: function (value, max) {
		return (value*100)/max;
	},
	valueInObject: function (obj,param,  value) {
		var match = null;
		obj.forEach(function(elem) {
			if(elem[param] == value) {
				match = elem
			}
		});
		return match;
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

var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  size:0,
  lowSize:1023,
  highSize:11554,
  calibrated: 0,
  tracker: null,
  stop: false,
  

  init: function () {
    
     cameraTracker.video   = document.querySelector('.fn-video-calibrate');
     cameraTracker.canvas  = document.querySelector('.fn-canvas-calibrate');
     cameraTracker.context = cameraTracker.canvas.getContext('2d');
      cameraTracker.calibrate();
  },  
  
  calibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonStop   = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    var first        = true;
    var tracker      = new tracking.ColorTracker(['yellow']);
    var trackThing   = tracking.track(cameraTracker.video, tracker, { camera: true });
  
    tracker.on('track', function(event) {
      
      if(first) {
        first = !first;
        cameraTracker.canvas.height = cameraTracker.video.offsetHeight;
        cameraTracker.canvas.width  = cameraTracker.video.offsetWidth;
      }
      cameraTracker.context.clearRect(0, 0, 600, 500);
      cameraTracker.drawRectangle(event.data, cameraTracker.context, tracker.colors[0])
    });

    document.querySelector('.calibrate-done').addEventListener('click', function(e) {
        trackThing.stop();
        changePage.showPage('filters')
        
    });

    buttonTop.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
    })
    
    buttonBottom.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
    })
  },

  startElementTracking: function (callback, element) {
    var tracker = new tracking.ColorTracker(['yellow']);
    var trackThing = tracking.track(cameraTracker.video, tracker, { camera: true})
    

    tracker.on('track', function(event, trackThing) {
        var data = event.data[0];
        if(data) {
          var size = data.width * data.height;
          
          if(size < cameraTracker.highSize) {
            body.setAttribute('tracking-status', 'high');
          } else if (size > cameraTracker.lowSize) {
            body.setAttribute('tracking-status', 'low');
          } else {
            body.setAttribute('tracking-status', 'ok');
            var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
            var percentage       = ((size - cameraTracker.highSize) / calculateableNum) * 100;
            callback(percentage)
          }
           
         
        }
    });
    element.addEventListener('click', function (e) {
      trackThing.stop();
      e.target.removeEventListener('click', arguments.callee)
    })

  },

  saveCalibrate: function (button, type, value) {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');

    if(value !== 0) {
      button.classList.add('checked')
      cameraTracker[type] = button.innerHTML = cameraTracker.size;

      if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
      buttonTop.parentNode.classList.add('finished');
      }
    }
  },
  
  drawRectangle: function (data, context, color) {
    data.forEach(function(rect) {
      rect.color         = color;
      context.fillStyle  = rect.color;
      cameraTracker.size = rect.width * rect.height;

      context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
      
  },
  trackElement: function(element) {
      if(!element.classList.contains('active')) {
      body.setAttribute('tracking', element.getAttribute('filter-index'))
      element.classList.add('active');
        cameraTracker.startElementTracking(function (value) {
          filters.update(element.getAttribute('modulate-type'), value)
        }, element);
       
    } else {
      body.removeAttribute('tracking')
      element.classList.remove('active');
      cameraTracker.stop = true;
    }
  },
}
  
var user = {
	username: null
}