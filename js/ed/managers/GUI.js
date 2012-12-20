/**
* Manager contenerow i pseudo controller
*/ 
function GUIManager()
{
	var abstract = new AbstractContainersManager();

	var gui = new GUIContainer();

	/**
	* Inicjalizacja kontenerow
	*/ 
	function init()
	{
		abstract.content = new createjs.Container();
		abstract.content.name = 'gui';
		
		gui.abstract.parent = this;
		gui.abstract.events.addEventListener('initComplete',onContainerInit);
		gui.abstract.events.addEventListener('onPressEvent', abstract.onPressEvent);
		gui.abstract.events.addEventListener('popupOff', onPopupOff);
		gui.init();
	}
	
	/**
	* nasłuchuje, czy wszystkie kontenery zostały zainicjalizowane
	*/ 
	function onContainerInit(e)
	{
		// dodanie contenera do kolekcji kontenerow
		abstract.containers.add(e.target);
		
		// Gdy wszyskie kontenery zostaly zainicjowane daje znac do Game ze jest gotowy.
		if(abstract.containers.length() == 1)
		{
			abstract.content.addChild(gui.abstract.content);
			abstract.init();
			abstract.events.dispatch('managerInitComplete');
		}
	}

	function hideGUI(data)
	{
		// jezeli nextData.next rowna sie jakis tam kontener to wygas GUI
		gui.abstract.events.addEventListener('fadeOutComplete', onFadeOutCompleteContainers);
		gui.abstract.fadeOut();
	}

	function onFadeOutCompleteContainers(e)
	{
		abstract.onFadeOut();
	}

	function showGUI()
	{
		//console.log('GuiManager.showGUI')
		// jezeli nextData.next nie rowna sie jakis tam kontener to pokaz GUI
		gui.abstract.events.addEventListener('fadeInComplete', onFadeInCompleteContainers);
		gui.abstract.fadeIn();
	}

	function onFadeInCompleteContainers(e)
	{
		//console.log('GuiManager.onFadeInCompleteContainers');
		abstract.onFadeIn();
	}

	function onPressEvent(e)
	{
		
	}

	function addToBackpack(e)
	{
		gui.addToBackpack(e);
	}
	function addToBackpackOther(e)
	{
		gui.addToBackpackOther(e);
	}
	function hideBackpack()
	{
		gui.hideBackpack();
	}
	function backpackRemoveByName(name)
	{
		gui.backpackRemoveByName(name);
	}
	function backpackGetByName(name)
	{
		return gui.backpackGetByName(name);
	}
	function onPopupOff(e)
	{
		abstract.events.dispatch('popupOff');
	}
		
	this.init = init;
	this.abstract = abstract;
	this.onContainerInit = onContainerInit;

	this.hideGUI = hideGUI;
	this.showGUI = showGUI;
	this.addToBackpack = addToBackpack;
	this.addToBackpackOther = addToBackpackOther;
	this.hideBackpack = hideBackpack;
	this.backpackRemoveByName = backpackRemoveByName;
	this.backpackGetByName = backpackGetByName;
	this.gui = gui;

}