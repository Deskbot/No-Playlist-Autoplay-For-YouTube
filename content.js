var script;

function insertScript(frequency) {
	script = document.createElement("script");
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
		"	setInterval(noAutoAdvance, " + frequency + ");",
		"})();"
	].join("\n")

	document.body.appendChild(script);
}

function removeScript() {
	// var ypm = document.getElementById("npafy-script");
	// document.body.removeChild(ypm);

	if (script) {
		document.body.removeChild(script);
	}
}

var lastAutoplay;
setInterval(function () {
	chrome.storage.local.get(['autoplay', 'frequency'], function (result) {
		var frequency = result.frequency;
		if (frequency) {
			frequency = frequency < 250 ? 250 : frequency;
		} else {
			frequency = 500; // sometimes the data is lost by chrome
		}

		if (lastAutoplay !== result.autoplay) {
			lastAutoplay = result.autoplay;

			if (result.autoplay) {
				console.log("remove")
				removeScript();
			} else {
				console.log("insert")
				insertScript(frequency)
			}
		}
	})
}, 500)

