

var inputEvent = {
	slider: function () {
		var sliders = document.querySelectorAll('.fn-slider');
		for(var i = 0; i < sliders.length; i++ ) {
			sliders[i].addEventListener('input', function (e) {
				inputEvent.setSliderBg(e.currentTarget.getAttribute('name'), e.currentTarget.value)
			})
		}
	},

	setSliderBg: function (name, value) {
		var sliderBg = document.querySelectorAll('.fn-slider-bg');
		if(name == 'volume') {
			value = (value/2)*100;
		}
		
		for(var i = 0; i < sliderBg.length;i++) {
			if(sliderBg[i].getAttribute('name') == name) {
				sliderBg[i].style.clipPath = 'polygon(0 0, '+value+'% 0, '+value+'% 100%, 0% 100%)';
			}
		}
	},
	radioSlider: function () {
		var radioWrapper = document.querySelector('.fn-radio-slider');
		var inputs = radioWrapper.querySelectorAll('.fn-input');
		
		inputs.forEach(function(element) {
			if(element.checked) {
				radioWrapper.setAttribute('active-radio', element.id);
			}
			// inputEvent.radioSliderEvent(element, radioWrapper)
			element.removeEventListener('change', inputEvent.radioSliderEvent);
			element.addEventListener('change', inputEvent.radioSliderEvent);
		});
	},
	radioSliderEvent: function (e) {
		var radioWrapper = document.querySelector('.fn-radio-slider');
		radioWrapper.setAttribute('active-radio', e.currentTarget.id);
	},
	sources: function (index) {
		var form = document.querySelector('.fn-form-modulate');
	}
}

// var deviceRotation = {
// 		firstTime   : null,
// 		startCompass: null,
// 		lastCompass : null,
// 		timesRotated: 0,
// 		newValue    : null,
// 		type        :null,
// 		currentItem : null,
// 		support     : false,
// 		startPerc   : null,
// 		start: function (item) {
// 			if(window.DeviceOrientationEvent) {
// 				console.log('support');
// 				window.addEventListener('deviceorientation', deviceRotation.event);
// 			} else {
// 				console.log('no support');
// 			}
// 		},
// 		stop:function (callback) {
// 			window.removeEventListener('deviceorientation', deviceRotation.event);
			
// 			callback(deviceRotation.newValue, deviceRotation.currentItem)

// 			deviceRotation.firstTime    = null;
// 			deviceRotation.timesRotated = 0;
// 			deviceRotation.lastCompass  = null;
			
// 		},
// 		listen:function (item, type, perc) {
			
// 			deviceRotation.currentItem = item;
// 			deviceRotation.startPerc   = perc;
// 			deviceRotation.type        = type;
// 			if(!window.DeviceOrientationEvent) {
// 				deviceRotation.fallback(item, type, perc);
// 			} 
			
// 		},
// 		fallback: function (item, type, perc) {
			
// 			tools.eachDomElement('.fn-fallback-steps input', function (slider) {
				
// 				slider.parentNode.classList.toggle('active', parseInt(slider.id) == parseInt(item.getAttribute('sequence-index')))
// 				slider.value == perc;
// 				slider.addEventListener('input', function (e) {
// 					sequencer.receiveNewValue(e.currentTarget.value, deviceRotation.currentItem);
// 				})
// 			})
// 		},	
// 		stopFallback: function (item) {
// 			console.log(item);
// 			tools.eachDomElement('.fn-fallback-steps input', function (slider) {
				
// 				slider.parentNode.classList.remove('active');
				
// 			})
// 		},	
// 		stopListen:function (callback) {
// 			console.log('stop');
			
// 			if(!window.DeviceOrientationEvent) {
// 				deviceRotation.stopFallback(deviceRotation.currentItem);
// 			}
// 			callback(deviceRotation.newValue, deviceRotation.currentItem)
// 			deviceRotation.startCompass = null;
// 			deviceRotation.lastCompass  = null;
// 			deviceRotation.currentItem  = null;
// 			deviceRotation.timesRotated = 0;
// 			deviceRotation.type         = null;
// 			deviceRotation.newValue     = null;
// 			deviceRotation.currentItem  = null;
// 			deviceRotation.startPerc    = null;

			
// 		},
// 		calibrated: function (timestamp) {
// 			if(!deviceRotation.firstTime) {
// 				deviceRotation.firstTime = timestamp;
// 				return false;
// 			} else {
// 				if((timestamp - deviceRotation.firstTime) > 500) {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			}
// 		},
// 		checkAroundCompass: function(currentCompass) {
// 			if(deviceRotation.lastCompass) {
// 				if(Math.abs(currentCompass - deviceRotation.lastCompass) > 100 ?  true : false) {
// 					if(deviceRotation.lastCompass > currentCompass) {
// 							deviceRotation.timesRotated++;
// 						} else {
// 							deviceRotation.timesRotated--;
// 						}
// 				}
// 			}
// 		},
// 		sendValues: function (value) {
// 			if(deviceRotation.type == 'frequency') {
// 				sequencer.receiveNewValue(value, deviceRotation.currentItem);
// 			} else if (deviceRotation.type == 'adsr') {
// 				adsr.receiveNewValue(value, deviceRotation.currentItem);
// 			}
// 		},
// 		getValue: function (currentCompass) {
// 			var value = (deviceRotation.timesRotated * 360) + (currentCompass - deviceRotation.startCompass);
			
// 			if(value > 50) {
// 				value = 50;
// 			} else if (value < -50) {
// 				value = -50;
// 			}
// 			value = value + 50;
// 			var difference = 50 - deviceRotation.startPerc ;
// 			value = value - difference;
// 			return value;
// 		},
// 		event: function (e) {
// 			if(deviceRotation.calibrated(e.timeStamp) && deviceRotation.currentItem) {
// 				if(!deviceRotation.startCompass) {
// 					deviceRotation.startCompass = e.webkitCompassHeading;
// 				} else {
// 					deviceRotation.checkAroundCompass(e.webkitCompassHeading);
// 					var value =deviceRotation.newValue = deviceRotation.getValue(e.webkitCompassHeading);
					

// 					deviceRotation.sendValues(value);
// 					deviceRotation.lastCompass = e.webkitCompassHeading;
// 				}


// 			}



// 		},
		
		
		
// 	}
