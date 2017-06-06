

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
	unload: function () {
		window.addEventListener('unload', function() {
			socket.emit('groupUpdate', {
				room: data.group._id,
				data: {
					text: data.user.username + ' heeft de groep verlaten'
				}
			});
			postData.leaveGroup();

		})
	}
	
	
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

