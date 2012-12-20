/**
* Klasa ma na celu zaladowanie wszystkich plikow przed odpaleniem sie gry
*/
function PreloadMM(){
	
	var manifest = [];
	var manifestCount = 0;
	var blocksCnt = 0;
	var loadedFiles = 0;
	var allElements = 0;
	var maxConnections = 5;
	var statusBlock = [];

	/**
	* Ładowanie tablicy z danymi do wczytania
	*/
	function loadManifest(data)	{
	
		blocksCnt = Math.ceil(data.length / maxConnections);		
		allElements = data.length;

		for (i=0;i<blocksCnt;i++){
			manifest.push({
				items: [],
				isLoaded: false
			});			
			for(j=0; j<maxConnections; j++){				
				manifest[i].items.push({
					'src': data[i*maxConnections+j],
					'isLoaded': false	
				});			
			}
		}

		this._loadBlock(0);		
	}

	/**
	* Ladowanie sie plikow z danego bloku
	*/
	function _loadBlock(blockNumber){
		for(i in manifest[blockNumber].items){
			if(manifest[blockNumber].items[i].src != undefined){
				this._loadFile(i,blockNumber);
			}
		}
	}

	/**
	* Zwraca rozszerzenie pliku
	*/
	function _getExtensionFromFileName(fileName)
	{
		var y = fileName.split(".");
		return y[(y.length)-1];
	}

	/**
	* Zwraca nazwe pliku
	*/
	function _getFileNameFromUrl(url)
	{
		var y = url.split("/");
		x =  y[(y.length)-1];
		z = x.split(".");
		return z[0];
	}

	/**
	* Wczytuje js
	*/
	function _loadJs(url, number, blockNumber){
		tmp = this;
		$.ajax({
			url: url,		
			success: function(data){
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = url;
				headID.appendChild(newScript);	

			  	manifest[blockNumber].items[number].isLoaded = true;				
			  	loadedFiles++;
			  	p = Math.round(loadedFiles / allElements *100) / 100;			  	
				tmp.progress(p);
			  	tmp._checkBlock(blockNumber);				
			  },
			error: function(data){
				console.log("Blad: ", data);
			}
		});
			 
	}

	/**
	* Wczytuje obrazki
	*/
	function _loadImage(url, number, blockNumber){
		tmp = this;
		var img = new Image();
		img.src = url;
		$(img).load(function(){
			manifest[blockNumber].items[number].isLoaded = true;				
			loadedFiles++;
			p = Math.round(loadedFiles / allElements *100) / 100;			  	
			tmp.progress(p);
			tmp._checkBlock(blockNumber);				
		})
	}

	/**
	* Wczytuje pliki audio
	*/
	function _loadAudio(url, number, blockNumber)
	{
		tmp = this;
		$.ajax({
			url: url,		
			success: function(data){
				var fileName = _getFileNameFromUrl(url);
				var audioElement = document.createElement('audio');
        		audioElement.setAttribute('src', url);   
        		audioElement.pause();
        		SoundManager.add({name: fileName, source: audioElement});
		
				manifest[blockNumber].items[number].isLoaded = true;				
				loadedFiles++;
				p = Math.round(loadedFiles / allElements * 100) / 100;			  	
				tmp.progress(p);
				tmp._checkBlock(blockNumber);				
			  },
			error: function(data){
				console.log("Blad: ", data);
			}
		});

	
	}

	/**
	* Wczytuje pliki json do translata
	*/
	function _loadJSON(url, number, blockNumber)
	{
		tmp = this;
		$.getJSON(url, function(data) {
			TranslatorManager.loadDictionary(data);
			manifest[blockNumber].items[number].isLoaded = true;				
			loadedFiles++;
			p = Math.round(loadedFiles / allElements *100) / 100;			  	
			tmp.progress(p);
			tmp._checkBlock(blockNumber);
		})
		.error(function(data) { 
			console.log("Blad: ", data); 
		});
	}

	/**
	* Ladowanie pojedynczego pliku na podstawie jego numeru i numeruBloku
	*/
	function _loadFile(number, blockNumber){	
		var url = manifest[blockNumber].items[number].src;

		//jaki jest typ pliku
		switch(this._getExtensionFromFileName(url)){
			case 'png': 
			case 'jpg':
			case 'jpeg':
			case 'bmp': this._loadImage(url, number, blockNumber); break;
			case 'js' : this._loadJs(url, number, blockNumber); break;
			case 'mp3':
			case 'ogg': this._loadAudio(url, number, blockNumber); break;
			case 'json': this._loadJSON(url, number, blockNumber); break;
		} 	
	}

	/**
	* Sprawdzenie czy wszystkie pliku w danym bloku zaladowaly sie poprawnie
	*/
	function _checkBlock(blockNumber){		
		if(allElements == loadedFiles){
			this.onComplete();
			return;
		}

		for(var i in manifest[blockNumber].items){
			if(!manifest[blockNumber].items[i].isLoaded){				
				return;
			}			
		}
		
		//wszystkie elementy sa zaladowane z danego bloku
		//ladowanie plikow z nastepnego bloku	
		blockNumber++;

		if(blockNumber < blocksCnt){			
			manifest[blockNumber].isLoaded = true;
			this._loadBlock(blockNumber);			
		}
	}

	/**
	* Ustawia ilosc maksymalnie ladowanych plikow
	*/
	function setMaxConnection(number){
		maxConnection = number;
	}

	/**
	* Zwraca wielkosc tablicy manifest
	*/
	function getManifestCount(){
		return manifest.length;
	}

	/**
	* Funkcja wykonuje sie w momencie kiedy wszystkie poliku sie wczytaja
	*/
	function onComplete(){
		//console.log('Ladowanie plikow zakonczone');
	}

	/**
	* Funkcja zwraca progres zaladowanych rseczy w przedziale 0 - 1
	*/
	function progress(progress){		
		//console.log('progress: ' + progress);	
	}

	this.loadManifest = loadManifest;
	this.getManifestCount = getManifestCount;
	this.setMaxConnection = setMaxConnection;
	this.progress = progress;
	this.onComplete = onComplete;
	
	this._loadBlock = _loadBlock;
	this._checkBlock = _checkBlock;
	this._getExtensionFromFileName = _getExtensionFromFileName;
	this._loadFile = _loadFile;
	this._loadImage = _loadImage;
	this._loadJs = _loadJs;
	this._loadAudio = _loadAudio;
	this._loadJSON = _loadJSON;

}
