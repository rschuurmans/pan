// checken met als de sustain lang is 
var recording = {
	isRecording: false,
	

	setup: function () {
		this.startButton = document.querySelector('.fn-seq-rec');
		this.buttons     = document.querySelectorAll('.fn-rec-item');
		this.length      = data.group.steps.length;

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
			audio.gainNode.triggerRelease();

			self.buttons.forEach(function(button) {
				button.addEventListener('click', self.addStep)
			});
		} else {
			console.log('finishin up');
			self.finish(e);
		}
		
	},
	setHeader: function (content) {
		var textbox = document.querySelector('.fn-rec-score');
		textbox.innerHTML = content;
	},
	addStep: function (e) {
		var index = parseInt(e.currentTarget.getAttribute('rec-index'));
		recording.melody.push(data.group.scale[index]);
		audio.triggerEnvAttack(data.group.scale[index], '8n');

		recording.setHeader('RECORDED: ' + recording.melody.length + '/' + recording.length);

		if(recording.melody.length == recording.length) {
			recording.finish();
		}
	},
	finish: function () {
		
		this.startButton.classList.remove('active');
		this.startButton.parentNode.setAttribute('target-page', 'sequencer');
		body.removeAttribute('recording', 'true');
		changePage.showPage('sequencer');

		this.isRecording = false;
		this.setHeader(' ');

		var self = this;
		if(this.melody.length !== 0) {
			self.updateMelody();
		}
		
		this.buttons.forEach(function(button) {
			button.removeEventListener('click', self.addStep)
		});
		
		
	},
	updateMelody: function () {
		tips.increaseTip('rec');
		var newMelody = this.fillMelody();

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
	}

}