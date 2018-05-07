//use event listener to see if comments enabled
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.postMsg == 0) {
		$('._1g5v').css('display', "block");//names of specific-friends who've liked a post
		$('._4arz').css('display', "block");//#of non-specificfriends who've liked a post
		$('.UFIRow.UFILikeSentence').css('display', "block");
		$('._3399._1f6t._4_dr._20h5').css('display',"block");
	}
	if(request.postMsg == 1) {//Show emojis, not #likes
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");	
		$('.UFIRow.UFILikeSentence').css('display', "block");
		$('._3399._1f6t._4_dr._20h5').css('display',"block");
	}
	if(request.postMsg ==2){
		$('._1g5v').css('display', "block");
		$('._4arz').css('display', "block");
		$('.UFIRow.UFILikeSentence').css('display', "none");
		$('._3399._1f6t._4_dr._20h5').css('display',"none");
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
	//Get values from chrome storage
	//Only runs on startup of page
	//If, during last session, user blocked something, it's stored in storage
	//and retrieved and automatically blocked upon next startup

	console.log("post: " + internal.post+", comment: "+internal.comment);
	if(internal.post == 1){  
		$('._1g5v').css('display', "none");
		$('._4arz').css('display', "none");	
		$('.UFIRow.UFILikeSentence').css('display', "block");
		$('._3399._1f6t._4_dr._20h5').css('display',"block");
	}
	if(internal.post ==2){
		$('._1g5v').css('display', "block");
		$('._4arz').css('display', "block");
		$('.UFIRow.UFILikeSentence').css('display', "none");
		$('._3399._1f6t._4_dr._20h5').css('display',"none");
	}
	if(internal.comment == 1){ //show emoji, not #likes
		console.log("comment: "+internal.comment+", console.log line41");
		$('.UFICommentLikeButton').css('display', "none");
		$('.UFICommentReactionsBling').css('display', "inline");
	}
	if(internal.comment == 2){//show emoji class, but remove class that contains emojis 
		//	AND #likes
		console.log("comment: "+internal.comment+", console.log line47");
		$('.UFICommentLikeButton').css('display', "inline");
		$('.UFICommentReactionsBling').css('display', "none");
	}
});