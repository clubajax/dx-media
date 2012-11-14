define([
	"dojo/_base/declare",
	"./_Button",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, _Button, dom, lang, logger){

	return declare('dx-media.controls.elements.Embed', _Button, {

		align:'right',
		buttonClass:'dxIcon dxEmbedBtn',
		controlType:'Embed'
	});

});
