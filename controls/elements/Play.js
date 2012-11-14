define([
	"dojo/_base/declare",
	"./_Button",
	"dx-alias/dom",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, _Button, dom, lang, logger){

	var log = logger('PLY', 1);

	var exports = declare('dx-media.controls.elements.Play', _Button, {

		innerTemplate: '<div class="dxIconFx ${iconClass}" data-dojo-attach-point="iconNode" data-dojo-attach-event="click:_onClick"><div class="normal"></div><div class="hover"></div><div class="active"></div></div>',
		buttonClass:'dxPlayBtn',
		iconClass:'dxPlayIcon',
		pauseClass:'dxPauseIcon',
		playShowing:1,
		controlType:'Play',


		postCreate: function(){
			this.inherited(arguments);
		},

		showPlay: function(){
			log('showPLay');
			dom.css.replace(this.iconNode, this.iconClass, this.pauseClass);
			this.playShowing = 1;
		},

		showPause: function(){
			log('showPause');
			dom.css.replace(this.iconNode, this.pauseClass, this.iconClass);
			this.playShowing = 0;
		},

		_onClick: function(event){
			log('_onClick');
			if(this.playShowing){
				event.controlType = 'play';
				this.emit('play', event);
			}else{
				event.controlType = 'pause';
				this.emit('pause', event);
			}
		}
	});

	return exports;
});
