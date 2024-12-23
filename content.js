function createScript(url) {
	const elem = document.createElement("script");
	elem.src = url;
	return elem;
}

let autoPlayScript;
let autoPauseScript;

function setAutoplay(autoplay) {
	if (autoPlayScript) {
		autoPlayScript.remove();
	}
	if (autoPauseScript) {
		autoPauseScript.remove();
	}

	if (autoplay) {
		autoPlayScript = createScript(chrome.runtime.getURL("scripts/autoplay.js"));
		document.body.append(autoPlayScript);
	} else {
		autoPauseScript = createScript(chrome.runtime.getURL("scripts/autopause.js"));
		document.body.append(autoPauseScript);
	}
}

function checkAutoplay() {
	chrome.storage.local.get(['autoplay']).then((result) => {
		setAutoplay(result.autoplay);
	})
}

chrome.storage.local.get(['frequency']).then((result) => {
	var frequency = result.frequency;
	if (frequency) {
		frequency = frequency < 250 ? 250 : frequency;
	} else {
		frequency = 500; // sometimes the data is lost by chrome
	}

	setInterval(checkAutoplay, frequency); // make sure nothing switches it back
	checkAutoplay();
})
