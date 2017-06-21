var handInteraction = {
	top:400,
	bottom:0,
	activateButtons: document.querySelectorAll('.fn-control-hand'),
	init: function () {
		
		this.support();

		
		var self = this;

		for(var i = 0; i < this.activateButtons.length;i++) {
			this.activateButtons[i].addEventListener('touchstart', this, true);

		}


		
		
	},
	
	getButtons: function () {

	},
	calibrate: function () {

	},

	listen: function (e){
		console.log('heeeeee');
		console.log(e);
		e.currentTarget.classList.add('active');
		e.target.addEventListener('mouseup', this, true);
		e.target.addEventListener('touchend', this, true);
		e.target.addEventListener('touchcancel', this, true);
		window.addEventListener('devicelight', this, true);
		 // function (e) {
			
			// this.parseLight.
			// var value = tools.getPercentage(e.value, handInteraction.top);
			// console.log('perc ',value);
			// var freq = (value * audio.highest) / 100;
			// console.log(freq, audio.highest);
			// if(freq > audio.highest) {
				// freq = audio.highest;
			// }audio.setFrequencies(this.frequency)
			// audio.setFrequencies(freq);
			// audio.overrideFreq;
		// })

	},
	setHighest : function (lux) {
		if(lux > this.top) {
			this.top = lux;
		}
	},
	parseLight: function (lux) {
		console.log('im receiveing a value ', lux);
		this.setHighest(lux);
		this.displayValue('LUX: '+ lux )

		var luxPercentage = tools.getPercentage(lux, handInteraction.top);
		var frequency = (luxPercentage * audio.highest) / 100;
		if(frequency > audio.highest) {
			frequency = audio.highest
		};
		audio.overrideFreq = frequency;
		audio.slideFrequency(frequency)

	},
	support: function () {
		var self = this;
		if ('ondevicelight' in window) {
			this.support = true;
			} else {
				this.support = false;
			}
	},
	stopListen: function (e) {
		console.log('stop listeingin');
		audio.overrideFreq = false;
		e.currentTarget.classList.remove('active');
		window.removeEventListener('devicelight', this);
	},
	displayValue: function (content) {
		var textbox = document.querySelector('.fn-lux-display');
		textbox.innerHTML = content;
	},
	event: function () {

	},
	handleEvent: function (event) {
		if(event.type == 'touchend' || event.type == 'touchcancel' || event.type == 'mouseup') {
			this.stopListen(event);
		} 
		if(event.type == 'touchstart') {
			this.listen(event);
		} 
		if(event.type == 'devicelight') {
			this.parseLight(event.value);
		} 
	},
}