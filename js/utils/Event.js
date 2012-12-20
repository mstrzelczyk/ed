/*
Event object based on managing events in JavaScript by Krasimir Tsonev (http://krasimirtsonev.com)
*/
function Event()
{
	this.listeners = {};
	
	var data = {};
	
	function addEventListener(type, callback, scope) {
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		}		
		args = args.length > 3 ? args.splice(3, args.length-1) : [];
		if(typeof this.listeners[type] != "undefined") {
			this.listeners[type].push({scope:scope, callback:callback, args:args});
		} else {
			this.listeners[type] = [{scope:scope, callback:callback, args:args}];
		}
	}
	function removeEventListener(type, callback, scope) {
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			var newArray = [];
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {

				} else {
					newArray.push(listener);
				}
			}
			this.listeners[type] = newArray;
		}
	}
	
	function dispatch(type, target, data) {
		var numOfListeners = 0;
		var event = {
			type:type,
			target:target,
			data:data
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		};
		
		
		args = args.length > 2 ? args.splice(2, args.length-1) : [];
		args = [event].concat(args);
		
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if(listener && listener.callback) {
					listener.args = args.concat(listener.args);
					listener.callback.apply(listener.scope, listener.args);
					numOfListeners += 1;
				}
			}
		}
	}
	
	function getEvents() {
		var str = "";
		for(var type in this.listeners) {
			var numOfCallbacks = this.listeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
				str += " listen for '" + type + "'\n";
			}
		}
		return str;
	}
	
	this.data = data;
	this.addEventListener = addEventListener;
	this.removeEventListener = removeEventListener;
	this.dispatch = dispatch;
	this.getEvents = getEvents;
}