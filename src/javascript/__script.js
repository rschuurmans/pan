var body = document.querySelector('body');

var onLoad = function () {

	var path = window.location.pathname;

	if(path.indexOf('/role') !== -1) {
		audio.setup();
		if(path.indexOf('sequencer') !== -1) {
			sequencer.init();
			pp.setup();
			changePage.sequencerNavigation();
		} else {
			changePage.swipePages('osc');
			
			changePage.selector();
			inputEvent.slider();
			modulate.events();
		}
	} else {
		animate.loginBackground();
		animate.loginTransition();
		postData.username();
		postData.groupList();
	}

	// if(path.indexOf('/role/modulator') !== -1) {
		
	// 	// modulateRole.init();
	// 	// changePage.swipePages('osc');
	// 	// changePage.selector();
	// 	// inputEvent.slider();

	// 	// inputEvent.radioSlider();

	// } else if(path.indexOf('/role/sequencer') !== -1) {
	// 	audio.setup();
		
	// 	// changePage.sequencerNavigation();
	// 	// sequencerRole.init();
	// } else {
	// 	// animate.loginBackground();
	// 	// animate.loginTransition();
	// 	// postData.username();
	// 	// postData.groupList();
	// }


	
}




window.onload = function () {
	onLoad();

}
