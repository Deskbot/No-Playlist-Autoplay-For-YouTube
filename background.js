//background chrome handlers

function saveState(state) {
	chrome.storage.local.set({'autoplay': state});
}

function setIcon(path) {
	chrome.browserAction.setIcon({path: path});
}

chrome.runtime.onInstalled.addListener(function() {
	saveState(false);

	chrome.storage.local.set({'frequency' : 6000});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.local.get('autoplay', function(result) {
		if (result.autoplay) {
			saveState(false);
			setIcon('icons/Pause-38.png');
		} else {
			saveState(true);
			setIcon('icons/Play-38.png');
		}
	});
});