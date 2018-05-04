$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['postsClicked', 'commentsClicked'], function(internal){
		//If clickNumber or commentsTruthDiv already exists, change the text to it
		if(internal.postsClicked){ 
			$('#postsTruthDiv').text("Posts: " + internal.postsClicked.toString());
		}
		if(internal.commentsClicked){
			$('#commentsTruthDiv').text("Comments" + internal.commentsClicked.toString());
		}
	});

	//If the button is clicked, increment the clickNumber and toggle commentsClicked
	$("button[name='commentsToggleButton'").click(function(){
		var newCommentsClicked = true;
		chrome.storage.sync.get(['commentsClicked'], function(internal){

			//Set the new values to the old values /if they exist/
			if(internal.commentsClicked){
				newCommentsClicked = !internal.commentsClicked;
			}
			//Store the new values for clickNumber and commentsClicked
			chrome.storage.sync.set({'commentsClicked':newCommentsClicked});
			//DIsplay the new values on the popup
			$('#commentsTruthDiv').text(newCommentsClicked.toString());
			//Send a message to content script

			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {
					isCommented: newCommentsClicked
				});
			});
		});
	});
	$("button[name='postsToggleButton'").click(function(){
		var newPostsClicked = true;
		chrome.storage.sync.get(['postsClicked'], function(internal){

			//Set the new values to the old values /if they exist/
			if(internal.postsClicked){
				newPostsClicked = !internal.postsClicked;
			}
			//Store the new values for clickNumber and commentsClicked
			chrome.storage.sync.set({'postsClicked':newPostsClicked});
			//DIsplay the new values on the popup
			$('#postsTruthDiv').text(newPostsClicked.toString());
			//Send a message to content script

			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {
					isPosted: newPostsClicked
				});
			});
		});
	});

	//Reset button resets everything
	$("button[name='resetButton']").click(function(){
		chrome.storage.sync.set({'commentsClicked':false, 'postsClicked':false});
		$('#commentsTruthDiv').text(false.toString());
		$('#postsTruthDiv').text(false.toString());

		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				isCommented: false,
				isPosted: false
			});
		});
	});
});