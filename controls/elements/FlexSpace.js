define([
	"dojo/_base/declare",
	"dx-alias/Widget",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, Widget, dom, lang, logger){

	var log = logger('FXS', 1);

	return declare('dx-media.controls.elements.FlexSpace', Widget, {

		templateString:'<div class="dxFlexSpace"><div class="" data-dojo-attach-point="containerNode"></div></div>',
		controlType:'FlexSpace',

		postCreate: function(){
			this.getParent().addFlexSpace(this);
		},
		setMargins: function(lft, rgt){
			log('setMargins', lft, rgt);
			dom.style(this.domNode, {
				marginLeft:lft+'px',
				marginRight:rgt+'px'
			});
		}
	});

});
