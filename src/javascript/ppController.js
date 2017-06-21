

var pp = {
	touchBlok: document.querySelector('.fn-pp'),

	setup:function () {

		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		
		console.log(handInteraction.support);
		if(!handInteraction.support) {
			this.touchBlok.addEventListener('touchmove', this, true)
			this.touchBlok.addEventListener('touchstart', this, true)
			this.touchBlok.addEventListener('touchend', this, true)
			this.touchBlok.addEventListener('touchcancel', this, true)
		}

	},
	handleEvent: function (event) {
		if(event.type == 'touchmove' || event.type == 'touchstart') {
			this.touchMove(event);
		} else if (event.type =='touchend' || event.type == 'touchcancel') {
			this.touchEnd(event)
		}
	},
	touchPosition: function (touches) {
		var touch = touches[0] || toches[0];
		
		var values = {};
		var elm = this.touchBlok.getBoundingClientRect();
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
		var position = this.touchPosition(touches);
		var max = data.group.steps[0].max;
		console.log(position);
		var positionData = {
			freq : (position.ypercentage * max)/100,
			volume : (position.xpercentage)/100,
		}
		data.positionData = 5 - positionData.volume;

		return positionData
	},
	
	createShadow: function (touches) {
		var position = this.touchPosition(touches);
		var element  = document.createElement('span');

		element.classList.add('shadow');
		element.style.position = 'absolute';
		
		element.style.top      = position.ypercentage + '%';
		element.style.left     = position.xpercentage + '%';

		this.touchBlok.appendChild(element);
	
		setTimeout(function() {
			element.style.opacity=0;
			 setTimeout(function () {
			 	element.parentNode.removeChild(element);
			 }, 500)
		}, 100)
	},

	touchMove: function (e) {
		this.createShadow(e.touches);

		var position = this.touchValues(e.touches);
		console.log(position);
		audio.overrideFreq = position.freq;
		audio.setFrequencies(this.frequency)
		audio.oscVolume(position.volume)
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:position.volume});

		}
		sendSocket.send('ppValues', data.group._id, {
			freq: position.freq,
			volume: position.volume
		})
	},
	touchEnd: function (e) {
		audio.overrideFreq = false;
		audio.oscVolume(1);
		// for(var i in audio.sources) {
		// 	sources.update.volume({id:audio.sources[i].id, value:data.group.sources[audio.sources[i].id].volume });

		// }
		sendSocket.send('ppValues', data.group._id, {
			freq: false,
			volume: 1
		})
	}
}