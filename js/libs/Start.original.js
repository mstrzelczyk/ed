			var game, stageGlobal;            
            var fontName ='Milonga';

            function init(){
                $("#welcomePage ul li a").click(function(){
                    lg = $(this).attr('data-lang');
                    TranslatorManager.setActiveLanguage(lg);  
                    $("#welcomePage").fadeOut(function(){
                        $("#preloader").show();
                        initGame();
                    });                  
                    return false;
                })
            }

            function getBrowserExtension(){
                if(navigator.userAgent.indexOf('Firefox') > 0)
                    return '.ogg';
                return '.mp3';
            }

            function initGame(){
                    audioExtension = getBrowserExtension();
                    manifest = [
                            "media/translate/CN.json",
                            "media/translate/ES.json",
                            "media/translate/PL.json",
                            "media/translate/ENG.json",


                            "js/ed/all.js", 
                            /*
                            "js/ed/AbstractContainersManager.js", 
                            "js/ed/AbstractCollection.js",
                            "js/ed/AbstractContainer.js",
                            "js/ed/AbstractCreature.js",
                            "js/ed/AbstractItem.js",
                            "js/ed/AbstractDoorLevel.js",
                            "js/ed/Controller.js",
                            "js/ed/Game.js",
                            "js/ed/Canvas.js",
                            
                            "js/utils/Event.js",
                            "js/utils/Utils.js",
                            "js/utils/IsMobile.js",
                                                                                    
                            "js/ed/managers/Gameplay.js",
                            "js/ed/managers/Animation.js",
                            "js/ed/managers/GUI.js",
                            "js/ed/managers/Background.js",
                            "js/ed/managers/Prompt.js",
                            "js/ed/managers/Sound.js",
                            "js/ed/managers/Merge.js",
                            
                            "js/ed/containers/Ed.js",
                            "js/ed/containers/Reindeer.js",
                            "js/ed/containers/SantaClaus.js",
                            "js/ed/containers/Clock.js",
                            "js/ed/containers/Fairy.js",
                            "js/ed/containers/Cat.js",
                            "js/ed/containers/GUI.js",
                            "js/ed/containers/Inside.js",
                            "js/ed/containers/Outside.js",
                            "js/ed/containers/Brain.js",
                            "js/ed/containers/Clouds.js",
                            "js/ed/containers/FrontLayer.js",
                            "js/ed/containers/GUI.js",

                            "js/ed/creatures/Ed.js",
                            "js/ed/creatures/Reindeer.js",
                            "js/ed/creatures/SantaClaus.js",
                            "js/ed/creatures/Fairy.js",
                            "js/ed/creatures/Cat.js",
                            
                            "js/ed/items/Cloud.js",
                            "js/ed/items/Star.js",
                            "js/ed/items/Snow.js",
                            "js/ed/items/Door.js",
                            "js/ed/items/DoorLevel.js",
                            "js/ed/items/Horseshoe.js",
                            "js/ed/items/MagicHorseshoe.js",
                            "js/ed/items/Thunderbolt.js",
                            "js/ed/items/Tube.js",
                            "js/ed/items/Gramophone.js",
                            "js/ed/items/Cake.js",
                            "js/ed/items/Knife.js",
                            "js/ed/items/CakePieces.js",
                            "js/ed/items/Honey.js",
                            "js/ed/items/Clock.js",
                            "js/ed/items/AngelHair.js",
                            "js/ed/items/Mask.js",
                            "js/ed/items/Bottle.js",
                            "js/ed/items/BottleFairy.js",
                            "js/ed/items/CatHair.js",
                            "js/ed/items/Beard.js",
                            "js/ed/items/BtnSound.js",
                            "js/ed/items/BtnPrompt.js",
                            "js/ed/items/BtnBackpack.js",
                            "js/ed/items/Popup.js",
                            
                            "js/ed/collections/Containers.js",
                            "js/ed/collections/Backpack.js",
                            "js/ed/collections/Animations.js",
                            
                            */
                            "media/spritesheets/soundIcons.png",
                            "media/spritesheets/ed.png", 
                            "media/spritesheets/santa0.png", 
                            "media/spritesheets/santa1.png", 
                            "media/spritesheets/santa2.png", 
                            "media/spritesheets/reindeer.png", 
                            "media/spritesheets/reindeerHorseshoe.png", 
                            "media/spritesheets/star.png",
                            "media/spritesheets/gramophone.png",
                            "media/spritesheets/clock.png",
                            "media/spritesheets/fairy.png",
                            "media/spritesheets/cat.png",
                            
                            "media/img/insideBg.jpg",
                            "media/img/outsideBg.jpg",
                            "media/img/brainBg.jpg",
                            "media/img/cloudsBg.jpg",
                            "media/img/outsideSnowBg.jpg",

                            "media/img/bgBackpack.png",
                            "media/img/btnBigRect.png",
                            "media/img/promptsIco.png",
                            "media/img/toolbarIco.png",
                            "media/img/btnSmallRect.png",
                            "media/img/btnMiddleRect.png",
                            "media/img/btnSmallRound.png",
                            "media/img/arrowR.png",
                            "media/img/arrowL.png",
                            "media/img/sledge.png", 
                            "media/img/stripe.png", 
                            "media/img/cloud.png", 
                            "media/img/cloudThread.png", 
                            "media/img/smallCloud.png", 
                            "media/img/nail.png", 
                            "media/img/nail2.png", 
                            "media/img/horseshoe.png", 
                            "media/img/magicHorseshoe.png", 
                            "media/img/tube.png",
                            "media/img/tubeDoor.png",
                            "media/img/cake.png",
                            "media/img/cakePieces.png",
                            "media/img/knife.png",
                            "media/img/honey.png",
                            "media/img/frontChaos.png",
                            "media/img/tableLeg.png",
                            "media/img/pendulum.png",
                            "media/img/hour.png",
                            "media/img/minute.png",
                            "media/img/angelHair.png",
                            "media/img/angelHair2.png",
                            "media/img/barrel.png",
                            "media/img/pipes.png",
                            "media/img/nerves.png",
                            "media/img/mud.png",
                            "media/img/pipe.png",
                            "media/img/brainExit1.png",
                            "media/img/brainExit3.png",
                            "media/img/brainExit4.png",
                            "media/img/brainExit0.png",
                            "media/img/brainExit1.png",
                            "media/img/mask.png",
                            "media/img/bottle.png",
                            "media/img/bottleFairy.png",
                            "media/img/thunderbolt.png",
                            "media/img/catHair.png",
                            "media/img/catHair2.png",
                            "media/img/beard.png",

                            "media/audio/gramophone" + audioExtension,
                            "media/audio/clockOpen" + audioExtension,
                            "media/audio/snore" + audioExtension,
                            "media/audio/edWood" + audioExtension,
                            "media/audio/clockPendulum" + audioExtension,
                            "media/audio/click" + audioExtension,
                            "media/audio/merge" + audioExtension,
                            "media/audio/gramophoneStop" + audioExtension,
                            "media/audio/outside" + audioExtension,
                            "media/audio/edGround" + audioExtension,
                            "media/audio/brain" + audioExtension,
                            "media/audio/edPipe" + audioExtension,
                            "media/audio/edMud" + audioExtension,
                            "media/audio/reindeer" + audioExtension,
                            "media/audio/beard" + audioExtension,
                            "media/audio/cat" + audioExtension,
                            "media/audio/fairy" + audioExtension,
                            "media/audio/cloud" + audioExtension,
                            "media/audio/clouds" + audioExtension,
                            "media/audio/edSnow" + audioExtension,
                            "media/audio/magicHorseshoe" + audioExtension,
                            "media/audio/reindeerHorseshoe" + audioExtension,
                            "media/audio/starLightUp1" + audioExtension,
                            "media/audio/starLightUp2" + audioExtension,
                            "media/audio/clockShout" + audioExtension,
                            "media/audio/clockClose" + audioExtension,
                            "media/audio/hohoho" + audioExtension
                    ];

                    preload = new PreloadMM();
                    preload.onComplete = function(){ setTimeout(handleCompleteAll, 1000); }
                    preload.progress = handleOverallProgress;
                    preload.loadManifest(manifest);
            }
            
            /**
             * Uruchomienie gry po zaladowaniu calosci
             */
            function handleCompleteAll(){

                PromptManager.init();
                game = new Game();
                game.init();

                createjs.Ticker.setFPS(30);
                createjs.Ticker.useRAF = true;
                createjs.Ticker.addListener(window);

                //Wylaczenie scrollowania na mobilnych
                document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }); 
                document.body.addEventListener('touchstart', function(e){ e.preventDefault(); }); 
            }
            
            function onGameInit()
            {    
                _gaq.push(['_trackEvent', 'game', 'gameStart', 'Poczatek gry']);
                $("#welcomePage").fadeOut();
                $("#preloader").fadeOut();
                $('canvas').css('display','block');
                $("canvas").fadeIn();
                $("#frame").fadeIn();
                $("#edboardLogo").fadeIn();
                $('#loading').fadeIn();
                $('#wraper').css('min-height','680px');
                setTimeout(function(){ game.controller.changeContainer({next:'inside'}) }, 1000);
            }

            function onGameEnd()
            {
                $("#thanksPage .left h1").html(TranslatorManager.get('thanksLeftTitle'));
                $("#thanksPage .left p").html(TranslatorManager.get('thanksLeftText'));
                $("#thanksPage .right h1").html(TranslatorManager.get('thanksRightTitle'));
                $("#thanksPage .right p").html(TranslatorManager.get('thanksRightCompetition'));
                $("canvas").fadeOut();
                $("#frame").fadeOut();
                $("#loading").hide();
                $("#canvasBg").fadeOut();
                $("#thanksPage").fadeIn();
            }
			
            /**
             * Progres ładowania
             */
            function handleOverallProgress(progress){
                $('#progress').html(Math.round(100 * progress) + "%");
                setBottleFillPercent(100*progress);
            }
            
            /**
             * Ticker gry
             */
            function tick() {
                game.tick();
            }
            
            
            function setBottleFillPercent(percent)
        	{
        		var max = 170;
        		setBottleFill(percent/100*max);
        	}
        	
        	function setBottleFill(px)
        	{
        		var startY = 90;
        		var bgStartY = -19;
        		$("#drink").css('background-position','0 '+(bgStartY-px)+'px');
        		$("#drink").css('top',(startY+px)+'px');
        	}

            
        	$(function(){
                init();                
            })