

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

		var filterButtons = document.querySelectorAll('.fn-modulate-btn');
      	var filterSlide = document.querySelectorAll('.fn-fallback-filter');
	      filterButtons.forEach(function(button) {
	        button.addEventListener('click', function(e) {
	          cameraTracker.trackElement(e.currentTarget);
	        });
	      });
	      filterSlide.forEach(function(slider) {
	      	slider.addEventListener('input', function(e) {
	      		
	      		filters.update(e.currentTarget.getAttribute('type'), e.target.value)
	      		
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
			

			modulator.events.sendSocket({
				value: element.checked,
				type: 'active', 
				id: index});

		},
		wavetype: function (element, index) {
			data.group.sources[index].type = element.getAttribute('wavetype');
			modulator.events.sendSocket({
				value: element.getAttribute('wavetype'),
				type: 'wavetype', 
				id: index});

		},
		detune: function (element, index) {
			
			data.group.sources[index].detune = element.value;
			modulator.events.sendSocket({
				value: element.value,
				type: 'detune', 
				id: index});
		},
		volume: function (element, index) {
			
			data.group.sources[index].volume = element.value;
			modulator.events.sendSocket({
				value: element.value,
				type: 'volume', 
				id: index});
		},
		sendSocket: function (newdata) {
			
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
				var index = e.target.getAttribute('sequence-index');
				tips.increaseTip('clickActive');
				
				data.group.steps[parseInt(index)].active = !data.group.steps[parseInt(index)].active;
				
				e.target.classList.toggle('active');
				sequencer.sendSocket(data.group.steps[index], index)
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

		sequencer.sendSocket(step, parseInt(item.getAttribute('sequence-index')))
		
		
		item.setAttribute('frequency', frequency)
		loop.holdTone(false);

		// 
	},
	sendSocket: function (step, index) {
		
		socket.emit('updateSteps', {
			room: data.group._id,
			step: data.group.steps[index],
			index: index
		});
	}
}
var adsr = {
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
		    	adsr.showActive(e.currentTarget.id);
		    	adsr.svgUpdate(svgLine, points, parseInt(e.currentTarget.id.split('adsr-')[1]))
		    	adsr.update(e.currentTarget.getAttribute('modulate-type'), e.currentTarget.value)
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

			data.group.sustain = e.currentTarget.checked;
		})
	},
	updateValue: function (id) {

	}
	
}


var pp = {
	touchBlok: null,
	setup:function () {
		
		pp.touchBlok  = document.querySelector('.fn-pp');
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	

		pp.touchBlok.addEventListener('touchmove', pp.touchMove)
		
		pp.touchBlok.addEventListener('touchstart',pp.touchOpen)
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
		
		var data = {
			freq : (position.ypercentage * 1200)/100,
			volume : (position.xpercentage)/20,
		}
		data.volume = 5 - data.volume;

		return data
	},
	touchOpen: function (e) {
		// audio.triggerRelease();
		// loop.hold = true;
		pp.createShadow(e.touches);
		var position = pp.touchValues(e.touches);
		// audio.setFrequency(300);
		audio.ppFreq = position.freq;
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:position.volume});

		}
		// var newSource = data.group.sources[0].type + position.part;
		// sources.update.wavetype({id:0, value:newSource})
		// audio.triggerAttack(position.freq);


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
		// var newSource = data.group.sources[0].type + position.part;
		
		// sources.update.wavetype({id:0, value:newSource})
		// audio.triggerAttack(position.freq);
	},
	touchEnd: function (e) {
		
		var oldSource = data.group.sources[0].type;
		
		audio.triggerRelease();
		loop.hold = false;
		audio.ppFreq = false;
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:data.group.sources[audio.sources[i].id].volume });

		}
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

