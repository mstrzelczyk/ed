function PreloadMM(){var d=[];var n=0;var s=0;var v=0;var k=0;var c=5;var g=[];function t(A){s=Math.ceil(A.length/c);k=A.length;for(i=0;i<s;i++){d.push({items:[],isLoaded:false});for(j=0;j<c;j++){d[i].items.push({src:A[i*c+j],isLoaded:false})}}this._loadBlock(0)}function l(A){for(i in d[A].items){if(d[A].items[i].src!=undefined){this._loadFile(i,A)}}}function o(B){var A=B.split(".");return A[(A.length)-1]}function e(A){var B=A.split("/");x=B[(B.length)-1];z=x.split(".");return z[0]}function r(B,C,A){tmp=this;$.ajax({url:B,success:function(F){var D=document.getElementsByTagName("head")[0];var E=document.createElement("script");E.type="text/javascript";E.src=B;D.appendChild(E);d[A].items[C].isLoaded=true;v++;p=Math.round(v/k*100)/100;tmp.progress(p);tmp._checkBlock(A)},error:function(D){console.log("Blad: ",D)}})}function q(C,D,B){tmp=this;var A=new Image();A.src=C;$(A).load(function(){d[B].items[D].isLoaded=true;v++;p=Math.round(v/k*100)/100;tmp.progress(p);tmp._checkBlock(B)})}function y(B,C,A){tmp=this;$.ajax({url:B,success:function(D){var F=e(B);var E=document.createElement("audio");E.setAttribute("src",B);E.pause();SoundManager.add({name:F,source:E});d[A].items[C].isLoaded=true;v++;p=Math.round(v/k*100)/100;tmp.progress(p);tmp._checkBlock(A)},error:function(D){console.log("Blad: ",D)}})}function f(B,C,A){tmp=this;$.getJSON(B,function(D){TranslatorManager.loadDictionary(D);d[A].items[C].isLoaded=true;v++;p=Math.round(v/k*100)/100;tmp.progress(p);tmp._checkBlock(A)}).error(function(D){console.log("Blad: ",D)})}function a(C,B){var A=d[B].items[C].src;switch(this._getExtensionFromFileName(A)){case"png":case"jpg":case"jpeg":case"bmp":this._loadImage(A,C,B);break;case"js":this._loadJs(A,C,B);break;case"mp3":case"ogg":this._loadAudio(A,C,B);break;case"json":this._loadJSON(A,C,B);break}}function b(A){if(k==v){this.onComplete();return}for(var B in d[A].items){if(!d[A].items[B].isLoaded){return}}A++;if(A<s){d[A].isLoaded=true;this._loadBlock(A)}}function m(A){maxConnection=A}function w(){return d.length}function u(){}function h(A){}this.loadManifest=t;this.getManifestCount=w;this.setMaxConnection=m;this.progress=h;this.onComplete=u;this._loadBlock=l;this._checkBlock=b;this._getExtensionFromFileName=o;this._loadFile=a;this._loadImage=q;this._loadJs=r;this._loadAudio=y;this._loadJSON=f};