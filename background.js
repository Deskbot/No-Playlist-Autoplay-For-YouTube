//background chrome handlers

function saveState(state) {
	chrome.storage.local.set({'autoplay': state});
}

function setIcon(path) {
	chrome.browserAction.setIcon({path: path});
}

chrome.runtime.onInstalled.addListener(function() {
	saveState(false);

	chrome.storage.local.set({'frequency' : 5000});
});

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.get('autoplay', function(result) {
		if (result.autoplay) {
			setIcon('icons/Play-38.png');
		} else {
			setIcon('icons/Pause-38.png');
		}
	});
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.local.get('autoplay', function(result) {
		if (result.autoplay) {
			setIcon('icons/Pause-38.png');
		} else {
			setIcon('icons/Play-38.png');
		}

		saveState(!result.autoplay);
	});
});
