define([
	"dojo/_base/declare",
	"dx-alias/Widget",
	"dx-alias/dom",
	"dx-alias/on",
	"dx-alias/mouse",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, Widget, dom, on, mouse, logger){

	var log = logger('_SL',1);

	return declare('dx-media.controls.elements._Slider', [Widget], {

		templateString:'<div class="dxSlider">'+
							'<div class="dxSliderConstrain" data-dojo-attach-point="constrain"></div>' +
							'<div class="dxSliderProgress" data-dojo-attach-point="progress"></div>' +
							'<div class="dxSliderProgressA" data-dojo-attach-point="endA"></div>' +
							'<div class="dxSliderProgressB" data-dojo-attach-point="endB"></div>' +
							'<div class="dxSliderHandle" data-dojo-attach-point="handle"></div>' +
						'</div>',

		width:0,
		height:0,
		vertical:false,

		postCreate: function(){
			this.inherited(arguments);
			if(this.width) { dom.style(this.domNode, 'width', this.width+'px'); }
			dom.selectable(this.domNode, false);
			mouse.track(this.domNode, this, 'onMouse');
		},

		update: function(p){
			if(this.dragging) { return; }
			p = typeof p == 'object' ? p.percentage !== undefined ? p.percentage : p.p : p;
			this._update(p);
		},

		_update: function(p){
			p = p>1 ? 1 : p<0 ? 0 : p;
			this.handle.style.left = (p*100).toFixed(1)+"%";
			this.progress.style.width = (p*100).toFixed(1)+"%";
		},

		constrain: function(p){
			// ergo: downloaded, but generic
			p = Math.max(Math.min(p, 1), 0);
			this.constrain.style.width = (p*100).toFixed(1)+"%";
			if(p == 1) { dom.css(this.domNode, "maxed"); }
		},

		onMouse: function(e){
			on.stopEvent(e);
			if(e.mouse.down){
				this.dragging = 1;
			}else if(e.mouse.up){
				this.dragging = 0;
			}else{
				this._update(e.mouse.px);
			}
			this.emit('update', e);
		}
	});

});
