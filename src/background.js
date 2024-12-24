//background chrome handlers

function saveState(state) {
	chrome.storage.local.set({'autoplay': state});
}

function setIcon(path) {
	chrome.action.setIcon({path: path});
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

	chrome.storage.local.set({'frequency' : 500});
});

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.get('autoplay').then((result) => {
		setIconToMatchAutoplay(result.autoplay);
	});
});

chrome.action.onClicked.addListener(function() {
	chrome.storage.local.get('autoplay').then((result) => {
		const newAutoplayState = !result.autoplay
		setIconToMatchAutoplay(newAutoplayState);
		saveState(newAutoplayState);
	});
});
