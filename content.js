var ypm;

function setAutoplay(autoplay) {
	if (!ypm) {
		ypm = document.getElementsByTagName('yt-playlist-manager')[0];
	}
	if (ypm) {
		ypm.TEST_ONLY.setCanAutoAdvance(autoplay);
	}
}

function checkAutoplay() {
	chrome.storage.local.get(['autoplay'], function (result) {
		setAutoplay(result.autoplay);
	})
}

chrome.storage.local.get(['frequency'], function (result) {
	var frequency = result.frequency;
	if (frequency) {
		frequency = frequency < 250 ? 250 : frequency;
	} else {
		frequency = 500; // sometimes the data is lost by chrome
	}

	setInterval(checkAutoplay, frequency); // make sure nothing switches it back
	checkAutoplay();
})
