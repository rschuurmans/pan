
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		handInteraction.init();
		changePage.onboarding()
		listen.role()
		tips.init();
		events.unload();

		if(path.indexOf('sequencer') !== -1) {
			
			sequencer.init();
			pp.setup();
			
		} else {
			
			modulator.init();
			cameraTracker.checkSupport();
			// changePage.sequencerNavigation();
			// modulateSocket();
			// changePage.selector();
			// inputEvent.slider();
			// modulate.events();
		}
	} else  if(path.indexOf('/demo') !== -1) { 
	} else  if(path.indexOf('/live') !== -1) { 
		
		masterSequence.init();
		listen.master();
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
		changePage.init();
	}
	
}
window.onload = function () {
	console.log('load');
	init();

}

var socket = io();
// var binary = new BinaryClient('ws://localhost:3000');

// binary.on('open', function () {

// 	window.Stream = binary.createStream();

// })

var listen = {

	master: function () {
		
			
			socket.emit('joinRoom', 'master');
			socket.emit('joinRoom', 'live');


			socket.on('audioBlob', function (received) {
				
				
				 masterSequence.parseBlobAudio(received.data);
				 received.data.blob = null;
				 liveRoom.checkUser(received.data);
				
			})
			socket.on('liveUpdate', function (received) {
				liveRoom.updateActiveUsers(received);
				
			})

		
	},
	role: function () {
		// listen.modulate();
		
			
		var groupId = tools.currentGroupId();

		socket.emit('joinRoom', groupId);
		socket.emit('joinRoom', 'live');



		sendSocket.send('groupUpdate', groupId, {text: data.user.username + ' heeft zich aangesloten'})
		
		socket.on('demo', function (received) {
			
			demosec(received);
		})
		
	
		// happens: updated melody from sequencer
		socket.on('updateAllSteps', function (received) {
			data.group.steps = received.data.steps;
			
		})
		// happens: on loop message from server
		

		socket.on('groupUpdate', function (received) {
			var message = document.querySelector('.fn-notification');
			message.innerHTML = received.data.text;
			message.style.opacity = 1;
			setTimeout(function () {
				message.style.opacity = 0;
			}, 3000)
			console.log('received an groupUpdate', received);
		})
		socket.on('updateSources', function (received) {
			sources.update[received.data.type]({id: received.data.id, value:received.data.value})
			console.log('received an updateSources', received);
		})
		socket.on('updateSingleStep', function (received) {
			data.group.steps[parseInt(received.data.index)] = received.data.step;
			console.log('received an updateSingleStep', received);
		})

		socket.on('updateSustain', function (received) {
			console.log('received an updateSustain', received);
			data.group.sustain = received.data.sustain;

			console.log('received an updateSustain', received);
		})

		socket.on('updateADSR', function (received) {
		// adsr.update(received.type, received.value)
		adsr.update(received.data.type, received.data.value);
			console.log('received an updateADSR', received);
		})
		socket.on('ppValues', function (received) {
		audio.ppFreq = received.data.freq;
			for(var i in audio.sources) {
				sources.update.volume({id:audio.sources[i].id, value:received.data.volume});
			}
			console.log('received an ppValues', received);
		})
		socket.on('updateFilter', function (received) {
			filters.update(received.data.type, received.data.value);
		})
		
		

		
		


	},
	modulate: function () {
		socket.on('updateSteps', function (received) {
			console.log('received a socket', received);
			data.steps[received.index] = received.step;
		})
	}
}

var listenStartSocket = function () {
	socket.on('startSequence', function (fulldelay) {
		if(loop.stopped) {
			console.log('start loop from sokt');
			loop.start(fulldelay);
		} 
	})
}




var sendSocket = {
	send: function (socketName, id, sendData) {	
		console.log('sending this socket', socketName);
		socket.emit(socketName, {
			room:id,
			data: sendData
		})
	}
}

var adsr = {
	getEnvelope: function (groupId) {
  		return   {
            attack: tools.pathObj(data.group, 'adsr.attack.value'),
            decay: tools.pathObj(data.group, 'adsr.decay.value'),
            sustain: .5,
            release: tools.pathObj(data.group, 'adsr.release.value'),
        }
        
	},
	update: function (type, value) {
		data.group.adsr[type].value = parseFloat(value);
		audio.gainNode[type] = parseFloat(value);
	},
	
	init: function () {
		// adsr.drawSVG();
		adsr.sustainEvent();
		var svgLine = document.querySelector('svg .poly');
		var width   = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width)/8;
		var inputs  = document.querySelectorAll('.fn-adsr-range-item');
		
		var points = []
		for(var i = 0; i < inputs.length ;i++) {
			var point = adsr.getPoints(i);
			points.push(point)

		    inputs[i].addEventListener('input', function (e) {
		    	var id = e.currentTarget.id;
				var idNumber = parseInt(e.currentTarget.id.split('adsr-')[1]);
				var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	adsr.showActive(id);
		    	adsr.svgUpdate(svgLine, points, idNumber)
		    	adsr.update(type, value);
		    	
		    })
		    inputs[i].addEventListener('change', function (e) {
		    	var type     = e.currentTarget.getAttribute('modulate-type');
				var value    = e.currentTarget.value;

		    	sendSocket.send('updateADSR', data.group._id, {
		    		type: type, 
		    		value: value
		    	})
		    })
		}
		adsr.drawSVGInit(svgLine, points);

	},
	showActive: function (id) {
		var labels = document.querySelectorAll('.fn-label-adsr');
		
		for(var i = 0; i < labels.length;i++) {
			if(labels[i].getAttribute('for') == id ) {
				labels[i].classList.add('active');
			} else {
				labels[i].classList.remove('active');
			}
		}

	},
	getPoints: function (index) {
		var inputs = document.querySelectorAll('.fn-adsr-range-item');
		var pos    = inputs[index].getBoundingClientRect();
		
		var value  = document.querySelectorAll('.fn-adsr-range-item')[index].value;
		var max    = inputs[index].getAttribute('max');
		value      = max - value;
		var perc   = (value*100)/max;
		var left   = ((100/inputs.length) * index) + ((100/inputs.length)/2);

	    
	    var points = {
	    	x: left,
	    	y: perc
	    }
	    return points
	},
	drawSVGInit: function (line, points) {
		var width     = (document.querySelector('.input-range-vert-container').getBoundingClientRect().width);
		var height    = (document.querySelector('.input-range-vert-container').getBoundingClientRect().height);
		var attribute =  '0 100';
		
		for(var i in points) {
			attribute += ',' + points[i].x + ' ' + points[i].y
		}
		attribute +=  ',100 100';
		line.setAttribute('points', attribute);
	},
	svgUpdate: function (line, points, index) {
		var attribute        = line.getAttribute('points').split(',');
		var point            = adsr.getPoints(index);
		var currentAttribute = attribute[index + 1].split(' ');
		attribute[index + 1] = currentAttribute[0] + " " + point.y;
		line.setAttribute('points', attribute)
	},
	sustainEvent: function () {
		var sustainButton = document.querySelector('.fn-sustain');
		this.sustain      = data.group.sustain;
		var self          = this;

		sustainButton.addEventListener('change', function (e) {
			var sustainValue = e.currentTarget.checked;
			self.setSustain(sustainValue);
			sendSocket.send('updateSustain',tools.setGroup(), {sustain: sustainValue})

		})
	},
	setSustain : function (value ) {
		data.group.sustain = this.sustain = value;
	}
	
	
}
var body = document.querySelector('body');

var animate = {
	splashDelay:100,
	shapeDelay:300,
	restartAnimations: function () {
		var animations = document.querySelectorAll('.fn-start-animation');
		
		for(var i = 0; i < animations.length;i++) {
				animations[i].classList.remove('animate-stagger');
				animations[i].style.opacity = 0;
				
				window.setTimeout(function (item) {
					item.classList.add('animate-stagger');
					item.style.opacity=  1;

				},5, animations[i])
		}

	},
	loginBackground: function() {
		var confettiWrapper = document.querySelector('.fn-confetti');
		var colors          = ["#56009C", "#DF1977", "#3038F2","#FFFF00", "#FF5500"];
		var amount          = Math.floor(Math.random() * 32) + 20;  

		
		var randomLocation = function (item) {
			item.style.left            = Math.floor(Math.random() * 90) + 0 + 'vw';
			item.style.top             = Math.floor(Math.random() * 100) + 0 + '%';
		}

		var createShape = function () {
			var color        = colors[Math.floor(Math.random() * colors.length)];
			var shapes       = ['<svg width="34px" height="31px" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->    <desc>Created with Sketch.</desc>    <defs></defs>    <g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g id="iPhone-7-Copy-68" transform="translate(-172.000000, -33.000000)" class="place-color">            <g id="bg">                <g id="animated" transform="translate(10.000000, 33.000000)">                    <polygon id="Polygon" points="179 0 195.167961 11.7467111 188.992349 30.7532889 169.007651 30.7532889 162.832039 11.7467111"></polygon>                </g></g></g></g></svg>', '<svg width="62px" height="64px" viewBox="0 0 62 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-34.000000, -162.000000)" stroke-width="8" class="place-stroke"><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><path d="M43,134.408029 L69.6816418,176 L16.3183582,176 L43,134.408029 Z" id="Triangle-2" transform="translate(43.000000, 153.500000) rotate(-27.000000) translate(-43.000000, -153.500000) "></path></g></g></g></g></svg>', '<svg width="66px" height="66px" viewBox="0 0 66 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id="design-v2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-7-Copy-68" transform="translate(-45.000000, -45.000000)" stroke-width="14" class="place-stroke" ><g id="bg"><g id="animated" transform="translate(10.000000, 33.000000)"><circle id="Oval-22" cx="68" cy="45" r="26"></circle></g></g></g></g></svg>']
			var item         = document.createElement('div');

			item.innerHTML   = shapes[Math.floor(Math.random() * shapes.length)];;

			var svg          = item.querySelector('svg');
			var size         = Math.floor(Math.random() * 50) + 25;

			item.className   += "block-confetti";
			svg.style.width  = size + 'px';
			svg.style.height = size + 'px';

			var fill   = svg.querySelector('.place-color');
			var stroke = svg.querySelector('.place-stroke');
			fill ? fill.style.fill = color : stroke.style.fyll = color;
			
			randomLocation(item);

			confettiWrapper.appendChild(item);
			window.setTimeout(function () {
				randomLocation(item);
			},200)
			window.setInterval(function () {
				randomLocation(item)
			}, 20000)
		}

		var index = 0;

		var loop = function () {
			window.setTimeout(function () {
				createShape();
				index++;

				if(index < amount) {
					loop();
				}
			}, animate.shapeDelay)
		}
		loop();

	},
	loginTransition: function () {
		var container = document.querySelector('.fn-splash');

		window.setTimeout(function () {
			container.classList.remove('splashtransition-active');
			body.setAttribute('splash', 'finished')
			animate.shapeDelay = 1000;
		}, animate.splashDelay);


	},
}

// to check
//  - recordin met sustain aan
// - adsr tekenen is nog geen super mooie js
// - pp code is nog niet heel netjes
// - pp als device input
// hand als input record
// fix drum geluid
// sources modulator
// filters modulator
// check adsr tipset
// fina tip text opacity naar 0

var audioContext = StartAudioContext(Tone.context, ".fn-start-sequece");

var audio = {
    sources: [],
    gainNode:[],
    filters: [],
    ppFreq: false,
    envelope: null,
    gain: null,
    defTime: "8n",
    isLive: false,
    setScale: function () {
        this.highest = 0;
        for(var i in data.group.scale) {
            if(this.highest <= data.group.scale[i]) {
                this.highest = data.group.scale[i];
            }
        }
    },

    setup: function() {
        this.setScale();
        sources.setup();
        listenStartSocket();
    },
    setFrequencies: function (freq) {
        console.log('setting the freq to ', freq);
        var self = this;
        for(var i in self.sources) {
            // self.sources[i].frequency.value = freq;
            self.sources[i].frequency.rampTo(freq, 0.1);
        }
    },
    slideFrequency: function (freq) {
        var self = this;
        for(var i in self.sources) {
            
        }
    },
    oscVolume: function (value) {
        var self = this;
        for(var i in self.sources) {
            // self.sources[i].volume.value = value;
        }
    },
    triggerEnvAttack: function(freq, time) {

        this.setFrequencies(this.overrideFreq ? this.overrideFreq : freq)
    
            
        if(adsr.sustain) {
            audio.gainNode.triggerAttack();
        } else {
            audio.gainNode.triggerAttackRelease(time)
        }
    },

    triggerRelease: function(audioData) {
        
        // audio.gainNode.triggerRelease();
    },
}


var exportAudio = {
    rec: new Recorder(Tone.Master),
     createDownloadLink : function () {
        this.rec && this.rec.exportWAV(function(blob) {
          var url = URL.createObjectURL(blob);
          var file = blob;
          file.lastModifiedDate = new Date();
          file.name = 'ehname.wav';
          
          sendSocket.send('audioBlob', 'master', {
            blob : file,
            userId: data.user._id,
            active: true,
            username: data.user.username,
            color: data.user.color,
            groupId: data.group._id
          })
        });
    },
    startRecording: function () {
        this.rec.record();
    },
    cancelRecording: function () {
        this.rec.clear();
    },
    stopRecording: function () {
        this.createDownloadLink();
        this.rec.clear();
    },
    recordLoop: function (index) {
        
        if(index == 0) {
        
            this.startRecording();
        } else if(index == 15) {
            this.stopRecording();
        }
    }
}

var loop = {
    stopped: true,
    index: 0,
    hold: 0,
    holdTone: function(start, freq) {
        // kan misschien weg / schoner? wordt gebruikt met zetten van de frequeney met draaien.
        if (start) {
            if (loop.hold) {
                for (var i = 0; i < audio.sources.length; i++) {
                    audio.sources[i].setNote(freq);
                }
            } else {
                loop.hold = true;
                audio.triggerAttack(freq);
            }
        } else {
            loop.hold = false;
            audio.triggerRelease();

        }
    },

    playStep: function(currentStep, time, index) {
        
        var release     = adsr.getEnvelope().release + 1;
        var releaseTone = Math.floor(((release * 64)/2)) + 'n';
            
        if(currentStep.active) {
            audio.triggerEnvAttack(currentStep.frequency, releaseTone);
        }
        
        events.showStep(index);
    },
    increaseIndex: function() {
        var self = this;
        this.index = tools.increaseOrMax({
            increasable: self.index,
            max: 16,
            min: 0
        });
    },

    getBPM : function (delay) {
        return 60000/delay;
    },

    start: function(serverDelay) {
        this.stopped = false;
        this.index   = 0;
        this.hold    = false;
        
        Tone.Transport.bpm.value = this.getBPM(serverDelay);

        var self = this;
        Tone.Transport.scheduleRepeat(function(time) {
            exportAudio.recordLoop(self.index);
                var steps = data.group.steps;
                var loopLength = steps.length;

                if(!recording.isRecording) {
                    if(loopLength == 4 && self.index%4 == 0) {
                        self.playStep(steps[self.index/4], self, self.index/4);

                    } else if(loopLength == 8 && self.index%2 == 0) {
                        self.playStep(steps[self.index/2], time, self.index/2);

                    } else if (loopLength == 16) {
                        self.playStep(steps[self.index], time, self.index);

                    } 

                } else {
                    exportAudio.cancelRecording();
                }
                self.increaseIndex();
        }, '16n');
        
        Tone.Transport.start('+0.1')
    }
}


var sources = {
    setup: function() {
        this.createSources();
        filters.setup();
        sources.setDetune();

    },
    createSources: function() {
        var self = this;

        data.group.sources.forEach(function(source, index) {

            if (source.type == 'noise') {
                self.createNoise(data.group._id, index);
            } else {
                self.createSource(source.type, data.group._id, index);
            }
        });
        sources.connectEnvelope(data.group._id);
    },
    createNoise: function (groupId, index) {
        var noise     = new Tone.Noise("pink").start();
        noise.id      = index;
        audio.sources = !audio.sources ? [] :audio.sources;
        audio.sources.push(noise);

    },
    createSource: function (type, groupId, index) {
        var oscillator  = new Tone.Oscillator();
        oscillator.type = type;
        oscillator.id   = index;
        audio.sources   = !audio.sources ? [] : audio.sources;
        audio.sources.push(oscillator);

    },
    connectEnvelope: function (groupId) {
        audio.gainNode = new Tone.AmplitudeEnvelope(adsr.getEnvelope());

        for(var i in audio.sources) {
            audio.sources[i].connect(audio.gainNode)
            audio.sources[i].start();
        }
        audio.gainNode.toMaster();    
    },
   
    update: {
        // nog niet
        wavetype: function(received) {

            if (received.value == 'noise') {
                if (data.group.sources[received.id].active) {
                    sources.remove(received.id);
                    sources.create.noise(received.id);
                    filters.connectSingleSource(received.id);
                } else {
                    data.group.sources[received.id].type = 'noise'
                }

            } else {
                for (var i in audio.sources) {

                    if (audio.sources[i].id == received.id) {

                        if (audio.sources[i].noise) {
                            sources.remove(received.id);
                            sources.create[data.group.synth](received.id);
                            filters.connectSingleSource(received.id);
                        } else {
                            audio.sources[i].oscillator.type = received.value;
                        }
                    }
                }
            }
        },
        phase: function(received) {
            for (var i in audio.sources) {
                if (audio.sources[i].id == received.id) {
                    audio.sources[i].oscillator.phase = received.value;
                }
            }
        },
        active: function(received) {
            if (received.value) {
                if (data.group.sources[received.id].type == 'noise') {
                    sources.create['noise'](received.id);
                } else {
                    sources.create[data.group.synth](received.id);
                }
                filters.connectSingleSource(received.id);
            } else {
                sources.remove(received.id);
            }
        },
        detune: function(received) {
            for (var i in audio.sources) {
                if (audio.sources[i].id == received.id) {
                    if (audio.sources[i].detune) {
                        audio.sources[i].detune.input.value = received.value;
                    } else {
                        audio.sources[i].oscillator.detune.input.value = received.value;
                    }
                }
            }

        },
        volume: function(received) {
            for (var i in audio.sources) {
                if (audio.sources[i].id == received.id) {
                    audio.sources[i].volume.input.value = received.value;
                }
            }
        },
    },
    changewavetype: function(id, value) {
        for (var i in audio.sources) {
            if (audio.sources[i].id == id) {
                audio.sources[i].oscillator.type = value;
            }
        }
    },
    remove: function(id) {
        audio.triggerRelease(id)
        for (var i in audio.sources) {
            if (audio.sources[i].id == id) {
                audio.sources.splice(i, 1);
            }
        }
    },
    setDetune: function() {
        console.log('moet nog');
        // use the data.group.set method as used in sequencer.holdtone
        // for(var i in audio.sources) {
        // 	audio.sources[i].detune.input.value = data.sources[parseInt(audio.sources[i].id)].detune;
        // };

    }
}

// moet nog
var filters = {
    setup: function() {
        // data.group.forEach(function(group) {

        // 	group.modulate.forEach(function (modulate) {
        // 		filters.create[modulate.type](modulate)
        // 	})
        // });

        filters.connect();
    },
    connect: function() {

        // audio.gain = Tone.context.createGain()

        // for(var y in audio.filters) {
        // 	audio.gain.connect(audio.filters[y])
        // }
        // if(audio.filters.length == 0) {
        // 	audio.gain.connect(Tone.Master);
        // }
        // for (var i in audio.sources) {
        	
        //     for(var y in audio.sources[i]) {

        //     	audio.sources[i][y].toMaster()
        //     }

        // }
    },
    connectSingleSource: function(id) {
        for (var i in audio.sources) {
            if (audio.sources[i].id == id) {

                audio.sources[i].connect(audio.gain)
            }
        }
    },
    create: {
        pingpong: function(data) {
            var filter = new Tone.PingPongDelay(2, 2).toMaster();;

            filter.wet.value = 0;

            if (!audio.filters[0]) {
                audio.filters[0] = [];

            }
            audio.filters[0].pingpong = filter;

        },
        tremelo: function(data) {
            var autoFilter = new Tone.AutoFilter({
                frequency: data.values.frequency,
                depth: data.values.depth,
            }).toMaster().start();
            autoFilter.wet.value = 0;
            audio.filters.tremelo = autoFilter;
        },
        chorus: function(data) {
            var chorus = new Tone.Chorus().toMaster();

            chorus.wet.value = 0;
            audio.filters.chorus = chorus
        },
        wahwah: function(data) {
            var autoWah = new Tone.AutoWah({
                baseFrequency: data.values.baseFrequency,
                octaves: 3,
                sensitivity: 0,
                Q: data.values.q,
                gain: data.values.gain,

            }).toMaster();
            autoWah.wet.value = 0;

            audio.filters.wahwah = autoWah;

        },
        lowpass: function(data) {
            var biquadFilter = Tone.context.createBiquadFilter().toMaster();
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.value = 2000;
            biquadFilter.gain.value = 0;
            audio.filters.lowpass = biquadFilter;

        },
        highpass: function(data) {
            var biquadFilter = Tone.context.createBiquadFilter().toMaster();
            biquadFilter.type = "highshelf";
            biquadFilter.frequency.value = 200;
            biquadFilter.gain.value = 0;
            audio.filters.highpass = biquadFilter;

        },

        delay: function(data) {
            var feedbackDelay = new Tone.FeedbackDelay(data.values.delayTime, 0.5).toMaster();
            feedbackDelay.wet.value = 0;
            audio.filters.delay = feedbackDelay;
        },
        distortion: function(data) {
            var dist = new Tone.Distortion({
                distortion: data.values.distortion,
                oversample: data.values.oversample
            }).toMaster();
            dist.wet.value = 0;
            audio.filters.distortion = dist;

        }


    },
    update: function(type, value) {

        if (type == 'highpass' || type == 'lowpass') {
            audio.filters[type].gain.value = value * 2;
        } else {
            audio.filters[type].wet.value = value;
        }

    },

}





var events = {
	showStep: function (index) {
		
		var steps   = document.querySelectorAll('.fn-sequencer-item');
		for(var i = 0; i < steps.length; i++) {
			steps[i].classList.toggle('highlight', i == index)
		
		};

		// if(steps.length && !recording.isRecording) {
		// 	steps.forEach(function(step) {
		// 		step.classList.remove('highlight');
		// 	});
		// 	steps[index].classList.add('highlight')
		// } else {
		// 	steps.forEach(function(step) {
		// 		step.classList.remove('highlight')
		// 	});
		// }
	},
	showRotate: function (item) {
		body.setAttribute('rotate-active', true);
		item.parentNode.classList.add('rotate-active');
		events.sizeRotate(sequencer.getItemStep(item).frequency);
	},
	sizeRotate: function (value, item) {
		if(item) {
			var percentage  = (tools.getPercentage(value, 1200) * 70) / 100;
			var circleSize  = percentage / 10;

			var extraCircle = item.querySelector('.rotate-extra-circle');
			 extraCircle.style.transform='scale( '+ circleSize*2 +')';
			 extraCircle.style.borderWidth = percentage/2 + 'px';
		} else {
			var circles = document.querySelectorAll('.rotate-extra-circle');
			for(var i = 0;i < circles.length;i++) {
				circles[i].style.transform = 'scale(0)';
				circles[i].style.borderWidth = '0px';

			}

		}
	},
	hideRotate: function (item) {
		
		body.removeAttribute('rotate-active');
		item.parentNode.classList.remove('rotate-active');
		item.querySelector('.rotate-extra-circle').style.borderWidth = item.querySelector('.rotate-extra-circle').style.transform = null;
	},
	updateStepLocation: function () {
		// to be implemented, dot as in filter
	},
	unload: function () {
		console.log('unload');
		window.addEventListener('unload', function() {
			sendSocket.send('groupUpdate', data.group._id, {text: data.user.username + ' heeft de groep verlaten'})
			sendSocket.send('liveUpdate', 'live',  {text: data.user.username + ' heeft de groep verlaten'})

			postData.leaveGroup();

		})
	}
	
	
}



var modulator = {
	init: function () {
	      changePage.selector();
	      modulator.events.init();
	      
	},
	events:  {
		init: function () {
			var form          = document.querySelector('.fn-form-modulate');
			var filterButtons = document.querySelectorAll('.fn-modulate-btn');
			var filterSlide   = document.querySelectorAll('.fn-fallback-filter');

			form.addEventListener('input', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
			form.addEventListener('change', function (e) {
				var index = body.getAttribute('current-element');
				modulator.events[e.target.getAttribute('name')](e.target, index)
			})
			filterButtons.forEach(function(button) {
		        button.addEventListener('click', function(e) {
		        	tips.increaseTip('filter');
		          cameraTracker.trackElement(e.currentTarget);
		        });
		      });
		      filterSlide.forEach(function(slider) {
		      	slider.addEventListener('input', function(e) {
		      		
		      		filters.update(e.currentTarget.getAttribute('type'), e.target.value);
		      		sendSocket.send('updateFilter',data.group._id, {
		      			type:e.currentTarget.getAttribute('type'),
		      			value: e.target.value
		      		})
		      		
		      	});
		      });

		},
		active: function (element, index) {
			data.group.sources[index].active = element.checked;
			tips.increaseTip('active');
			sendSocket.send('updateSources',data.group._id, {
				value: element.checked,
				type: 'active', 
				id: index});

		},
		wavetype: function (element, index) {
			data.group.sources[index].type = element.getAttribute('wavetype');
			sendSocket.send('updateSources', data.group._id, {
				value: element.getAttribute('wavetype'),
				type: 'wavetype', 
				id: index});

		},
		detune: function (element, index) {
			tips.increaseTip('detune');
			data.group.sources[index].detune = element.value;

			sendSocket.send('updateSources', data.group._id, {
				value: element.value,
				type: 'detune', 
				id: index})
	
		},
		volume: function (element, index) {
			data.group.sources[index].volume = element.value;
			
			
			sendSocket.send('updateSources', data.group._id, {
				value: element.value,
				type: 'volume', 
				id: index})
		},
		
		visualTrackerStep: function (value) {
			
		}
	},
	fillData: function (index) {
		inputEvent.slider();

		var elementData  = data.group.sources[parseInt(index)]
		var form         = document.querySelector('.fn-form-modulate');
		var wavetypes    = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');

		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider-detune').value             = elementData.detune;
		form.querySelector('.fn-slider-volume').value             = elementData.volume;
		form.querySelector('.fn-active').checked           = elementData.active;
		form.querySelector('.fn-slider-bg').style.clipPath = "polygon(0 0, "+elementData.detune +" % 0, "+elementData.detune+"% 100%, 0% 100%)";

		wavetypes.forEach(function(wavetype) {
			
			if(wavetype.getAttribute('wavetype') == elementData.type) {
				wavetype.checked = true;
			} else {
				wavetype.checked = false;
			}
		});

		inputEvent.setSliderBg('detune', elementData.detune);
		inputEvent.setSliderBg('volume', elementData.volume);
		inputEvent.radioSlider();

		
	},
	updateData: function (index) {
		
		
	},
}
var sequencer = {
	isRecording: false,
	newMelody: [],
	init: function() {
		tools.eachDomElement('.fn-sequencer-item', function (item) {
			
			events.updateStepLocation(item)
			var hammertime = new Hammer(item, {})
			
			sequencer.toggleActive(hammertime)
		})
		recording.setup();
		adsr.init();
	},
	getItemStep : function (item) {
		var step = data.group.steps[parseInt(item.getAttribute('sequence-index'))];
		return step;
	},	
	
	receiveNewValue: function (newValue, item) {

		var frequency = sequencer.calculateFrequency(newValue, parseInt(item.getAttribute('max')));
		loop.holdTone(true, frequency)
	},
	calculateFrequency: function (perc, max) {
		var value = (perc * max) / 100;
		return value;
	},
	calculatePercentage: function (item) {
		var step = sequencer.getItemStep(item);
		var perc = (step.frequency * 100) / step.max;
		return perc;
	},
	
	// changeFrequency: function (hammertime) {
	// 	var item = null;
	// 	var closeFreq = function () {
	// 		deviceRotation.stopListen(function (value) {
	// 			sequencer.updateFrequency(item, value)
	// 		});

	// 		events.hideRotate(item);
	// 	}
	// 	var openFreq = function (e) {
	// 		e.preventDefault();
	// 		item = e.target;
	// 		var percentage = sequencer.calculatePercentage(item);
	// 		deviceRotation.listen(item, 'frequency', percentage);
			
	// 		events.showRotate(item);
	// 		loop.holdTone(true, sequencer.getItemStep(e.target).frequency);

	// 		e.target.addEventListener('mouseup', closeFreq)
	// 		e.target.addEventListener('touchend', closeFreq)
	// 		e.target.addEventListener('touchcancel', closeFreq)
	// 	}
	// 	hammertime.on('press', function (e) {
	// 		openFreq(e);
	// 	})
	// },
	toggleActive: function (hammertime) {
		hammertime.on('tap', function (e) {
			if(!recording.isRecording) {
				var index = parseInt(e.target.getAttribute('sequence-index'));
				tips.increaseTip('clickActive');
				
				data.group.steps[parseInt(index)].active = !data.group.steps[parseInt(index)].active;
				
				e.target.classList.toggle('active');
				
				sendSocket.send('updateSingleStep',data.group._id, 
					{step: data.group.steps[index], index: index})
				
			}
		
		});
	},
	updateActive: function () {
		var steps = document.querySelectorAll('.fn-step-item');
		for(var i = 0; i < steps.length;i++) {
			if(data.group.steps[i].active) {
				steps[i].classList.add('active')
			} else {
				steps[i].classList.remove('active')
			}
		}
	},
	updateFrequency: function(item, newValue) {
		var frequency = sequencer.calculateFrequency(newValue, sequencer.getItemStep(item).max);
		events.updateStepLocation(item);

		var step = sequencer.getItemStep(item);
		step.frequency = frequency;

		
		sendSocket.send('updateSingleStep',data.group._id, 
					{step: step, index: parseInt(item.getAttribute('sequence-index'))})
		
		item.setAttribute('frequency', frequency)
		loop.holdTone(false);

		// 
	},
	
}


// var modulate = {
	
// 	sendSocket: function (newdata) {
		
// 		socket.emit('updateSources', {
// 			room: data.group._id,
// 			data: newdata
// 		});

// 	},
// 	changewavetype: function (newtype) {
// 		var currentData = modulate.getCurrentData();
// 		currentData.type = newtype;
// 		modulate.sendSocket({value: currentData.type, type: 'wavetype', id: currentData.id});

// 	},
// 	changeDetune: function (newvalue) {
		
// 	},
// 	getCurrentData : function () {
// 		var form = document.querySelector('.fn-form-modulate');
// 		var thisdata = data.group.sources[parseInt(form.getAttribute('active-index'))];
// 		return thisdata
// 	},
// 	wavetype: function () {
// 		var form = document.querySelector('.fn-wavetype');
// 		form.querySelector('.fn-input');
// 	}
// }


var changePage = {
	showPage : function (page) {
		var allPages = document.querySelectorAll('.fn-changepage-page');
		
		if(!body.getAttribute('current-page' == page)) {
		body.setAttribute('current-page', page);
		console.log(page);
			for(var i = 0; i < allPages.length ; i++) {
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
				var pageIndex = parseInt(allPages[i].getAttribute('order'));
				body.setAttribute('current-index', pageIndex);

				changePage.setOrigin(allPages, pageIndex)
				
			} else {
				allPages[i].setAttribute('active', false);
			}
		}
		}
		

	},
	setOrigin: function (pages, activeIndex) {
		for(var i = 0; i < pages.length;i++) {

			if(parseInt(pages[i].getAttribute('order')) == activeIndex) {
			} else if (parseInt(pages[i].getAttribute('order')) > activeIndex) {
				pages[i].setAttribute('origin', 'right')
			} else if (parseInt(pages[i].getAttribute('order')) < activeIndex ) {
				pages[i].setAttribute('origin', 'left')
			}
			pages[i].classList.add('pagetransition-slide')
		}
	},
	init: function () {
		var buttons = document.querySelectorAll('.fn-changepage-btn');
		changePage.setOrigin(document.querySelectorAll('.fn-changepage-page'), 0)
		for(var i = 0; i < buttons.length;i++) {
			buttons[i].addEventListener('click', function(e) {
				
				if(e.currentTarget.getAttribute('back-page') && body.getAttribute('current-page') == e.currentTarget.getAttribute('target-page')) {
					changePage.showPage(e.currentTarget.getAttribute('back-page'))

				} else {
					changePage.showPage(e.currentTarget.getAttribute('target-page'))
				}
			});
		}
	},
	onboarding: function () {
		changePage.init();
		changePage.showPage('alert')

		var buttonSeq = document.querySelector('.fn-start-sequence');
		if(buttonSeq) {
			buttonSeq.addEventListener('click', function () {
				audio.setup();
				changePage.showPage('sequencer');
			})
		}
		var buttonCalibrate = document.querySelector('.fn-start-calibrate');
		if(buttonCalibrate) {
			buttonCalibrate.addEventListener('click', function () {
				if(data.supportMedia) {
					changePage.showPage('calibrate');
					cameraTracker.init();
				} else {
					audio.setup();
					changePage.showPage('filters');
					
				}
			})
			
		}

		
	},
	selector: function (){
		var buttons = document.querySelectorAll('.fn-selector-buttons');
		changePage.showElement('0');

		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function (e) {
				changePage.showElement(e.currentTarget.getAttribute('target-element'));
			})
		};
	},
	showElement: function (index, button) {
		modulator.fillData(index);

		var buttons = document.querySelectorAll('.fn-selector-buttons');

		body.setAttribute('current-element', index)

		document.querySelector('.fn-active-bar-container').setAttribute('active', index);

		for(var i = 0; i < buttons.length ; i++) {
			if(i == index) {
				buttons[i].classList.add('active');
			} else {
				buttons[i].classList.remove('active');
			}
			
		}
	}
	
}

var demo = {
	init:function () {
		console.log('demo?');
		// created by Benimation
//		
		var r = 0;
		var rdir = true;

		var screen = document.querySelector('.screen');
	


		window.addEventListener("deviceorientation", handleOrientation, true);
		
		function handleOrientation(event) {
			var absolute = event.absolute;
			if (event.alpha > 180 && event.alpha < 360) {
				var alpha = Math.round(Math.abs(event.alpha/360*255));
				
			} else {
				var alpha = Math.round(Math.abs((360-event.alpha)/360*255));
				
			}
			if (Math.abs(event.beta) > 90 && Math.abs(event.beta) < 180) {
				var beta = Math.round((Math.abs(event.beta/90*255)-225));
				
			} else {
				var beta = Math.round(((180-Math.abs(event.beta))/90*255)-225);
				
			}
			if (Math.abs(event.gamma) > 90 && Math.abs(event.gamma) < 180) {
				var gamma = Math.round(Math.abs(event.gamma/90*255));
				
			} else {
				var gamma = Math.round(((180-Math.abs(event.gamma))/90*255)-255);
				
			}
			
			newColor = "rgba(" + beta + "," + alpha + "," + gamma + ",1.00)";
			
			console.log(alpha, beta, gamma);
			
			// $(".screen").css("background-color", newColor);
			

			screen.style.backgroundColor = newColor;
			
			if (event.alpha > 160 && event.alpha < 180) {
				console.log("north");
				// $(".screen").trigger("click");
				screen.click()
				
			}
			
		}


// To the extent possible under law, the person who associated CC0 with this work has waived all copyright and related or neighboring rights to this work.

// $(document).ready(function(e) {
// 	var r = 0;
// 	var rdir = true;
// 	$(".screen").mousemove(function(event) {
		
		
// 		if (r < 256) {
// 			if (rdir == true) {
// 				r++
// 			} else {
// 				r--
// 			}
			
// 		} else {
// 			rdir = false;
// 			r--;
			
// 		}
		
// 		if (r < 1) {
// 			rdir =  true;
			
// 		}
		
// 		rcolor = r;
		
// 		newColor = "rgba(" + rcolor + "," + gcolor + "," + bcolor + ",1.00)";
		
// 		$(".screen").css("background-color", newColor);
		
// 	});
	
	
	
// 	window.addEventListener("deviceorientation", handleOrientation, true);
	
// 	function handleOrientation(event) {
// 		var absolute = event.absolute;
// 		if (event.alpha > 180 && event.alpha < 360) {
// 			var alpha = Math.round(Math.abs(event.alpha/360*255));
			
// 		} else {
// 			var alpha = Math.round(Math.abs((360-event.alpha)/360*255));
			
// 		}
// 		if (Math.abs(event.beta) > 90 && Math.abs(event.beta) < 180) {
// 			var beta = Math.round((Math.abs(event.beta/90*255)-225));
			
// 		} else {
// 			var beta = Math.round(((180-Math.abs(event.beta))/90*255)-225);
			
// 		}
// 		if (Math.abs(event.gamma) > 90 && Math.abs(event.gamma) < 180) {
// 			var gamma = Math.round(Math.abs(event.gamma/90*255));
			
// 		} else {
// 			var gamma = Math.round(((180-Math.abs(event.gamma))/90*255)-255);
			
// 		}
		
// 		newColor = "rgba(" + beta + "," + alpha + "," + gamma + ",1.00)";
		
// 		console.log(event.alpha);
		
// 		$(".screen").css("background-color", newColor);
		
// 		if (event.alpha > 160 && event.alpha < 180) {
// 			console.log("north");
// 			$(".screen").trigger("click");
			
// 		}
		
// 	}
	
// 	// $(".screen").vibrate("short");
    
// });

	}
}
demo.init();


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

var waveform = new Tone.Analyser("waveform", 1024);
// var analyzer = new Tone.Analyser("fft", 64);

var masterSequence = {
	player:null,
	parts: [],
	analyzers : [],
	init: function () {
		var startAllButton = document.querySelector('.fn-startAllSequence-cb');
		
		startAllButton.addEventListener('change', function(e) {
			
			postData.postRequest('/live', {start: e.currentTarget.checked}, function (response) {
			
				location.reload();
			})
		});
		 
		
	},
	findPart: function (groupId) {
		var found = false;
		this.parts.forEach(function(part, index) {
			if(part.groupId == groupId)
			found = part;
		});
		return found;
	},
	parseBlobAudio: function (src) {
		
		var blob = new Blob([src.blob], { 'type' : 'audio/ogg; codecs=opus' });
		
	    var audio = document.createElement('audio');
	    audio.src = window.URL.createObjectURL(blob);
	    
	 //    var player = new Tone.Player(audio.src).fan(waveform).toMaster();
	 //    // var player = new Tone.Player(music.mp3).fan(waveform).toMaster();
	 //    player.autostart = true;
	 
	 var currentBlob = this.findPart(src.groupId);
	 var sekf = this;
	 if(currentBlob) {
	 
		currentBlob.part.stop();
		
	    currentBlob.part = new Tone.Player(window.URL.createObjectURL(blob)).connect(currentBlob.gainNode);
	    currentBlob.part.autostart = true;

			
	} else {
		
		var analyzer = new Tone.Analyser("fft", 64);
		analyzer.groupId = src.groupId;
		audioVisual.analyzers.push(analyzer);
		var gainNode = new Tone.Gain().fan(analyzer).toMaster();

		var part = new Tone.Player(window.URL.createObjectURL(blob)).connect(gainNode);
	    part.autostart = true;
	    part.retrigger = true;
	    
	    this.parts.push({
	    	part: part,
	    	groupId: src.groupId,
	    	gainNode : gainNode,
	    	color: src.color
	    });
	    if(this.parts.length == 1) {
	    	audioVisual.init();
	    } else {
	    	audioVisual.addItem();
	    }


	}
	   
	},
	findAudio: function () {

	},
	playAudio: function (src) {

		// this.player = new Tone.Player('music.mp3').fan(analyzer).toMaster();
	 //    this.player.autostart = true;

	 //    Tone.Buffer.on('load', function(){
		// 	//all buffers are loaded.	
		// 	console.log('shit is loaded');
		// 	audioVisual.init();
		// 	// liveRoom.animation()
		// })
	},

}
var liveRoom = {
	users: [],
	userList: document.querySelector('.fn-livelist-users'),
	addUserListitem: function (user) {
		var newListitem = document.createElement('li');
		var text        = document.createElement('h4');
		var span        = document.createElement('span');
		
		tools.addClasses(text, ['head', 'h4', 'text-white', 'text-condensed'] );
		tools.addClasses(span, ['color', 'color-' + user.color]);
		
		text.innerHTML = user.username;

		newListitem.setAttribute('user-id', user.userId);
		newListitem.append(text);
		newListitem.append(span);

		this.userList.append(newListitem);
		
	},
	removeUserListitem: function (id) {
		this.userList.querySelector('li').forEach(function(listItem, index) {
			
			if(listItem.getAttribute('user-id')  == id ) {
				listItem.parentNode.removeChild(listItem);
				liveRoom.users.splice(index, 1);

			}
		});

	},
	findUser: function (id) {
		var found = false;
		this.users.forEach(function(user) {
			found = user.userId == id ? user : found;
			
		});
		
		return found;
	},
	checkUser: function (user) {
		if(user.active && !this.findUser(user.userId)) {
			this.addUserListitem(user);
			this.users.push(user);

		} else if (!user.active) {	
			this.removeUserListitem(user.userId);

		}
	}
}
	// 	var currentTime = masterSequence.player._source.context.currentTime;
		// var endTime      = masterSequence.player._state._timeline[1].time;

var audioVisual = {
	amountOfElements: 10,
	vizArea         : document.querySelector('#viz'),
	analyzers: [],
	setValues: function () {
		this.bufferLength = this.analyzers[0].size;
		this.dataArray    = new Uint8Array(this.bufferLength);
	},
	addItem: function () {
		
		audioVisual.setElements(this.analyzers.length - 1);
	},
	updateAnimation : function () {
		for(var y in this.analyzers) {
			var values = this.analyzers[y].analyse();
			
			for(var i = 0; i < this.bufferLength; i++) {
			    var segScale = values[i] / 200;
			    this.elementArray[y][i].style.transform = 'scaleY(' + segScale + ')';
			  }
		}

		requestAnimationFrame(this.updateAnimation.bind(this) );
	},
	
	setElements: function (index) {
		var self = this;

		var arr = [];

		for(var i = 0; i < this.bufferLength; i++) {

			var element = document.createElement('span');
			element.classList.add('viz-seg');
			
			element.classList.add('color-' + masterSequence.parts[index].color)
			element.style.left = (self.bufferLength - i) * (50/self.bufferLength) + '%';
			element.style.width  = 50/self.bufferLength + '%';
			if(i%2) {
				element.style.left = i * (50/self.bufferLength) + 50 + '%';
			}
			self.vizArea.appendChild(element);
			arr.push(element);
			
		}
		this.elementArray.push(arr);
		
		
	},

	init: function () {
		this.setValues();
		var self = this;
		for(var i in this.analyzers) {
			self.elementArray = []
			self.setElements(i);
		}
		this.updateAnimation();

	},
}

var postData = {
	groupList: function () {
		var listItems    = document.querySelectorAll('.fn-grouplist-item');
		var randomButton = document.querySelector('.fn-random');

		listItems.forEach(function(listItem) {
			listItem.addEventListener('click', function (e) {
				postData.groupListPost({
					username:user.username,
					id: e.currentTarget.getAttribute('group-id'), 
					newGroup:false
				})
				
			})
		});

		randomButton.addEventListener('click', function(e) {
			e.preventDefault();
			postData.groupListPost({
				username:user.username, 
				newGroup:true
			})
		});
	},
	groupListPost: function (data) {

		postData.postRequest('/createGroup', data,  function (response) {
			
			window.location = '/role/' + response.role + '/' + response.userId + '/' + response.groupId;
		});
	},
	username: function () {
		var form  = document.querySelector('form');
		var input = form.querySelector('input[type="text"]');
		postData.formSubmit(form, input, function () {
			changePage.showPage('group-list');
		})
	},
	formSubmit: function (form, input, cb) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			user.username = input.value.trim();
			cb();
			
		})
	},
	saveAudioData: function () {
		
		postData.postRequest('/role/save', data.group, function (res) {
		})
	},

	leaveGroup: function () {
		var send =  {
			group:data.group,
			role:data.user.role,
			groupid: data.group._id
		};
		postData.postRequest('/role/leave',send, function (res) {
			console.log('saved before leaving');
			
		})
	},

	request: function (url, type, query, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
		        // Request finished. Do processing here.
		        console.log(xhr.response);
		        // if(xhr.response) {
		        // 	cb(JSON.parse(xhr.response))	
		        // } else {
		        // 	cb()
		        // }
		        
		    }
		}
		xhr.send(query); 
		
	},
	postRequest(url, data, success) {
		
	    var params = typeof data == 'string' ? data : Object.keys(data).map(
	            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
	        ).join('&');

	    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	    xhr.open('POST', url);
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState>3 && xhr.status==200) { success(JSON.parse(xhr.response)); }
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	    xhr.send(params);

	    return xhr;
	}
}


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
var tips = {
	textDOM: null,
	allTips:[],
	tipMemory:null,
	currentTip: 0,

	init:function () {

		tips.textDOM = document.querySelector('.fn-info');
		tips.tipMemory =tips.textDOM.innerHTML;
		tips.allTips = data.tips;
		tips.questions();

	},
	questions: function () {
		var buttons = document.querySelectorAll('.fn-question');

		if(buttons) {
			for(var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener('click', function (e) {
					var modal = document.querySelector('.fn-question-modal[question="' + e.currentTarget.getAttribute('target-question') + '"]');
					
					modal.classList.add('active');
					var first = true;
					var removeModal = function (e) {
						if(!first) {
							body.removeEventListener('click', removeModal)
							modal.classList.remove('active');
						} else {
							first = false;
						}
					}
					body.addEventListener('click', removeModal)
				})
			}
		}

	},

	increaseTip: function (cond) {
		
		if(cond == 'clickActive' && tips.currentTip == 0 || cond == 'filter' && tips.currentTip == 0) {
			
			tips.newTip();
		} else if(cond == 'rec' && tips.currentTip == 1 || cond == 'active' && tips.currentTip == 1) {
			tips.newTip();
		} else if(cond == 'adsr' && tips.currentTip == 2 || cond == 'detune' && tips.currentTip == 2) {
			tips.newTip();
		} 

	},
	newTip: function () {
		tips.currentTip++;
		
		if(tips.currentTip == data.tips.length) {
			
			tips.textDOM.innerHTML = tips.tipMemory = ' ';
			
		} else {
			tips.textDOM.classList.add('tip-animation')
			setTimeout(function () {
				tips.textDOM.innerHTML = tips.tipMemory = data.tips[tips.currentTip].text;
			}, 250)
		}
		

	},
	textboxContent: function (content) {
		var box = document.querySelector('.fn-info');
		box.innerHTML = content ? content : tips.tipMemory;
		

	}
}
var tools = {
	events: function (selector, type,  callback) {

	},
	autoSubmit: function () {
		var form = document.querySelector('.fn-post-radio');

		if(form) {
			form.addEventListener('change', function (e) {
				form.submit();
			})
			
		}

	},
	setGroup: function () {
		var allgroups = false;
		if(allgroups) {

		} else {
			return 0;
		}
	},
	increaseOrMax: function (value) {
		value.increasable++;
		
		if(value.increasable == value.max) {
			value.increasable = value.min;
		}

		return value.increasable;
	},
	addClasses: function (element, classes) {
		for(var i in classes) {
			element.classList.add(classes[i])
		}
	},
	submitForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var username = form.querySelector('.fn-username').value;
			$.post('/login', {username:username})
		})
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
	eachDomElement: function (selector,callback) {
		var items   = document.querySelectorAll(selector);

		for(var i = 0; i < items.length;i++) {
			callback(items[i])
		}
	},
	getPercentage: function (value, max) {
		return (value*100)/max;
	},
	valueInObject: function (obj,param,  value) {
		var match = false;
		obj.forEach(function(elem) {
			if(elem[param] == value) {
				match = elem
			}
		});
		return match;
	},
	groupOrGroups: function () {

	},
	contains(thing, has) {
		if(thing.indexOf(has) !== -1) {
			return true;
		} else {
			return false;
		}
	},
	
	
	dataFromGroup: function ( groupId, callback ) {
		for(var i in data.group) {

			if(data.group[i]._id == groupId) {
				callback(data.group[i])
			}
		}
		// if(group == 'all') {
		// 	for(var i in data.group) {
		// 		callback(data.group[i][parameter])
		// 	}
		// } else {
		// 	callback(data.group[group][parameter])
		// }
	},
	pathObj: function (obj, path) {
		

		if(typeof path === 'string') path = path.split('.');

		  if(path.length === 0) return obj;
		  return tools.pathObj(obj[path[0]], path.slice(1));
	},
	currentGroupId: function () {
		// return tools.pathObj(data, 'group.0._id');
		
		var path = window.location.pathname.split('/');
		return path[path.length - 1];
	},
	get: function (name) {
		name = name + '=';
		var decodedCookie = decodeURIComponent(document.cookie);
		return true;
		// var ca = decodedCookie.split(';');
		// var result = '';
	 //    for(var i = 0; i <ca.length; i++) {
	 //        var c = ca[i];
	 //        while (c.charAt(0) == ' ') {
	 //            c = c.substring(1);
	 //        }
	 //        if (c.indexOf(name) == 0) {
	 //            result =  c.substring(name.length, c.length);
	 //        }
	 //    }
	 //    return result;
	}
}

var cameraTracker = {
  first: true,
  base: 440,
  maxValue:880,
  baseNum: 0,
  size:0,
  lowSize:null,
  highSize:null,
  calibrated: 0,
  tracker: null,
  stop: false,
  

  init: function () {
    
     cameraTracker.video   = document.querySelector('.fn-video-calibrate');
     cameraTracker.canvas  = document.querySelector('.fn-canvas-calibrate');
     cameraTracker.context = cameraTracker.canvas.getContext('2d');
      // cameraTracker.calibrate();
      if(data.supportMedia) {
        cameraTracker.calibrate();
        } else {
        cameraTracker.removeCamera();
      }
      
  },  
  checkSupport: function (callback) {
    var support = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    data.supportMedia = support ? true : false;
    
    return data.supportMedia;
  },
  removeCamera: function () {
    
    if(!data.supportMedia) {
      var elements = document.querySelectorAll('.fn-hide-support');

      if(elements.length) {
        for(var i = 0; i < elements.length; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }
    }
  },
  calibrate: function () {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonStop   = document.querySelector('.fn-calibrate-top');
    var startButton = document.querySelector('#test-btn');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');
    var first        = true;
    var tracker      = new tracking.ColorTracker(['yellow']);
    var trackThing   = tracking.track(cameraTracker.video, tracker, { camera: true });
    
  
    tracker.on('track', function(event) {
      
      if(first) {
        first = !first;
        cameraTracker.canvas.height = cameraTracker.video.offsetHeight;
        cameraTracker.canvas.width  = cameraTracker.video.offsetWidth;
      }
      cameraTracker.context.clearRect(0, 0, 1000, 1000);
      cameraTracker.drawRectangle(event.data, cameraTracker.context, tracker.colors[0])
    });

    document.querySelector('.calibrate-done').addEventListener('click', function(e) {
        trackThing.stop();
        audio.setup();
        changePage.showPage('filters')
        
    });

    buttonTop.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
    })
    
    buttonBottom.addEventListener('click', function (e) {
      cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
    })
  },

  startElementTracking: function (callback, element) {
    var tracker = new tracking.ColorTracker(['yellow']);
    var trackThing = tracking.track(cameraTracker.video, tracker, { camera: true})
    

    tracker.on('track', function(event, trackThing) {
        var data = event.data[0];
        if(data) {
          var size = data.width * data.height;
          if(size < cameraTracker.highSize) {
            body.setAttribute('tracking-status', 'high');
          } else if (size > cameraTracker.lowSize) {
            body.setAttribute('tracking-status', 'low');
          } else {
            body.setAttribute('tracking-status', 'ok');
            var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
            var percentage       = ((size - cameraTracker.highSize) / calculateableNum) * 100;
            callback(percentage)
          }
           
         
        }
    });
    element.addEventListener('click', function (e) {
      trackThing.stop();
      e.target.removeEventListener('click', arguments.callee)
    })

  },

  saveCalibrate: function (button, type, value) {
    var buttonTop    = document.querySelector('.fn-calibrate-top');
    var buttonBottom = document.querySelector('.fn-calibrate-bottom');

    if(value !== 0) {
      button.classList.add('checked')
      cameraTracker[type] = button.innerHTML = cameraTracker.size;

      if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
      buttonTop.parentNode.classList.add('finished');
      }
    }
  },
  
  drawRectangle: function (data, context, color) {
    data.forEach(function(rect) {
      rect.color         = color;
      context.fillStyle  = rect.color;
      cameraTracker.size = rect.width * rect.height;

      context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
      
  },
  trackElement: function(element) {
    var type = element.getAttribute('modulate-type');
    var slider = document.querySelector('.fn-fallback-filter[type="'+type+'"]');


      if(!element.classList.contains('active')) {
      body.setAttribute('tracking', element.getAttribute('filter-index'))
      element.classList.add('active');
      if(data.supportMedia) {
         cameraTracker.startElementTracking(function (value) {
          
          filters.update(element.getAttribute('modulate-type'), value);
          sendSocket.send('updateFilter',data.group._id, {
                type:element.getAttribute('modulate-type'),
                value: value
              })
        }, element);
       } else {
        slider.classList.add('active');
        
        // element.getAttribute()
       }
       
       
    } else {
      body.removeAttribute('tracking')
      element.classList.remove('active');
      cameraTracker.stop = true;
      slider.classList.remove('active');
    }
  },
}
  
var user = {
	username: null
}
console.log(user);