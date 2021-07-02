chrome.storage.local.get(['autoplay', 'frequency'], function(result) {
	if (result.autoplay) {
		// autoplay is wanted
		return
	}

	if (result.frequency) {
		result.frequency = result.frequency < 250 ? 250 : result.frequency;
	} else {
		result.frequency = 500; // sometimes the data is lost by chrome
	}

	var script = document.createElement("script");
	script.id = "npafy-script";
	script.type = "text/javascript";
	script.innerText = [
		"(function() {",
		"	var ypm;",
		"	function noAutoAdvance() {",
		"		if (!ypm) {",
		"			ypm = document.getElementsByTagName('yt-playlist-manager')[0];",
		"		}",
		"		if (ypm) {",
		"			ypm.canAutoAdvance_ = false;",
		"		}",
		"	}",
		"	noAutoAdvance();",
		"	setInterval(noAutoAdvance, " + result.frequency + ");",
		"})();"
	].join("\n")

	document.body.appendChild(script);

});
