//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.postMsg == 0) {
		$('._1g5v').css('display', "block");//names of specific-friends who've liked a post
		$('._4arz').css('display', "block");//#of non-specificfriends who've liked a post
	}
	if(request.postMsg == 1) {
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");	
	}
	if(request.postMsg ==2){

	}
	//TODO: == 2 for post and comments, and will need to update
	//	in both 0 and 1 to unhide the things 2 hides

	if(request.commentMsg == 0){
		//this is the class that controls the # of likes shown on comments
		$('.UFICommentLikeButton').css('display', "inline");//#of likes on comment
		$('.UFICommentReactionsBling').css('display', "inline");//emojis on comment
	}
	if(request.commentMsg == 1){ //show emoji, not #likes
		$('.UFICommentLikeButton').css('display', "none");
		$('.UFICommentReactionsBling').css('display', "inline");
	}
	if(request.commentMsg == 2){//show emoji class, but remove class that contains emojis 
		//	AND #likes
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