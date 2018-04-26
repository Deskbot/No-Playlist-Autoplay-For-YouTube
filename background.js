//background chrome handlers

function disableAutoplay() {
	insertScriptToYouTube('disable.js');
}

function enableAutoplay() {
	insertScriptToYouTube('enable.js');
}

function insertScriptToYouTube(scriptPath) {
	chrome.tabs.query({'url': '*://*.youtube.com/*'}, function(tabs) {
		for (var tab of tabs) {
			chrome.tabs.executeScript(tab.id, {
				file: scriptPath
			});
		}
	});
}

function saveState(state) {
	chrome.storage.local.set({'autoplay': state});
}

function setIcon(path) {
	chrome.browserAction.setIcon({path: path});
}

chrome.runtime.onInstalled.addListener(function() {
	saveState(false);
	disableAutoplay();
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.local.get('autoplay', function(result) {
		if (result.autoplay) {
			saveState(false);
			setIcon('icons/Pause-38.png');
			disableAutoplay();
		} else {
			saveState(true);
			setIcon('icons/Play-38.png');
			enableAutoplay();
		}
	});
});