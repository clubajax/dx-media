define([
	"dojo/_base/declare",
	"dojo/uacss",
	"dijit/_Container",
	"dx-alias/Widget",
	"dx-alias/dom",
	"dx-alias/on",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, uacss, _Container, Widget, dom, on, lang, logger, timer){
	//	summary:
	//		Media player container widget for controls (play button, etc).
	//
	var log = logger('CON', 1);

	return declare(Widget, {

		templateStyle:'dxStyleIcon',
		baseClass:'dxControlbar',

		templateString:'<div class="${baseClass} ${templateStyle}"><div class="left" data-dojo-attach-point="containerNode"></div><div class="right" data-dojo-attach-point="containerRight"></div></div>',

		//	controls:Array
		//		An array of player button constructors to be instanciated
		controls:null,

		constructor: function(){
			this.elements = [];
		},

		_lftMargin:10,
		_rgtMargin:10,
		gap:5,

		postCreate: function(){
			this.addControls(this.controls);
			//timer(this, 'startup', 1);
		},

		startup: function(){
			if(this._started){ return; }
			this._started = 1;

			var children = this.getElements();
			for(var i=0; i<children.length; i++){
				children[i].startup();
			}
		},

		onClick: function(event){
			//	summary:
			//		Fires when one of the control bar buttons has been clicked
			//log('clicked:', widget.name);
		},

		getElements: function(){
			return this.elements;
		},

		addChild: function(widget, node){
			widget._added = 1;
			switch(widget.align){
				case 'right': return this.addChildRight(widget);
				case 'left': return this.addChildLeft(widget);
			}
			this.elements.push(widget);
			this.inherited(arguments);
			return widget;
		},

		addChildLeft: function(w){
			this.register(w);
			this._lftMargin += dom.box(w.domNode).w + this.gap;
			this.setFlex();
			return w;
		},

		addChildRight: function(w){
			this.removeChild(w);
			dom.place(w.domNode, this.containerRight);
			this.register(w);
			this._rgtMargin += dom.box(w.domNode).w + this.gap;
			this.setFlex();
			return w;
		},

		addFlexSpace: function(w){
			this.removeChild(w);
			dom.place(w.domNode, this.domNode);
			this.flexSpace = w;
			this.setFlex();
		},

		setFlex: function(){
			if(this.flexSpace) {this.flexSpace.setMargins(this._lftMargin, this._rgtMargin);}
		},

		register: function(w){
			log('register', w.name);
			var widget = w; // scoped
			this.elements.push(w);
			on(w, 'click', this, function(event){
				//log('click', widget.name);
				event.widget = widget;
				this.onClick(event);
				this.emit('click', event);
			});
		},

		addControls: function(controls){
			if(controls){
				var C, i;
				for(i=0; i<controls.length; i++){
					C = controls[i];
					if(typeof C === 'function'){
						// a constructor
						this.addChild(new C());
					}else if(C.Class){
						// An object with a class constructor and properties to mix in
						// FIXME: Is there a better convention? Like how Editor passes plugins?
						this.addChild(new C.Class(C));
					}else{
						// an instanciated widget
						this.addChild(C);
					}
				}
			}
		}
	});

});
