$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['post', 'comment'], function(internal){
		//For posts and comments, set text to the proper word based on chrome storage
		//	using a 0-2 system. 0=hidden, 1=only likes hidden, 2=everything hidden
		//" !=='undefined' " is how I ensure that it exists, even if it's a boolean!
		if(typeof internal.post !== 'undefined'){ 
			if(internal.post == 0){
				$('#postStatus').text("unhidden");
			}
			else if(internal.post == 1){
				$('#postStatus').text("likes hidden");
			}
			else if(internal.post == 2){
				$('#postStatus').text("all is hidden");
			}
			else{
				$('#postStatus').text("Error #1!");
			}
		}
		if(typeof internal.comment !== 'undefined'){
			if(internal.comment == 0){
				$('#commentStatus').text("unhidden");
			}
			else if(internal.comment == 1){
				$('#commentStatus').text("likes hidden");
			}
			else if(internal.comment == 2){
				$('#commentStatus').text("all is hidden");
			}
			else{
				$('#commentStatus').text("Error #2!");
			}
		}
	});

	//For each of the 6 buttons (3 each P and C) do the same thing:
	//When clicked, set the corresponding val in storage to the new val
	//and send a message to the content-script

	//Buttons for posts
	$("button[name='post-unhide'").click(function(){
		var newPost = 0;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			//tabs is an array of all tabs that are ACTIVE and in the CURRENTWINDOW
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 0
			});				
			//so message is sent to 0th tab
		});
		$('#postStatus').text("unhidden");
	});
	$("button[name='post-hide-likes'").click(function(){
		var newPost = 1;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 1
			});				
		});
		$('#postStatus').text("likes hidden");
	});
	$("button[name='post-hide-all'").click(function(){
		var newPost = 2;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 2
			});				
		});
		$('#postStatus').text("all is hidden");
	});


	//Buttons for the Comments
	$("button[name='comment-unhide'").click(function(){
		var newComment = 0;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 0
			});				
		});
		$('#commentStatus').text("unhidden");
	});
	$("button[name='comment-hide-likes'").click(function(){
		var newComment = 1;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 1
			});				
		});
		$('#commentStatus').text("likes hidden");
	});
	$("button[name='comment-hide-all'").click(function(){
		var newComment = 2;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 2
			});				
		});
		$('#commentStatus').text("all is hidden");
	});
});
