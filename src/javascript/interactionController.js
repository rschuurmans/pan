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
