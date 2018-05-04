//check storage to see if comments are enabled
chrome.storage.sync.get(['commentsClicked'], function(internal){
	if(internal.commentsClicked){
		console.log("Storage: comments ARE clicked");
	}
	else {
		console.log("Storage: comments NOT clicked.");
	}
});

//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.isCommented) {
		console.log("Event listener: comments ARE clicked");
	}
	else {
		console.log("Event listener: comments NOT clicked");
	}
});