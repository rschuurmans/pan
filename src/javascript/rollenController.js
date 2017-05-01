var rollen = {
	init:function () {
		rollen.createStep();
	},
	createStep: function () {
		var label = document.querySelector('.fn-step-label');
		label.textContent = 'yo';
		var steps = 8;
		var currentStep = 0;
		var delay = 200;

		var oscillator = audioContext.createOscillator();
		oscillator.connect(audioContext.destination);
		oscillator.start(0);
		var frequencies = [440,440,440,440,440,440,440,440];
		var sequencer = function() {
			setTimeout(function () {
				label.textContent = 'step: ' + currentStep;
				oscillator.frequency.value = frequencies[currentStep];
				currentStep++;

				if(currentStep < steps) {
					sequencer()
				} else {
					currentStep = 0;
					sequencer();
				}
			}, delay)
		}
		sequencer();

		var testInput = document.querySelector('.fn-test');
		testInput.value = delay;
		testInput.addEventListener('change', function (e) {
			console.log(e.target.value);
			console.log(currentStep);
			frequencies[currentStep] = e.target.value;
		})

		var clickCanvas = document.querySelector('.fn-click-canvas');
		clickCanvas.addEventListener('click', function (e) {
			console.log(e.clientX);
			frequencies[currentStep] = e.clientX*2;
		})
	}
}
rollen.init();

	// start rol 1
	// show stepsequencer
	// create oscillator
	// play stepsequencer with oscilator at same pitch
	// change step sequencer according to click location
	// record audio and take pitch from that.
	// encrease the amount of steps