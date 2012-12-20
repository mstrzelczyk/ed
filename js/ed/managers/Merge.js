/**
* Obiekt odpowiedzialny za merge itemow
*/
var MergeManager = {

    cloudReady: false,
    starReady: false,
    santaClausReady: false,
    reindeerReady: false,

    // DEMO
    knife: function(object)
    {
        game.controller.backpackRemoveByName('cake');
        game.controller.backpackRemoveByName('knife');

        var cakePieces = new CakePiecesItem();
        cakePieces.init();
        var data = {
            content:cakePieces.abstract.content,
            type:cakePieces.abstract.type, 
            next:cakePieces.abstract.arg,
            target:cakePieces.abstract.content,
            after:cakePieces.abstract.afterAddToBackpack,
            demo:true
        };
        game.controller.addToBackpack(data, true);
        SoundManager.playOn('merge');
        //
        PromptManager.disactive('demo3');
        PromptManager.active('demo4');
        game.controller.guiManager.gui.popup.on();
    },
    cake: function(object)
    {
        MergeManager.knife(object);
    },
    cakePieces: function(object)
    {
        game.controller.backpackRemoveByName('cakePieces');
        game.controller.animationManager.clockEat(object);
        game.controller.hideBackpack();
        //
        SoundManager.playOn('merge');
        game.controller.guiManager.abstract.events.addEventListener('popupOff', MergeManager.afterCakePromptClose);
        //
        PromptManager.disactive('demo4');
        PromptManager.active('demo5');
        game.controller.guiManager.gui.popup.on();
        //
        game.controller.demoEnd();
    },
    afterCakePromptClose: function(e)
    {
        //console.log('MergeManager.afterCakePromptClose')
        game.controller.guiManager.abstract.events.removeEventListener('popupOff', MergeManager.afterCakePromptClose);
        //
        PromptManager.disactive('demo5');
        PromptManager.active('tube1');
        PromptManager.active('honey1');
        PromptManager.active('fairy1');
        PromptManager.active('angelHair1');
        PromptManager.active('inside');
    },


    // INSIDE
    tube: function(object)
    {
        game.controller.backpackRemoveByName('tube');
        game.controller.animationManager.showTube();
        game.controller.hideBackpack();
        //
        SoundManager.playOn('merge');
        PromptManager.disactive('tube2');
    },
    honey: function(object)
    {
        game.controller.backpackRemoveByName('honey');
        game.controller.backpackRemoveByName('catHair');

        var beard = new BeardItem();
        beard.init();
        var data = {
            content:beard.abstract.content,
            type:beard.abstract.type, 
            next:beard.abstract.arg,
            target:beard.abstract.content,
            after:beard.abstract.afterAddToBackpack,
            demo:false
        };
        game.controller.addToBackpack(data, true);
        SoundManager.playOn('beard');
        //
        PromptManager.disactive('honey2');
        PromptManager.disactive('catHair2');
        PromptManager.active('beard');
    },
    catHair: function(object)
    {
        MergeManager.honey(object);
    },
    bottle: function(object)
    {
        game.controller.backpackRemoveByName('bottle');
        game.controller.animationManager.hideFairy();

        var bottleFairy = new BottleFairyItem();
        bottleFairy.init();
        var data = {
            content:bottleFairy.abstract.content,
            type:bottleFairy.abstract.type, 
            next:bottleFairy.abstract.arg,
            target:bottleFairy.abstract.content,
            after:bottleFairy.abstract.afterAddToBackpack,
            demo:false
        };
        game.controller.addToBackpack(data, true);
        SoundManager.playOn('fairy');
        //
        PromptManager.disactive('bottle2');
        PromptManager.disactive('fairy1');
        PromptManager.active('fairy2');
    },
    mask: function(object)
    {
        game.controller.backpackRemoveByName('mask');
        game.controller.animationManager.scareCat();
        game.controller.hideBackpack();
        //
        SoundManager.playOn('cat');
        PromptManager.disactive('mask2');
        PromptManager.active('catHair1');
    },
    bottleFairy: function(object)
    {
        game.controller.backpackRemoveByName('bottleFairy');
        game.controller.backpackRemoveByName('horseshoe');

        var magicHorseshoe = new MagicHorseshoeItem();
        magicHorseshoe.init();
        var data = {
            content:magicHorseshoe.abstract.content,
            type:magicHorseshoe.abstract.type, 
            next:magicHorseshoe.abstract.arg,
            target:magicHorseshoe.abstract.content,
            after:magicHorseshoe.abstract.afterAddToBackpack,
            demo:false
        };
        game.controller.addToBackpack(data, true);
        SoundManager.playOn('magicHorseshoe');

        PromptManager.disactive('horseshoe2');
        PromptManager.disactive('fairy2');
        PromptManager.active('magicHorseshoe');
    },
    beard: function(object)
    {
        game.controller.backpackRemoveByName('beard');
        game.controller.animationManager.showBeard();
        game.controller.hideBackpack();
        MergeManager.santaClausReady = true;
        MergeManager.checkAllTasks();
        SoundManager.playOn('merge');
        PromptManager.disactive('beard');
        PromptManager.disactive('inside');
    },

    // OUTSIDE
    horseshoe: function(object)
    {
        MergeManager.bottleFairy(object);  
    },
    magicHorseshoe: function(object)
    {
        game.controller.backpackRemoveByName('magicHorseshoe');
        game.controller.animationManager.showMagicHorseshoe();
        game.controller.hideBackpack();
        MergeManager.reindeerReady = true;
        MergeManager.checkAllTasks();
        PromptManager.disactive('magicHorseshoe');
    },

    // CLOUDS
    angelHair: function(object)
    {
        game.controller.backpackRemoveByName('angelHair');
        game.controller.gameplayManager.sewCloud();
        SoundManager.playOn('cloud');
        BackgroundManager.snow = true;
        game.controller.hideBackpack();
        MergeManager.cloudReady = true;
        MergeManager.checkAllTasks();
        PromptManager.disactive('angelHair2');
        PromptManager.disactive('outside3');
        //
    },
    thunderbolt: function(object)
    {
        game.controller.backpackRemoveByName('thunderbolt');
        game.controller.gameplayManager.lightStar();
        game.controller.hideBackpack();
        MergeManager.starReady = true;
        MergeManager.checkAllTasks();
        PromptManager.disactive('thunderbolt2');
        PromptManager.disactive('outside2');
    },


    checkAllTasks: function(object)
    {
        if(MergeManager.cloudReady && MergeManager.starReady && MergeManager.santaClausReady && MergeManager.reindeerReady == true )
        {
            game.controller.gameFinish();
        }
    }

}