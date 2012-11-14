define([
	"dojo/_base/declare",
	"./_Slider",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, _Slider, dom, lang, logger){

	return declare('dx-media.controls.elements.Progress', _Slider, {

		controlType:'Progress',

		postCreate: function(){
			this.inherited(arguments);
		}
	});

});
