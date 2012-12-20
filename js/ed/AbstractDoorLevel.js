/**
* Abstrakcyjny obiekt DoorLevelItem
*/
function AbstractDoorLevelItem()
{
	this.content = null;
	this.type = null;
	this.action = null;
	
	this.levelUp = 0;
	this.levelDown = 0;
	this.enterX = 0;
	this.enterY = 0;
	this.postEnterX = 0;
	this.postEnterY = 0;
	this.exitX = 0;
	this.exitY = 0;
	this.postExitX = 0;
	this.postExitY = 0;

	this.contentUp = null;
	this.contentDown = null;

	var events = new Event();
	var onPressData = {};

	function init()
	{
		onPressData = {
			type: this.type,
			action: this.action,	
			levelUp: this.levelUp,
			levelDown: this.levelDown,
			enterX: this.enterX,
			enterY: this.enterY,
			postEnterX: this.postEnterX,
			postEnterY: this.postEnterY,
			exitX: this.exitX,
			exitY: this.exitY,
			postExitX: this.postExitX,
			postExitY: this.postExitY,
			demo:false
		};
		this.contentUp.onPress = onPressUp;
		this.contentDown.onPress = onPressDown;
		this.contentUp.onMouseOut = onMouseOut;
		this.contentUp.onMouseOver = onMouseOver;
		this.contentDown.onMouseOut = onMouseOut;
		this.contentDown.onMouseOver = onMouseOver;
	}

	function onMouseOut(e){
		$('body').css('cursor','default');
	}

	function onMouseOver(e){
		$('body').css('cursor','pointer');
	}
	
	function onPressUp(e)
	{
		onPressData.direction = 'down';
		onPressData.target = e.target;
		onPressData.stageX = onPressData.enterX;
		events.dispatch('onPressEvent',null, onPressData);
	}

	function onPressDown(e)
	{
		onPressData.direction = 'up';
		onPressData.target = e.target;
		onPressData.stageX = onPressData.postExitX;
		events.dispatch('onPressEvent',null, onPressData);
	}

	
	
	this.events = events;
	this.init = init;
}