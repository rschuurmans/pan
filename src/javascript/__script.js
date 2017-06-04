var body = document.querySelector('body');

var onLoad = function () {

	var path = window.location.pathname;
	console.log(path, path.length);
	if(path.indexOf('/role') !== -1) {
		changePage.onboarding();
		deviceRotation.start();
		tips.init();

		if(path.indexOf('sequencer') !== -1) {
			sequencer.init();
			pp.setup();
			changePage.sequencerNavigation();
		} else {
			cameraTracker.init();
			changePage.sequencerNavigation();
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
	}
	
}




window.onload = function () {
	onLoad();
	 


}
