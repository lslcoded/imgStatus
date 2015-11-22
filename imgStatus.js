/*!
   --------------------------------
   imgStatus.js
   --------------------------------
   + https://github.com/raphamorim/imgstatus
   + version 1.0.0
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/imgstatus
*/

;(function() {
    this.loaded = 0;
    this.failed = 0;
    this.total = 0;
    this.watch = function(imgClasses, fn) {
        var images = document.querySelectorAll(imgClasses);
        if (!images.length)
            return console.log('[imgStatus]: Doesn\'t exists any images with this class!');

        this.total = images.length;
        for (var i = 0; i < images.length; i++) {
            if (images[i].addEventListener) {
                images[i].addEventListener('load', ready.bind(this, fn));
                images[i].addEventListener('error', fail.bind(this, fn));
            }
            else {
                images[i].attachEvent('onload', ready.bind(this, fn));
                images[i].attachEvent('onerror', fail.bind(this, fn));
            }
        }
    }

    this.fail = function(fn, e) {
        ++this.failed;
        if (typeof fn === "function")
            fn(this);
    }

    this.ready = function(fn, e) {
        ++this.loaded;
        if (typeof fn === "function")
            fn(this);
    };

    this.done = function() {
        return ((this.loaded + this.failed) === this.total)? true:false;
    }

    if (typeof window === "object")
        window.imgStatus = this;
}());