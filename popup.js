$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['postsClicked', 'commentsClicked'], function(internal){
		//If posts-/commentsTruthDiv already exist, change the text to the stored value
		//Because it's a boolean, in order to check if it exists, must see if its type is 'undefined'
		if(typeof internal.postsClicked !== 'undefined'){ 
			//$('#postsTruthDiv').text(internal.postsClicked.toString());
			if(internal.postsClicked){
				$('#postsTruthDiv').text("(hidden)");
			}
			else{
				$('#postsTruthDiv').text("(unhidden)");
			}
		}
		if(typeof internal.commentsClicked !== 'undefined'){
			$('#commentsTruthDiv').text(internal.commentsClicked.toString());
		}
	});

	//If the commentsToggle button is clicked, toggle the removal of likes on comments on or off 
	//get the old stored val, and if it exists, new val is opposite bc button has been clicked once
	$("button[name='commentsToggleButton'").click(function(){
		var newCommentsClicked = true; //Will update new var based on old stored values
		chrome.storage.sync.get(['commentsClicked'], function(internal){
			if(typeof internal.commentsClicked !== 'undefined'){
				newCommentsClicked = !internal.commentsClicked;
			}
			//Store the new values for clickNumber and commentsClicked
			chrome.storage.sync.set({'commentsClicked':newCommentsClicked});
			//DIsplay the new values on the popup
			$('#commentsTruthDiv').text(newCommentsClicked.toString());
			//Send a message to content script

			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				//tabs is an array of all tabs that are ACTIVE and in the CURRENTWINDOW
				chrome.tabs.sendMessage(tabs[0].id, {
					isCommented: newCommentsClicked
				});				
				//so message is sent to 0th tab
			});
		});
	});
	//If the posts button is clicked, toggle the removal of likes on comments on or off 
	//get the old stored val, and if it exists, new val is opposite bc button has been clicked once
	$("button[name='postsToggleButton'").click(function(){
		var newPostsClicked = true;
		chrome.storage.sync.get(['postsClicked'], function(internal){ 

			//Set the new values to the old values /if they exist/
			if(typeof internal.postsClicked !== 'undefined'){ 
			//!== 'undefined' ensures that if the Boolean exists but equals F, it returns T
				newPostsClicked = !internal.postsClicked;
			}
			//Store the new values for postsClicked
			chrome.storage.sync.set({'postsClicked':newPostsClicked});
			//DIsplay the new values on the popup
			if(newPostsClicked){
				$('#postsTruthDiv').text("(hidden)");
			}
			else{
				$('#postsTruthDiv').text("(unhidden)");
			}
			//Send a message to content script
			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				//tabs is an array of all tabs that are ACTIVE and in the CURRENTWINDOW
				chrome.tabs.sendMessage(tabs[0].id, {
					isPosted: newPostsClicked
				});
				//so message is sent to 0th tab
			});
		});
	});

	//Reset button resets everything
	$("button[name='resetButton']").click(function(){
		chrome.storage.sync.set({'commentsClicked':false, 'postsClicked':false});
		$('#commentsTruthDiv').text(false.toString()+" (unhidden)");
		$('#postsTruthDiv').text(false.toString()+" (unhidden)");

		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				isCommented: false,
				isPosted: false
			});
		});
	});
});