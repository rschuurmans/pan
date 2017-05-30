

var onLoad = function () {

	var path = window.location.pathname;

	if(path.indexOf('/role/modulator') !== -1) {

		modulateRole.init();
		changePage.swipePages();
		changePage.selector();

	} else if(path.indexOf('/role/sequencer') !== -1) {

		
		changePage.sequencerNavigation();
		sequencerRole.init();
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
