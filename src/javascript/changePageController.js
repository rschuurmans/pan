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
		console.log(buttons);
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				console.log(e.currentTarget);
				var page  = e.currentTarget.getAttribute('target-page');
				body.setAttribute('current-page', page)

				if(page == 'calibrate') {
					window.setTimeout(function () { 
						changePage.showPage(page);
						animate.restartAnimations();
					}, 2000)
				} else {
					changePage.showPage(page);
					animate.restartAnimations();
				}
			})
		};
	},
	onboarding: function () {
		
		
		changePage.showPage('alert')
		var buttonSeq = document.querySelector('.fn-start-sequence');
		if(buttonSeq) {
			buttonSeq.addEventListener('click', function () {
				audio.setup();
				changePage.showPage('sequencer')
			})
		}
		var buttonCalibrate = document.querySelector('.fn-start-calibrate');
		if(buttonCalibrate) {
			buttonCalibrate.addEventListener('click', function () {
				// document.querySelector('.fn-page-container').classList.remove(fil
				audio.setup();
				// cameraTracker.calibrate();
				changePage.showPage('calibrate')
			})
			
		}

		
	},
	swipeSlider: function (callback) {
		var panels = document.querySelectorAll('.fn-slider-item');
		var slider = document.querySelector('.fn-slider');
		var sensitivity = 25;
		var activeSlide = 0;
		var slideCount = panels.length;
		var timer;
		console.log(slideCount);

		
		// slider from: https://codepen.io/dangodev/pen/bpjrRg?editors=0011
		var goTo =  function (number) {
			console.log('go to', number);
			if( number < 0 ) {
				activeSlide = 0;
			} else if( number > slideCount - 1 ) {
				console.log('last');
				activeSlide = slideCount - 1;
			} else {
				activeSlide = number;
			}

			slider.classList.add( 'is-animating');

			var percentage = -( 100 / slideCount ) * activeSlide;

			slider.style.transform = 'translateX( ' + percentage + '% )';
			console.log(percentage, slider);
			clearTimeout( timer );
			callback(activeSlide)

			timer = setTimeout( function() {
				slider.classList.remove( 'is-animating' );
			}, 400 );

		}

		var sliderManager = new Hammer.Manager(slider);
		sliderManager.add(new Hammer.Pan({threshold: 0, pointers:0}))
		sliderManager.on('pan', function (e) {

		var percentage           = 100 / slideCount * e.deltaX / window.innerWidth;
		var percentageCalculated = percentage - 100 / slideCount * activeSlide;

		slider.style.transform = 'translateX( ' + percentageCalculated + '% )';

		if( e.isFinal ) {
			if( e.velocityX > 1 ) {
				goTo( activeSlide - 1 );
			} else if( e.velocityX < -1 ) {
				goTo( activeSlide + 1 )
			} else {
				if( percentage <= -( sensitivity / slideCount ) ) {
					goTo( activeSlide + 1 );
				}
				else if( percentage >= ( sensitivity / slideCount ) ) {
					goTo( activeSlide - 1 );
				} else {
					goTo( activeSlide );
				}
				
			}
		}
		})
			  
	},	
	
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
	updateSettingValues: function (index) {
		console.log('updating the data', data);
		var elementData = data.group.modulate[parseInt(index)]
		

		
		var form        = document.querySelector('.fn-modulate-settings');
		for(var i = 0; i < elementData.settings.length;i++) {
			
			var settings = elementData.settings[i];
			var form        = document.querySelector('.fn-modulate-settings');
			var listItem = form.querySelectorAll('.fn-setting')[i];

			var input = listItem.querySelector('.fn-filter-settings');
			var label = listItem.querySelector('.fn-label');
			
			listItem.classList.remove('hide');
			console.log(settings.adjustable);
			if(!settings.adjustable) {
				listItem.classList.add('hide');
			}
			input.setAttribute('id', settings.type);
			input.setAttribute('min', settings.min);
			input.setAttribute('max', settings.max);
			input.setAttribute('steps', settings.step);
			input.setAttribute('value', settings.value);

			label.innerHTML = settings.type;
		}
	},
	updateData: function (index) {
		console.log('updating the data', data);
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

