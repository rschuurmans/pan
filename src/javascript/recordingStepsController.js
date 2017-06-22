// checken met als de sustain lang is 
var recording = {
	isRecording: false,

	setup: function () {
		this.startButton = document.querySelector('.fn-seq-rec');
		
		this.length      = data.group.steps.length;
		this.clickArea = document.querySelector('.fn-rec-step');
		this.startButton.addEventListener('click', this.startEvent.bind(this))
		

	},
	
	startEvent: function (e) {
		this.isRecording = !this.isRecording;
		this.melody      = [];

		var self = this;
		
		if(this.isRecording) {
			self.startButton.classList.add('active');
			self.startButton.parentNode.setAttribute('target-page', 'recording');
			body.setAttribute('recording', 'true');
			self.setHeader('RECORDED: 0/' + self.length);
			audio.gainNode.triggerAttack();
			adsr.sustain     = true;
			self.clickArea.addEventListener('click', self, true);
			rotation.listen(function (motionData) {
				self.pitch = motionData.pitch;
				self.displayValue(motionData.rawBeta);
				audio.setFrequencies(self.pitch)
			});
			
		} else {
			console.log('finishin up');
			self.finish(e);
		}
		
	},
	
 	displayValue: function (content) {
		var textbox = document.querySelector('.fn-rec-value');
		textbox.innerHTML = content;
	},
	displaySteps: function (content) {
		var textbox = document.querySelector('.fn-rec-score');
		textbox.innerHTML = content;
	},
	setHeader: function (content) {
		var textbox = document.querySelector('.fn-rec-score');
		textbox.innerHTML = content;
	},
	addStep: function (e) {

		// var index = parseInt(e.currentTarget.getAttribute('rec-index'));
		this.melody.push(this.pitch);
		console.log(this.melody);

		this.setHeader('RECORDED: ' + this.melody.length + '/' + this.length);

		if(this.melody.length == this.length) {
			recording.finish();
		}
	},
	finish: function () {
		
		this.startButton.classList.remove('active');
		this.startButton.parentNode.setAttribute('target-page', 'sequencer');
		body.removeAttribute('recording', 'true');
		changePage.showPage('sequencer');
		this.clickArea.removeEventListener('click', self, true);
		this.isRecording = false;
		this.setHeader(' ');
		rotation.stopListen();
		adsr.sustain     = data.group.sustain;
		
		var self = this;
		if(this.melody.length !== 0) {
			self.updateMelody();
		}
		
		
	this.clickArea.removeEventListener('click', self)
		
		
		
	},
	updateMelody: function () {
		tips.increaseTip('rec');
		var newMelody = this.fillMelody();
		console.log(newMelody);
		for(var i in newMelody) {
			data.group.steps[i].active = true;
			data.group.steps[i].frequency = newMelody[i];
		}
		sequencer.updateActive();

		sendSocket.send('updateAllSteps', data.group._id, {
			steps: data.group.steps})
		this.melody = [];
	},
	fillMelody: function (melody) {
		var actualMeldoy = [];
		var n = i = 0;
		var self = this;
		while(i < self.length) {
			actualMeldoy.push(self.melody[n])
			i++;n++;
			if(n == self.melody.length) {
				n = 0;
			}
		}
		return actualMeldoy
	},
	handleEvent: function (event) {
		if(event.type == 'click') {
			this.addStep();
		}
		
	},

}