




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
	
	// changeFrequency: function (hammertime) {
	// 	var item = null;
	// 	var closeFreq = function () {
	// 		deviceRotation.stopListen(function (value) {
	// 			sequencer.updateFrequency(item, value)
	// 		});

	// 		events.hideRotate(item);
	// 	}
	// 	var openFreq = function (e) {
	// 		e.preventDefault();
	// 		item = e.target;
	// 		var percentage = sequencer.calculatePercentage(item);
	// 		deviceRotation.listen(item, 'frequency', percentage);
			
	// 		events.showRotate(item);
	// 		loop.holdTone(true, sequencer.getItemStep(e.target).frequency);

	// 		e.target.addEventListener('mouseup', closeFreq)
	// 		e.target.addEventListener('touchend', closeFreq)
	// 		e.target.addEventListener('touchcancel', closeFreq)
	// 	}
	// 	hammertime.on('press', function (e) {
	// 		openFreq(e);
	// 	})
	// },
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

