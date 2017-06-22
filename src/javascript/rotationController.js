
var rotation = {

	init: function () {
		window.addEventListener('deviceorientation', this, true)
	},
	listen: function (callback) {
		// this.listenType = type
		this.callback = callback
	},
	support: function () {
		this.support = 'deviceorientation' in window;
		console.log(this.support);
	},
	stopListen: function () {
		this.callback = false;
	},
	orientationEvent: function (event) {
		// console.log(event.);
		var self = this;

		if(this.callback) {
			
			self.rawBeta  = event.beta;
			var percBeta  = tools.getPercentage(event.beta + 100, 200);
			percBeta      = self.cutPercentage(percBeta, 0, 100);
			
			var percGamma = tools.getPercentage(event.gamma + 90, 180);
			
			percGamma     = self.cutPercentage(percGamma, 0, 100);
			
			self.pitch = tools.percentageToValue(percBeta, audio.highest);
			self.gain = tools.percentageToValue(percGamma, 5);
			// console.log(self.gain, percGamma);
			self.callback({
				rawBeta: event.beta,
				rawAlpha: event.alpha,
				rawGamma: event.gamma,
				pitch: self.pitch, 
				gain: self.gain,
				perBeta: percBeta

				
			})
		}
	},
	scaleBackground: function (perc) {
		var background = document.querySelector('.fn-background-motion');
		background.style.transform = 'scaleY(' + perc/100 + ')';
	},
	cutPercentage: function (perc, min, max) {
		if(perc < min) {
			perc = min
		} else if (perc > max) {
			perc = max;
		} 
		return perc;
	},
	handleEvent: function (event) {
		if(event.type == 'deviceorientation') {
			this.orientationEvent(event);
		}
		
	},
	rotateBackground: function(motionData) {
		var bg = document.querySelector('.fn-motion-bg');
		// console.log(motionData);
		// rawalpha = 0 -> transfomr = 90
		// var a = tools.getPercentage(motionData.rawAlpha, 90);
		// var value = 90 - a;
		// full = 90
		// not = 0
		// bg.style.transform = 
	}
}
