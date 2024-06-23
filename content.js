var script;

function setAutoplay(autoplay) {
	if (script) {
		script.parentNode.removeChild(script);
	}

	script = document.createElement("script");
	script.id = "npafy-script";
	script.type = "text/javascript";
	script.innerText = `
		(function() {
			var ypm;
			if (!ypm) {
				ypm = document.getElementsByTagName('yt-playlist-manager')[0];
			}
			if (ypm) {
				ypm.canAutoAdvance_ = ${autoplay};
			}
		})();
	`;

	document.body.appendChild(script);
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

