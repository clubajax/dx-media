define([
	"dojo/_base/declare",
	"./_Button",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, _Button, dom, lang, logger){

	var log = logger('BV', 1);

	return declare(_Button, {

		buttonClass:'dxIcon dxVideoBtn',
		radioGroup:'playerViews',
		controlType:'Video'
	});

});
