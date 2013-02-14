define([
	"dojo/_base/declare",
	"dijit/registry",
	"dijit/_Container",
	"dx-alias/Widget",
	"../util/dom",
	"dx-alias/on",
	"dx-alias/lang",
	"dx-alias/log",
	"dx-timer/timer"
], function(declare, registry, _Container, Widget, dom, on, lang, logger, timer){
	//	summary:
	//		Media player container widget for controls (play button, etc).
	//
	var log = logger('CON', 0);

	return declare(Widget, {

		templateStyle:'dxStyleIcon',
		baseClass:'dxControlbar',

		templateString:'<div class="${baseClass} ${templateStyle}"><div class="left" data-dojo-attach-point="containerNode"></div><div class="right" data-dojo-attach-point="containerRight"></div></div>',

		//	controls:Array
		//		An array of player button constructors to be instanciated
		controls:null,

		constructor: function(){
			this.elements = [];
			this.elementsMap = {};
		},

		_lftMargin:10,
		_rgtMargin:10,
		gap:5,

		postCreate: function(){
			this.addControls(this.controls);
			this.inherited(arguments);
		},

		startup: function(){
			if(this._started){ return; }
			this._started = 1;

			var children = this.getChildren();
			for(var i=0; i<children.length; i++){
				//console.log('startup:', children[i].getName());
				children[i].startup();
			}
		},

		getChildren: function(){
			// This only needs to be done once. Most widgets get added as children,
			// but for some reason, a few, such as Progress do not. Any additionally
			// added children should get registered properly.
			if(!this._allFound){
				this._allFound = 1;
				var children = registry.findWidgets(this.containerNode) || [];
				children = children.concat(registry.findWidgets(this.containerRight));
				for(var i=0; i<=children.length; i++){
					this.register(children[i]);
				}
			}
			// this.elements populated in register()
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
			if(!w){ return; }
			var widget = w; // scoped...?
			var name = widget.getName();
			if(this.elementsMap[widget.id]){ return; }
			log('register', name);
			this.elements.push(widget);
			this.elementsMap[widget.id] = widget;
			on(w, 'click', this, function(event){
				event.widget = widget;
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
