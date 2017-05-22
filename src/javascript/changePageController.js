var changePage = {
	showPage: function (page)  {
		var allPages = document.querySelectorAll('.fn-animate-page');
		
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
		// also use hammertime for this?
		var buttons = document.querySelectorAll('.fn-nav-buttons');
		animate.restartAnimations();
		
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function (e) {
				console.log('going to: ', e.currentTarget, e.currentTarget.getAttribute('target-page'));
				changePage.showPage(e.currentTarget.getAttribute('target-page'));
				animate.restartAnimations();
			})
		};
	}
}