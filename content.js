function createScript(url) {
	const elem = document.createElement("script");
	elem.src = url;
	elem.type = "module";
	return elem;
}

const autoPlayScript = createScript(chrome.runtime.getURL("scripts/autoplay.js"));
const autoPauseScript = createScript(chrome.runtime.getURL("scripts/autopause.js"));

function setAutoplay(autoplay) {
	autoPlayScript.remove();
	autoPauseScript.remove();

	if (autoplay) {
		document.body.append(autoPlayScript);
	} else {
		document.body.append(autoPauseScript);
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
