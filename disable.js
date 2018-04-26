//adds code as a script tag so it can interact with the DOM
var script = document.createElement("script");
script.type = "text/javascript";
script.innerText = "document.getElementsByTagName('yt-playlist-manager')[0].canAutoAdvance_ = false;";
document.body.appendChild(script);