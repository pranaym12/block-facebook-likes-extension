$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['clickNumber', 'isClicked'], function(internal){
		//If clickNumber or truthHeader already exists, change the text to it
		if(internal.clickNumber){ 
			$('#clickCounter').text("Number of clicks: " + internal.clickNumber);
		}
		if(internal.isClicked){
			$('#truthHeader').text(internal.isClicked.toString());
		}
	});

	//If the button is clicked, increment the clickNumber and toggle isClicked
	$("button[name='commentsToggleButton'").click(function(){
		console.log("Hello");

		chrome.storage.sync.get(['clickNumber', 'isClicked'], function(internal){
			var newClickNumber = 1;
			var newIsClicked = true;
			//Set the new values to the old values /if they exist/
			if(internal.clickNumber){
				newClickNumber += internal.clickNumber; 
			}
			if(internal.isClicked){
				newIsClicked = !internal.isClicked;
			}

			//Store the new values for clickNumber and isClicked
			chrome.storage.sync.set({'clickNumber':newClickNumber, 'isClicked':newIsClicked});
			//DIsplay the new values on the popup
			$('#clickCounter').text("Number of clicks: " + newClickNumber);
			$('#truthHeader').text(newIsClicked.toString());

		});
	});

	$("button[name='resetButton']").click(function(){
		chrome.storage.sync.set({'clickNumber':0, 'isClicked':false});
		$('#clickCounter').text("Number of clicks: " + 0);
		$('#truthHeader').text(false.toString());
	});
});