
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		cameraTracker.checkSupport();
		changePage.onboarding()
		
		tips.init();
		events.unload();

		if(path.indexOf('sequencer') !== -1) {
			deviceRotation.start();
			sequencer.init();
			pp.setup();
			
		} else {
			
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
