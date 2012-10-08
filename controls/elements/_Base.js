define([
	"dojo/_base/declare",
	"dx-alias/Widget"
], function(declare, Widget){

	return declare('dx-media.controls.elements._Base', Widget, {

		startup: function(){
			var p = this.getParent();
			//console.log('parent:', p, this.declaredClass, this.domNode, this.domNode.parentNode);
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
