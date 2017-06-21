
var body = document.querySelector('body');

var init = function () {

	var path = window.location.pathname;
	
	if(path.indexOf('/role') !== -1) {
		
		changePage.onboarding()
		listen.role()
		tips.init();
		events.unload();

		if(path.indexOf('sequencer') !== -1) {
			deviceRotation.start();
			sequencer.init();
			pp.setup();
			
		} else {
			
			modulator.init();
			cameraTracker.checkSupport();
			// changePage.sequencerNavigation();
			// modulateSocket();
			// changePage.selector();
			// inputEvent.slider();
			// modulate.events();
		}
	} else  if(path.indexOf('/demo') !== -1) { 
	} else  if(path.indexOf('/live') !== -1) { 
		
		masterSequence.init();
		listen.master();
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
