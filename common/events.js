define([], function(){
	//	summary:
	//		Event name constants
	//		Instead of:
	//		|	video.on('play', doSomething);
	//		do:
	//		| video.on(events.PLAY, doSomething);
	//		The benefit of the contstants is JS will throw an error in the case
	//		of a typo, whereas with a string the event will fail silently and be
	//		difficult to catch.
	//		An additional benefit is this provides a single location to find and
	//		understand what events are available in the video components.
	//
	//		TODO: DOCTHIS
	//		
	return {
		PLAY:'play',
		PAUSE:'pause',
		STOP:'stop',
		STATUS:'status',
		DOWNLOAD:'download',
		PROGRESS:'progress',
		COMPLETE:'complete',
		PREMETA:'premeta',
		META:'meta',
		SEEK:'seek'
	};
});
