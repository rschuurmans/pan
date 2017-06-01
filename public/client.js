var body = document.querySelector('body');

var onLoad = function () {

	var path = window.location.pathname;

	if(path.indexOf('/role') !== -1) {
		audio.setup();
		if(path.indexOf('sequencer') !== -1) {
			sequencer.init();
			pp.setup();
			changePage.sequencerNavigation();
		} else {
			changePage.swipePages('osc');
			
			changePage.selector();
			inputEvent.slider();
			modulate.events();
		}
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
	}

	// if(path.indexOf('/role/modulator') !== -1) {
		
	// 	// modulateRole.init();
	// 	// changePage.swipePages('osc');
	// 	// changePage.selector();
	// 	// inputEvent.slider();

	// 	// inputEvent.radioSlider();

	// } else if(path.indexOf('/role/sequencer') !== -1) {
	// 	audio.setup();
		
	// 	// changePage.sequencerNavigation();
	// 	// sequencerRole.init();
	// } else {
	// 	// animate.loginBackground();
	// 	// animate.loginTransition();
	// 	// postData.username();
	// 	// postData.groupList();
	// }


	
}




window.onload = function () {
	onLoad();

}

var socket = io();


socket.on('connect', function () {
	if(window.hasOwnProperty( "data" )) {
		console.log('going to join a room');

		socket.emit('joinRoom', data._id);
	
	}

	socket.on('updateSources', function (data) {
		console.log('received a socket', data);
		sources.update(data);
	})

	
	
})



var body = document.querySelector('body');

var animate = {
	splashDelay:100,
	shapeDelay:300,
	restartAnimations: function () {
		var animations = document.querySelectorAll('.fn-start-animation');
		
		for(var i = 0; i < animations.length;i++) {
				animations[i].classList.remove('animate-stagger');
				animations[i].style.opacity=0;
				window.setTimeout(function (item) {
					item.classList.add('animate-stagger');
					item.style.opacity=1;

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


var changePage = {
	showPage: function (page)  {
		
		var allPages = document.querySelectorAll('.fn-transition-page');
		var body     = document.querySelector('body');

		body.setAttribute('current-page', page)
		for(var i = 0; i < allPages.length ; i++) {
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
			} else {
				allPages[i].setAttribute('active', false);
			}
		}
	},
	sequencerNavigation: function () {
		var buttons = document.querySelectorAll('.fn-nav-buttons');
		changePage.showPage('sequencer');
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				changePage.showPage(e.currentTarget.getAttribute('target-page'));
				animate.restartAnimations();
			})
		};
	},
	swipePages: function (startPage) {
		changePage.showPage(startPage);
		
		var body       = document.querySelector('body');
		var hammertime = new Hammer(body, {});
		hammertime.on('swipeleft', function(ev) {
			changePage.showPage('osc');
		});
		hammertime.on('swiperight', function(ev) {
			changePage.showPage('filters');
		});
	},
	showElement: function (index, button) {
		changePage.updateData(index);

		var buttons     = document.querySelectorAll('.fn-selector-buttons');

		body.setAttribute('current-element', index)
		document.querySelector('.fn-active-bar-container').setAttribute('active', index);
		for(var i = 0; i < buttons.length ; i++) {
			if(i == index) {
				buttons[i].classList.add('active');
			} else {
				buttons[i].classList.remove('active');
			}
			
		}
		
		

	},
	updateData: function (index) {
		console.log('updating the data');
		var elementData = data.sources[parseInt(index)]
		var form        = document.querySelector('.fn-form-modulate');
		var wavetypes   = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');
		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider').value = elementData.detune;
		form.querySelector('.fn-active').checked = elementData.active;
		form.querySelector('.fn-slider-bg').style.clipPath = "polygon(0 0, "+elementData.detune +" % 0, "+elementData.detune+"% 100%, 0% 100%)";

		wavetypes.forEach(function(wavetype) {
			console.log(wavetype.getAttribute('wavetype') , elementData.type, wavetype.getAttribute('wavetype') == elementData.type);
			if(wavetype.getAttribute('wavetype') == elementData.type) {
				wavetype.checked = true;
			} else {
				wavetype.checked = false;
			}
			inputEvent.radioSliderEvent(wavetype, radioWrapper)
		});
		

		inputEvent.setSliderBg(elementData.detune);

	},
	selector: function (){
		var buttons = document.querySelectorAll('.fn-selector-buttons');
		changePage.showElement('0');
		console.log('e');
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				changePage.showElement(e.currentTarget.getAttribute('target-element'));


			})
		};
	}
}

var inputEvent = {
	slider: function () {
		var slider = document.querySelector('.fn-slider');
		
		
		slider.addEventListener('input', function (e) {
			console.log(e.currentTarget);
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
			console.log('--change');
			console.log(e.currentTarget);
			radioWrapper.setAttribute('active-radio', e.currentTarget.id);
			modulate.changeWavetype(e.currentTarget.getAttribute('wavetype'))
		})
	}
}

var deviceRotation = {
		firstTime   : null,
		startCompass: null,
		lastCompass : null,
		timesRotated: 0,
		newValue    : null,
		callback: null,
		currentItem: null,
		start: function (item) {
			window.addEventListener('deviceorientation', deviceRotation.event);
			
		},
		stop:function (callback) {
			window.removeEventListener('deviceorientation', deviceRotation.event);
			
			callback(deviceRotation.newValue)

			deviceRotation.firstTime    = null;
			
			deviceRotation.timesRotated = 0;
			deviceRotation.lastCompass  = null;
			
		},
		listen:function (item) {
			deviceRotation.currentItem = item;
		},
		stopListen:function (callback) {
			callback(deviceRotation.newValue)

			deviceRotation.startCompass = null;
			deviceRotation.lastCompass = null;
			deviceRotation.currentItem  = null;
			deviceRotation.timesRotated = 0;
			deviceRotation.newValue     = null;

			
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

		event: function (e) {
			if(deviceRotation.calibrated(e.timeStamp) && deviceRotation.currentItem) {
				if(!deviceRotation.startCompass) {
					deviceRotation.startCompass = e.webkitCompassHeading;
				} else {
					deviceRotation.checkAroundCompass(e.webkitCompassHeading);
					deviceRotation.newValue    = (deviceRotation.timesRotated * 360) + (e.webkitCompassHeading - deviceRotation.startCompass);;
					deviceRotation.lastCompass = e.webkitCompassHeading;
					var frequency = parseInt(deviceRotation.currentItem.getAttribute('frequency')) + deviceRotation.newValue;
					events.sizeRotate(frequency)
				}


			}



		}
		
		
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
		postData.request('/createGroup', 'POST', JSON.stringify(data), function (response) {
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
	request: function (url, type, data, cb) {
		$.ajax({
			type:type,
			data: data,
			contentType: 'application/json',
			url:url,
			success: function (response) {
				cb(response)
				
			}
		})
	}
}
var tone = {
	init:function () {
		var distortion = new Tone.Distortion(1)


		var synth = new Tone.Synth({
	oscillator : {
  	type : 'sine',
    modulationType : 'sawtooth',
    modulationIndex : 3,
    harmonicity: 3.4
  },
  envelope : {
  	attack : 0.001,
    decay : 1,
    sustain: 1,
    release: 0.1
  }
}).chain(distortion, Tone.Master)
		var index = 0;
		var event = [
	{ time: 0, note : 220, dur : '4n'},
	{ time: '4n + 8n', note : 440, dur : '8n'},
	{ time: '2n', note : 550, dur : '16n'},
	{ time: '2n + 8t', note : 880, dur : '4n'}
]

		var loop = new Tone.Loop(function(time){
			console.log(time);
			
			console.log(index);
			synth.triggerAttackRelease(event[index].note, "8n", time)
			index++;
			if(index >3) {
				index = 0;
			}
		}, "4n")
		loop.start(0)

// 		var tones = [220,'B1','D1','E1','C2','B4','D2','E3']
// var event = [
// 	{ time: 0, note : 220, dur : '4n'},
// 	{ time: '4n + 8n', note : 440, dur : '8n'},
// 	{ time: '2n', note : 550, dur : '16n'},
// 	{ time: '2n + 8t', note : 880, dur : '4n'}
// ]
// var part = new Tone.Part(function(time, event){
// 	console.log('here');
// 	//the events will be given to the callback with the time they occur

// 	synth.triggerAttackRelease(event.note, event.dur, time)
// }, event)

// //start the part at the beginning of the Transport's timeline
// part.start(0)

// //loop the part 3 times
// part.loop = 3
// part.loopEnd = '1m'

		var playing = false;
		document.querySelector('.fn-seq-sh').addEventListener('click', function(e){
			console.log(playing);
			if (!playing){
				Tone.Transport.start('+0.1');
				playing=true;
			} else {
				Tone.Transport.stop()
				playing=false;
			}
		})
		document.querySelector('.fn-demo').addEventListener('click', function (e) {
			// console.log(synth.);
			synth.envelope.sustain = 0.001;
			for(var i = 0; i < event.length;i++) {
				event[i].note += 200;
			}
			
		})

	}
}

// tone.init();
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
var user = {
	username: null
}