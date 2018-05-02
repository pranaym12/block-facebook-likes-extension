$(function(){
	chrome.storage.sync.get(['clickNumber', 'isClicked'], function(internal){
		if(internal.clickNumber){
			$('#clickCounter').text("Number of clicks: " + internal.clickNumber);
		}
		if(internal.isClicked){
			$('#truthHeader').text(internal.isClicked.toString());
		}
	});

	$("button[name='commentsToggleButton'").click(function(){
		console.log("Hello");

		chrome.storage.sync.get(['clickNumber', 'isClicked'], function(internal){
			var newIsClicked = true;
			var newClickNumber = 1;
			if(internal.clickNumber){
				newClickNumber += internal.clickNumber; 
			}
			if(internal.isClicked){
				newIsClicked = !internal.isClicked;
			}

			chrome.storage.sync.set({'clickNumber':newClickNumber, 'isClicked':newIsClicked});
			$('#clickCounter').text("Number of clicks: " + newClickNumber);
			$('#truthHeader').text(newIsClicked.toString());

		});
		

	});
});