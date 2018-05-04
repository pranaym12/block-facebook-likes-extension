$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['clickNumber', 'commentsClicked'], function(internal){
		//If clickNumber or truthHeader already exists, change the text to it
		if(internal.clickNumber){ 
			$('#clickCounter').text("Number of clicks: " + internal.clickNumber);
		}
		if(internal.commentsClicked){
			$('#truthHeader').text(internal.commentsClicked.toString());
		}
	});

	//If the button is clicked, increment the clickNumber and toggle commentsClicked
	$("button[name='commentsToggleButton'").click(function(){
		console.log("Hello");

		chrome.storage.sync.get(['clickNumber', 'commentsClicked'], function(internal){
			var newClickNumber = 1;
			var newCommentsClicked = true;
			//Set the new values to the old values /if they exist/
			if(internal.clickNumber){
				newClickNumber += internal.clickNumber; 
			}
			if(internal.commentsClicked){
				newCommentsClicked = !internal.commentsClicked;
			}

			//Store the new values for clickNumber and commentsClicked
			chrome.storage.sync.set({'clickNumber':newClickNumber, 'commentsClicked':newCommentsClicked});
			//DIsplay the new values on the popup
			$('#clickCounter').text("Number of clicks: " + newClickNumber);
			$('#truthHeader').text(newCommentsClicked.toString());
			//Send a message to content script
			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {
					isCommented: newCommentsClicked
				});
			});

		});
	});

	$("button[name='resetButton']").click(function(){
		chrome.storage.sync.set({'clickNumber':0, 'commentsClicked':false});
		$('#clickCounter').text("Number of clicks: " + 0);
		$('#truthHeader').text(false.toString());
	});
});