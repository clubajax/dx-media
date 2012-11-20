define([
	"dojo/_base/declare",
	"dx-alias/Widget"
], function(declare, Widget){

	return declare('dx-media.controls.elements._Base', Widget, {

		// _added prevents addChild from occurring more than once which can cause
		// an infinite loop. Controlbar has addChild, addChildRight, and addChildLeft
		// which can over-add.
		// In markup, this isn't a problem, but the addChildRight, and addChildLeft
		// are to help with programmtically adding to the correct location in the
		// controlbar, and that's where the loop can occur.
		_added:0,

		startup: function(){
			//console.info('startup', this.getName());
			this.inherited(arguments);
			if(this._added){ return; }
			this._added = 1;
			var p = this.getParent();
			if(p){
				if(this.align == 'right'){
					p.addChildRight(this);
				}else{
					p.addChildLeft(this);
				}
			}
		}

	});
});
