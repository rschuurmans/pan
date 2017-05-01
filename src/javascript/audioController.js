var socket = io.connect('http://localhost:3000');

socket.on('startAudio', function (data) {
	console.log('starting the audio');
	console.log(data);
})
// setTimeout(function () {
// 	socket.emit('news', 'big news')
// }, 2000	)
//   socket.on('news', function (data) {
    
//     socket.emit('my other event', { my: 'data' });
//   });

var audioContext = new (window.AudioContext || window.webkitAudioContext)();


var VCO = (function(context) {
  function VCO(){
    this.oscillator = context.createOscillator();
    this.oscillator.type = 'square';
    this.setFrequency(440);
    this.oscillator.start(0);
    this.oscillator.connect(context.destination)
  };

  VCO.prototype.setFrequency = function(frequency) {
    this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  };

  VCO.prototype.setType = function (type) {
  	this.oscillator.type = type
  }

  

  return VCO;
})(audioContext);

// var activeModules = document.querySelectorAll('.fn-overview-module');

// for(var i = 0; i < activeModules.length; i++) {
// 	// console.log(activeModules[i]);
// 	switch(activeModules[i].getAttribute('data-type')) {
// 		case 'oscillator': 
// 			var vco = new VCO;
// 			vco.setType('sine');
// 			console.log('happesn');
// 			break;


// 	}
// }
// var vco = new VCO;
// 		vco.setType('sine');

var audio = {
	init:function () {
		console.log('audio.init@');
		
		

		

		
	
		// wait for message from server untill osc is added

	},
	oscillator:function () {

	}
	// getActiveModules: function () {
	// 	console.log(document.cookie.split(';'));
	// }

}