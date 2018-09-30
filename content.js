chrome.storage.local.get(['autoplay', 'frequency'], function(result) {
	
	if (!result.autoplay) { //do not allow autoplay
		if (result.frequency) {
			result.frequency = result.frequency < 1000 ? 1000 : result.frequency;
		} else {
			result.frequency = 6000; //sometimes the data is lost by chrome
		}

		var script = document.createElement("script");
		script.id = "npafy-script";
		script.type = "text/javascript";
		script.innerText += "(function() {";
		script.innerText += "	var ypm;";
		script.innerText += "	function f() {";
		script.innerText += "		if (ypm) {";
		script.innerText += "			ypm.canAutoAdvance_ = false;";
		script.innerText += "		} else {";
		script.innerText += "			ypm = document.getElementsByTagName('yt-playlist-manager')[0];";
		script.innerText += "		}";
		script.innerText += "	}";
		script.innerText += "	f();";
		script.innerText += "	setInterval(f, " + result.frequency + ");";
		script.innerText += "})();";

		document.body.appendChild(script);
	}
});
