var tone = {
	init:function () {
		var distortion = new Tone.Distortion(1)


		var synth = new Tone.Synth({
	oscillator : {
  	type : 'sine',
    modulationType : 'sawtooth',
    modulationIndex : 3,
    harmonicity: 3.4
  },
  envelope : {
  	attack : 0.001,
    decay : 0.1,
    sustain: 1,
    release: 0.1
  }
}).chain(distortion, Tone.Master)

		var tones = [220,'B1','D1','E1','C2','B4','D2','E3']
var event = [
	{ time: 0, note : 220, dur : '4n'},
	{ time: '4n + 8n', note : 440, dur : '8n'},
	{ time: '2n', note : 550, dur : '16n'},
	{ time: '2n + 8t', note : 880, dur : '4n'}
]
var part = new Tone.Part(function(time, event){
	console.log('here');
	//the events will be given to the callback with the time they occur

	synth.triggerAttackRelease(event.note, event.dur, time)
}, event)

//start the part at the beginning of the Transport's timeline
part.start(0)

//loop the part 3 times
part.loop = 3
part.loopEnd = '1m'

		var playing = false;
		document.querySelector('.fn-seq-sh').addEventListener('click', function(e){
			console.log(playing);
			if (!playing){
				Tone.Transport.start('+0.1');
				playing=true;
			} else {
				Tone.Transport.stop()
				playing=false;
			}
		})
		document.querySelector('.fn-demo').addEventListener('click', function (e) {
			// console.log(synth.);
			synth.envelope.sustain = 0.001;
			
		})

	}
}

tone.init();