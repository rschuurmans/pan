var changePage = {
	showPage: function (page)  {
		console.log(page);
		var allPages = document.querySelectorAll('.fn-animate-page');
		var body     = document.querySelector('body');

		body.setAttribute('current-page', page)
		for(var i = 0; i < allPages.length ; i++) {
			console.log(allPages[i]);
			// allPages[i].setAttribute('active', '')
			if(allPages[i].getAttribute('current-page') == page) {
				allPages[i].setAttribute('active', true);
			} else {
				allPages[i].setAttribute('active', false);
			}
		}
	},
	sequencerNavigation: function () {
		var buttons = document.querySelectorAll('.fn-nav-buttons');
		changePage.showPage('adsr');
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				console.log('going to: ', e.currentTarget, e.currentTarget.getAttribute('target-page'));
				changePage.showPage(e.currentTarget.getAttribute('target-page'));
				animate.restartAnimations();
			})
		};
	},
	swipePages: function () {
		changePage.showPage('osc');
		var body = document.querySelector('body');
		var hammertime = new Hammer(body, {			
		});
		hammertime.on('swipeleft', function(ev) {
			changePage.showPage('osc');
		});
		hammertime.on('swiperight', function(ev) {
			changePage.showPage('filters');
		});
	},
	showElement: function (index, button) {
		var allElements = document.querySelectorAll('.fn-element');
		var body        = document.querySelector('body');
		var buttons     = document.querySelectorAll('.fn-selector-buttons');

		body.setAttribute('current-element', index)
		document.querySelector('.fn-active-bar-container').setAttribute('active', index);
		for(var i = 0; i < allElements.length ; i++) {
			console.log(allElements[i]);
			// allPages[i].setAttribute('active', '')
			if(allElements[i].getAttribute('current-element') == index) {
				allElements[i].setAttribute('active', true);
				buttons[i].classList.add('active');
				
			} else {
				allElements[i].setAttribute('active', false);
				buttons[i].classList.remove('active');
			}
		}
	},
	selector: function (){
		var buttons = document.querySelectorAll('.fn-selector-buttons');
		changePage.showElement('0');
		console.log(buttons);
		
		for(var i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function (e) {
				console.log('going to: ', e.currentTarget, e.currentTarget.getAttribute('target-element'));
				changePage.showElement(e.currentTarget.getAttribute('target-element'));


			})
		};
	}
}