
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

		sendSocket.send('updateAllSteps', data.group._id, {
			steps: data.group.steps})
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



var events = {
	showStep: function (index) {
		
		var steps   = document.querySelectorAll('.fn-sequencer-item');
		for(var i = 0; i < steps.length; i++) {
			steps[i].classList.toggle('highlight', i == index)
		
		};

		// if(steps.length && !recording.isRecording) {
		// 	steps.forEach(function(step) {
		// 		step.classList.remove('highlight');
		// 	});
		// 	steps[index].classList.add('highlight')
		// } else {
		// 	steps.forEach(function(step) {
		// 		step.classList.remove('highlight')
		// 	});
		// }
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
	unload: function () {
		console.log('unload');
		window.addEventListener('unload', function() {
			sendSocket.send('groupUpdate', data.group._id, {text: data.user.username + ' heeft de groep verlaten'})
			sendSocket.send('liveUpdate', 'live',  {text: data.user.username + ' heeft de groep verlaten'})

			postData.leaveGroup();

		})
	}
	
	
}



var modulator = {
	init: function () {
	      changePage.selector();
	      modulator.events.init();
	      
	},
	events:  {
		init: function () {
			var form          = document.querySelector('.fn-form-modulate');
			var filterButtons = document.querySelectorAll('.fn-modulate-btn');
			var filterSlide   = document.querySelectorAll('.fn-fallback-filter');

			form.addEventListener('input', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
			form.addEventListener('change', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
			filterButtons.forEach(function(button) {
		        button.addEventListener('click', function(e) {
		        	tips.increaseTip('filter');
		          cameraTracker.trackElement(e.currentTarget);
		        });
		      });
		      filterSlide.forEach(function(slider) {
		      	slider.addEventListener('input', function(e) {
		      		
		      		filters.update(e.currentTarget.getAttribute('type'), e.target.value);
		      		sendSocket.send('updateFilter',data.group._id, {
		      			type:e.currentTarget.getAttribute('type'),
		      			value: e.target.value
		      		})
		      		
		      	});
		      });

		},
		active: function (element, index) {
			data.group.sources[index].active = element.checked;
			tips.increaseTip('active');
			sendSocket.send('updateSources',data.group._id, {
				value: element.checked,
				type: 'active', 
				id: index});

		},
		wavetype: function (element, index) {
			data.group.sources[index].type = element.getAttribute('wavetype');
			sendSocket.send('updateSources', data.group._id, {
				value: element.getAttribute('wavetype'),
				type: 'wavetype', 
				id: index});

		},
		detune: function (element, index) {
			tips.increaseTip('detune');
			data.group.sources[index].detune = element.value;

			sendSocket.send('updateSources', data.group._id, {
				value: element.value,
				type: 'detune', 
				id: index})
	
		},
		volume: function (element, index) {
			data.group.sources[index].volume = element.value;
			
			
			sendSocket.send('updateSources', data.group._id, {
				value: element.value,
				type: 'volume', 
				id: index})
		},
		
		visualTrackerStep: function (value) {
			
		}
	},
	fillData: function (index) {
		inputEvent.slider();

		var elementData  = data.group.sources[parseInt(index)]
		var form         = document.querySelector('.fn-form-modulate');
		var wavetypes    = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');

		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider-detune').value             = elementData.detune;
		form.querySelector('.fn-slider-volume').value             = elementData.volume;
		form.querySelector('.fn-active').checked           = elementData.active;
		form.querySelector('.fn-slider-bg').style.clipPath = "polygon(0 0, "+elementData.detune +" % 0, "+elementData.detune+"% 100%, 0% 100%)";

		wavetypes.forEach(function(wavetype) {
			
			if(wavetype.getAttribute('wavetype') == elementData.type) {
				wavetype.checked = true;
			} else {
				wavetype.checked = false;
			}
		});

		inputEvent.setSliderBg('detune', elementData.detune);
		inputEvent.setSliderBg('volume', elementData.volume);
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
		adsr.init();
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
		var perc = (step.frequency * 100) / step.max;
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
			if(!recording.isRecording) {
				var index = parseInt(e.target.getAttribute('sequence-index'));
				tips.increaseTip('clickActive');
				
				data.group.steps[parseInt(index)].active = !data.group.steps[parseInt(index)].active;
				
				e.target.classList.toggle('active');
				
				sendSocket.send('updateSingleStep',data.group._id, 
					{step: data.group.steps[index], index: index})
				
			}
		
		});
	},
	updateActive: function () {
		var steps = document.querySelectorAll('.fn-step-item');
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

		
		sendSocket.send('updateSingleStep',data.group._id, 
					{step: step, index: parseInt(item.getAttribute('sequence-index'))})
		
		item.setAttribute('frequency', frequency)
		loop.holdTone(false);

		// 
	},
	
}
var adsr = {

	getEnvelope: function (groupId) {
	  	
	  		return   {
	            attack: tools.pathObj(data.group, 'adsr.attack.value'),
	            decay: tools.pathObj(data.group, 'adsr.decay.value'),
	            sustain: .5,
	            release: tools.pathObj(data.group, 'adsr.release.value'),
	        }

	  	
        
	},
	update: function (type, value) {
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
	init: function () {
		// adsr.drawSVG();
		adsr.changeEvent();
		var svgLine = document.querySelector('svg .poly');
		var width   = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width)/8;
		var inputs  = document.querySelectorAll('.fn-adsr-range-item');
		
		var points = []
		for(var i = 0; i < inputs.length ;i++) {
			var point = adsr.getPoints(i);
			points.push(point)

		    inputs[i].addEventListener('input', function (e) {
		    	var id = e.currentTarget.id;
				var idNumber = parseInt(e.currentTarget.id.split('adsr-')[1]);
				var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	adsr.showActive(id);
		    	adsr.svgUpdate(svgLine, points, idNumber)
		    	adsr.update(type, value);
		    	
		    })
		    inputs[i].addEventListener('change', function (e) {
		    	var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	sendSocket.send('updateADSR', data.group._id, {
		    		type: type, 
		    		value: value
		    	})
		    })
		}
		adsr.drawSVGInit(svgLine, points);

	},
	showActive: function (id) {
		var labels = document.querySelectorAll('.fn-label-adsr');
		
		for(var i = 0; i < labels.length;i++) {
			if(labels[i].getAttribute('for') == id ) {
				labels[i].classList.add('active');
			} else {
				labels[i].classList.remove('active');
			}
		}

	},
	getPoints: function (index) {
		var inputs = document.querySelectorAll('.fn-adsr-range-item');
		var pos    = inputs[index].getBoundingClientRect();
		
		var value  = document.querySelectorAll('.fn-adsr-range-item')[index].value;
		var max    = inputs[index].getAttribute('max');
		value      = max - value;
		var perc   = (value*100)/max;
		var left   = ((100/inputs.length) * index) + ((100/inputs.length)/2);

	    
	    var points = {
	    	x: left,
	    	y: perc
	    }
	    return points
	},
	drawSVGInit: function (line, points) {
		var width     = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width);
		var height    = (document.querySelector('.input-range-vert-container').getBoundingClientRect().height);
		var attribute =  '0 100';
		
		for(var i in points) {
			attribute += ',' + points[i].x + ' ' + points[i].y
		}
		attribute +=  ',100 100';
		line.setAttribute('points', attribute);
	},
	svgUpdate: function (line, points, index) {
		var attribute        = line.getAttribute('points').split(',');
		var point            = adsr.getPoints(index);
		var currentAttribute = attribute[index + 1].split(' ');
		attribute[index + 1] = currentAttribute[0] + " " + point.y;
		line.setAttribute('points', attribute)
	},
	changeEvent: function () {
		var sustainButton = document.querySelector('.fn-sustain');
		
		sustainButton.addEventListener('change', function (e) {
			adsr.setSustain(e.currentTarget.checked, tools.setGroup());
			sendSocket.send('updateSustain',tools.setGroup(), {sustain: e.currentTarget.checked})

		})
	},
	setSustain : function (value , groupId ) {
		
		data.group.sustain = value;
	}
	
	
}


var pp = {
	touchBlok: null,
	setup:function () {
		
		pp.touchBlok  = document.querySelector('.fn-pp');
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	

		pp.touchBlok.addEventListener('touchmove', pp.touchMove)
		
		pp.touchBlok.addEventListener('touchstart',pp.touchMove)
		pp.touchBlok.addEventListener('touchend',pp.touchEnd)
		pp.touchBlok.addEventListener('touchcancel', pp.touchEnd)
		
		// document.body.addEventListener('touchmove',function(evt){
		// 	evt.preventDefault();
		// },false);
	},
	touchPosition: function (touches) {
		var touch = touches[0] || toches[0];
		
		var values = {};
		var elm = pp.touchBlok.getBoundingClientRect();
		var x = touch.pageX - elm.left;
		var y = touch.clientY - elm.top;

		if(x < elm.width && x > 0 && y < elm.height && y > 0) {
			
		} else {
			
		}
		return {
			xpercentage : (x * 100)/elm.width,
			ypercentage : (y * 100)/elm.height,
			x: x - elm.left,
			y: y- elm.top
		}

	},
	touchValues: function (touches) {
		var position = pp.touchPosition(touches);
		var max = data.group.steps[0].max;
		
		var positionData = {
			freq : (position.ypercentage * max)/100,
			volume : (position.xpercentage)/20,
		}
		data.positionData = 5 - positionData.volume;

		return positionData
	},
	
	createShadow: function (touches) {
		var position = pp.touchPosition(touches);
		var element  = document.createElement('span');

		element.classList.add('shadow');
		element.style.position = 'absolute';
		
		element.style.top      = position.ypercentage + '%';
		element.style.left     = position.xpercentage + '%';

		pp.touchBlok.appendChild(element);
	
		setTimeout(function() {
			element.style.opacity=0;
			 setTimeout(function () {
			 	element.parentNode.removeChild(element);
			 }, 500)
		}, 100)
	},

	touchMove: function (e) {
		pp.createShadow(e.touches);
		var position = pp.touchValues(e.touches);
		audio.ppFreq = position.freq;
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:position.volume});

		}
		sendSocket.send('ppValues', data.group._id, {
			freq: position.freq,
			volume: position.volume
		})
	},
	touchEnd: function (e) {
		
		var oldSource = data.group.sources[0].type;
		
		audio.triggerRelease();
		loop.hold = false;
		audio.ppFreq = false;
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:data.group.sources[audio.sources[i].id].volume });

		}
		sendSocket.send('ppValues', data.group._id, {
			freq: false,
			volume: data.group.sources[0].volume
		})
	}
}

// var modulate = {
	
// 	sendSocket: function (newdata) {
		
// 		socket.emit('updateSources', {
// 			room: data.group._id,
// 			data: newdata
// 		});

// 	},
// 	changewavetype: function (newtype) {
// 		var currentData = modulate.getCurrentData();
// 		currentData.type = newtype;
// 		modulate.sendSocket({value: currentData.type, type: 'wavetype', id: currentData.id});

// 	},
// 	changeDetune: function (newvalue) {
		
// 	},
// 	getCurrentData : function () {
// 		var form = document.querySelector('.fn-form-modulate');
// 		var thisdata = data.group.sources[parseInt(form.getAttribute('active-index'))];
// 		return thisdata
// 	},
// 	wavetype: function () {
// 		var form = document.querySelector('.fn-wavetype');
// 		form.querySelector('.fn-input');
// 	}
// }

