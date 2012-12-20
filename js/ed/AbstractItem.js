/**
* Abstrakcyjny obiekt Item
*/
function AbstractItem()
{
	this.name = null;
	this.content = null;
	this.otherContent = null;
	this.type = null;
	this.action = null;
	this.arg = null;
	this.relationObjectName = null;
	this.demo = false;
	
	var events = new Event();

	var onPressData = {};

	function init(omitCursor, hitAreaOmit)
	{
		onPressData = {
			action:this.action, 
			content:this.content,
			other:this.otherContent,
			type:this.type, 
			next:this.arg,
			after:this.afterAddToBackpack,
			demo:this.demo
		};
		this.content.onPress = onPress;
		if(!omitCursor)
		{
			this.content.onMouseOut = onMouseOut;
			this.content.onMouseOver = onMouseOver;
		}
		this.content.snapToPixel = true;

		//POWIEKSZENIE HIT AREA
		if(undefined != this.content.image && !hitAreaOmit){
			var hit = new createjs.Shape();
			nW = this.content.image.width * 1.3;
    		nH = this.content.image.height * 1.3;
    		hit.graphics.beginFill("#fff").drawRect(-nW/2,-nH/2,nW,nH);
    		this.content.hitArea = hit;	
		}
	}
	function updateData()
	{
		onPressData = {
			action:this.action, 
			content:this.content,
			other:this.otherContent,
			type:this.type, 
			next:this.arg,
			after:this.afterAddToBackpack,
			demo:this.demo
		};
	}

	function onMouseOut(e){
		$('body').css('cursor','default');
	}

	function onMouseOver(e){
		$('body').css('cursor','pointer');
	}
	
	function onPress(e)
	{
		onPressData.stageX = e.stageX;
		onPressData.target = e.target;
		events.dispatch('onPressEvent',null, onPressData);
	}

	function afterAddToBackpack()
	{
		
	}
	
	
	this.events = events;
	this.init = init;
	this.updateData = updateData;
	this.afterAddToBackpack = afterAddToBackpack;
}