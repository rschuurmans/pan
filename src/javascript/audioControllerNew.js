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