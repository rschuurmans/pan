
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		rotation.init();
		changePage.onboarding()
		listen.role()
		tips.init();
		// user.unload();

		if(path.indexOf('sequencer') !== -1) {
			
			sequencer.init();
			
			
		} else {
			
			modulator.init();
			// cameraTracker.checkSupport();
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
var users = [];
var socket = io();
// var binary = new BinaryClient('ws://localhost:3000');

// binary.on('open', function () {

// 	window.Stream = binary.createStream();

// })

var listen = {

	master: function () {
		
			
			socket.emit('joinRoom', {
				room: 'master',
			});
			socket.emit('joinRoom', {
				room: 'live',
			});


			socket.on('audioBlob', function (received) {
				
				console.log('received audio blob');
				console.log(received);
				 masterSequence.parseBlobAudio(received.data);
				 received.data.blob = null;
				 liveRoom.checkUser(received.data);
				
			})
			socket.on('liveUpdate', function (received) {
				console.log(received);
				liveRoom.checkUser(received.user);
				
			})

		
	},
	role: function () {
		// listen.modulate();
		
			
		var groupId = tools.currentGroupId();
		console.log('sending this', data.user.username);
		socket.emit('joinDuo', {
			room: groupId,
			username: data.user.username,
			role: data.user.role,
			userId: data.user._id

		});
		socket.emit('joinRoom', {
			room: 'live',
			
		});



		sendSocket.send('groupUpdate', groupId, {
				text  : data.user.username + ' heeft zich aangesloten',
				user  : data.user,
				role  : data.user.role,
				userid  : data.user._id,
				active: true
		})
		
		socket.on('demo', function (received) {
			console.log(received);
			// demosec(received);
		})
		
	
		// happens: updated melody from sequencer
		socket.on('updateAllSteps', function (received) {
			data.group.steps = received.data.steps;
			
		})
		// happens: on loop message from server
		

		socket.on('groupUpdate', function (received) {
			console.log(received);
			
			
			if(received.data.active) {
				data.group[received.data.role] = received.data.user;
				// socket.username = received.data.user.username;
				// socket.set('username', received.data.username, function () {
				// 	users[user] = user
				// })
			} else {
				data.group[received.data.role] = null;
			}
			tips.notification(received.data.text, received.data.user);
			
			
		})
		// console.log(socket);
		socket.on('updateSources', function (received) {
			sources.update(received.data);
			console.log('received an updateSources', received);
		})
		socket.on('updateSingleStep', function (received) {
			data.group.steps[parseInt(received.data.index)] = received.data.step;
			console.log('received an updateSingleStep', received);
		})

		socket.on('updateSustain', function (received) {
			console.log('received an updateSustain', received);
			data.group.sustain = adsr.sustain = received.data.sustain;

			console.log('received an updateSustain', received);
		})

		socket.on('updateADSR', function (received) {
		// adsr.update(received.type, received.value)
		adsr.update(received.data.type, received.data.value);
			console.log('received an updateADSR', received);
		})
		socket.on('listenPP', function (received) {
			pp.listenPP(received.data)
		})
		socket.on('stopPP', function (received) {
			pp.stopListenPP(received.data)
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
		socket.on('user left', function (received) {
			console.log('a user left', received);
			data.group[received.role] = null;
			

			postData.leaveGroup();

		})
		

		
		


	},
	modulate: function () {
		socket.on('updateSteps', function (received) {
			console.log('received a socket', received);
			data.steps[received.index] = received.step;
		
		})
	}
}


socket.on('disconnect', function() {
	socket.emit('demo', {
		username: socket.username
	})

    // socket.get('username', function(err, user) {
    //   delete users[user];
    //   console.log('disconnect', user);
    //   io.sockets.emit('demo', {
    //   	users: users,
    //   	user: user
    //   });
    // });
  });
var listenStartSocket = function () {
	socket.on('startSequence', function (fulldelay) {
		console.log('sterver ');
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
			sendSocket.send('updateSustain',data.group._id, {sustain: sustainValue})

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
// 
// - adsr tekenen is nog geen super mooie js
// - pp code is nog niet heel netjes
// fix drum geluid
// check socket met elkaar en met /live
// send audio to /live
// required username


var audioContext = StartAudioContext(Tone.context, ".fn-start-sequece");

var audio = {
    sources: [],
    gainNode:[],
    volumes: [],
    filters: [],
    ppFreq: false,
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
        var self = this;
        for(var i in self.sources) {
            if(self.sources[i].active) {
                self.sources[i].frequency.value = freq;
            }
            
            // self.sources[i].frequency.rampTo(freq, 0.1);
        }
    },
    
    oscVolume: function (value) {
        var self = this;
        for(var i in self.sources) {
            if(self.sources[i].active) {
                self.sources[i].volume.input.value = value;
            }
        }
    },
    oscSingleVolume : function (id, value) {
        var self = this;
        for(var i in self.sources) {
            if(self.sources[i].id == id) {
                self.sources[i].volume.input.value = value;
            }
        }
    },
    triggerEnvAttack: function(freq, time) {
        var self = this;
        if(audio.sources.length) {
            self.setFrequencies(self.overrideFreq ? self.overrideFreq : freq)
    
            
            if(adsr.sustain) {
                audio.gainNode.triggerAttack();
            } else {
                audio.gainNode.triggerAttackRelease(time)
            }
        }
    },

    triggerRelease: function(audioData) {
        
        audio.gainNode.triggerRelease();
    }
}


var exportAudio = {
    recordingUser: true,
    rec: new Recorder(Tone.Master),
     createDownloadLink : function () {
        this.rec && this.rec.exportWAV(function(blob) {
          var url = URL.createObjectURL(blob);
          var file = blob;
          file.lastModifiedDate = new Date();
          file.name = 'ehname.wav';
          console.log('sending an audioblob');
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
        console.log('stop recording');
        this.createDownloadLink();
        this.rec.clear();
    },
    checkRecordingUser: function () {
        var self = this;
        // console.log(data.user.role == 'sequencer' && data.group.modulator);
        if(data.user.role == 'sequencer' && data.group.modulator)  {
            // self.recordingUser = false;
            
            return false;
        } else {
            // self.recordingUser = true;
            
            return true;
        }
        
    },
    recordLoop: function (index) {
        var self = this;
       if(this.checkRecordingUser()) {
         if(index == 0) {
        
                self.startRecording();
            } else if(index == 15) {
                self.stopRecording();
            }
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
    showStep: function (index) {
        var steps   = document.querySelectorAll('.fn-sequencer-item');
        for(var i = 0; i < steps.length; i++) {
            steps[i].classList.toggle('highlight', i == index)
        
        };
    },
    playStep: function(currentStep, time, index) {
        
        var release     = adsr.getEnvelope().release + 1;
        var releaseTone = Math.floor(((release * 64)/2)) + 'n';
            
        if(currentStep.active) {
            audio.triggerEnvAttack(currentStep.frequency, releaseTone);
        }
        
        this.showStep(index);
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
    },
    createSources: function() {
        var self = this;

        data.group.sources.forEach(function(source, index) {
            audio.volumes.push(source.volume);

            self.createSource(source.type, data.group._id, index, source.active);
        });
        this.connectEnvelope(data.group._id);
    },
    createNoise: function (groupId, index) {
        var noise     = new Tone.Noise("pink").start();
        noise.id      = index;
        audio.sources = !audio.sources ? [] :audio.sources;
        audio.sources.push(noise);

    },
    createSource: function (type, groupId, index, active) {

        var oscillator    = new Tone.Oscillator();
        oscillator.type   = type;
        oscillator.id     = index;
        oscillator.active = active;
        audio.sources.push(oscillator);
        if(!active) {
            audio.oscSingleVolume(index, 0);
        }
    },
    connectEnvelope: function (groupId) {
        audio.gainNode = new Tone.AmplitudeEnvelope(adsr.getEnvelope());

        for(var i in audio.sources) {
            audio.sources[i].connect(audio.gainNode)
            audio.sources[i].start();
        }
        audio.gainNode.toMaster();    
    },
    connectSingleEnvelope: function (id) {
        console.log('connecting a single envelope');
        for(var i in audio.sources) {
            if(audio.sources[i].id == id) {
                audio.sources[i].connect(audio.gainNode);
                audio.sources[i].start();
            }
        }
    },
    setwavetype: function (received) {
        var id = parseInt(received.id);
        audio.sources[id].type = received.value;
    },
    setactive: function (received) {
         var id = parseInt(received.id);
            audio.sources[id].active = received.value;
            if(received.value) {
                audio.oscSingleVolume(id, audio.volumes[id])
            } else {
                audio.oscSingleVolume(id, 0)
            }
    },
    setdetune: function (received) {
        console.log('updating detune');
        var id = parseInt(received.id);

        if(audio.sources[id].detune) {
            audio.sources[id].detune.input.value = parseInt(received.value);
        } else {
            audio.sources[id]._oscillator.detune.value = parseInt(received.value);
        }
    },
    setvolume : function (received) {
          var id            = parseInt(received.id);
            var value         = parseFloat(received.value);
            audio.volumes[id] = value;

            if(audio.sources[id].active) {
                audio.oscSingleVolume(id, value)
            } 
    },
    update: function (received) {
        console.log(received);
        this['set' + received.type](received);
    }
}

// moet nog
var filters = {
    setup: function() {
        for(var i  in data.group.modulate) {
            
            filters['create_' + data.group.modulate[i].type](data.group.modulate[i]);
           
        }

        filters.connect();
    },
    
    connect: function() {

        audio.filterGain = Tone.context.createGain();
        for(var i in audio.filters) {
            audio.gainNode.connect(audio.filters[i]);
            audio.filters[i].toMaster();
        }
    },
    create_pingpong: function(data) {
        // check
        var filter = new Tone.PingPongDelay(2, 2);

        filter.wet.value = 0;
        audio.filters.pingpong = filter;

    },
    create_tremelo: function(data) {
        // check niet zo bijzonder
        var autoFilter = new Tone.AutoFilter({
            frequency: data.values.frequency,
            depth: data.values.depth,
        })
        autoFilter.wet.value = 0;
        audio.filters.tremelo = autoFilter;
    },
    create_chorus: function(data) {
        // check
        var chorus = new Tone.Chorus()

        chorus.wet.value = 0;
        audio.filters.chorus = chorus
    },
    create_wahwah: function(data) {
        var autoWah = new Tone.AutoWah({
            baseFrequency: data.values.baseFrequency,
            octaves: 3,
            sensitivity: 0,
            Q: data.values.q,
            gain: data.values.gain,

        })
        autoWah.wet.value = 0;

        audio.filters.wahwah = autoWah;

    },
    create_lowpass: function(data) {
        // check
        var biquadFilter = Tone.context.createBiquadFilter();
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.value = 2000;
        biquadFilter.gain.value = 0;
        audio.filters.lowpass = biquadFilter;

    },
    create_highpass: function(data) {
        // check
        var biquadFilter = Tone.context.createBiquadFilter();
        biquadFilter.type = "highshelf";
        biquadFilter.frequency.value = 200;
        biquadFilter.gain.value = 0;
        audio.filters.highpass = biquadFilter;

    },

    create_delay: function(data) {
        var feedbackDelay = new Tone.FeedbackDelay(data.values.delayTime, 0.5);
        feedbackDelay.wet.value = 0;
        audio.filters.delay = feedbackDelay;
    },
    create_distortion: function(data) {
        // check
        var dist = new Tone.Distortion({
            distortion: data.values.distortion,
            oversample: data.values.oversample
        });
        dist.wet.value = 0;
        audio.filters.distortion = dist;

    },
    update: function(type, value) {
        console.log('i need to send a socket');
        if (type == 'highpass' || type == 'lowpass') {
            audio.filters[type].gain.value = value * 2;
        } else {
            audio.filters[type].wet.value = value;
        }

    },
    startListening: function (e) {

    },
    stopListening: function (e) {

    },

    handleEvent: function (event) {
        var self = this;
        if(event.type == 'touchmove' || event.type == 'touchstart') {
            self.startListening(event);
        } else if (event.type =='touchend' || event.type == 'touchcancel') {
             self.stopListening(event);
        }
    },

}
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
		var buttonMod = document.querySelector('.fn-start-modulator');
		if(buttonMod) {
			buttonMod.addEventListener('click', function () {
				audio.setup();
				changePage.showPage('filters');
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
		console.log(name, value);
		var sliderBg = document.querySelectorAll('.fn-slider-bg');
		if(name == 'volume') {
			value = (value/2)*100;
		}
		for(var i = 0; i < sliderBg.length;i++) {
			if(sliderBg[i].getAttribute('name') == name) {
				var clipPath = 'polygon(0 0, '+value+'% 0, '+value+'% 100%, 0% 100%)';
				sliderBg[i].style.clipPath = clipPath;
				sliderBg[i].style.webkitClipPath = clipPath;
				console.log('updating it');
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
		// var startAllButton = document.querySelector('.fn-startAllSequence-cb');
		
		// startAllButton.addEventListener('change', function(e) {
			
		// 	postData.postRequest('/live', {start: e.currentTarget.checked}, function (response) {
			
		// 		location.reload();
		// 	})
		// });
		 
		
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
		this.userList.querySelectorAll('li').forEach(function(listItem, index) {
			console.log(id, listItem);
			console.log(listItem.getAttribute('user-id')  == id );
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
		console.log(user);
		if(user.active && !this.findUser(user.userId)) {
			this.addUserListitem(user);
			this.users.push(user);

		} else if (!user.active) {	
			this.removeUserListitem(user.id);

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
		        // console.log(xhr.response);
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
	rotationButton: document.querySelector('.fn-control-motion'),

	setup:function () {

		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		
		var self = this;

		if(!rotation.support) {
			self.touchBlok.addEventListener('touchmove', self, true)
			self.touchBlok.addEventListener('touchstart', self, true)
			self.touchBlok.addEventListener('touchend', self, true)
			self.touchBlok.addEventListener('touchcancel', self, true)
		} else {
			self.rotationButton.addEventListener('touchstart', self, true);
			self.rotationButton.addEventListener('touchend', self, true)
			self.rotationButton.addEventListener('touchcancel', self, true)
		}
		

	},
	displayValue: function (content) {
		var textbox = document.querySelector('.fn-motion-display');
		textbox.innerHTML = content;
	},
	startMotion: function (e) {
		var self = this;
		// e.target.classList.add('active');
		rotation.listen(function (motionData) {
			self.pitch = motionData.pitch;
			self.displayValue(Math.floor(motionData.rawBeta) + ' , ' + Math.floor(motionData.rawGamma));
			audio.setFrequencies(motionData.pitch)
			audio.oscVolume(motionData.gain)
			rotation.rotateBackground(motionData);
			audio.overrideFreq = motionData.pitch;
			sendSocket.send('listenPP', data.group._id, {
				pitch: self.pitch,
				gain: motionData.gain
			})
		})
	},
	stopMotion: function (e) {
		e.target.classList.remove('active');
		this.displayValue('');
		rotation.stopListen();
		sendSocket.send('stopPP', data.group._id, {
			data: ''
		})
	},
	listenPP: function (received) {
		audio.setFrequencies(received.pitch)
		audio.oscVolume(received.gain)
		audio.overrideFreq = received.pitch;
	},
	stopListenPP: function () {
		audio.overrideFreq = false;
	},
	handleEvent: function (event) {
		if(event.type == 'touchmove' || event.type == 'touchstart') {
			if(rotation.support) {
				this.startMotion(event);
			} else {
				this.touchMove(event);
			}
		} else if (event.type =='touchend' || event.type == 'touchcancel') {
			
			if(rotation.support) {
				this.stopMotion(event);
			} else {
				this.touchEnd(event);
			}
		}
	},
	rotationStart: function () {
		rotation.listen(function (text) {
			console.log('dit is een clb', text);
		})
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
var modulator = {
	init: function () {
		changePage.selector();
		this.filterButtons = document.querySelectorAll('.fn-modulate-btn');
		this.form          = document.querySelector('.fn-form-modulate');

		var self = this;
		for(var i = 0; i < this.filterButtons.length;i++) {
			self.filterButtons[i].addEventListener('touchstart', self, true);
			self.filterButtons[i].addEventListener('touchend', self, true)
			self.filterButtons[i].addEventListener('touchcancel', self, true)
		}
		this.form.addEventListener('input', self, true);
		this.form.addEventListener('change', self, true);
			
	      // modulator.events.init();
	      
	},
	displayValue: function (value) {
		var textbox = document.querySelector('.fn-motion-display');
		textbox.innerHTML = value;
	},
	startFilter: function (e) {
		tips.increaseTip('filter');
		console.log(e);
		var filterType = e.currentTarget.getAttribute('modulate-type');
		body.setAttribute('filters', 'true');
		e.currentTarget.classList.add('active');

		var self = this;


		rotation.listen(function (motionData) {
			var value = motionData.perBeta/2;
			filters.update(filterType, value);
			sendSocket.send('updateFilter', data.group._id, {
				type: filterType,
				value: value
			})
			self.displayValue(value);
			rotation.scaleBackground(value*2);
		})
	},
	endFilter: function(e) {
		body.removeAttribute('filters' );
		e.target.classList.remove('active');
		this.displayValue('');
		rotation.stopListen();
		rotation.scaleBackground(0);


	},
	updateForm: function (e) {
		var index = body.getAttribute('current-element');
		console.log(e.target, this);
		this.update[e.target.getAttribute('name')](e.target, index)
	},
	handleEvent: function (event) {
		if(event.type == 'touchmove' || event.type == 'touchstart') {
			this.startFilter(event);
		} else if (event.type =='touchend' || event.type == 'touchcancel') {
			this.endFilter(event);
		} else if (event.type =='input' || event.type == 'change') {
			this.updateForm(event);
		}
	},

	update:  {
		active: function (element, index) {
			data.group.sources[index].active = element.checked;
			tips.increaseTip('active');
			sendSocket.send('updateSources',data.group._id, {
				value: element.checked,
				type: 'active', 
				id: index
			});

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
		
	},
	fillData: function (index) {
		console.log('filling the data');
		inputEvent.slider();

		var elementData  = data.group.sources[parseInt(index)]
		var form         = document.querySelector('.fn-form-modulate');
		var wavetypes    = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');

		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider-detune').value      = elementData.detune;
		form.querySelector('.fn-slider-volume').value      = elementData.volume;
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
}
var sequencer = {
	isRecording: false,
	newMelody: [],
	steps: document.querySelectorAll('.fn-step-item'),

	init: function() {
		
		var self = this;
		
		tools.eachDomElement('.fn-sequencer-item', function (item) {
			item.addEventListener('click', self, true);
		})
		recording.setup();
		adsr.init();
		pp.setup();
	},
	
	toggleActive: function (e) {
		var index = parseInt(e.target.getAttribute('sequence-index'));
		tips.increaseTip('clickActive');
		data.group.steps[index].active = !data.group.steps[index].active;
		e.target.classList.toggle('active');

		sendSocket.send('updateSingleStep',data.group._id, {
			step: data.group.steps[index], index: index
		})
	},
	updateActive: function () {
		var self = this;
		for(var i = 0; i < this.steps.length;i++) {

			if(data.group.steps[i].active) {
				self.steps[i].classList.add('active')
			} else {
				self.steps[i].classList.remove('active')
			}
		}
	},
	
	handleEvent: function (event) {
		if(event.type == 'click') {
			this.toggleActive(event);
		}
		
	},
	
}

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
	notification (text, user) {
		console.log(user, text);
		if(user.username !== data.user.username) {
			var message = document.querySelector('.fn-notification');
			message.innerHTML = text;
			message.style.opacity = 1;
			setTimeout(function () {
				message.style.opacity = 0;
			}, 3000)
			
		}
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
			
			tips.parentNode.removeChild(tips);
			
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
	percentageToValue: function (perc, max) {
		return (perc * max) / 100
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

// var cameraTracker = {
//   first: true,
//   base: 440,
//   maxValue:880,
//   baseNum: 0,
//   size:0,
//   lowSize:null,
//   highSize:null,
//   calibrated: 0,
//   tracker: null,
//   stop: false,
  

//   init: function () {
    
//      cameraTracker.video   = document.querySelector('.fn-video-calibrate');
//      cameraTracker.canvas  = document.querySelector('.fn-canvas-calibrate');
//      cameraTracker.context = cameraTracker.canvas.getContext('2d');
//       // cameraTracker.calibrate();
//       if(data.supportMedia) {
//         cameraTracker.calibrate();
//         } else {
//         cameraTracker.removeCamera();
//       }
      
//   },  
//   checkSupport: function (callback) {
//     var support = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
//     data.supportMedia = support ? true : false;
    
//     return data.supportMedia;
//   },
//   removeCamera: function () {
    
//     if(!data.supportMedia) {
//       var elements = document.querySelectorAll('.fn-hide-support');

//       if(elements.length) {
//         for(var i = 0; i < elements.length; i++) {
//           elements[i].parentNode.removeChild(elements[i]);
//         }
//       }
//     }
//   },
//   calibrate: function () {
//     var buttonTop    = document.querySelector('.fn-calibrate-top');
//     var buttonStop   = document.querySelector('.fn-calibrate-top');
//     var startButton = document.querySelector('#test-btn');
//     var buttonBottom = document.querySelector('.fn-calibrate-bottom');
//     var first        = true;
//     var tracker      = new tracking.ColorTracker(['yellow']);
//     var trackThing   = tracking.track(cameraTracker.video, tracker, { camera: true });
    
  
//     tracker.on('track', function(event) {
      
//       if(first) {
//         first = !first;
//         cameraTracker.canvas.height = cameraTracker.video.offsetHeight;
//         cameraTracker.canvas.width  = cameraTracker.video.offsetWidth;
//       }
//       cameraTracker.context.clearRect(0, 0, 1000, 1000);
//       cameraTracker.drawRectangle(event.data, cameraTracker.context, tracker.colors[0])
//     });

//     document.querySelector('.calibrate-done').addEventListener('click', function(e) {
//         trackThing.stop();
//         audio.setup();
//         changePage.showPage('filters')
        
//     });

//     buttonTop.addEventListener('click', function (e) {
//       cameraTracker.saveCalibrate(e.currentTarget, 'lowSize', cameraTracker.size);      
//     })
    
//     buttonBottom.addEventListener('click', function (e) {
//       cameraTracker.saveCalibrate(e.currentTarget, 'highSize', cameraTracker.size);      
//     })
//   },

//   startElementTracking: function (callback, element) {
//     var tracker = new tracking.ColorTracker(['yellow']);
//     var trackThing = tracking.track(cameraTracker.video, tracker, { camera: true})
    

//     tracker.on('track', function(event, trackThing) {
//         var data = event.data[0];
//         if(data) {
//           var size = data.width * data.height;
//           if(size < cameraTracker.highSize) {
//             body.setAttribute('tracking-status', 'high');
//           } else if (size > cameraTracker.lowSize) {
//             body.setAttribute('tracking-status', 'low');
//           } else {
//             body.setAttribute('tracking-status', 'ok');
//             var calculateableNum = cameraTracker.lowSize - cameraTracker.highSize;
//             var percentage       = ((size - cameraTracker.highSize) / calculateableNum) * 100;
//             callback(percentage)
//           }
           
         
//         }
//     });
//     element.addEventListener('click', function (e) {
//       trackThing.stop();
//       e.target.removeEventListener('click', arguments.callee)
//     })

//   },

//   saveCalibrate: function (button, type, value) {
//     var buttonTop    = document.querySelector('.fn-calibrate-top');
//     var buttonBottom = document.querySelector('.fn-calibrate-bottom');

//     if(value !== 0) {
//       button.classList.add('checked')
//       cameraTracker[type] = button.innerHTML = cameraTracker.size;

//       if(buttonTop.classList.contains('checked') && buttonBottom.classList.contains('checked')) {
//       buttonTop.parentNode.classList.add('finished');
//       }
//     }
//   },
  
//   drawRectangle: function (data, context, color) {
//     data.forEach(function(rect) {
//       rect.color         = color;
//       context.fillStyle  = rect.color;
//       cameraTracker.size = rect.width * rect.height;

//       context.fillRect(rect.x, rect.y, rect.width, rect.height);
//     });
      
//   },
//   trackElement: function(element) {
//     var type = element.getAttribute('modulate-type');
//     var slider = document.querySelector('.fn-fallback-filter[type="'+type+'"]');


//       if(!element.classList.contains('active')) {
//       body.setAttribute('tracking', element.getAttribute('filter-index'))
//       element.classList.add('active');
//       if(data.supportMedia) {
//          cameraTracker.startElementTracking(function (value) {
          
//           filters.update(element.getAttribute('modulate-type'), value);
//           sendSocket.send('updateFilter',data.group._id, {
//                 type:element.getAttribute('modulate-type'),
//                 value: value
//               })
//         }, element);
//        } else {
//         slider.classList.add('active');
        
//         // element.getAttribute()
//        }
       
       
//     } else {
//       body.removeAttribute('tracking')
//       element.classList.remove('active');
//       cameraTracker.stop = true;
//       slider.classList.remove('active');
//     }
//   },
// }
//   
var user = {
	username: null,
	

}