var tips = {
	textDOM: null,
	allTips:[],
	tipMemory:null,
	currentTip: 0,
	init:function () {
		tips.textDOM = document.querySelector('.fn-info');
		tips.tipMemory =tips.textDOM.innerHTML;
		tips.allTips = data.tips;


	},
	increaseTip: function (cond) {
		console.log('trying to increase tip ', cond);
		console.log(data.tips);
		// for(var i in data.tips) {
		// 	console.log(data.tips[i].cond, cond, data.tips[i].cond == cond );
		// 	if(data.tups[i].cond)
		// }
		if(cond == 'clickActive' && tips.currentTip == 0) {
			tips.newTip();
		} else if(cond == 'changefreq' && tips.currentTip == 1) {
			tips.newTip();
		} else if(cond == 'rec' && tips.currentTip == 2) {
			tips.newTip();
		} else if(cond == 'adsr' && tips.currentTip == 3) {
			tips.newTip();
		}

	},
	newTip: function () {
		tips.currentTip++;
		tips.textDOM.classList.add('tip-animation')
		setTimeout(function () {
			tips.textDOM.innerHTML = tips.tipMemory = data.tips[tips.currentTip].text;
		}, 250)

	},
	textboxContent: function (content) {
		var box = document.querySelector('.fn-info');
		
		console.log(box, content);
		if(!content) {
			box.innerHTMLv= tips.tipMemory;
		} else {
			box.innerHTML = content;
		}

	}
}