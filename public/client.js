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
var data = [
	{
	"id": 11,
	"title": "sequencer",
	"shortTitle": "SEQ",
	"category": "rythm",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 12,
	"title": "pressure pads",
	"shortTitle": "PP",
	"category": "rythm",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 9,
	"title": "VCA",
	"shortTitle": "VCA",
	"category": "modulate",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 10,
	"category": "modulate",
	"shortTitle": "MOD",
	"title": "envelope generator",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 4,
	"title": "delay",
	"shortTitle": "D",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 5,
	"title": "low pass filter",
	"shortTitle": "LPF",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 6,
	"title": "high pass filter",
	"shortTitle": "HPF",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 7,
	"title": "synthesizer voice",
	"shortTitle": "VCE",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 8,
	"title": "panning",
	"shortTitle": "PAN",
	"category": "filter",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 3,
	"title": "VCO",
	"shortTitle": "VCO",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 1,
	"title": "clock modulator",
	"shortTitle": "CMOD",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 2,
	"title": "noise",
	"shortTitle": "NS",
	"category": "source",
	"once": "false",
	"connectedTo": "",
	"active": true,
	"parameters": [{

	}],
	"color":"#56009C",
	"accentColor":"#FFFF00"
	},
	{
	"id": 0,
	"title": "oscillator",
	"shortTitle": "OSC",
	"category": "source",
	"once": "false",
	"active": true,
	"parameters": [
	{
	"type":"waveType",
	"input":"radio",
	"value": "sine",
	"waveTypes": [
	{
	"type": "sine",
	"img": "ic_wave_sine.svg",
	"active":false
	},
	{
	"type": "sawtooth",
	"img": "ic_wave_sawtooth.svg",
	"active":false
	},
	{
	"type": "triangle",
	"img": "ic_wave_triangle.svg",
	"active":true
	},
	{
	"type": "square",
	"img": "ic_wave_square.svg",
	"active":false
	}
	]
	},
	{
	"type":"frequency",
	"input":"single-knob",
	"min":0,
	"max":22000,
	"value":500
	},
	{
	"type":"pitch",
	"input":"single-knob",
	"min":0,
	"max":22000,
	"value":500
	}
	],

	"color":"#56009C",
	"accentColor":"#FFFF00"
	}]

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = {
	frequency: 220,
	type:'SINE',
	create:function (options) {
		var _oscillator = audioContext.createOscillator();

		return _oscillator;
	},
	setWavetype(osc, type) {
		osc.type = type
	},
	setFrequency(osc, freq) {
		osc.frequency.value = freq;
	},
	connect:function(osc) {
		osc.connect(audioContext.destination);
		
	},
	start:function (osc) {
		osc.start();
	}

}

var vca = {
	create: function (value, index) {
		var _vca = audioContext.createGain();
		_vca.gain.value = 0;
		return _vca;
	},
	setInput: function (vca) {
		
	},
	setOutput: function (vca) {

	},
	setValue: function (vca, value) {
		vca.gain.value = value;
	}
}	

var modules = {
	oscillator:[oscillator.create(), oscillator.create()],
	vca:[vca.create()]
}

var options = {
	OSC:  {
		waveform: function (value, index) {
			oscillator.setWavetype(modules.oscillator[index], value)
		},
		frequency: function (value, index) {
			oscillator.setFrequency(modules.oscillator[index], value);
		}, 
		pulseWidth: function (value, index) {
			console.log('change pulseWidth');
		},
		output: function (value, index) {
			console.log('change output');
		}
	},
	VCA: {
		input: function (value, index) {
			console.log('change input');
		},
		cvControl: function (value, index) {
			vca.setValue(modules.vca[index], value);
		},
		output: function (value, index) {
console.log('change output');
		}
	}
}

var synth = {
	
	init:function () {
		console.log('synth.init');
		
		oscillator.setWavetype(modules.oscillator[0], 'sine');
		oscillator.setFrequency(modules.oscillator[0], 440);

		vca.setValue(modules.vca[0], 1);

		modules.oscillator[0].start(0);
		modules.vca[0].connect(audioContext.destination);
		modules.oscillator[0].connect(modules.vca[0]);
		modules.oscillator[1].connect(modules.vca[0]);

		synth.getDOMModules();
		
	},
	getDOMModules: function () {
		var parameterDOM = document.querySelectorAll('.fn-parameter');
		
		for(var i = 0; i < parameterDOM.length;i++) {
			parameterDOM[i].addEventListener('input', function (e) {
				options[e.target.getAttribute('data-module')][e.target.getAttribute('data-target')](e.target.value, e.target.getAttribute('module-index'));
			})
		}
	}
}





// synth.init();

// window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

// var oscillator = window.audioContext.createOscillator();
// oscillator.frequency.value = 440;
// // oscillator.noteOn(window.audioContext.currentTime + 0.00);
// // oscillator.noteOff(window.audioContext.currentTime + 2.25);

// var gain = window.audioContext.createGain();
// gain.gain.setValueAtTime(0.05, window.audioContext.currentTime + 0.00);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.25);
// gain.gain.setValueAtTime(0.10, window.audioContext.currentTime + 0.50);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 0.75);
// gain.gain.setValueAtTime(0.20, window.audioContext.currentTime + 1.00);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.25);
// gain.gain.setValueAtTime(0.40, window.audioContext.currentTime + 1.50);
// gain.gain.setValueAtTime(0.00, window.audioContext.currentTime + 1.75);
// gain.gain.setValueAtTime(0.80, window.audioContext.currentTime + 2.00);

// oscillator.start(0);
// gain.connect(audioContext.destination);
// oscillator.connect(gain);
            
var drag = {
	init:function () {
		if(document.querySelector('.fn-draggable')) {
			drag.createDraggable('.fn-draggable', 'body');
			drag.createDrop('.fn-delete-box', '.fn-draggable');
		}
	},
	createDraggable: function (element, area) {
		console.log('drag.createDraggable');
		interact(element).draggable({
			inertia: true,
			manualStart: true,
			restrict: {
				restriction: area,
				endOnly: true,
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			},
			autoScroll: false,
			onmove: function (event) {
				var target = event.target;
				
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
				target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}
		}).on('move', function (event) {
	
			var interaction = event.interaction;
			if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
				var original = event.currentTarget;
				var clone    = event.currentTarget.cloneNode(true);
				var x        = clone.offsetLeft;
				var y        = clone.offsetTop;
				
				clone.setAttribute('clonable','false');
				clone.style.position = "absolute";
				original.setAttribute('drag-status', 'ghost');
				clone.style.left     = original.offsetLeft + "px";
				clone.style.top      = original.offsetTop + "px";
				clone.style.width    = original.offsetWidth + "px";
				clone.style.height   = original.offsetHeight + "px";
				clone.classList.add('fn-clone');

				original.parentElement.appendChild(clone);
				interaction.start({ name: 'drag' },event.interactable,clone);
			}

		})
	},
	createDrop: function (element, accept) {
		console.log('drag.createDrop');
		interact(element).dropzone({
			accept: accept,
			ondropactivate: function (event) {
				console.log(event.target);
				event.target.classList.add('active');
			},

			ondragenter: function (event) {
				event.relatedTarget.setAttribute('drag-status', 'dragIn');
			},
			
			ondrop: function (event) {
				console.log('dropped it', event);
				module.deleteFromUser(event.relatedTarget.getAttribute('module-id'));
				event.target.classList.remove('active');
			},

			ondropdeactivate: function (event) {
				console.log('ondropdeactivate');
				document.querySelector('li[drag-status="ghost"]').setAttribute('drag-status', 'none');
				
				document.querySelector('.fn-clone').remove()
				event.target.classList.remove('active');
			}
		});

	}
}



var module = {
	addModule: function () {
		
		// console.log('module.addmodule');
		// var modules = document.querySelectorAll('.fn-select-module');
		
		// for(var i = 0; i < modules.length; i++) {
		// 	modules[i].addEventListener('click',  module.addModuleEvent)
		// }
	},
	addModuleEvent(event) {
		// console.log(event);
		// var category = tools.getParameterByName('category');
		// var col      = tools.getParameterByName('col');
		// var id       = event.target.getAttribute('module-id');

		// if(id == null) {
		// 	id = event.target.parentNode.getAttribute('module-id');
		// }
		// $.post({
		//  url: '/play/add',
		//  data: {
		//  	moduleId: parseInt(id), 
		//  	col: col,
		//  	category: category
		//  },
		//  success: function(res){
		//  	console.log('success', res);
		//   window.location = res.redirectTo;
		//  },
		//  error: function (res) {
		//  	alert('too much')
		//  	window.location = res.redirectTo;
		//  }
		// }); 

	},
	deleteFromUser: function (id) {
		$.post({
		 url: '/play/remove',
		 data: {id:id},
		 success: function(res){
		  window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	window.location = res.redirectTo;
		 }
		}); 
	}
}

var motion = {
	first:true,
	minDiff: 30,
	base:0,
	init: function () {
		motion.right();
		// motion.left();
		console.log('motion.init');
	},
	right: function () {
		window.addEventListener('deviceorientation', motion.motionEvent);
	},
	motionEvent: function (event, re) {
		if(motion.first) {
			motion.base  = event.alpha;        
			motion.first = false;              
		}
		var change = event.alpha - motion.base;

		if(change *-1 > motion.minDiff) {
			console.log('got it!');
			motion.changeLive();
			window.removeEventListener('deviceorientation', motion.motionEvent);
			
			

		}
	},
	changeLive: function () {
		$.post({
		 url: '/play/live',
		 data: {
		 	isLive: true
		 },
		 success: function(res){
		 	console.log('success', res);
		 	window.reload();
		  // window.location = res.redirectTo;
		 },
		 error: function (res) {
		 	console.log('error', res);
		 	// alert('too much')
		 	// window.location = res.redirectTo;
		 }
		});
	}
}
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
var tools = {
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
		}

	},
	getParameterByName: function (name, url) {
		// code: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
		if (!url) {
	      url = window.location.href;
	    }
	    
	    name = name.replace(/[\[\]]/g, "\\$&");
	    
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	        
	    if (!results) return null;
	    if (!results[2]) return '';
	    
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	shareButton: function () {
		// var button = document.querySelector('.fn-share');

		
	}
}

var touchController = {
	petMin: 200,
	petMax: 250,
	currentTangible:false,
	init:function () {
		touchController.createRotate();
		// console.log('touch');
		
		// window.addEventListener('touchstart', function (e) {
			
		// 	console.log(e.touches);

		// 	// check of touch meer is dan 1 
		// 	// if(e.touches.length >= 2) {
		// 	// 	var thisTouch = e.touches[e.touches.length - 1];
		// 	// 	var prevTouch = e.touches[e.touches.length - 2] ;
				
		// 	// 	var isTangible = touchController.isTangible(thisTouch, prevTouch);
		// 	// 	console.log(isTangible);
		// 	// 	if(isTangible) {
		// 	// 		window.addEventListener('touchend', function (ev) {
		// 	// 			// var thisNewTouch = 
		// 	// 			console.log(ev);
		// 	// 		}) 
		// 	// 	}
		// 	// }
		// 	// console.log(e.touches.length);
		// 	// var thisTouch - e
		// 	// for(var i = 0; i < e.touches.length;i++ ) {
		// 	// 	console.log(e.touches[i]);
		// 	// }


		// 	// check of touch meer is dan 2
		// 	// huidige touch (is laatste) vergelijken met huidige touch - 1;
		// 	// diff ongeveer gelijk aan diff tussen de tangible object touch points.
		// 	// controleren op resolutie mogelijk problemen hier.




		// // 	 var touch;

		// // 	  if (ev.targetTouches.length >= 1) {

		// // 	     touch = ev.targetTouches.item(0);
		// // 	  }
		// // 	  else {
		// // 	     touch = ev.touches.item(0);
		// // 	  }
			
		// // console.log(touch);
		// 	// for(var i in e.touches) {
		// 	// 	// console.log(e.touches[i].touchList);
		// 	// 	// console.log(e.touches[i].screenX);
		// 	// 	// console.log(e.touches[i].identifier);
		// 	// }
			
		// })
	},
	createRotate: function () {
		var angle = 0;
		console.log(angle);
		interact('.fn-rotate').gesturable({
		  onmove: function (event) {
		  	console.log('move');
		    var arrow = document.querySelector('.fn-rotate-inner');

		    angle += event.da;

		    arrow.style.webkitTransform =
		    arrow.style.transform =
		      'rotate(' + angle + 'deg)';

		    // document.getElementById('angle-info').textContent =
		    //   angle.toFixed(2) + '°';
		  }
		});

	},
	isTangible: function (thisTouch, prevTouch) {
		var diff = touchController.difference(thisTouch.pageX, prevTouch.pageX, thisTouch.pageY, prevTouch.pageY);
		
		return diff > touchController.petMin && diff < touchController.petMax;
	},
	difference:function (x1, x2, y1,y2) {

		// based on :http://www.mathopenref.com/coorddist.html
		var x = Math.max(x1, x2) - Math.min(x1, x2);
		var y = Math.max(y1, y2) - Math.min(y1, y2);
		
		return Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));

	},
	removeDefaultGestures() {
		window.ontouchmove = function(e){	
			// e.preventDefault();	
			// e.stopPropagation();
		}
	}
}
var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  init: function () {
    console.log('tracker init');
    cameraTracker.camera();
  },
  camera: function () {
    var arr = [];
    var info  = document.querySelector('.fn-info');
    var video = document.querySelector('video');
    var meter = document.querySelector('.fn-tracking-meter');

    
    var tracker = new tracking.ColorTracker(['yellow']);

    tracking.track(video, tracker, { camera: true });

    tracker.on('track', function(event) {

      if(event.data[0]) {
        var biggest = 0;
        for(var i in event.data) {

          if(event.data[i].width > biggest) {
            biggest = event.data[i].width;
          }
          arr.push(biggest)
        }
      }
    });

    window.setInterval(function () {
      if(arr.length) {
        cameraTracker.audioInterval(arr, meter);
        arr = [];
      }
    },200)

  },

  audioInterval: function (arr, meter) {
    var avg = cameraTracker.calculateAverage(arr);

    var info  = document.querySelector('.fn-info');

    if(cameraTracker.first) {
      console.log('first');
      cameraTracker.first = false;
      cameraTracker.baseNum = avg;
      console.log(cameraTracker.first, cameraTracker.baseNum);
    }
    if(avg) {
        var a       = avg * cameraTracker.base;
        var newFreq = a / cameraTracker.baseNum;
        
        info.textContent = newFreq;

        if(newFreq > cameraTracker.maxValue) {
          newFreq = cameraTracker.maxValue;
        } else if( newFreq < 200) {
          newFreq = 220;
        }
        
        var b = 100 * newFreq;
        var percentage = b / cameraTracker.maxValue;
        
      

        cameraTracker.updateMeter(meter, percentage);
        
      } else {
        console.log('no colors detected');
      }
  },
  calculateAverage: function (arr) {
    var sum = 0;
    for(var i = 0; i < arr.length;i++) {
      sum += arr[i];
    }
    if(arr.length) {
      return sum / arr.length
    } else {
      return false;
    }
  },
  updateMeter: function (meter, value) {
    value = value - 50;
    value = value * 2;

    console.log('updateMeter');
    meter.style.width = value + '%';
    meter.style.height = value + '%';

  }

}
var onLoad = function () {
	tools.autoSubmit();
	drag.init();

	// drag.init();
	// motion.init();
	
	// touchController.init();
	
	// switch(window.location.pathname) {
	// 	case '/play/tracker':
	// 		// cameraTracker.init();
			
	// 		break;
	// 	case '/play':
	// 		audio.init();
	// 		// tools.autoSubmit();
	// 		break;
	// 	case '/create':
	// 		tools.autoSubmit();
	// 		break;
	// 	case '/play/add':
			
	
	// 		console.log('dis');
	// 		break;
	// 	default:
	// 		console.log('no special pathname');
	// 		break;
	// }
}

var pageTransitions = function () {
	Barba.Pjax.start();
	var HideShowTransition = Barba.BaseTransition.extend({
	  start: function() {
	  	Promise
	      .all([this.newContainerLoading, this.scrollOld()])
	      .then(this.moveDown.bind(this));
	  },
	  scrollOld: function () {
	  	 TweenLite.set(this.oldContainer, {
	        visibility: 'visible',
	        position: 'absolute',
	        left: 0,
	        top: 0,
	        right: 0,
	        height:'100%'
	      });
	  	$(this.oldContainer).promise();
	  },
	  moveDown: function() {
		var _this         = this;
		var animationTime = .3;
		var lastLink      = Barba.HistoryManager.prevStatus().url.split('/').pop();
		var currentLink   = Barba.HistoryManager.currentStatus().url.split('/').pop();
		console.log(Barba.HistoryManager.currentStatus().url.split('/'));
		var newContainerFrom = {
			visibility: 'visible',
			position  : 'fixed',
			left      : 0,
			top       : 0,
			right     : 0,
			height    :'100%',
			transform:'scale(1)',
		};
		var oldContainerTo = {
			top :0,
			left:0,
			opacity:1
		}
		var newContainerTo = {
			top:0,

			onComplete: function() {
				TweenLite.set(_this.newContainer, { clearProps: 'all' });
				onLoad();
				_this.done();
			}
		};

		if(currentLink == 'group') {
			oldContainerTo.top   = '100%';
			newContainerFrom.top = '-100%';
		} else if(currentLink == 'play') {
			if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
				oldContainerTo.top   = '100%';
				newContainerFrom.top = '-100%';
				newContainerTo.top   = 0;
			} else {
				oldContainerTo.left   = '-100%';
				newContainerFrom.left = '100%';
				newContainerTo.left   = 0;
			}
		} else if (currentLink == 'add') {
			oldContainerTo.left   = '100%';
			newContainerFrom.left = '-100%';
			newContainerTo.left   = 0;
		} else if($.inArray('module', Barba.HistoryManager.currentStatus().url.split('/'))) {
			oldContainerTo.top   = '-100%';
			newContainerFrom.top = '100%';
			newContainerTo.top   = 0;
		}

			TweenLite.set(this.newContainer,newContainerFrom);
			TweenLite.to(this.oldContainer, animationTime, oldContainerTo);
			TweenLite.to(this.newContainer, animationTime, newContainerTo);
		},

	
	  finish: function () {
	  	onLoad();
	  	console.log('finish!');
		this.done();
		
	  }
	 
	});
	
	Barba.Pjax.getTransition = function() {
	  return HideShowTransition;
	};
	
}


window.onload = function () {
	pageTransitions();
	onLoad();

}
