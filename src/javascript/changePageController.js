var changePage = {
	showPage: function (page)  {
		console.log(page);
		var allPages = document.querySelectorAll('.fn-transition-page');
		var body     = document.querySelector('body');

		body.setAttribute('current-page', page)
		for(var i = 0; i < allPages.length ; i++) {
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
			} else {
				allPages[i].setAttribute('active', false);
			}
		}
	},
	sequencerNavigation: function () {
		var buttons = document.querySelectorAll('.fn-nav-buttons');
		
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				changePage.showPage(e.currentTarget.getAttribute('target-page'));
				animate.restartAnimations();
			})
		};
	},
	onboarding: function () {

		var button = document.querySelector('.fn-start-sequence');
		button.addEventListener('click', function () {
			document.querySelector('.fn-page-container').classList.remove('hide');
			document.querySelector('.fn-alert').classList.add('hide');
			audio.setup();
			changePage.showPage('sequencer')
		})
	},
	// tutorial: function () {
	// 	changePage.showPage('load1');
	// 	changePage.slider();

	// 	var button = document.querySelector('.fn-start-sequece');
	// 	button.addEventListener('click', function () {
	// 		document.querySelector('.fn-page-container').classList.remove('hide');
	// 		document.querySelector('.fn-slider-container').classList.add('hide');
	// 		audio.setup();
	// 		changePage.showPage('sequencer')
	// 	})
		
	// 	// audio.setup();
	// 	// changePage.showPage('sequencer')

	// },
	// slider: function () {
	// 	var sliderContainer = document.querySelector('.fn-slider-container');
	// 	var sliderItems = sliderContainer.querySelectorAll('.fn-slider-item');
	// 	var index = parseInt(sliderContainer.getAttribute('current-slide'));

	// 	var move = function (index) {

	// 		for(var i = 0; i < sliderItems.length; i++) {
	// 			var amount = 0
	// 			if(i > index) {
	// 				amount = 100;
	// 			} else if (i < index) {
	// 				amount = -100;
	// 			}
	// 			sliderItems[i].style.left =amount+ 'vh';
	// 			// index++;
	// 			// console.log(sliderItems);

	// 		}
	// 	}
	// 	move(index);
	// 	var hammertime = new Hammer(body, {});
	// 	hammertime.on('swipeleft', function(ev) {
	// 		console.log(sliderItems.length);
	// 		if(index !== (sliderItems.length-1)) {
	// 			index++
	// 			move(index);
				
	// 		}
	// 		console.log('index', index);

			
			
	// 	});
	// 	hammertime.on('swiperight', function(ev) {
			
	// 		if(index !== 0 ) {
	// 			index--
	// 			move(index);
				
	// 		}
	// 	});

	// },
	
	swipePages: function (startPage) {
		changePage.showPage(startPage);
		
		var body       = document.querySelector('body');
		var hammertime = new Hammer(body, {});
		hammertime.on('swipeleft', function(ev) {
			changePage.showPage('osc');
		});
		hammertime.on('swiperight', function(ev) {
			changePage.showPage('filters');
		});
	},
	showElement: function (index, button) {
		changePage.updateData(index);

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
	},
	updateData: function (index) {
		console.log('updating the data');
		var elementData = data.group.sources[parseInt(index)]
		var form        = document.querySelector('.fn-form-modulate');
		var wavetypes   = form.querySelectorAll('.fn-wavetype .fn-input'); 
		var radioWrapper = document.querySelector('.fn-radio-slider');
		form.setAttribute('active-index', index);
		form.querySelector('.fn-slider').value = elementData.detune;
		form.querySelector('.fn-active').checked = elementData.active;
		form.querySelector('.fn-slider-bg').style.clipPath = "polygon(0 0, "+elementData.detune +" % 0, "+elementData.detune+"% 100%, 0% 100%)";

		wavetypes.forEach(function(wavetype) {
			console.log(wavetype.getAttribute('wavetype') , elementData.type, wavetype.getAttribute('wavetype') == elementData.type);
			if(wavetype.getAttribute('wavetype') == elementData.type) {
				wavetype.checked = true;
			} else {
				wavetype.checked = false;
			}
			inputEvent.radioSliderEvent(wavetype, radioWrapper)
		});
		

		inputEvent.setSliderBg(elementData.detune);

	},
	selector: function (){
		var buttons = document.querySelectorAll('.fn-selector-buttons');
		changePage.showElement('0');
		console.log('e');
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				changePage.showElement(e.currentTarget.getAttribute('target-element'));


			})
		};
	}
}