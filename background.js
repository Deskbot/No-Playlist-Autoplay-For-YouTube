//background chrome handlers

function saveState(state) {
	chrome.storage.local.set({'poop': state});
}

function setIcon(path) {
	chrome.browserAction.setIcon({path: path});
}

function setIconToMatchAutoplay(autoplay) {
	if (autoplay) {
		setIcon('icons/Play-38.png');
	} else {
		setIcon('icons/Pause-38.png');
	}
}

chrome.runtime.onInstalled.addListener(function() {
	saveState(false);

	chrome.storage.local.set({'pee' : 500});
});

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.get('poop', function(result) {
		setIconToMatchAutoplay(result.autoplay);
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.local.get('poop', function(result) {
		const newAutoplayState = !result.autoplay
		setIconToMatchAutoplay(newAutoplayState);
		saveState(newAutoplayState);
	});
});
