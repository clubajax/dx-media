define([
	"dojo/_base/declare",
	"./_Button",
	"../util/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, _Button, dom, lang, logger){

	var log = logger('FBK', 1);

	return declare('dx-media.controls.elements.Facebook', _Button, {

		templateString:'<a href="${facebookUrl}" target="_BLANK" ><div class="dxIcon dxFacebookBtn" data-dojo-attach-event="onclick:onClick"></div></a>',
		align:'right',
		controlType:'Facebook',

		postMixInProperties: function(){
			var URL = 'http://www.facebook.com/sharer.php',
			PAGEURL = document.location.href,
			TITLE = document.title || "";
			this.facebookUrl = URL + "?u=" + escape(PAGEURL) + "&="+ escape(TITLE);
		}
	});

});
