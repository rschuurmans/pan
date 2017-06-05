

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
