var isCommentsContent = false;
var isPostsContent = false;
//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.isCommented) {	
		$('.UFICommentLikeButton').css('display', "none");
	}
	if(request.isCommented == false) {
		$('.UFICommentLikeButton').css('display', "inline");
	}
	if(request.isPosted){
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");		
	}
	if(request.isPosted ==false){
		$('._1g5v').css('display', "block"); //not sure if it should be "inline"
		$('._4arz').css('display', "block");
	}
});

chrome.storage.sync.get(['commentsClicked', 'postsClicked'], function(internal){

	console.log("line 244, internalComments: " + internal.commentsClicked);
	console.log("line 24, internalPosts: " + internal.postsClicked);
	//For some weird reason, if statement doesn't work if I use "isCommentsContent"
	if(internal.commentsClicked){  
		$('.UFICommentLikeButton').css('display', "none");
	}
	//For some weird reason, if statement doesn't work if I use "isCommentsContent"
	if(internal.postsClicked){  
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");
	}
});


//document.getElementById("rightCol").style.display = 'none';
