// http://webaudioplayground.appspot.com/#


// var currentStep = 0;
// var steps = 8;
// var audioContext = new (window.AudioContext || window.webkitAudioContext)();
// var label = document.querySelector('.fn-step-label');

// var oscillator = audioContext.createOscillator();
// oscillator.type = 'square';
// oscillator.frequency.value = 440;
// oscillator.start();

// var filter = audioContext.createBiquadFilter()
// filter.connect(audioContext.destination)
// filter.type = 'lowpass'
// filter.frequency.value = 2000;
// filter.Q.value = 0;
// filter.gain.value = 0;

// oscillator.connect(filter)

// function init () {
// 	console.log('start');

// 	// var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 	// var oscillator = audioContext.createOscillator();
// 	// oscillator.type = 'square';
// 	// oscillator.frequency.value = 440;
// 	// oscillator.start();

// 	// var filter = audioContext.createBiquadFilter()
// 	// filter.connect(audioContext.destination)
// 	// filter.type = 'highpass'
// 	// filter.frequency.value = 200
// 	// filter.fre
// 	// oscillator.connect(filter)
// }
// init();
// var frequencies = [440,440,440,440,440,440,440,440];
// var createSequencer = function () {
// 	var loop = function () {
// 		setTimeout(function () {
// 			label.textContent = 'step: ' + currentStep;
// 			oscillator.frequency.value = frequencies[currentStep];
// 		}, 1000)
// 	}
// }

// document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// 	filter.gain.value = e.target.value;
// })


// // 		var testInput = document.querySelector('.fn-test');
// // 		testInput.value = delay;
// // 		testInput.addEventListener('change', function (e) {
// // 			console.log(e.target.value);
// // 			console.log(currentStep);
// // 			frequencies[currentStep] = e.target.value;
// // 		})

// // 		document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// // 			biquadFilter.frequency.value = e.target.value;
// // 			console.log(biquadFilter);
// // 		})

// // 		var clickCanvas = document.querySelector('.fn-click-canvas');
// // 		clickCanvas.addEventListener('click', function (e) {
// // 			console.log(e.clientX);
// // 			frequencies[currentStep] = e.clientX*2;
// // 		})
// // 	}

// // var rollen = {
// // 	init:function () {
// // 		rollen.createStep();
// // 	},
// // 	createStep: function () {
// // 		var label = document.querySelector('.fn-step-label');
// // 		label.textContent = 'yo';
// // 		var steps = 8;
// // 		var currentStep = 0;
// // 		var delay = 200;
// // 		var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// // 		var oscillator = audioContext.createOscillator();
		
// // 		var biquadFilter = audioContext.createBiquadFilter();
// // 		biquadFilter.type = 'lowpass';
// // 		biquadFilter.frequency.value = 100;
// // 		biquadFilter.gain.value = 20;
// // 		biquadFilter.Q.value = 20;

// // 		oscillator.start(0);

// // 		oscillator.connect(biquadFilter);
// // 		biquadFilter.connect(audioContext.destination)

// // 		var frequencies = [440,440,440,440,440,440,440,440];
// // 		var sequencer = function() {
// // 			setTimeout(function () {
// // 				label.textContent = 'step: ' + currentStep;
// // 				oscillator.frequency.value = frequencies[currentStep];
// // 				currentStep++;

// // 				if(currentStep < steps) {
// // 					sequencer()
// // 				} else {
// // 					currentStep = 0;
// // 					sequencer();
// // 				}
// // 			}, delay)
// // 		}
// // 		sequencer();

// // 		var testInput = document.querySelector('.fn-test');
// // 		testInput.value = delay;
// // 		testInput.addEventListener('change', function (e) {
// // 			console.log(e.target.value);
// // 			console.log(currentStep);
// // 			frequencies[currentStep] = e.target.value;
// // 		})

// // 		document.querySelector('.fn-cutoff-meter').addEventListener('input', function (e) {
// // 			biquadFilter.frequency.value = e.target.value;
// // 			console.log(biquadFilter);
// // 		})

// // 		var clickCanvas = document.querySelector('.fn-click-canvas');
// // 		clickCanvas.addEventListener('click', function (e) {
// // 			console.log(e.clientX);
// // 			frequencies[currentStep] = e.clientX*2;
// // 		})
// // 	}
// // }
// // rollen.init();

// // 	// start rol 1
// // 	// show stepsequencer
// // 	// create oscillator
// // 	// play stepsequencer with oscilator at same pitch
// // 	// change step sequencer according to click location
// // 	// record audio and take pitch from that.
// // 	// encrease the amount of steps