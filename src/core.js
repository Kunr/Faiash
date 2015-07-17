/**
 * Faiash Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

// Define the Faiash
var Faiash = function(selector, context) {
    return new Faiash.ise.init(selector, context);
};

Faiash.ise = Faiash.prototype = {
    // Version of Faiash
    version: 0.1,
    constructor: Faiash,

    toArr: function(r) {
        return Array.prototype.slice.apply(r);
    },

    // Behaves like array
    push: [].push,
	sort: [].sort,
	splice: [].splice
};

var init = Faiash.ise.init = function(selector, context) {
    // Return self when selector is "", void, undefined, false
    if (!selector) {
        return this;
    }

    // When selector is an objcet
    if (typeof selector === 'object') {
        return selector;
    }

    // When context is string
    if (typeof context === 'string') {
        context = document.querySelector(context);
    }

    selector = (context || document).querySelectorAll(selector);

    for (i = 0; i < +selector.length; i++) {
        this[i] = selector[i];
    }

    this.length = i;
    return this;
}

init.prototype = Faiash.ise;

Faiash.extend = Faiash.ise.extend = function() {
    var copy;

    // No arguments
    if (arguments.length < 1) {
        return;
    }

    // There are an array outside the object
    for (var i = 0; i < arguments.length; i++) {
        for (var name in arguments[i]) {
            copy = arguments[i][name];

            // Prevent never-ending loop
            if (this === copy) {
                continue;
            }

            // Don't bring in undefined values
            if (copy !== undefined) {
                this[name] = copy;
            }
        }
    }

    return this;
}

Faiash.extend({
    each: function(arr, func) {
        var forEach = Function.prototype.call.bind(Array.prototype.forEach);
        return forEach(arr, func);
    }
});

Faiash.ise.extend({
    each: function(func) {
        return Faiash.each(this, func);
    }
});
