/**
* Kontener zawierajacy GUI
*/ 
function GUIContainer()
{
	var abstract = new AbstractContainer();

	var backpack = new BackpackCollection(), soundSwitch = new BtnSoundItem(), btnPrompt = new BtnPromptItem(), popup = new PopupItem();
	var grid;

	function init()
	{	
		PromptManager.events.addEventListener('activePrompt',activePrompt);
		

		abstract.name = 'gui';
		abstract.content = new createjs.Container();

		//Dodanie popupu z podpowiedziami
		popup.abstract.events.addEventListener('popupOff', onPopupOff);
		popup.abstract.events.addEventListener('disactivePrompt',disactivePrompt);
		popup.init();
		abstract.content.addChild(popup.abstract.content);     

		// Dodanie plecaka
		backpack.init();	        
		abstract.content.addChild(backpack.content);

		//Dodanie switcha do dzwieku
		soundSwitch.init();
		soundSwitch.abstract.content.onPress = function(){
			soundSwitch.animate();
			SoundManager.switchSound();
			soundSwitch.change();
		};
		abstract.content.addChild(soundSwitch.abstract.content);


		//Dodanie podpowiedzi
		/*
		popup.abstract.events.addEventListener('popupOff', onPopupOff);
		popup.init();
		abstract.content.addChild(popup.abstract.content);     */

		btnPrompt.init();
		btnPrompt.abstract.content.onPress = function(){
			btnPrompt.animate();	
			popup.switchView();
		};
		abstract.content.addChild(btnPrompt.abstract.content);     

		
		//Dodanie plecaka
		btnItems = new BtnBackpackItem();
		btnItems.init();
		btnItems.abstract.content.onPress = function(){
			btnItems.animate();	
			backpack.switchView();			
		};
		abstract.content.addChild(btnItems.abstract.content);     

		/*
		grid = new DemoGrid();
		grid.init();
		abstract.content.addChild(grid.content);
		*/

		abstract.init();
		abstract.events.dispatch('initComplete', this);		
	}


	/**
	* Przechwytuje klikniecie z ContainersManagera
	*/ 
	function onPressEvent(e)
	{
		abstract.events.dispatch('onPressEvent',null,e.data);
	}

	/**
	* Dodanie do plecaka
	*/ 
	function addToBackpack(e)
	{
		backpack.add(e.content);
		e.after();
	}

	/**
	* Dodanie do plecaka przedmiotu ktory ma inaczej wygladac w plecaku niz normalnie
	*/ 
	function addToBackpackOther(e)
	{
		e.content.parent.removeChild(e.content);
		e.after();
		backpack.add(e.other);
	}
	function hideBackpack()
	{
		backpack.hide();
	}
	
	/**
	* Animacja przycisku po tym jak jest nowa wiadomosc
	*/
	function activePrompt(e)
	{
		btnPrompt.activeAnimateStart();
	}

	/**
	* Animacja przycisku po tym jak jest nowa wiadomosc
	*/
	function disactivePrompt(e)
	{
		btnPrompt.activeAnimateStop();
	}

	function backpackRemoveByName(name)
	{
		backpack.removeByName(name);
	}
	function backpackGetByName(name)
	{
		return backpack.getByName(name);
	}

	function onPopupOff()
	{
		abstract.events.dispatch('popupOff');
	}

	this.init = init;
	this.abstract = abstract;
	this.addToBackpack = addToBackpack;
	this.addToBackpackOther = addToBackpackOther;
	this.hideBackpack = hideBackpack;
	this.backpackRemoveByName = backpackRemoveByName;
	this.backpackGetByName = backpackGetByName;
	this.soundSwitch = soundSwitch;
	this.popup = popup;
}