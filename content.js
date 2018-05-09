//Any time message comes from popup (when user presses a button)
//	update page based on the message. 
//0 = nothing hidden; 1 = like # hidden; 2 = like # and emoji hidden
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.postMsg == 0) {
		post0();
	}
	if(request.postMsg == 1) {//Show emojis, not #likes
		post1();
	}
	if(request.postMsg ==2){
		post2();
	}
	if(request.commentMsg == 0){
		comment0();
	}
	if(request.commentMsg == 1){
		comment1();
	}
	if(request.commentMsg == 2){
		comment2();
	}
});

//Run refreshLikes on page load, to remove any likes based on prev setting
//Then run every 1s so as more content load, that content is updated in <=1s
refreshLikes();
function refreshLikes(){
	//Checks storage and updates page
	chrome.storage.sync.get(['post', 'comment'], function(internal){
		//Get values from chrome storage
		//Only runs on startup of page
		//If, during last session, user blocked something, it's stored in storage
		//and retrieved and automatically blocked upon next startup
		
		if(internal.post == 0){
			post0();
		}
		if(internal.post == 1){  
			post1();
		}
		if(internal.post ==2){
			post2();
		}
		if(internal.comment == 0){
			comment0();
		}
		if(internal.comment == 1){ 
			comment1();
		}
		if(internal.comment == 2){
			comment2();
		}
		//And in case they don't exist for some reason
		if(!internal.post){
			post0();
		}
		if(!internal.comment){
			comment0();
		}
	});
	//Every 1s, refreshLikes called. recursive timer
	setTimeout(refreshLikes, 1000); 
}

function post0(){//post likes unhidden
	$('._1g5v').css('display', "block");//names of specific-friends who've liked a post
	$('._4arz').css('display', "block");//#of non-specificfriends who've liked a post
	$('.UFIRow.UFILikeSentence').css('display', "block");
	$('._3399._1f6t._4_dr._20h5').css('display',"block");	
}
function post1(){//post like #s hidden
	$('._1g5v').css('display', "none");
	$('._4arz').css('display', "none");	
	$('.UFIRow.UFILikeSentence').css('display', "block");
	$('._3399._1f6t._4_dr._20h5').css('display',"block");
}
function post2(){//post like# and like-emoji hidden
	//	and if sponsored post, # of shares and comments hidden
	//	entire "like-status bar" basically
	$('._1g5v').css('display', "block");
	$('._4arz').css('display', "block");
	$('.UFIRow.UFILikeSentence').css('display', "none");
	$('._3399._1f6t._4_dr._20h5').css('display',"none");
}
function comment0(){//If comment likes are unhidden
	$('.UFICommentLikeButton').css('display', "inline");//#of likes on comment
	$('.UFICommentReactionsBling').css('display', "inline");//emojis on comment
}
function comment1(){//If comment like #s hidden
	$('.UFICommentLikeButton').css('display', "none");
	$('.UFICommentReactionsBling').css('display', "inline");
}
function comment2(){//comment like# and like-emoji hidden
	$('.UFICommentLikeButton').css('display', "inline");
	$('.UFICommentReactionsBling').css('display', "none");
}