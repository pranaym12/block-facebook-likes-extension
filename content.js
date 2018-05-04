//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.isCommented) {
		console.log("Event listener: comments ARE clicked");
	}
	else {
		console.log("Event listener: comments NOT clicked");
	}
});