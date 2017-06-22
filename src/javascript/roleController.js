var modulator = {
	init: function () {
		changePage.selector();
		this.filterButtons = document.querySelectorAll('.fn-modulate-btn');
		this.form          = document.querySelector('.fn-form-modulate');

		var self = this;
		for(var i = 0; i < this.filterButtons.length;i++) {
			self.filterButtons[i].addEventListener('touchstart', self, true);
			self.filterButtons[i].addEventListener('touchend', self, true)
			self.filterButtons[i].addEventListener('touchcancel', self, true)
		}
		this.form.addEventListener('input', self, true);
		this.form.addEventListener('change', self, true);
			
	      // modulator.events.init();
	      
	},
	displayValue: function (value) {
		var textbox = document.querySelector('.fn-motion-display');
		textbox.innerHTML = value;
	},
	startFilter: function (e) {
		tips.increaseTip('filter');
		console.log(e);
		var filterType = e.currentTarget.getAttribute('modulate-type');
		body.setAttribute('filters', 'true');
		e.currentTarget.classList.add('active');

		var self = this;


		rotation.listen(function (motionData) {
			var value = motionData.perBeta/2;
			filters.update(filterType, value);
			self.displayValue(value);
			rotation.scaleBackground(value*2);
		})
	},
	endFilter: function(e) {
		body.removeAttribute('filters' );
		e.target.classList.remove('active');
		this.displayValue('');
		rotation.stopListen();
		rotation.scaleBackground(0);


	},
	updateForm: function (e) {
		var index = body.getAttribute('current-element');
		console.log(e.target, this);
		this.update[e.target.getAttribute('name')](e.target, index)
	},
	handleEvent: function (event) {
		if(event.type == 'touchmove' || event.type == 'touchstart') {
			this.startFilter(event);
		} else if (event.type =='touchend' || event.type == 'touchcancel') {
			this.endFilter(event);
		} else if (event.type =='input' || event.type == 'change') {
			this.updateForm(event);
		}
	},

	update:  {
		active: function (element, index) {
			data.group.sources[index].active = element.checked;
			tips.increaseTip('active');
			sendSocket.send('updateSources',data.group._id, {
				value: element.checked,
				type: 'active', 
				id: index
			});

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
		
	},
	fillData: function (index) {
		console.log('filling the data');
		inputEvent.slider();

		var elementData  = data.group.sources[parseInt(index)]
		var form         = document.querySelector('.fn-form-modulate');
		var wavetypes    = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');

		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider-detune').value      = elementData.detune;
		form.querySelector('.fn-slider-volume').value      = elementData.volume;
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
}
var sequencer = {
	isRecording: false,
	newMelody: [],
	steps: document.querySelectorAll('.fn-step-item'),

	init: function() {
		
		var self = this;
		
		tools.eachDomElement('.fn-sequencer-item', function (item) {
			item.addEventListener('click', self, true);
		})
		recording.setup();
		adsr.init();
		pp.setup();
	},
	
	toggleActive: function (e) {
		var index = parseInt(e.target.getAttribute('sequence-index'));
		tips.increaseTip('clickActive');
		data.group.steps[index].active = !data.group.steps[index].active;
		e.target.classList.toggle('active');

		sendSocket.send('updateSingleStep',data.group._id, {
			step: data.group.steps[index], index: index
		})
	},
	updateActive: function () {
		var self = this;
		for(var i = 0; i < this.steps.length;i++) {

			if(data.group.steps[i].active) {
				self.steps[i].classList.add('active')
			} else {
				self.steps[i].classList.remove('active')
			}
		}
	},
	
	handleEvent: function (event) {
		if(event.type == 'click') {
			this.toggleActive(event);
		}
		
	},
	
}