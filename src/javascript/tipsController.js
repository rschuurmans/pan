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