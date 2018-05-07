//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.postMsg == 0) {
		//1st is class that controls the names of friends who've liked a post
		//2nd is class that controls # of ppl besides your friends who've liked post
		$('._1g5v').css('display', "block"); 
		$('._4arz').css('display', "block");	
		
	}
	if(request.postMsg == 1) {
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");	
	}
	//TODO: == 2 for post and comments, and will need to update
	//	in both 0 and 1 to unhide the things 2 hides

	if(request.commentMsg == 0){
		//this is the class that controls the # of likes shown on comments
		$('.UFICommentLikeButton').css('display', "inline");
		$('.UFICommentReactionsBling').css('display', "inline");
	}
	if(request.commentMsg == 1){
		$('.UFICommentLikeButton').css('display', "none");
		$('.UFICommentReactionsBling').css('display', "inline");
	}
	if(request.postMsg == 2){
		$('.UFICommentLikeButton').css('display', "inline");
		$('.UFICommentReactionsBling').css('display', "none");

	}
});

chrome.storage.sync.get(['post', 'comment'], function(internal){
	if(internal.post == 1){  
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");
	}
	//TODO == 2 for post and comments
	if(internal.comment == 1){  
		$('.UFICommentLikeButton').css('display', "none");

	}
});