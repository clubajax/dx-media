define([
	"dojo/_base/declare",
	"dx-alias/Widget",
	"../util/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer",
	"./Time",
	"./Duration"
], function(declare, Widget, dom, lang, logger){

	var log = logger('STS', 1);

	return declare('dx-media.controls.elements.Status', Widget, {

		templateString:'<div class="dxStatus"><div data-dojo-type="dx-media.controls.elements.Time"></div> / <div data-dojo-type="dx-media.controls.elements.Duration"></div></div>',
		controlType:'Status',

		postCreate: function(){

		}
	});

});
