var changePage = {
	showPage : function (page) {
		var allPages = document.querySelectorAll('.fn-changepage-page');
		body.setAttribute('current-page', page);

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
				console.log(e.currentTarget);
				changePage.showPage(e.currentTarget.getAttribute('target-page'))
			});
		}
	},
	onboarding: function () {
		changePage.init();
		changePage.showPage('alert')
		// changePage.showPage('osc');
		// audio.setup();

		var buttonSeq = document.querySelector('.fn-start-sequence');
		if(buttonSeq) {
			buttonSeq.addEventListener('click', function () {
				audio.setup();
				changePage.showPage('sequencer');
			})
		}
		var buttonCalibrate = document.querySelector('.fn-start-calibrate');
		if(buttonCalibrate) {
			buttonCalibrate.addEventListener('click', function () {
				// document.querySelector('.fn-page-container').classList.remove(fil
				
				// cameraTracker.calibrate();
				changePage.showPage('calibrate')
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



// 	swipeSlider: function (callback) {
// 		var panels = document.querySelectorAll('.fn-slider-item');
// 		var slider = document.querySelector('.fn-slider');
// 		var sensitivity = 25;
// 		var activeSlide = 0;
// 		var slideCount = panels.length;
// 		var timer;
// 		console.log(slideCount);

		
// 		// slider from: https://codepen.io/dangodev/pen/bpjrRg?editors=0011
// 		var goTo =  function (number) {
// 			console.log('go to', number);
// 			if( number < 0 ) {
// 				activeSlide = 0;
// 			} else if( number > slideCount - 1 ) {
// 				console.log('last');
// 				activeSlide = slideCount - 1;
// 			} else {
// 				activeSlide = number;
// 			}

// 			slider.classList.add( 'is-animating');

// 			var percentage = -( 100 / slideCount ) * activeSlide;

// 			slider.style.transform = 'translateX( ' + percentage + '% )';
// 			console.log(percentage, slider);
// 			clearTimeout( timer );
// 			callback(activeSlide)

// 			timer = setTimeout( function() {
// 				slider.classList.remove( 'is-animating' );
// 			}, 400 );

// 		}

// 		var sliderManager = new Hammer.Manager(slider);
// 		sliderManager.add(new Hammer.Pan({threshold: 0, pointers:0}))
// 		sliderManager.on('pan', function (e) {

// 		var percentage           = 100 / slideCount * e.deltaX / window.innerWidth;
// 		var percentageCalculated = percentage - 100 / slideCount * activeSlide;

// 		slider.style.transform = 'translateX( ' + percentageCalculated + '% )';

// 		if( e.isFinal ) {
// 			if( e.velocityX > 1 ) {
// 				goTo( activeSlide - 1 );
// 			} else if( e.velocityX < -1 ) {
// 				goTo( activeSlide + 1 )
// 			} else {
// 				if( percentage <= -( sensitivity / slideCount ) ) {
// 					goTo( activeSlide + 1 );
// 				}
// 				else if( percentage >= ( sensitivity / slideCount ) ) {
// 					goTo( activeSlide - 1 );
// 				} else {
// 					goTo( activeSlide );
// 				}
				
// 			}
// 		}
// 		})
			  
// 	},	
	
// 	swipePages: function (startPage) {
// 		changePage.showPage(startPage);
		
// 		var body       = document.querySelector('body');
// 		var hammertime = new Hammer(body, {});
// 		hammertime.on('swipeleft', function(ev) {
// 			changePage.showPage('osc');
// 		});
// 		hammertime.on('swiperight', function(ev) {
// 			changePage.showPage('filters');
// 		});
// 	},
