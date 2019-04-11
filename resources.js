(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
            	var imgCanvas = document.createElement("canvas");
            	imgCanvas.width = img.width;
            	imgCanvas.height = img.height;
            	imgCanvas.getContext("2d").drawImage(img, 0,0);
                resourceCache[url] = imgCanvas;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            img.onerror = function() {
                img = new Image();
                img.src = url;
                img.onload = function() {
	            	var imgCanvas = document.createElement("canvas");
	            	imgCanvas.width = img.width;
	            	imgCanvas.height = img.height;
	            	imgCanvas.getContext("2d").drawImage(img, 0,0);
	                resourceCache[url] = imgCanvas;

                    if(isReady()) {
                        readyCallbacks.forEach(function(func) { func(); });
                    }
                };
                img.onerror = function() {
                    console.error("Error while loading", url);
                    location.reload();
                };
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }
    function getReady() {
        var ready = 0;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) && !resourceCache[k]) {

            } else {
                ready++;
            }
        }
        return ready;
    }
    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady,
        getReady: getReady,
        resourceCache: resourceCache
    };
})();