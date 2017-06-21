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
		console.log(src);
		console.log('heyo');
		var blob = new Blob([src.blob], { 'type' : 'audio/ogg; codecs=opus' });
		
	    var audio = document.createElement('audio');
	    audio.src = window.URL.createObjectURL(blob);
	    
	 //    var player = new Tone.Player(audio.src).fan(waveform).toMaster();
	 //    // var player = new Tone.Player(music.mp3).fan(waveform).toMaster();
	 //    player.autostart = true;
	 
	 var currentBlob = this.findPart(src.groupId);
	 var sekf = this;
	 if(currentBlob) {
	 	console.log('starting');
		currentBlob.part.stop();
		
	    currentBlob.part = new Tone.Player(window.URL.createObjectURL(blob)).connect(currentBlob.gainNode);
	    currentBlob.part.autostart = true;

			
	} else {
		console.log('deze');
		var analyzer = new Tone.Analyser("fft", 64);
		analyzer.groupId = src.groupId;
		audioVisual.analyzers.push(analyzer);
		var gainNode = new Tone.Gain().fan(analyzer).toMaster();

		var part = new Tone.Player(window.URL.createObjectURL(blob)).connect(gainNode);
	    part.autostart = true;
	    part.retrigger = true;
	    console.log(this);
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
		console.log(this.analyzers.length);
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
			console.log(index);
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
