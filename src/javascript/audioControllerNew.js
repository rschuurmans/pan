
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
    setup: function() {
        sources.setup();
        listenStartSocket();
    },
    triggerEnvAttack: function(freq, time) {
        for(var i in audio.sources) {
            audio.sources[i].frequency.value = freq;
        }
        audio.gainNode.triggerAttackRelease(time)
    },
    triggerRelease: function(audioData) {
        // kan weg als holdtone weg is?
        for (var i in audioData) {
            audioData[i].triggerRelease()
        }
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
        

        var release = adsr.getEnvelope().release + 1;
        release = 2;
        
        
        // if (active && !loop.hold[groupId] && !recording.isRecording) {


            var loose = Math.floor(((release * 64)/2)) + 'n';
            
            if(currentStep.active) {
                audio.triggerEnvAttack(currentStep.frequency, loose);
            }
            

            // if(!data.group[groupIndex].sustain) {
            // 	window.setTimeout(function () {
            // 		audio.triggerRelease(audio.sources[0]);
            // 	}, time)
            // }

        // }
        events.showStep(index);
    },
    increaseIndex: function() {
    	
        loop.index = tools.increaseOrMax({
            increasable: loop.index,
            max: 16,
            min: 0
        });

        

    },
    getBPM : function (delay) {
        return 60000/delay;
    },
    start: function(serverDelay) {
        loop.stopped = false;
        loop.index = 0;
        loop.hold = false;
        
        Tone.Transport.bpm.value = loop.getBPM(serverDelay);

        
    
        
        Tone.Transport.scheduleRepeat(function(time) {
                if(loop.index == 0) {
                    
                    exportAudio.startRecording();
                }
                if(loop.index == 15) {
                    
                    exportAudio.stopRecording();
                }
                var length = data.group.steps.length;

                if(!recording.isRecording) {
                    if(length == 4 && loop.index%4 == 0) {
                        loop.playStep(data.group.steps[loop.index/4], time, loop.index/4);
                    } else if(length == 8 && loop.index%2 == 0) {
                        loop.playStep(data.group.steps[loop.index/2], time, loop.index/2);
                    } else if (length == 16) {
                        loop.playStep(data.group.steps[loop.index], time, loop.index);
                    } else {
                        
                    }
                } else {
                    exportAudio.cancelRecording();
                }
                
                

                loop.increaseIndex();


                // var currentGroup = data.group[i];
                // var groupId = currentGroup._id;
                
                // if(currentGroup.steps.length == 4) {
                //     if(loop.index[groupId] % 4 == 0) {
                //         loop.playStep(currentGroup.steps[loop.index[groupId]/4].frequency , groupId, time, .3)
                //     } else {
                        
                //     }
                // } else if (currentGroup.steps.length == 16){
                    
                //     loop.playStep(currentGroup.steps[loop.index[groupId]].frequency, groupId, time, 1)
                // }
                // loop.increaseIndex(groupId, data.group[i]);
   
          
            

          
        }, '16n');

   

    // start the repeat
    
     //    serverDelay = serverDelay/1000;

     //    loop.stopped = false;
     //    var currentGroup = data.group[data.group.length - 1];
     //    var groupId = currentGroup._id;
     //    var delay = serverDelay/currentGroup.steps.length;
     //    var synth = new Tone.Synth().toMaster()

    	// var sequence = new Tone.Loop(function (time) {
     //        console.log('loopin', time, time/2, delay,  Tone.now().toFixed(3));
     //            synth.triggerAttackRelease("C1", Tone.now().toFixed(3) , Tone.now().toFixed(3)+delay )

     //        // for(var i in audio.sources[groupId]) {
     //        //     audio.sources[groupId][i].frequency.value = 440;
     //        // }
     //        //         audio.gainNode[groupId].triggerAttackRelease(1, delay/2)
            
     //    }, delay);


     //    sequence.start(0);

     //    var delay = loop.getLoopOveralDelay(0);
        

     //    for(var i in data.group) {
     //        var groupId         = data.group[i]._id;
     //        loop.index[groupId] = 0;
     //        loop.hold[groupId]  = false;
     //    }

    	// var toneLoop = new Tone.Loop(function (time) {
     //        for(var i in data.group) {
     //            console.log(time);
     //            var groupId         = data.group[i]._id;
                
     //            var currentStep     = data.group[i].steps[loop.index[groupId]];

     //            loop.playStep(groupId, currentStep.active, currentStep.frequency, time);

     //            loop.increaseIndex(groupId, data.group[i]);


     //        }
     //    }, delay).start(0);
        
        Tone.Transport.start('+0.1')
        // for (var i in data.group) {
        // 	var groupId = data.group[i]._id;
        	
        // 	loop.index[groupId] = 0;
        // 	loop.hold[groupId] = false;

        //     var delay = loop.getLoopOveralDelay(i);
        //     loop.stopped[i] = false;


        //     var toneLoop = new Tone.Loop(function(time) {

        //         var currentStep = data.group[i].steps[loop.index[groupId]];
                
        //         loop.playStep(groupId, currentStep.active, currentStep.frequency, time);
        //         loop.increaseIndex(groupId, data.group[i]);

        //     }, delay);

        //     toneLoop.start(0)
        //     Tone.Transport.start('+0.1');
        // }
    },

    getLoopOveralDelay: function(groupId) {

        var length = data.group[groupId].steps.length;
        length = 16;
        return length / 2 + 'n';

    }
}




var sources = {
    setup: function() {
        sources.createSources();

        filters.setup();
        // sources.setDetune();

    },
    createSources: function() {
        
            
            data.group.sources.forEach(function(source, index) {

                if (source.type == 'noise') {
                    sources.createNoise(data.group._id, index);
                } else {
                    sources.createSource(source.type, data.group._id, index);
                }
            });
            sources.connectEnvelope(data.group._id);
        

        // tools.dataFromGroup(0, 'sources', function (groupData) {

        // 	for(var i in groupData) {

        // 		if(groupData[i].type == 'noise') {
        // 			sources.create['noise'](i);
        // 		} else {

        // 			sources.create[data.group.synth](i);
        // 		}
        // 	}
        // })console.log();
        // for(var i in data.group.sources) {
        // 	if(data.group.sources[i].active) {
        // 		if(data.group.sources[i].type == 'noise') {
        // 			sources.create['noise'](i);
        // 		} else {
        // 			sources.create[data.group.synth](i);
        // 		}

        // 	}

        // };
    },
    createNoise: function (groupId, index) {
        
        var noise = new Tone.Noise("pink").start();
        noise.id = index;
        if (!audio.sources) {
            audio.sources = [];
        }
        audio.sources.push(noise);


    },
    createSource: function (type, groupId, index) {
        
        var oscillator = new Tone.Oscillator();
        oscillator.type = type;
        oscillator.id = index;
        if (!audio.sources) {
            audio.sources = [];
        }
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
    // save: function(synth, id, groupId) {
        //     synth.id = id;
        //     if (!audio.sources[groupId]) {
        //         audio.sources[groupId] = [];

        //     }
        //     audio.sources[groupId].push(synth);

        // },
    update: {
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

    // create: {
        // type: function (type, groupId, id) {
        //     console.log(groupId, id);
        //     console.log('demo?');
        //     var oscillator = new Tone.Oscillator().start();
        //     oscillator.type = type;
        //     var ampEnv = new Tone.AmplitudeEnvelope({
        //     "attack": 0.1,
        //     "decay": 0.2,
        //     "sustain": 1.0,
        //     "release": 0.8
        //     }).toMaster();
        //     oscillator.connect(ampEnv)
        //     // //create an oscillator and connect it
        //     // var osc = new Tone.Oscillator().connect(ampEnv).start();
        //     // //trigger the envelopes attack and release "8t" apart
        //     ampEnv.triggerAttackRelease("8t");
        // }
        // save: function(synth, id, groupId) {
        //     synth.id = id;
        //     if (!audio.sources[groupId]) {
        //         audio.sources[groupId] = [];

        //     }
        //     audio.sources[groupId].push(synth);

        // },
        // synth: function(groupId, id) {
            
        //     var synth = new Tone.Synth(sources.create.parseData(id, groupId))
        //     sources.create.save(synth, id, groupId);

        // },
        // noise: function(groupId, id) {
        //     var synth = new Tone.NoiseSynth({
        //         envelope: sources.create.getEnvelope(),
        //     });
        //     sources.create.save(synth, id, groupId);
        // },
        // amSynth: function(groupId, id) {
        //     var synth = new Tone.AMSynth(sources.create.parseData(id, groupId))
        //     sources.create.save(synth, id, groupId);
        // },

        // fmSynth: function(groupId, id) {
        //     var synth = new Tone.Synth(sources.create.parseData(id, groupId))
        //     sources.create.save(synth, id, groupId);
        // },

        // drum: function(groupId, id) {

        //     var synth = new Tone.MembraneSynth();
        //     data.group.sustain = false;
        //     adsr.setSustain(false, tools.setGroup());

        //     sources.create.save(synth, id, groupId);
        // },
        // getEnvelope: function() {
        //     return {
        //         attack: tools.pathObj(data.group, 'adsr.attack.value'),
        //         decay: tools.pathObj(data.group, 'adsr.decay.value'),
        //         sustain: .5,
        //         release: tools.pathObj(data.group, 'adsr.release.value'),
        //     }
        // },
        // parseData: function(id, groupId) {
            
        //     var sourceData = tools.dataFromGroup(groupId, function(group) {
                
        //         var synthData = {
        //             oscillator: {
        //                 type: group.sources[id].type
        //             },
        //             envelope: sources.create.getEnvelope()
        //         }

        //         return synthData

        //     })




        // }
    // },
    remove: function(id) {
        audio.triggerRelease(id)
        for (var i in audio.sources) {
            if (audio.sources[i].id == id) {
                audio.sources.splice(i, 1);
            }
        }
    },
    setDetune: function() {
        // use the data.group.set method as used in sequencer.holdtone
        // for(var i in audio.sources) {
        // 	audio.sources[i].detune.input.value = data.sources[parseInt(audio.sources[i].id)].detune;
        // };

    },
    setSingleDetune: function(index, value) {

    }
}

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