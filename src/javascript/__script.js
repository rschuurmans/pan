
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		changePage.onboarding()
		// changePage.init();
		deviceRotation.start();
		tips.init();

		if(path.indexOf('sequencer') !== -1) {
			sequencer.init();
			pp.setup();
			
		} else {
			cameraTracker.init();
			modulator.init();
			// changePage.sequencerNavigation();
			// modulateSocket();
			// changePage.selector();
			// inputEvent.slider();
			// modulate.events();
		}
	} else  if(path.indexOf('/demo') !== -1) { 
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
		changePage.init();
	}
	
}
window.onload = function () {
	console.log('load');
	init();

}
