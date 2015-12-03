/*
SliderJS - jQuery Slider with CSS Transitions
*/
var supports = (function () {
    'use strict';
    var style   = document.createElement('div').style,
        vendors = ['', 'Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        prefix, i, l;

    return function (prop) {
        if (typeof style[prop] === 'string') {
            return true;
        }

        prop = prop.replace(/^[a-z]/, function (val) {
            return val.toUpperCase();
        });

        for (i = 0, l = vendors.length; i < l; i += 1) {
            prefix = vendors[i] + prop;
            if (typeof style[prefix] === 'string') {
                return true;
            }
        }
        return false;
    };
})();

var Slider = (function ($) {
    'use strict';
    /*global jQuery, setTimeout, clearTimeout*/
    var module = {
        npos: 0,
        timer: null,
        config: function (config) {
            module.target    = config.target;
            module.container = module.target.find('.banList');
            module.sWidth    = module.container.find('li').outerWidth(true);
            module.max       = module.container.find('li').length;
            module.tWidth    = module.sWidth * module.max;
            module.time      = config.time || 5000;
        },
        slip: function () {
            if (supports('transition')) {
                module.container.css({ left: -module.npos * module.sWidth });
            } else {
                module.container.animate({ left: -module.npos * module.sWidth }, 360);
            }
        },
        bullets: function (index) {
            clearTimeout(module.timer);
            module.auto();

            module.npos = parseInt(index, null) - 1;
            module.slip();
        },
        prev: function () {
            clearTimeout(module.timer);
            module.auto();

            module.npos -= 1;

            if (module.npos < 0) {
                module.npos = module.max - 1;
            }

            module.slip();
            module.update();
        },
        next: function () {
            clearTimeout(module.timer);
            module.auto();

            module.npos += 1;

            if (module.npos > (module.max - 1)) {
                module.npos = 0;
            }

            module.slip();
        },
       auto: function () {
            var self = this;

            self.timer = setTimeout(self.next, self.time);
        },
        init: function (config) {
            module.config(config);

            if (!module.max || module.max === 1) {
                return;
            }

            module.auto();
        }
    };

    return {
        init: module.init
    };

}(jQuery));