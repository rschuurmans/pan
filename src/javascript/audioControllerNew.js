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