define([
	"dojo/_base/declare",
	"./_Button",
	"../util/dom",
	"dx-alias/lang",
	"dx-alias/fx",
	"dx-alias/log",
	"./Tooltip",
	"./VolumeSlider"

], function(declare, _Button, dom, lang, fx, logger, Tooltip, VolumeSlider){

	var log = logger('VOL', 0);

	return declare('dx-media.controls.elements.Volume', _Button, {

		innerTemplate: '<div class="dxIconFx ${iconClass}" data-dojo-attach-point="iconNode" data-dojo-attach-events="click:onClick"><div class="normal"></div><div class="hover"></div><div class="active"></div></div>',
		buttonClass:'dxVolumeBtn',
		iconClass:'dxVolumeIcon',
		controlType:'Volume',

		startup: function(){
			this.inherited(arguments);
			log('VOL TOOLTIP');
			this.tooltip = new Tooltip({
				x:20,
				y:20,
				width:120,
				height:25,
				positionNode:this.domNode,
				Child: VolumeSlider
			});

			var trans = fx.transistion(this.tooltip.domNode, 'fade', {hidden:1});
			fx.flyout(this.domNode, this.tooltip.domNode, {onShow:trans.show, onHide: trans.hide});

			this.tooltip.child.on('onupdate', this, function(percentage){
				this.emit('update', {percentage:percentage});
			});
			this.startup = function(){};
		}
	});
});
