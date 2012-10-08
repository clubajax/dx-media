define([
	"dojo/_base/declare",
	"dx-alias/Widget",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer",
	"./Time",
	"./Duration"
], function(declare, Widget, dom, lang, logger){

	var log = logger('STS', 1);

	return declare(Widget, {

		templateString:'<div class="dxStatus"><div data-dojo-type="dx-media.controls.elements.Time"></div> / <div data-dojo-type="dx-media.controls.elements.Duration"></div></div>',
		controlType:'Status',

		postCreate: function(){

		}
	});

});
