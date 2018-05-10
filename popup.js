function post0status(){
	$('#postStatus').text("unhidden");
	$("#post0").checked = true;

	$('#post0').parent().addClass("checked");
	$('#post1').removeClass("checked");
	$('#post2').removeClass("checked");	
}function post1status(){
	$('#postStatus').text("likes hidden");
	$("#post1").checked = true;

	$('#post1').parent().addClass("checked");
	$('#post0').removeClass("checked");
	$('#post2').removeClass("checked");
}function post2status(){
	$('#postStatus').text("all is hidden");
	$("#post2").checked = true;

	$('#post2').parent().addClass("checked");
	$('#post1').removeClass("checked");
	$('#post0').removeClass("checked");
}
function comment0status(){
	$('#commentStatus').text("unhidden");
	$("#comment1").checked = true;

	$('#comment0').parent().addClass("checked");
	$('#comment1').removeClass("checked");
	$('#comment2').removeClass("checked");
}function comment1status(){
	$('#commentStatus').text("likes hidden");
	$("#comment1").checked = true;

	$('#comment1').parent().addClass("checked");
	$('#comment0').removeClass("checked");
	$('#comment2').removeClass("checked");
}function comment2status(){
	$('#commentStatus').text("all is hidden");
	$("#comment2").checked = true;

	$('#comment2').parent().addClass("checked");
	$('#comment1').removeClass("checked");
	$('#comment0').removeClass("checked");
}
$(function(){
	//Check for existing stored values, and set text in popup to that
	chrome.storage.sync.get(['post', 'comment'], function(internal){
		//For posts and comments, set text to the proper word based on chrome storage
		//	using a 0-2 system. 0=hidden, 1=only likes hidden, 2=everything hidden
		//" !=='undefined' " is how I ensure that it exists, even if it's a boolean!
		
		//if(typeof internal.post !== 'undefined'){ 
		if(internal.post == 0){
			post0status();
		}else if(internal.post == 1){
			post1status();
		}else if(internal.post == 2){
			post2status();
		}else{
			post2status();
		}
		
		if(internal.comment == 0){
			comment0status();
		}else if(internal.comment == 1){
			comment1status();
		}else if(internal.comment == 2){
			comment2status();
		}else{
			comment2status();
		}
		
	});

	//For each of the 6 buttons (3 each P and C) do the same thing:
	//When clicked, set the corresponding val in storage to the new val
	//and send a message to the content-script

	//Buttons for posts
	$('#post0').click(function(){
		var newPost = 0;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			//tabs is an array of all tabs that are ACTIVE and in the CURRENTWINDOW
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 0
			});				
			//so message is sent to 0th tab
		});
		post0status();
	});
	$('#post1').click(function(){
		var newPost = 1;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 1
			});				
		});
		post1status();
	});
	$('#post2').click(function(){
		var newPost = 2;
		chrome.storage.sync.set({'post': newPost});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				postMsg: 2
			});				
		});
		post2status();
	});

	//Buttons for the Comments
	$('#comment0').click(function(){
		var newComment = 0;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 0
			});				
		});
		comment0status();
	});
	$('#comment1').click(function(){
		var newComment = 1;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 1
			});				
		});
		comment1status();
	});
	$('#comment2').click(function(){	
			var newComment = 2;
			chrome.storage.sync.set({'comment': newComment});
			chrome.tabs.query({active:true, currentWindow:true},function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {
					commentMsg: 2
				});				
			});
			comment2status();
	});
});

/*
	//Buttons for the Comments
	$("button[name='comment-unhide'").click(function(){
		var newComment = 0;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 0
			});				
		});
		comment0status();
	});
	$("button[name='comment-hide-likes'").click(function(){
		var newComment = 1;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 1
			});				
		});
		comment1status();
	});
	$("button[name='comment-hide-all'").click(function(){
		var newComment = 2;
		chrome.storage.sync.set({'comment': newComment});
		chrome.tabs.query({active:true, currentWindow:true},function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				commentMsg: 2
			});				
		});
		comment2status();
	});
*/