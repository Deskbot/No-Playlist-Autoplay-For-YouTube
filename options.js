var frequencyInputElem = document.getElementById('frequency_input');

chrome.storage.local.get('frequency', function(result) {
	frequencyInputElem.value = result.frequency;
});

frequencyInputElem.addEventListener('change', function() {
	chrome.storage.local.set({'frequency' : this.value });
});