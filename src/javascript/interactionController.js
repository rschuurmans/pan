var inputEvent = {
	slider: function () {
		var slider = document.querySelector('.fn-slider');
		var sliderBg = document.querySelector('.fn-slider-bg');
		console.log(slider);
		slider.addEventListener('input', function (e) {
			console.log('log');
			var value = e.currentTarget.value;
			console.log(value);
			sliderBg.style.clipPath = 'polygon(0 0, '+value+'% 0, '+value+'% 100%, 0% 100%)'
			
		})
	},
	radioSlider: function () {
		var radioWrapper = document.querySelector('.fn-radio-slider');
		var inputs = radioWrapper.querySelectorAll('.fn-input');
		console.log(radioWrapper);
		inputs.forEach(function(element) {
			if(element.checked) {
				radioWrapper.setAttribute('active-radio', element.id);
			}
			element.addEventListener('change', function (e) {
				console.log(e.currentTarget.id);
				radioWrapper.setAttribute('active-radio', e.currentTarget.id);
			})
		});
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
					sequencerRole.steps.visualStep(deviceRotation.currentItem, deviceRotation.newValue);
				}


			}



			// if(deviceRotation.calibrated(e.timeStamp)) {
			// 	if(!deviceRotation.startCompass) {
			// 		deviceRotation.startCompass = e.webkitCompassHeading;
			// 	} else {
			// 		if(deviceRotation.lastCompass) {
			// 			deviceRotation.checkAroundCompass(e.webkitCompassHeading);
			// 		}
			// 		deviceRotation.newValue = (deviceRotation.timesRotated * 360) + (e.webkitCompassHeading - deviceRotation.startCompass);;
			// 		sequencerRole.steps.visualStep(deviceRotation.currentItem, deviceRotation.newValue);
			// 		deviceRotation.lastCompass = e.webkitCompassHeading;
			// 	}
			// }


		}
		
		
	}
