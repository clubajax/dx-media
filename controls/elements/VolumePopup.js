define([
	"dojo/_base/declare",
	"dx-alias/Widget",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, Widget, dom, lang, logger){

	var log = logger('VP', 0);

	return declare(Widget, {

		templateString: '<div class=""></div>',
		buttonClass:'dxVolumeBtn',
		iconClass:'dxVolumeIcon',
		controlType:'VolumePopup',

		postCreate: function(){
			this.inherited(arguments);
		},

		onClick: function(){
			console.log('click');
		}
	});
});
