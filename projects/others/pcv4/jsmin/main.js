/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.



var JSON2;
if (!JSON2) {
    JSON2 = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON2.stringify !== 'function') {
        JSON2.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON2.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON2.parse !== 'function') {
        JSON2.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON2.parse');
        };
    }
}());

/*!
 * jQuery blockUI plugin
 * Version 2.66.0-2013.10.09
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

; (function () {
    /*jshint eqeqeq:false curly:false latedef:false */
    "use strict";

    function setup($) {
        $.fn._fadeIn = $.fn.fadeIn;

        var noOp = $.noop || function () { };

        // this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
        // confusing userAgent strings on Vista)
        var msie = /MSIE/.test(navigator.userAgent);
        var ie6 = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
        var mode = document.documentMode || 0;
        var setExpr = $.isFunction(document.createElement('div').style.setExpression);

        // global $ methods for blocking/unblocking the entire page
        $.blockUI = function (opts) { install(window, opts); };
        $.unblockUI = function (opts) { remove(window, opts); };

        // convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
        $.growlUI = function (title, message, timeout, onClose) {
            var $m = $('<div class="growlUI"></div>');
            if (title) $m.append('<h1>' + title + '</h1>');
            if (message) $m.append('<h2>' + message + '</h2>');
            if (timeout === undefined) timeout = 3000;

            // Added by konapun: Set timeout to 30 seconds if this growl is moused over, like normal toast notifications
            var callBlock = function (opts) {
                opts = opts || {};

                $.blockUI({
                    message: $m,
                    fadeIn: typeof opts.fadeIn !== 'undefined' ? opts.fadeIn : 700,
                    fadeOut: typeof opts.fadeOut !== 'undefined' ? opts.fadeOut : 1000,
                    timeout: typeof opts.timeout !== 'undefined' ? opts.timeout : timeout,
                    centerY: false,
                    showOverlay: false,
                    onUnblock: onClose,
                    css: $.blockUI.defaults.growlCSS
                });
            };

            callBlock();
            var nonmousedOpacity = $m.css('opacity');
            $m.mouseover(function () {
                callBlock({
                    fadeIn: 0,
                    timeout: 30000
                });

                var displayBlock = $('.blockMsg');
                displayBlock.stop(); // cancel fadeout if it has started
                displayBlock.fadeTo(300, 1); // make it easier to read the message by removing transparency
            }).mouseout(function () {
                $('.blockMsg').fadeOut(1000);
            });
            // End konapun additions
        };

        // plugin method for blocking element content
        $.fn.block = function (opts) {
            if (this[0] === window) {
                $.blockUI(opts);
                return this;
            }
            var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
            this.each(function () {
                var $el = $(this);
                if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
                    return;
                $el.unblock({ fadeOut: 0 });
            });

            return this.each(function () {
                if ($.css(this, 'position') == 'static') {
                    this.style.position = 'relative';
                    $(this).data('blockUI.static', true);
                }
                this.style.zoom = 1; // force 'hasLayout' in ie
                install(this, opts);
            });
        };

        // plugin method for unblocking element content
        $.fn.unblock = function (opts) {
            if (this[0] === window) {
                $.unblockUI(opts);
                return this;
            }
            return this.each(function () {
                remove(this, opts);
            });
        };

        $.blockUI.version = 2.66; // 2nd generation blocking at no extra cost!

        // override these in your code to change the default behavior and style
        $.blockUI.defaults = {
            // message displayed when blocking (use null for no message)
            message: '<h1>Please wait...</h1>',

            title: null,		// title string; only used when theme == true
            draggable: true,	// only used when theme == true (requires jquery-ui.js to be loaded)

            theme: false, // set to true to use with jQuery UI themes

            // styles for the message when blocking; if you wish to disable
            // these and use an external stylesheet then do this in your code:
            // $.blockUI.defaults.css = {};
            css: {
                padding: 0,
                margin: 0,
                width: '30%',
                top: '40%',
                left: '35%',
                textAlign: 'center',
                color: '#000',
                border: '3px solid #aaa',
                backgroundColor: '#fff',
                cursor: 'wait'
            },

            // minimal style set used when themes are used
            themedCSS: {
                width: '30%',
                top: '40%',
                left: '35%'
            },

            // styles for the overlay
            overlayCSS: {
                backgroundColor: '#000',
                opacity: 0.6,
                cursor: 'wait'
            },

            // style to replace wait cursor before unblocking to correct issue
            // of lingering wait cursor
            cursorReset: 'default',

            // styles applied when using $.growlUI
            growlCSS: {
                width: '350px',
                top: '10px',
                left: '',
                right: '10px',
                border: 'none',
                padding: '5px',
                opacity: 0.6,
                cursor: 'default',
                color: '#fff',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                'border-radius': '10px'
            },

            // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
            // (hat tip to Jorge H. N. de Vasconcelos)
            /*jshint scripturl:true */
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

            // force usage of iframe in non-IE browsers (handy for blocking applets)
            forceIframe: false,

            // z-index for the blocking overlay
            baseZ: 2010001,

            // set these to true to have the message automatically centered
            centerX: true, // <-- only effects element blocking (page block controlled via css above)
            centerY: true,

            // allow body element to be stetched in ie6; this makes blocking look better
            // on "short" pages.  disable if you wish to prevent changes to the body height
            allowBodyStretch: true,

            // enable if you want key and mouse events to be disabled for content that is blocked
            bindEvents: true,

            // be default blockUI will supress tab navigation from leaving blocking content
            // (if bindEvents is true)
            constrainTabKey: true,

            // fadeIn time in millis; set to 0 to disable fadeIn on block
            fadeIn: 200,

            // fadeOut time in millis; set to 0 to disable fadeOut on unblock
            fadeOut: 400,

            // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
            timeout: 0,

            // disable if you don't want to show the overlay
            showOverlay: true,

            // if true, focus will be placed in the first available input field when
            // page blocking
            focusInput: true,

            // elements that can receive focus
            focusableElements: ':input:enabled:visible',

            // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
            // no longer needed in 2012
            // applyPlatformOpacityRules: true,

            // callback method invoked when fadeIn has completed and blocking message is visible
            onBlock: null,

            // callback method invoked when unblocking has completed; the callback is
            // passed the element that has been unblocked (which is the window object for page
            // blocks) and the options that were passed to the unblock call:
            //	onUnblock(element, options)
            onUnblock: null,

            // callback method invoked when the overlay area is clicked.
            // setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
            onOverlayClick: null,

            // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
            quirksmodeOffsetHack: 4,

            // class name of the message block
            blockMsgClass: 'blockMsg',

            // if it is already blocked, then ignore it (don't unblock and reblock)
            ignoreIfBlocked: false
        };

        // private data and functions follow...

        var pageBlock = null;
        var pageBlockEls = [];

        function install(el, opts) {
            var css, themedCSS;
            var full = (el == window);
            var msg = (opts && opts.message !== undefined ? opts.message : undefined);
            opts = $.extend({}, $.blockUI.defaults, opts || {});

            if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
                return;

            opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
            css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
            if (opts.onOverlayClick)
                opts.overlayCSS.cursor = 'pointer';

            themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
            msg = msg === undefined ? opts.message : msg;

            // remove the current block (if there is one)
            if (full && pageBlock)
                remove(window, { fadeOut: 0 });

            // if an existing element is being used as the blocking content then we capture
            // its current place in the DOM (and current display style) so we can restore
            // it when we unblock
            if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
                var node = msg.jquery ? msg[0] : msg;
                var data = {};
                $(el).data('blockUI.history', data);
                data.el = node;
                data.parent = node.parentNode;
                data.display = node.style.display;
                data.position = node.style.position;
                if (data.parent)
                    data.parent.removeChild(node);
            }

            $(el).data('blockUI.onUnblock', opts.onUnblock);
            var z = opts.baseZ;

            // blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
            // layer1 is the iframe layer which is used to supress bleed through of underlying content
            // layer2 is the overlay layer which has opacity and a wait cursor (by default)
            // layer3 is the message content that is displayed while blocking
            var lyr1, lyr2, lyr3, s;
            if (msie || opts.forceIframe)
                lyr1 = $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>');
            else
                lyr1 = $('<div class="blockUI" style="display:none"></div>');

            if (opts.theme)
                lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>');
            else
                lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

            if (opts.theme && full) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
                if (opts.title) {
                    s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
                }
                s += '<div class="ui-widget-content ui-dialog-content"></div>';
                s += '</div>';
            }
            else if (opts.theme) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
                if (opts.title) {
                    s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
                }
                s += '<div class="ui-widget-content ui-dialog-content"></div>';
                s += '</div>';
            }
            else if (full) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
            }
            else {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
            }
            lyr3 = $(s);

            // if we have a message, style it
            if (msg) {
                if (opts.theme) {
                    lyr3.css(themedCSS);
                    lyr3.addClass('ui-widget-content');
                }
                else
                    lyr3.css(css);
            }

            // style the overlay
            if (!opts.theme /*&& (!opts.applyPlatformOpacityRules)*/)
                lyr2.css(opts.overlayCSS);
            lyr2.css('position', full ? 'fixed' : 'absolute');

            // make iframe layer transparent in IE
            if (msie || opts.forceIframe)
                lyr1.css('opacity', 0.0);

            //$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
            var layers = [lyr1, lyr2, lyr3], $par = full ? $('body') : $(el);
            $.each(layers, function () {
                this.appendTo($par);
            });

            if (opts.theme && opts.draggable && $.fn.draggable) {
                lyr3.draggable({
                    handle: '.ui-dialog-titlebar',
                    cancel: 'li'
                });
            }

            // ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
            var expr = setExpr && (!$.support.boxModel || $('object,embed', full ? null : el).length > 0);
            if (ie6 || expr) {
                // give body 100% height
                if (full && opts.allowBodyStretch && $.support.boxModel)
                    $('html,body').css('height', '100%');

                // fix ie6 issue when blocked element has a border width
                if ((ie6 || !$.support.boxModel) && !full) {
                    var t = sz(el, 'borderTopWidth'), l = sz(el, 'borderLeftWidth');
                    var fixT = t ? '(0 - ' + t + ')' : 0;
                    var fixL = l ? '(0 - ' + l + ')' : 0;
                }

                // simulate fixed position
                $.each(layers, function (i, o) {
                    var s = o[0].style;
                    s.position = 'absolute';
                    if (i < 2) {
                        if (full)
                            s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"');
                        else
                            s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
                        if (full)
                            s.setExpression('width', 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
                        else
                            s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
                        if (fixL) s.setExpression('left', fixL);
                        if (fixT) s.setExpression('top', fixT);
                    }
                    else if (opts.centerY) {
                        if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                        s.marginTop = 0;
                    }
                    else if (!opts.centerY && full) {
                        var top = (opts.css && opts.css.top) ? parseInt(opts.css.top, 10) : 0;
                        var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
                        s.setExpression('top', expression);
                    }
                });
            }

            // show the message
            if (msg) {
                if (opts.theme)
                    lyr3.find('.ui-widget-content').append(msg);
                else
                    lyr3.append(msg);
                if (msg.jquery || msg.nodeType)
                    $(msg).show();
            }

            if ((msie || opts.forceIframe) && opts.showOverlay)
                lyr1.show(); // opacity is zero
            if (opts.fadeIn) {
                var cb = opts.onBlock ? opts.onBlock : noOp;
                var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
                var cb2 = msg ? cb : noOp;
                if (opts.showOverlay)
                    lyr2._fadeIn(opts.fadeIn, cb1);
                if (msg)
                    lyr3._fadeIn(opts.fadeIn, cb2);
            }
            else {
                if (opts.showOverlay)
                    lyr2.show();
                if (msg)
                    lyr3.show();
                if (opts.onBlock)
                    opts.onBlock();
            }

            // bind key and mouse events
            bind(1, el, opts);

            if (full) {
                pageBlock = lyr3[0];
                pageBlockEls = $(opts.focusableElements, pageBlock);
                if (opts.focusInput)
                    setTimeout(focus, 20);
            }
            else
                center(lyr3[0], opts.centerX, opts.centerY);

            if (opts.timeout) {
                // auto-unblock
                var to = setTimeout(function () {
                    if (full)
                        $.unblockUI(opts);
                    else
                        $(el).unblock(opts);
                }, opts.timeout);
                $(el).data('blockUI.timeout', to);
            }
        }

        // remove the block
        function remove(el, opts) {
            var count;
            var full = (el == window);
            var $el = $(el);
            var data = $el.data('blockUI.history');
            var to = $el.data('blockUI.timeout');
            if (to) {
                clearTimeout(to);
                $el.removeData('blockUI.timeout');
            }
            opts = $.extend({}, $.blockUI.defaults, opts || {});
            bind(0, el, opts); // unbind events

            if (opts.onUnblock === null) {
                opts.onUnblock = $el.data('blockUI.onUnblock');
                $el.removeData('blockUI.onUnblock');
            }

            var els;
            if (full) // crazy selector to handle odd field errors in ie6/7
                els = $('body').children().filter('.blockUI').add('body > .blockUI');
            else
                els = $el.find('>.blockUI');

            // fix cursor issue
            if (opts.cursorReset) {
                if (els.length > 1)
                    els[1].style.cursor = opts.cursorReset;
                if (els.length > 2)
                    els[2].style.cursor = opts.cursorReset;
            }

            if (full)
                pageBlock = pageBlockEls = null;

            if (opts.fadeOut) {
                count = els.length;
                els.stop().fadeOut(opts.fadeOut, function () {
                    if (--count === 0)
                        reset(els, data, opts, el);
                });
            }
            else
                reset(els, data, opts, el);
        }

        // move blocking element back into the DOM where it started
        function reset(els, data, opts, el) {
            var $el = $(el);
            if ($el.data('blockUI.isBlocked'))
                return;

            els.each(function (i, o) {
                // remove via DOM calls so we don't lose event handlers
                if (this.parentNode)
                    this.parentNode.removeChild(this);
            });

            if (data && data.el) {
                data.el.style.display = data.display;
                data.el.style.position = data.position;
                if (data.parent)
                    data.parent.appendChild(data.el);
                $el.removeData('blockUI.history');
            }

            if ($el.data('blockUI.static')) {
                $el.css('position', 'static'); // #22
            }

            if (typeof opts.onUnblock == 'function')
                opts.onUnblock(el, opts);

            // fix issue in Safari 6 where block artifacts remain until reflow
            var body = $(document.body), w = body.width(), cssW = body[0].style.width;
            body.width(w - 1).width(w);
            body[0].style.width = cssW;
        }

        // bind/unbind the handler
        function bind(b, el, opts) {
            var full = el == window, $el = $(el);

            // don't bother unbinding if there is nothing to unbind
            if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
                return;

            $el.data('blockUI.isBlocked', b);

            // don't bind events when overlay is not in use or if bindEvents is false
            if (!full || !opts.bindEvents || (b && !opts.showOverlay))
                return;

            // bind anchors and inputs for mouse and key events
            var events = 'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
            if (b)
                $(document).bind(events, opts, handler);
            else
                $(document).unbind(events, handler);

            // former impl...
            //		var $e = $('a,:input');
            //		b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
        }

        // event handler to suppress keyboard/mouse events when blocking
        function handler(e) {
            // allow tab navigation (conditionally)
            if (e.type === 'keydown' && e.keyCode && e.keyCode == 9) {
                if (pageBlock && e.data.constrainTabKey) {
                    var els = pageBlockEls;
                    var fwd = !e.shiftKey && e.target === els[els.length - 1];
                    var back = e.shiftKey && e.target === els[0];
                    if (fwd || back) {
                        setTimeout(function () { focus(back); }, 10);
                        return false;
                    }
                }
            }
            var opts = e.data;
            var target = $(e.target);
            if ((target.hasClass('blockOverlay') && opts.onOverlayClick) || (target.hasClass('bgiframeDiv') && target.parent().hasClass('blockOverlay') && opts.onOverlayClick))
                opts.onOverlayClick(e);

            // allow events within the message content
            if (target.parents('div.' + opts.blockMsgClass).length > 0)
                return true;

            // allow events for content that is not being blocked
            return target.parents().children().filter('div.blockUI').length === 0;
        }

        function focus(back) {
            if (!pageBlockEls)
                return;
            var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
            if (e)
                e.focus();
        }

        function center(el, x, y) {
            var p = el.parentNode, s = el.style;
            var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, 'borderLeftWidth');
            var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, 'borderTopWidth');
            if (x) s.left = l > 0 ? (l + 'px') : '0';
            if (y) s.top = t > 0 ? (t + 'px') : '0';
        }

        function sz(el, p) {
            return parseInt($.css(el, p), 10) || 0;
        }

    }


    /*global define:true */
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        define(['jquery'], setup);
    } else {
        setup(jQuery);
    }

})();
/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.purl = factory();
    }
})(function () {

    var tag2attr = {
        a: 'href',
        img: 'src',
        form: 'action',
        base: 'href',
        script: 'src',
        iframe: 'src',
        link: 'href',
        embed: 'src',
        object: 'data'
    },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor': 'fragment' }, // aliases for backwards compatability

        parser = {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri(url, strictMode) {
        var str = decodeURI(url),
        res = parser[strictMode || false ? 'strict' : 'loose'].exec(str),
        uri = { attr: {}, param: {}, seg: {} },
        i = 14;

        while (i--) {
            uri.attr[key[i]] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g, '').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g, '').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ? uri.attr.protocol + '://' + uri.attr.host : uri.attr.host) + (uri.attr.port ? ':' + uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName(elm) {
        var tn = elm.tagName;
        if (typeof tn !== 'undefined') return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function (ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch (e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
            brace,
            c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator) {
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var key_array = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) key_array.push(prop);
        }
        return key_array;
    }

    function purl(url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data: parseUri(url, strictMode),

            // get various attributes from the URI
            attr: function (attr) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param: function (param) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam: function (param) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment: function (seg) {
                if (typeof seg === 'undefined') {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment: function (seg) {
                if (typeof seg === 'undefined') {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }

    purl.jQuery = function ($) {
        if ($ != null) {
            $.fn.url = function (strictMode) {
                var url = '';
                if (this.length) {
                    url = $(this).attr(getAttrName(this[0])) || '';
                }
                return purl(url, strictMode);
            };

            $.url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.1
 *
 * Requires jQuery >= 1.2.6
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.bgiframe = function (s) {
        s = $.extend({
            top: 'auto', // auto == borderTopWidth
            left: 'auto', // auto == borderLeftWidth
            width: 'auto', // auto == offsetWidth
            height: 'auto', // auto == offsetHeight
            opacity: true,
            src: 'javascript:false;',
            conditional: true // expression or function. return false to prevent iframe insertion
        }, s);

        // wrap conditional in a function if it isn't already
        if (!$.isFunction(s.conditional)) {
            var condition = s.conditional;
            s.conditional = function () { return condition; };
        }

        var $iframe = $('<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + s.src + '"' +
                           'style="display:block;position:absolute;z-index:-1;"/>');

        var $iframeDiv = $('<div class="bgiframeDiv" style="display:block;position:absolute;z-index:-1;"/>');

        return this.each(function () {
            var $this = $(this);
            if (s.conditional(this) === false) { return; }
            var existing = $this.children('iframe.bgiframe');
            var existingDiv = $this.children('div.bgiframeDiv');

            var $el = existing.length === 0 ? $iframe.clone() : existing;

            var $elDiv = existingDiv.length === 0 ? $iframeDiv.clone() : existingDiv;

            $el.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'), 10) || 0) * -1) + 'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'), 10) || 0) * -1) + 'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined,
                'z-index': parseInt($this.css("z-index")) -1
            });

            $elDiv.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'), 10) || 0) * -1) + 'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'), 10) || 0) * -1) + 'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined,
                'z-index': parseInt($this.css("z-index"))
            });

            if (existing.length === 0) {
                $this.prepend($el);
                
            }
            if (existingDiv.length === 0) {
                $this.prepend($elDiv);
            }

            
        });
    };

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

}));
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") {
var DD_belatedPNG = {
	ns: 'DD_belatedPNG',
	imgSize: {},
	delay: 10,
	nodesFixed: 0,
	createVmlNameSpace: function () { /* enable VML */
		if (document.namespaces && !document.namespaces[this.ns]) {
			document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
		}
	},
	createVmlStyleSheet: function () { /* style VML, enable behaviors */
		/*
			Just in case lots of other developers have added
			lots of other stylesheets using document.createStyleSheet
			and hit the 31-limit mark, let's not use that method!
			further reading: http://msdn.microsoft.com/en-us/library/ms531194(VS.85).aspx
		*/
		var screenStyleSheet, printStyleSheet;
		screenStyleSheet = document.createElement('style');
		screenStyleSheet.setAttribute('media', 'screen');
		document.documentElement.firstChild.insertBefore(screenStyleSheet, document.documentElement.firstChild.firstChild);
		if (screenStyleSheet.styleSheet) {
			screenStyleSheet = screenStyleSheet.styleSheet;
			
			screenStyleSheet.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
		
			screenStyleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
			screenStyleSheet.addRule('img.' + this.ns + '_sizeFinder', 'behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;'); /* large negative top value for avoiding vertical scrollbars for large images, suggested by James O'Brien, http://www.thanatopsic.org/hendrik/ */
			this.screenStyleSheet = screenStyleSheet;
			
			/* Add a print-media stylesheet, for preventing VML artifacts from showing up in print (including preview). */
			/* Thanks to R��i Pr��ost for automating this! */
			printStyleSheet = document.createElement('style');
			printStyleSheet.setAttribute('media', 'print');
			document.documentElement.firstChild.insertBefore(printStyleSheet, document.documentElement.firstChild.firstChild);
			printStyleSheet = printStyleSheet.styleSheet;

			printStyleSheet.addRule(this.ns + '\\:*', '{display: none !important;}');

			printStyleSheet.addRule('img.' + this.ns + '_sizeFinder', '{display: none !important;}');
		}
	},
	readPropertyChange: function () {
		var el, display, v;
		el = event.srcElement;
		if (!el.vmlInitiated) {
			return;
		}
		if (event.propertyName.search('background') != -1 || event.propertyName.search('border') != -1) {
			DD_belatedPNG.applyVML(el);
		}
		if (event.propertyName == 'style.display') {
			display = (el.currentStyle.display == 'none') ? 'none' : 'block';
			for (v in el.vml) {
				if (el.vml.hasOwnProperty(v)) {
					el.vml[v].shape.style.display = display;
				}
			}
		}
		if (event.propertyName.search('filter') != -1) {
			DD_belatedPNG.vmlOpacity(el);
		}
	},
	vmlOpacity: function (el) {
		if (el.currentStyle.filter.search('lpha') != -1) {
			var trans = el.currentStyle.filter;
			trans = parseInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastIndexOf(')')), 10)/100;
			el.vml.color.shape.style.filter = el.currentStyle.filter; /* complete guesswork */
			el.vml.image.fill.opacity = trans; /* complete guesswork */
		}
	},
	handlePseudoHover: function (el) {
		setTimeout(function () { /* wouldn't work as intended without setTimeout */
			DD_belatedPNG.applyVML(el);
		}, 1);
	},
	/**
	* This is the method to use in a document.
	* @param {String} selector - REQUIRED - a CSS selector, such as '#doc .container'
	**/
	fix: function (selector) {
		if (this.screenStyleSheet) {
			var selectors, i;
			selectors = selector.split(','); /* multiple selectors supported, no need for multiple calls to this anymore */
			for (i=0; i<selectors.length; i++) {
				this.screenStyleSheet.addRule(selectors[i], 'behavior:expression(DD_belatedPNG.fixPng(this))'); /* seems to execute the function without adding it to the stylesheet - interesting... */
			}
		}
	},
	applyVML: function (el) {
		el.runtimeStyle.cssText = '';
		this.vmlFill(el);
		this.vmlOffsets(el);
		this.vmlOpacity(el);
		if (el.isImg) {
			this.copyImageBorders(el);
		}
	},
	attachHandlers: function (el) {
		var self, handlers, handler, moreForAs, a, h;
		self = this;
		handlers = {resize: 'vmlOffsets', move: 'vmlOffsets'};
		if (el.nodeName == 'A') {
			moreForAs = {mouseleave: 'handlePseudoHover', mouseenter: 'handlePseudoHover', focus: 'handlePseudoHover', blur: 'handlePseudoHover'};
			for (a in moreForAs) {			
				if (moreForAs.hasOwnProperty(a)) {
					handlers[a] = moreForAs[a];
				}
			}
		}
		for (h in handlers) {
			if (handlers.hasOwnProperty(h)) {
				handler = function () {
					self[handlers[h]](el);
				};
				el.attachEvent('on' + h, handler);
			}
		}
		el.attachEvent('onpropertychange', this.readPropertyChange);
	},
	giveLayout: function (el) {
		el.style.zoom = 1;
		if (el.currentStyle.position == 'static') {
			el.style.position = 'relative';
		}
	},
	copyImageBorders: function (el) {
		var styles, s;
		styles = {'borderStyle':true, 'borderWidth':true, 'borderColor':true};
		for (s in styles) {
			if (styles.hasOwnProperty(s)) {
				el.vml.color.shape.style[s] = el.currentStyle[s];
			}
		}
	},
	vmlFill: function (el) {
		if (!el.currentStyle) {
			return;
		} else {
			var elStyle, noImg, lib, v, img, imgLoaded;
			elStyle = el.currentStyle;
		}
		for (v in el.vml) {
			if (el.vml.hasOwnProperty(v)) {
				el.vml[v].shape.style.zIndex = elStyle.zIndex;
			}
		}
		el.runtimeStyle.backgroundColor = '';
		el.runtimeStyle.backgroundImage = '';
		noImg = true;
		if (elStyle.backgroundImage != 'none' || el.isImg) {
			if (!el.isImg) {
				el.vmlBg = elStyle.backgroundImage;
				el.vmlBg = el.vmlBg.substr(5, el.vmlBg.lastIndexOf('")')-5);
			}
			else {
				el.vmlBg = el.src;
			}
			lib = this;
			if (!lib.imgSize[el.vmlBg]) { /* determine size of loaded image */
				img = document.createElement('img');
				lib.imgSize[el.vmlBg] = img;
				img.className = lib.ns + '_sizeFinder';
				img.runtimeStyle.cssText = 'behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;'; /* make sure to set behavior to none to prevent accidental matching of the helper elements! */
				imgLoaded = function () {
					this.width = this.offsetWidth; /* weird cache-busting requirement! */
					this.height = this.offsetHeight;
					lib.vmlOffsets(el);
				};
				img.attachEvent('onload', imgLoaded);
				img.src = el.vmlBg;
				img.removeAttribute('width');
				img.removeAttribute('height');
				document.body.insertBefore(img, document.body.firstChild);
			}
			el.vml.image.fill.src = el.vmlBg;
			noImg = false;
		}
		el.vml.image.fill.on = !noImg;
		el.vml.image.fill.color = 'none';
		el.vml.color.shape.style.backgroundColor = elStyle.backgroundColor;
		el.runtimeStyle.backgroundImage = 'none';
		el.runtimeStyle.backgroundColor = 'transparent';
	},
	/* IE can't figure out what do when the offsetLeft and the clientLeft add up to 1, and the VML ends up getting fuzzy... so we have to push/enlarge things by 1 pixel and then clip off the excess */
	vmlOffsets: function (el) {
		var thisStyle, size, fudge, makeVisible, bg, bgR, dC, altC, b, c, v;
		thisStyle = el.currentStyle;
		size = {'W':el.clientWidth+1, 'H':el.clientHeight+1, 'w':this.imgSize[el.vmlBg].width, 'h':this.imgSize[el.vmlBg].height, 'L':el.offsetLeft, 'T':el.offsetTop, 'bLW':el.clientLeft, 'bTW':el.clientTop};
		fudge = (size.L + size.bLW == 1) ? 1 : 0;
		/* vml shape, left, top, width, height, origin */
		makeVisible = function (vml, l, t, w, h, o) {
			vml.coordsize = w+','+h;
			vml.coordorigin = o+','+o;
			vml.path = 'm0,0l'+w+',0l'+w+','+h+'l0,'+h+' xe';
			vml.style.width = w + 'px';
			vml.style.height = h + 'px';
			vml.style.left = l + 'px';
			vml.style.top = t + 'px';
		};
		makeVisible(el.vml.color.shape, (size.L + (el.isImg ? 0 : size.bLW)), (size.T + (el.isImg ? 0 : size.bTW)), (size.W-1), (size.H-1), 0);
		makeVisible(el.vml.image.shape, (size.L + size.bLW), (size.T + size.bTW), (size.W), (size.H), 1 );
		bg = {'X':0, 'Y':0};
		if (el.isImg) {
			bg.X = parseInt(thisStyle.paddingLeft, 10) + 1;
			bg.Y = parseInt(thisStyle.paddingTop, 10) + 1;
		}
		else {
			for (b in bg) {
				if (bg.hasOwnProperty(b)) {
					this.figurePercentage(bg, size, b, thisStyle['backgroundPosition'+b]);
				}
			}
		}
		el.vml.image.fill.position = (bg.X/size.W) + ',' + (bg.Y/size.H);
		bgR = thisStyle.backgroundRepeat;
		dC = {'T':1, 'R':size.W+fudge, 'B':size.H, 'L':1+fudge}; /* these are defaults for repeat of any kind */
		altC = { 'X': {'b1': 'L', 'b2': 'R', 'd': 'W'}, 'Y': {'b1': 'T', 'b2': 'B', 'd': 'H'} };
		if (bgR != 'repeat' || el.isImg) {
			c = {'T':(bg.Y), 'R':(bg.X+size.w), 'B':(bg.Y+size.h), 'L':(bg.X)}; /* these are defaults for no-repeat - clips down to the image location */
			if (bgR.search('repeat-') != -1) { /* now let's revert to dC for repeat-x or repeat-y */
				v = bgR.split('repeat-')[1].toUpperCase();
				c[altC[v].b1] = 1;
				c[altC[v].b2] = size[altC[v].d];
			}
			if (c.B > size.H) {
				c.B = size.H;
			}
			el.vml.image.shape.style.clip = 'rect('+c.T+'px '+(c.R+fudge)+'px '+c.B+'px '+(c.L+fudge)+'px)';
		}
		else {
			el.vml.image.shape.style.clip = 'rect('+dC.T+'px '+dC.R+'px '+dC.B+'px '+dC.L+'px)';
		}
	},
	figurePercentage: function (bg, size, axis, position) {
		var horizontal, fraction;
		fraction = true;
		horizontal = (axis == 'X');
		switch(position) {
			case 'left':
			case 'top':
				bg[axis] = 0;
				break;
			case 'center':
				bg[axis] = 0.5;
				break;
			case 'right':
			case 'bottom':
				bg[axis] = 1;
				break;
			default:
				if (position.search('%') != -1) {
					bg[axis] = parseInt(position, 10) / 100;
				}
				else {
					fraction = false;
				}
		}
		bg[axis] = Math.ceil(  fraction ? ( (size[horizontal?'W': 'H'] * bg[axis]) - (size[horizontal?'w': 'h'] * bg[axis]) ) : parseInt(position, 10)  );
		if (bg[axis] % 2 === 0) {
			bg[axis]++;
		}
		return bg[axis];
	},
	fixPng: function (el) {
		el.style.behavior = 'none';
		var lib, els, nodeStr, v, e;
		if (el.nodeName == 'BODY' || el.nodeName == 'TD' || el.nodeName == 'TR') { /* elements not supported yet */
			return;
		}
		el.isImg = false;
		if (el.nodeName == 'IMG') {
			if(el.src.toLowerCase().search(/\.png$/) != -1) {
				el.isImg = true;
				el.style.visibility = 'hidden';
			}
			else {
				return;
			}
		}
		else if (el.currentStyle.backgroundImage.toLowerCase().search('.png') == -1) {
			return;
		}
		lib = DD_belatedPNG;
		el.vml = {color: {}, image: {}};
		els = {shape: {}, fill: {}};
		for (v in el.vml) {
			if (el.vml.hasOwnProperty(v)) {
				for (e in els) {
					if (els.hasOwnProperty(e)) {
						nodeStr = lib.ns + ':' + e;
						el.vml[v][e] = document.createElement(nodeStr);
					}
				}
				el.vml[v].shape.stroked = false;
				el.vml[v].shape.appendChild(el.vml[v].fill);
				el.parentNode.insertBefore(el.vml[v].shape, el);
			}
		}
		el.vml.image.shape.fillcolor = 'none'; /* Don't show blank white shapeangle when waiting for image to load. */
		el.vml.image.fill.type = 'tile'; /* Makes image show up. */
		el.vml.color.fill.on = false; /* Actually going to apply vml element's style.backgroundColor, so hide the whiteness. */
		lib.attachHandlers(el);
		lib.giveLayout(el);
		lib.giveLayout(el.offsetParent);
		el.vmlInitiated = true;
		lib.applyVML(el); /* Render! */
	}
};
try {
	document.execCommand("BackgroundImageCache", false, true); /* TredoSoft Multiple IE doesn't like this, so try{} it */
} catch(r) {}
DD_belatedPNG.createVmlNameSpace();
DD_belatedPNG.createVmlStyleSheet();
}
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) { }
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));
/*
(c) Copyrights 2007 - 2008

Original idea by by Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 
jQuery Plugin by Tzury Bar Yochay 
tzury.by@gmail.com
http://evalinux.wordpress.com
http://facebook.com/profile.php?id=513676303

Project's sites: 
http://code.google.com/p/js-hotkeys/
http://github.com/tzuryby/hotkeys/tree/master

License: same as jQuery license. 

USAGE:
    // simple usage
    $(document).bind('keydown', 'Ctrl+c', function(){ alert('copy anyone?');});
    
    // special options such as disableInIput
    $(document).bind('keydown', {combi:'Ctrl+x', disableInInput: true} , function() {});
    
Note:
    This plugin wraps the following jQuery methods: $.fn.find, $.fn.bind and $.fn.unbind
*/

(function (jQuery){
    // keep reference to the original $.fn.bind, $.fn.unbind and $.fn.find
    jQuery.fn.__bind__ = jQuery.fn.bind;
    jQuery.fn.__unbind__ = jQuery.fn.unbind;
    jQuery.fn.__find__ = jQuery.fn.find;
    
    var hotkeys = {
        version: '0.7.9',
        override: /keypress|keydown|keyup/g,
        triggersMap: {},
        
        specialKeys: { 27: 'esc', 9: 'tab', 32:'space', 13: 'return', 8:'backspace', 145: 'scroll', 
            20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',
            35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 
            109: '-', 
            112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 
            120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/'},
        
        shiftNums: { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", 
            "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", 
            ".":">",  "/":"?",  "\\":"|" },
        
        newTrigger: function (type, combi, callback) { 
            // i.e. {'keyup': {'ctrl': {cb: callback, disableInInput: false}}}
            var result = {};
            result[type] = {};
            result[type][combi] = {cb: callback, disableInInput: false};
            return result;
        }
    };
    // add firefox num pad char codes
    //if (jQuery.browser.mozilla){
    // add num pad char codes
    hotkeys.specialKeys = jQuery.extend(hotkeys.specialKeys, { 96: '0', 97:'1', 98: '2', 99: 
        '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 106: '*', 
        107: '+', 109: '-', 110: '.', 111 : '/'
        });
    //}
    
    // a wrapper around of $.fn.find 
    // see more at: http://groups.google.com/group/jquery-en/browse_thread/thread/18f9825e8d22f18d
    jQuery.fn.find = function( selector ) {
        this.query = selector;
        return jQuery.fn.__find__.apply(this, arguments);
	};
    
    jQuery.fn.unbind = function (type, combi, fn){
        if (jQuery.isFunction(combi)){
            fn = combi;
            combi = null;
        }
        if (combi && typeof combi === 'string'){
            var selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();
            var hkTypes = type.split(' ');
            for (var x=0; x<hkTypes.length; x++){
                delete hotkeys.triggersMap[selectorId][hkTypes[x]][combi];
            }
        }
        // call jQuery original unbind
        return  this.__unbind__(type, fn);
    };
    
    jQuery.fn.bind = function(type, data, fn){
        // grab keyup,keydown,keypress
        var handle = type.match(hotkeys.override);
        
        if (jQuery.isFunction(data) || !handle){
            // call jQuery.bind only
            return this.__bind__(type, data, fn);
        }
        else{
            // split the job
            var result = null,            
            // pass the rest to the original $.fn.bind
            pass2jq = jQuery.trim(type.replace(hotkeys.override, ''));
            
            // see if there are other types, pass them to the original $.fn.bind
            if (pass2jq){
                result = this.__bind__(pass2jq, data, fn);
            }            
            
            if (typeof data === "string"){
                data = {'combi': data};
            }
            if(data.combi){
                for (var x=0; x < handle.length; x++){
                    var eventType = handle[x];
                    var combi = data.combi.toLowerCase(),
                        trigger = hotkeys.newTrigger(eventType, combi, fn),
                        selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();
                        
                    //trigger[eventType][combi].propagate = data.propagate;
                    trigger[eventType][combi].disableInInput = data.disableInInput;
                    
                    // first time selector is bounded
                    if (!hotkeys.triggersMap[selectorId]) {
                        hotkeys.triggersMap[selectorId] = trigger;
                    }
                    // first time selector is bounded with this type
                    else if (!hotkeys.triggersMap[selectorId][eventType]) {
                        hotkeys.triggersMap[selectorId][eventType] = trigger[eventType];
                    }
                    // make trigger point as array so more than one handler can be bound
                    var mapPoint = hotkeys.triggersMap[selectorId][eventType][combi];
                    if (!mapPoint){
                        hotkeys.triggersMap[selectorId][eventType][combi] = [trigger[eventType][combi]];
                    }
                    else if (mapPoint.constructor !== Array){
                        hotkeys.triggersMap[selectorId][eventType][combi] = [mapPoint];
                    }
                    else {
                        hotkeys.triggersMap[selectorId][eventType][combi][mapPoint.length] = trigger[eventType][combi];
                    }
                    
                    // add attribute and call $.event.add per matched element
                    this.each(function(){
                        // jQuery wrapper for the current element
                        var jqElem = jQuery(this);
                        
                        // element already associated with another collection
                        if (jqElem.attr('hkId') && jqElem.attr('hkId') !== selectorId){
                            selectorId = jqElem.attr('hkId') + ";" + selectorId;
                        }
                        jqElem.attr('hkId', selectorId);
                    });
                    result = this.__bind__(handle.join(' '), data, hotkeys.handler)
                }
            }
            return result;
        }
    };
    // work-around for opera and safari where (sometimes) the target is the element which was last 
    // clicked with the mouse and not the document event it would make sense to get the document
    hotkeys.findElement = function (elem){
        if (!jQuery(elem).attr('hkId')){
            if (jQuery.browser.opera || jQuery.browser.safari){
                while (!jQuery(elem).attr('hkId') && elem.parentNode){
                    elem = elem.parentNode;
                }
            }
        }
        return elem;
    };
    // the event handler
    hotkeys.handler = function(event) {
        var target = hotkeys.findElement(event.currentTarget), 
            jTarget = jQuery(target),
            ids = jTarget.attr('hkId');
        
        if(ids){
            ids = ids.split(';');
            var code = event.which,
                type = event.type,
                special = hotkeys.specialKeys[code],
                // prevent f5 overlapping with 't' (or f4 with 's', etc.)
                character = !special && String.fromCharCode(code).toLowerCase(),
                shift = event.shiftKey,
                ctrl = event.ctrlKey,            
                // patch for jquery 1.2.5 && 1.2.6 see more at:  
                // http://groups.google.com/group/jquery-en/browse_thread/thread/83e10b3bb1f1c32b
                alt = event.altKey || event.originalEvent.altKey,
                mapPoint = null;

            for (var x=0; x < ids.length; x++){
                if (hotkeys.triggersMap[ids[x]][type]){
                    mapPoint = hotkeys.triggersMap[ids[x]][type];
                    break;
                }
            }
            
            //find by: id.type.combi.options            
            if (mapPoint){ 
                var trigger;
                // event type is associated with the hkId
                if(!shift && !ctrl && !alt) { // No Modifiers
                    trigger = mapPoint[special] ||  (character && mapPoint[character]);
                }
                else{
                    // check combinations (alt|ctrl|shift+anything)
                    var modif = '';
                    if(alt) modif +='alt+';
                    if(ctrl) modif+= 'ctrl+';
                    if(shift) modif += 'shift+';
                    // modifiers + special keys or modifiers + character or modifiers + shift character or just shift character
                    trigger = mapPoint[modif+special];
                    if (!trigger){
                        if (character){
                            trigger = mapPoint[modif+character] 
                                || mapPoint[modif+hotkeys.shiftNums[character]]
                                // '$' can be triggered as 'Shift+4' or 'Shift+$' or just '$'
                                || (modif === 'shift+' && mapPoint[hotkeys.shiftNums[character]]);
                        }
                    }
                }
                if (trigger){
                    var result = false;
                    for (var x=0; x < trigger.length; x++){
                        if(trigger[x].disableInInput){
                            // double check event.currentTarget and event.target
                            var elem = jQuery(event.target);
                            if (jTarget.is("input") || jTarget.is("textarea") || jTarget.is("select") 
                                || elem.is("input") || elem.is("textarea") || elem.is("select")) {
                                return true;
                            }
                        }                       
                        // call the registered callback function
                        result = result || trigger[x].cb.apply(this, [event]);
                    }
                    return result;
                }
            }
        }
    };
    // place it under window so it can be extended and overridden by others
    window.hotkeys = hotkeys;
    return jQuery;
})(jQuery);

var siteSetup = { sitePath: 'http://www.gamersky.com/', ajaxPath: '/ajax.aspx', skinPath: 'http://www.gamersky.com/Template/Default/mbk/gscss/' };
(function ($) {
    $.pe = $.pe ||
    {
        version: '0.3.7'
    };
    $.fn.easyDrag = function (h) {
        return i(this, h, 'd')
    };
    $.fn.easyResize = function (h) {
        return i(this, h, 'r')
    };
    $.dragAndResize = {
        dragAndResize: {},
        e: 0,
        drag: function (v) {
            if (M.k == 'd')
                E.css({
                    left: M.X + v.pageX - M.pX,
                    top: M.Y + v.pageY - M.pY
                });
            else
                E.css({
                    width: Math.max(v.pageX - M.pX + M.W, 0),
                    height: Math.max(v.pageY - M.pY + M.H, 0)
                });
            return false
        },
        stop: function () {
            //E.css('opacity', 1);
            $(document).unbind('mousemove', J.drag).unbind('mouseup', J.stop)
        }
    };
    var J = $.dragAndResize, M = J.dragAndResize, E = J.e, i = function (e, h, k) {
        return e.each(function () {
            h = (h) ? $(h, e) : e;
            h.css('cursor', 'move');
            h.bind('mousedown', {
                e: e,
                k: k
            }, function (v) {
                var d = v.data, p = {};
                E = d.e;
                if (E.css('position') != 'relative') {
                    try {
                        E.position(p);
                    }
                    catch (e) {
                    }
                }
                M = {
                    X: p.left || f('left') || 0,
                    Y: p.top || f('top') || 0,
                    W: f('width') || E[0].scrollWidth || 0,
                    H: f('height') || E[0].scrollHeight || 0,
                    pX: v.pageX,
                    pY: v.pageY,
                    k: d.k
                };
                E.css({
                    //opacity: 0.8
                });
                $(document).mousemove($.dragAndResize.drag).mouseup($.dragAndResize.stop);
                return false
            })
        })
    }, f = function (k) {
        return parseInt(E.css(k)) || false
    };
    var l;
    l = $.pe.expose = {
        conf: {
            maskId: 'expose',
            loadSpeed: 'slow',
            closeSpeed: 'fast',
            closeOnClick: true,
            closeOnEsc: true,
            zIndex: 9998,
            opacity: 0.9,
            startOpacity: 0,
            color: '#000',
            onLoad: null,
            onClose: null
        }
    };
    function viewport() {
        if ($.browser.msie) {
            var d = $(document).height(), w = $(window).height();
            return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, d - w < 20 ? w : d]
        }
        return [$(document).width(), $(document).height()]
    }
    function call(a) {
        if (a) {
            return a.call($.mask)
        }
    }
    var m, exposed, loaded, config, overlayIndex;
    $.mask = {
        load: function (b, c) {
            if (loaded) {
                return this
            }
            if (typeof b == 'string') {
                b = {
                    color: b
                }
            }
            b = b || config;
            config = b = $.extend($.extend({}, l.conf), b);
            m = $("#" + b.maskId);
            if (!m.length) {
                m = $('<div/>').attr("id", b.maskId);
                $("body").append(m)
            }
            var d = viewport();
            m.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: d[0],
                height: d[1],
                display: 'none',
                opacity: b.startOpacity,
                zIndex: b.zIndex
            });
            if (b.color) {
                m.css("backgroundColor", b.color)
            }
            if (call(b.onBeforeLoad) === false) {
                return this
            }
            if (b.closeOnEsc) {
                $(document).bind("keydown.mask", function (e) {
                    if (e.keyCode == 27) {
                        $.mask.close(e)
                    }
                })
            }
            if (b.closeOnClick) {
                m.bind("click.mask", function (e) {
                    $.mask.close(e)
                })
            }
            $(window).bind("resize.mask", function () {
                $.mask.fit()
            });
            if (c && c.length) {
                overlayIndex = c.eq(0).css("zIndex");
                $.each(c, function () {
                    var a = $(this);
                    if (!/relative|absolute|fixed/i.test(a.css("position"))) {
                        a.css("position", "relative")
                    }
                });
                exposed = c.css({
                    zIndex: Math.max(b.zIndex + 1, overlayIndex == 'auto' ? 0 : overlayIndex)
                })
            }
            m.css({
                display: 'block'
            }).fadeTo(b.loadSpeed, b.opacity, function () {
                $.mask.fit();
                call(b.onLoad)
            });
            loaded = true;
            return this
        },
        close: function () {
            if (loaded) {
                if (call(config.onBeforeClose) === false) {
                    return this
                }
                m.fadeOut(config.closeSpeed, function () {
                    call(config.onClose);
                    if (exposed) {
                        exposed.css({
                            zIndex: overlayIndex
                        })
                    }
                });
                $(document).unbind("keydown.mask");
                m.unbind("click.mask");
                $(window).unbind("resize.mask");
                loaded = false
            }
            return this
        },
        fit: function () {
            if (loaded) {
                var a = viewport();
                m.css({
                    width: a[0],
                    height: a[1]
                })
            }
        },
        getMask: function () {
            return m
        },
        isLoaded: function () {
            return loaded
        },
        getConf: function () {
            return config
        },
        getExposed: function () {
            return exposed
        }
    };
    $.fn.mask = function (a) {
        $.mask.load(a);
        return this
    };
    $.fn.expose = function (a) {
        $.mask.load(a, this);
        return this
    };
    $.pe.overlay = {
        addEffect: function (a, b, c) {
            effects[a] = [b, c]
        },
        conf: {
            close: null,
            closeOnClick: true,
            closeOnEsc: true,
            closeSpeed: 'fast',
            effect: 'default',
            render: false,
            width: 500,
            height: 360,
            title: '标题',
            loadUrl: 'http://www.powereasy.net',
            fixed: !$.browser.msie || $.browser.version > 6,
            left: 'center',
            load: false,
            mask: null,
            oneInstance: true,
            speed: 'normal',
            target: null,
            top: 'center'
        }
    };
    var n = [], effects = {};
    $.pe.overlay.addEffect('default', function (a, b) {
        var c = this.getConf(), w = $(window);
        if (!c.fixed) {
            a.top += w.scrollTop();
            a.left += w.scrollLeft()
        }
        a.position = c.fixed ? 'fixed' : 'absolute';
        this.getOverlay().css(a).fadeIn(c.speed, b)
    }, function (a) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, a)
    });
    function Overlay(c, d) {
        var f = this, fire = c.add(f), w = $(window), closers, overlay, opened, maskConf = $.pe.expose && (d.mask || d.expose), uid = Math.random().toString().slice(10);
        if (maskConf) {
            if (typeof maskConf == 'string') {
                maskConf = {
                    color: maskConf
                }
            }
            maskConf.closeOnClick = maskConf.closeOnEsc = false
        }
        var g = d.target || c.attr("rel");
        overlay = g ? $(g) : null || c;
        if (d.render) {
            overlay.html('');
            var h = '<div style="width:' + d.width + 'px;height:' + d.height + 'px" class="overlay">';
            h += '<div class="overlay_header"><span class="overlay_header_title_sign"></span><h3 class="overlay_header_title">';
            h += d.title;
            h += '</h3><span class="overlay_header_background_right"></span>';
            h += '<a class="overlay_header_close" href="javascript:void(0)"></a></div>';
            h += '<div class="overlay_body"><iframe height="' + (d.height - 30) + '" frameborder="0" width="100%" src="';
            h += d.loadUrl;
            h += ' "marginwidth="0" marginheight="0"></iframe><iframe id="iframe_IE6_Z-Index" width="' + d.width + '" frameborder=0 height="' + d.height + '" style="position:absolute; top:0px; left:0px; z-index:-1; border-style:none;"></iframe></div>';
            overlay.append(h)
        }
        if (!overlay.length) {
            throw "Could not find Overlay: " + g;
        }
        if (c && c.index(overlay) == -1) {
            c.click(function (e) {
                f.load(e);
                return e.preventDefault()
            })
        }

        $.extend(f, {
            load: function (e) {
                if (f.isOpened()) {
                    return f
                }
                var a = effects[d.effect];
                if (!a) {
                    throw "Overlay: cannot find effect : \"" + d.effect + "\"";
                }
                if (d.oneInstance) {
                    $.each(n, function () {
                        this.close(e)
                    })
                }
                e = e || $.Event();
                e.type = "onBeforeLoad";
                fire.trigger(e);
                if (e.isDefaultPrevented()) {
                    return f
                }
                opened = true;
                if (maskConf) {
                    $(overlay).expose(maskConf)
                }
                var b = d.top, left = d.left, oWidth = overlay.outerWidth({
                    margin: true
                }), oHeight = overlay.outerHeight({
                    margin: true
                });
                if (typeof b == 'string') {
                    b = b == 'center' ? Math.max((w.height() - d.height) / 2, 0) : parseInt(b, 10) / 100 * w.height()
                }
                if (left == 'center') {
                    left = Math.max((w.width() - d.width) / 2, 0)
                }
                a[0].call(f, {
                    top: b,
                    left: left
                }, function () {
                    if (opened) {
                        e.type = "onLoad";
                        fire.trigger(e)
                    }
                });

                fire.css('display', 'block');

                if (maskConf && d.closeOnClick) {
                    $.mask.getMask().one("click", f.close)
                }
                if (d.closeOnClick) {
                    $(document).bind("click." + uid, function (e) {
                        if (!$(e.target).parents(overlay).length) {
                            f.close(e)
                        }
                    })
                }
                if (d.closeOnEsc) {
                    $(document).bind("keydown." + uid, function (e) {
                        if (e.keyCode == 27) {
                            f.close(e)
                        }
                    })
                }
                return f
            },
            close: function (e) {
                if (!f.isOpened()) {
                    return f
                }
                e = e || $.Event();
                e.type = "onBeforeClose";
                fire.trigger(e);
                if (e.isDefaultPrevented()) {
                    return
                }
                opened = false;
                effects[d.effect][1].call(f, function () {
                    e.type = "onClose";
                    fire.trigger(e)
                });
                $(document).unbind("click." + uid).unbind("keydown." + uid);
                if (maskConf) {
                    $.mask.close()
                }
                return f
            },
            getOverlay: function () {
                return overlay
            },
            getTrigger: function () {
                return c
            },
            getClosers: function () {
                return closers
            },
            isOpened: function () {
                return opened
            },
            getConf: function () {
                return d
            }
        });
        $.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (i, b) {
            if ($.isFunction(d[b])) {
                $(f).bind(b, d[b])
            }
            f[b] = function (a) {
                $(f).bind(b, a);
                return f
            }
        });
        var j = overlay.find('.overlay_header');
        overlay.easyDrag(j);
        closers = overlay.find(d.close || ".overlay_header_close" || ".close");
        if (!closers.length && !d.close) {
            closers = $('<a class="close"></a>');
            overlay.prepend(closers)
        }
        closers.click(function (e) {
            f.close(e)
        });
        if (d.load) {
            f.load()
        }
    }
    $.fn.overlay = function (a) {
        var b = this.data("overlay");
        if (b) {
            this.removeData("overlay")
        }
        if ($.isFunction(a)) {
            a = {
                onBeforeLoad: a
            }
        }
        a = $.extend(true, {}, $.pe.overlay.conf, a);
        this.each(function () {
            b = new Overlay($(this), a);
            n.push(b);
            $(this).data("overlay", b)
        });
        return a.api ? b : this
    };
    $.pe.tabs = {
        conf: {
            tabs: 'a',
            current: 'current',
            onBeforeClick: null,
            onClick: null,
            effect: 'default',
            initialIndex: 0,
            event: 'click',
            rotate: false,
            history: false
        },
        addEffect: function (a, b) {
            h[a] = b
        }
    };
    var h = {
        'default': function (i, a) {
            this.getPanes().hide().eq(i).show();
            a.call()
        },
        fade: function (i, a) {
            var b = this.getConf(), speed = b.fadeOutSpeed, panes = this.getPanes();
            if (speed) {
                panes.fadeOut(speed)
            }
            else {
                panes.hide()
            }
            panes.eq(i).fadeIn(b.fadeInSpeed, a)
        },
        slide: function (i, a) {
            this.getPanes().slideUp(200);
            this.getPanes().eq(i).slideDown(400, a)
        },
        ajax: function (i, a) {
            this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), a)
        }
    };
    var w;
    $.pe.tabs.addEffect("horizontal", function (i, a) {
        if (!w) {
            w = this.getPanes().eq(0).width()
        }
        this.getCurrentPane().animate({
            width: 0
        }, function () {
            $(this).hide()
        });
        this.getPanes().eq(i).animate({
            width: w
        }, function () {
            $(this).show();
            a.call()
        })
    });
    function Tabs(c, d, f) {
        var g = this, trigger = c.add(this), tabs = c.find(f.tabs), panes = d.jquery ? d : c.children(d), current;
        if (!tabs.length) {
            tabs = c.children()
        }
        if (!panes.length) {
            panes = c.parent().find(d)
        }
        if (!panes.length) {
            panes = $(d)
        }
        $.extend(this, {
            click: function (i, e) {
                var a = tabs.eq(i);
                if (typeof i == 'string' && i.replace("#", "")) {
                    a = tabs.filter("[href*=" + i.replace("#", "") + "]");
                    i = Math.max(tabs.index(a), 0)
                }
                if (f.rotate) {
                    var b = tabs.length - 1;
                    if (i < 0) {
                        return g.click(b, e)
                    }
                    if (i > b) {
                        return g.click(0, e)
                    }
                }
                if (!a.length) {
                    if (current >= 0) {
                        return g
                    }
                    i = f.initialIndex;
                    a = tabs.eq(i)
                }
                if (i === current) {
                    return g
                }
                e = e || $.Event();
                e.type = "onBeforeClick";
                trigger.trigger(e, [i]);
                if (e.isDefaultPrevented()) {
                    return
                }
                h[f.effect].call(g, i, function () {
                    e.type = "onClick";
                    trigger.trigger(e, [i])
                });
                current = i;
                tabs.removeClass(f.current);
                a.addClass(f.current);
                return g
            },
            getConf: function () {
                return f
            },
            getTabs: function () {
                return tabs
            },
            getPanes: function () {
                return panes
            },
            getCurrentPane: function () {
                return panes.eq(current)
            },
            getCurrentTab: function () {
                return tabs.eq(current)
            },
            getIndex: function () {
                return current
            },
            next: function () {
                return g.click(current + 1)
            },
            prev: function () {
                return g.click(current - 1)
            },
            destroy: function () {
                tabs.unbind(f.event).removeClass(f.current);
                panes.find("a[href^=#]").unbind("click.T");
                return g
            }
        });
        $.each("onBeforeClick,onClick".split(","), function (i, b) {
            if ($.isFunction(f[b])) {
                $(g).bind(b, f[b])
            }
            g[b] = function (a) {
                $(g).bind(b, a);
                return g
            }
        });
        if (f.history && $.fn.history) {
            $.pe.history.init(tabs);
            f.event = 'history'
        }
        tabs.each(function (i) {
            $(this).bind(f.event, function (e) {
                g.click(i, e);
                return e.preventDefault()
            })
        });
        panes.find("a[href^=#]").bind("click.T", function (e) {
            g.click($(this).attr("href"), e)
        });
        if (location.hash) {
            g.click(location.hash)
        }
        else {
            if (f.initialIndex === 0 || f.initialIndex > 0) {
                g.click(f.initialIndex)
            }
        }
    };
    $.fn.tabs = function (a, b) {
        var c = this.data("tabs");
        if (c) {
            c.destroy();
            this.removeData("tabs")
        }
        if ($.isFunction(b)) {
            b = {
                onBeforeClick: b
            }
        }
        b = $.extend({}, $.pe.tabs.conf, b);
        this.each(function () {
            c = new Tabs($(this), a, b);
            $(this).data("tabs", c)
        });
        return b.api ? c : this
    };

    $.fn.extend({
        jsRightMenu: function (options) {
            options = $.extend({
                menuList: []
            }, options);
            if ($("#div_RightMenu").size() == 0);
            {
                $(document.body).append("\<div class=\"div_RightMenu\" id=\"div_RightMenu\"\>\<\/div>");
                $("#div_RightMenu").hide();
            }
            return this.each(function () {
                this.oncontextmenu = function () {
                    var menuCount = options.menuList.length;
                    var divMunuItem = "";
                    if (menuCount > 0) {
                        for (var i = 0; i < menuCount; i++) {
                            divMunuItem += "<div class=\"divMenuItem\" id=\"divMenuItem" + $(this).attr("id") + "\" onclick=\"" + options.menuList[i].clickEvent + "\"  onmouseover=\"" + options.menuList[i].mouseoverEvent + "\" onmouseout=\"" + options.menuList[i].mouseoutEvent + "\">" + options.menuList[i].menuName + "</div>";
                        }
                        $("#div_RightMenu").html(divMunuItem);
                        $("#div_RightMenu").hide();
                    }
                    var objMenu = $("#div_RightMenu");
                    if (objMenu.size() > 0) {
                        objMenu.hide();
                        var event = arguments[0] || window.event;
                        var clientX = event.clientX;
                        var clientY = event.clientY;
                        var redge = document.documentElement.clientWidth - clientX;
                        var bedge = document.documentElement.clientHeight - clientY;
                        var menu = objMenu.get(0);
                        var menuLeft = 0;
                        var menuTop = 0;
                        if (redge < menu.offsetWidth)
                            menuLeft = document.documentElement.scrollLeft + clientX - menu.offsetWidth;
                        else
                            menuLeft = document.documentElement.scrollLeft + clientX;
                        if (bedge < menu.offsetHeight)
                            menuTop = document.documentElement.scrollTop + clientY - menu.offsetHeight;
                        else
                            menuTop = document.documentElement.scrollTop + clientY;
                        objMenu.css({ top: menuTop + "px", left: menuLeft + "px" });
                        objMenu.show();
                        return false;
                    }
                }
                document.onclick = function () {
                    var objMenu = $("#div_RightMenu");
                    if (objMenu.size() > 0) objMenu.hide();
                }
            });
        }
    });

    $.fn.extend({
        check: function () {
            return this.each(function () {
                this.checked = true
            })
        },
        uncheck: function () {
            return this.each(function () {
                this.checked = false
            })
        },
        inverse: function () {
            return this.each(function () {
                this.checked = (this.checked == true ? false : true);
            })
        },
        shiftSelect: function (m) {
            var g = this;
            var h;
            $(this).click(function (a) {
                if (!h) {
                    h = this;
                    return
                }
                if (a.shiftKey) {
                    var b = g.index(this);
                    var c = g.index(h);
                    var d = h.checked;
                    if (b == c) {
                        return true
                    }
                    var e = Math.max(b, c);
                    var f = Math.min(b, c);
                    for (i = f; i <= e; i++) {
                        g[i].checked = d
                    }
                    if ($.isFunction(m))
                        call(m);
                }
                h = this
            })
        },
        lostFocus: function () {
            $(this).focus(function () {
                this.blur()
            })
        },
        addFavorite: function () {
            $(this).click(function () {
                var a = $('title').text();
                if (document.all)
                    window.external.addFavorite(location.href, a);
                else
                    if (window.sidebar)
                        window.sidebar.addPanel(a, location.href, null);
                    else
                        alert('您可以尝试通过快捷键CTRL + D 加入到收藏夹')
            })
        },
        setHomePage: function () {
            $(this).click(function () {
                if (document.all) {
                    document.body.style.behavior = 'url(#default#homepage)';
                    document.body.setHomePage(location.href)
                }
                else
                    if (window.sidebar) {
                        if (window.netscape) {
                            try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                            }
                            catch (e) {
                                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                                return
                            }
                        }
                        var a = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        a.setCharPref('browser.startup.homepage', location.href)
                    }
            });
        },
        imageResize: function (options) {
            var params = jQuery.extend({
                height: 500,
                width: 660
            }, options);

            this.each(function () {
                var height = params.height,
                width = params.width,
                img_height = $(this).height(),
                img_width = $(this).width(),
                m_ceil = Math.ceil,
                m_floor = Math.floor;
                if (img_height <= height || img_width <= width) {
                    return;
                }

                if (img_height >= img_width) {
                    width = m_floor(m_ceil(img_width / img_height * height));
                } else {
                    height = m_floor(m_ceil(img_height / img_width * width));
                }
                $(this).attr({
                    'height': height,
                    'width': width
                }).css({ 'height': height + 'px', 'width': width + 'px' });
            });
        },
        useKeypressSubmit: function (target) {
            $(this).keypress(function (e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    $(target).click();
                    return false;
                }
                return true;
            })
        }
    })
    $.extend($.pe, {
        htmlEncode: function (text) {
            var standard = function (text) {
                var span = $('<span>');
                span.html(text);
                return span.html();
            };

            var fix1 = (standard('\n').toLowerCase() == '<br>') ?
                function (text) {
                    // #3874 IE and Safari encode line-break into <br>
                    return standard(text).replace(/<br>/gi, '\n');
                } :
                standard;

            var fix2 = (standard('>') == '>') ?
                function (text) {
                    // WebKit does't encode the ">" character, which makes sense, but
                    // it's different than other browsers.
                    return fix1(text).replace(/>/g, '&gt;');
                } :
                fix1;

            var fix3 = (standard('  ') == '&nbsp; ') ?
                function (text) {
                    // #3785 IE8 changes spaces (>= 2) to &nbsp;
                    return fix2(text).replace(/&nbsp;/g, ' ');
                } :
                fix2;

            this.htmlEncode = fix3;

            return this.htmlEncode(text);
        },
        random: function (a) {
            return Math.floor(a * (Math.random() % 1))
        },
        cookie: function (a, b, c) {
            if (typeof b != 'undefined') {
                c = c || {};
                if (b === null) {
                    b = '';
                    c.expires = -1
                }
                var d = '';
                if (c.expires && (typeof c.expires == 'number' || c.expires.toUTCString)) {
                    var e;
                    if (typeof c.expires == 'number') {
                        e = new Date();
                        e.setTime(e.getTime() + (c.expires * 24 * 60 * 60 * 1000))
                    }
                    else {
                        e = c.expires
                    }
                    d = '; expires=' + e.toUTCString()
                }
                var f = c.path ? '; path=' + (c.path) : '', domain = c.domain ? '; domain=' + (c.domain) : '', secure = c.secure ? '; secure' : '';
                document.cookie = [a, '=', encodeURIComponent(b), d, f, domain, secure].join('')
            }
            else {
                var g = null;
                if (document.cookie && document.cookie != '') {
                    var h = document.cookie.split(';');
                    for (var i = 0; i < h.length; i++) {
                        var j = $.trim(h[i]);
                        if (j.substring(0, a.length + 1) == (a + '=')) {
                            g = decodeURIComponent(j.substring(a.length + 1));
                            break
                        }
                    }
                }
                return g
            }
        },
        stringToJSON: function (string) {
            return eval('(' + string + ')');
        },
        jsonToString: function (obj) {
            var THIS = this;
            switch (typeof (obj)) {
                case 'string':
                    return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
                case 'array':
                    return '[' + obj.map(THIS.jsonToString).join(',') + ']';
                case 'object':
                    if (obj instanceof Array) {
                        var strArr = [];
                        var len = obj.length;
                        for (var i = 0; i < len; i++) {
                            strArr.push(THIS.jsonToString(obj[i]));
                        }
                        return '[' + strArr.join(',') + ']';
                    } else if (obj == null) {
                        return 'null';

                    } else {
                        var string = [];
                        for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
                        return '{' + string.join(',') + '}';
                    }
                case 'number':
                    return obj;
                case false:
                    return obj;
            }
        },
        ajax: function (e, f) {
            if (typeof (e) != 'string' || e == 'undefind')
                return;
            var g = {
                url: siteSetup.ajaxPath,
                data: '',
                type: 'POST',
                dataType: 'xml',
                params: {}
            };
            var h = function (a, b) {
                var c = '';
                for (var d in a.params) {
                    if (b)
                        c += ('<attrib><' + d + '>' + $.pe.htmlEncode(a.params[d]) + '</' + d + '></attrib>');
                    else
                        c += ('<' + d + '>' + $.pe.htmlEncode(a.params[d]) + '</' + d + '>')
                }
                return c
            }
            var i = $.extend(g, f);
            var e = $.trim(e).toLowerCase();
            switch (e) {
                case 'accesslabel':
                    e = 'updatelabel';
                    break;
                case 'accesspage':
                    e = 'updatepage';
                    break;
                case 'checkuserlogin':
                    e = 'logincheck';
                    break;
                case 'checkloginvalidate':
                    e = 'EnableValidCode';
                    break;
                case 'logout':
                    e = 'userlogout';
                    break;
                default:
                    break;
            }
            var j = '<root><type>' + e + '</type>';
            switch (e) {
                case 'updatelabel':
                    j += ('<labelname>' + i.labelName + '</labelname>')
                    j += ('<currentpage>' + i.currentPage + '</currentpage>');
                    j += h(i, true);
                    break;
                case 'updatepage':
                    j += ('<labelname>' + i.labelName + '</labelname>');
                    j += ('<sourcename>' + i.pageName + '</sourcename>');
                    j += ('<pagesize>' + i.pageSize + '</pagesize>');
                    j += ('<currentpage>' + i.currentPage + '</currentpage>');
                    j += ('<total>' + i.recordCount + '</total>');
                    break;
                default:
                    j += h(i, false);
                    break;
            }
            j += '</root>';
            i.data = j;
            $.ajax(i)
        },
        refreshValidateCode: function (a) {
            var path = siteSetup.sitePath + 'Controls/ValidateCodeImage.aspx?code=' + $.pe.random(100);
            $(a).attr('src', path);
        },
        replaceUserInfoVariable: function (a, b) {
            a = a.replace('{username}', b.find('username').text());
            a = a.replace('{experience}', b.find('exp').text());
            a = a.replace('{message}', b.find('msg').text());
            a = a.replace('{loginCount}', b.find('logintimes').text());
            a = a.replace('{pointName}', b.find('pointname').text());
            a = a.replace('{point}', b.find('point').text());
            a = a.replace('{pointUnit}', b.find('pointunit').text());
            a = a.replace('{signinArticle}', b.find('signincontent').text());
            a = a.replace('{balances}', b.find('balance').text());
            return a
        },
        supplyDemandInfoVariable: function (a, b) {
            a = a.replace('{username}', b.find('username').text());
            a = a.replace('{experience}', b.find('exp').text());
            a = a.replace('{message}', b.find('msg').text());
            a = a.replace('{loginCount}', b.find('logintimes').text());
            a = a.replace('{pointName}', b.find('pointname').text());
            a = a.replace('{point}', b.find('point').text());
            a = a.replace('{signinArticle}', b.find('signincontent').text());
            a = a.replace('{balances}', b.find('balance').text());
            a = a.replace(new RegExp('{indexurl}', 'g'), b.find('indexurl').text());
            a = a.replace(new RegExp('{contacturl}', 'g'), b.find('contacturl').text());
            a = a.replace('{supplylisturl}', b.find('supplylisturl').text());
            a = a.replace('{companyurl}', b.find('companyurl').text());
            a = a.replace('{contact}', b.find('contact').text());
            a = a.replace(new RegExp('{companyname}', 'g'), b.find('companyname').text());
            return a
        }
    })
})(jQuery);


(function (d) {
    function R(b, c) {
        return 32 - (new Date(b, c, 32)).getDate()
    }
    function S(b, c) {
        b = "" + b;
        for (c = c || 2; b.length < c;)
            b = "0" + b;
        return b
    }
    function T(b, c, j) {
        var m = b.getDate(), h = b.getDay(), t = b.getMonth();
        b = b.getFullYear();
        var f = {
            d: m,
            dd: S(m),
            ddd: B[j].shortDays[h],
            dddd: B[j].days[h],
            m: t + 1,
            mm: S(t + 1),
            mmm: B[j].shortMonths[t],
            mmmm: B[j].months[t],
            yy: String(b).slice(2),
            yyyy: b
        };
        c = c.replace(X, function (o) {
            return o in f ? f[o] : o.slice(1, o.length - 1)
        });
        return Y.html(c).html()
    }
    function y(b) {
        return parseInt(b, 10)
    }
    function U(b, c) {
        return b.getFullYear() === c.getFullYear() && b.getMonth() == c.getMonth() && b.getDate() == c.getDate()
    }
    function C(b) {
        if (b) {
            if (b.constructor == Date)
                return b;
            if (typeof b == "string") {
                var c = b.split("-");
                if (c.length == 3)
                    return new Date(y(c[0]), y(c[1]) - 1, y(c[2]));
                if (!/^-?\d+$/.test(b))
                    return;
                b = y(b)
            }
            c = new Date;
            c.setDate(c.getDate() + b);
            return c
        }
    }
    function Z(b, c) {
        function j(a, e, g) {
            l = a;
            D = a.getFullYear();
            E = a.getMonth();
            G = a.getDate();
            g = g || d.Event("api");
            g.type = "change";
            H.trigger(g, [a]);
            if (!g.isDefaultPrevented()) {
                b.val(T(a, e.format, e.lang));
                b.data("date", a);
                h.hide(g)
            }
        }
        function m(a) {
            a.type = "onShow";
            H.trigger(a);
            d(document).bind("keydown.d", function (e) {
                var g = e.keyCode;
                if (g == 8) {
                    b.val("");
                    return h.hide(e)
                }
                if (g == 27)
                    return h.hide(e);
                if (d(V).index(g) >= 0) {
                    if (!u) {
                        h.show(e);
                        return e.preventDefault()
                    }
                    var i = d("#" + f.weeks + " a"), p = d("." + f.focus), q = i.index(p);
                    p.removeClass(f.focus);
                    if (g == 74 || g == 40)
                        q += 7;
                    else
                        if (g == 75 || g == 38)
                            q -= 7;
                        else
                            if (g == 76 || g == 39)
                                q += 1;
                            else
                                if (g == 72 || g == 37)
                                    q -= 1;
                    if (q == -1) {
                        h.addMonth(-1);
                        p = d("#" + f.weeks + " a:last")
                    }
                    else
                        if (q ==
                        35) {
                            h.addMonth();
                            p = d("#" + f.weeks + " a:first")
                        }
                        else
                            p = i.eq(q);
                    p.addClass(f.focus);
                    return e.preventDefault()
                }
                if (g == 34)
                    return h.addMonth();
                if (g == 33)
                    return h.addMonth(-1);
                if (g == 36)
                    return h.today();
                if (g == 13)
                    d(e.target).is("select") || d("." + f.focus).click();
                return d([16, 17, 18, 9]).index(g) >= 0
            });
            d(document).bind("click.d", function (e) {
                var g = e.target;
                if (!d(g).parents("#" + f.root).length && g != b[0] && (!K || g != K[0]))
                    h.hide(e)
            })
        }
        var h = this, t = new Date, f = c.css, o = B[c.lang], k = d("#" + f.root), L = k.find("#" + f.title), K, I, J, D, E, G, l = b.attr("data-value") || c.value || b.val(), r = b.attr("min") || c.min, s = b.attr("max") || c.max, u;
        l = C(l) || t;
        r = C(r || c.yearRange[0] * 365);
        s = C(s || c.yearRange[1] * 365);
        if (!o)
            throw "Dateinput: invalid language: " + c.lang;
        if (b.attr("type") == "date") {
            var M = d("<input/>");
            d.each("name,readonly,disabled,value,required".split(","), function (a, e) {
                M.attr(e, b.attr(e))
            });
            b.replaceWith(M);
            b = M
        }
        b.addClass(f.input);
        var H = b.add(h);
        if (!k.length) {
            k = d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
                position: "absolute"
            }).attr("id", f.root);
            k.children().eq(0).attr("id", f.head).end().eq(1).attr("id", f.body).children().eq(0).attr("id", f.days).end().eq(1).attr("id", f.weeks).end().end().end().find("a").eq(0).attr("id", f.prev).end().eq(1).attr("id", f.next);
            L = k.find("#" + f.head).find("div").attr("id", f.title);
            if (c.selectors) {
                var z = d("<select/>").attr("id", f.month), A = d("<select/>").attr("id", f.year);
                L.append(z.add(A))
            }
            for (var $ = k.find("#" + f.days), N = 0; N < 7; N++)
                $.append(d("<span/>").text(o.shortDays[(N + c.firstDay) % 7]));
            b.after(k)
        }
        if (c.trigger)
            K = d("<a/>").attr("href", "#").addClass(f.trigger).click(function (a) {
                h.show();
                return a.preventDefault()
            }).insertAfter(b);
        var O = k.find("#" + f.weeks);
        A = k.find("#" + f.year);
        z = k.find("#" + f.month);
        d.extend(h, {
            show: function (a) {
                if (!(b.is("[readonly]") || u)) {
                    a = a || d.Event();
                    a.type = "onBeforeShow";
                    H.trigger(a);
                    if (!a.isDefaultPrevented()) {
                        d.each(W, function () {
                            this.hide()
                        });
                        u = true;
                        z.unbind("change").change(function () {
                            h.setValue(A.val(), d(this).val())
                        });
                        A.unbind("change").change(function () {
                            h.setValue(d(this).val(), z.val())
                        });
                        I = k.find("#" + f.prev).unbind("click").click(function () {
                            I.hasClass(f.disabled) || h.addMonth(-1);
                            return false
                        });
                        J = k.find("#" + f.next).unbind("click").click(function () {
                            J.hasClass(f.disabled) || h.addMonth();
                            return false
                        });
                        h.setValue(l);
                        var e = b.position();
                        k.css({
                            top: e.top + b.outerHeight({
                                margins: true
                            }) + c.offset[0],
                            left: e.left + c.offset[1]
                        });
                        if (c.speed)
                            k.show(c.speed, function () {
                                m(a)
                            });
                        else {
                            k.show();
                            m(a)
                        }
                        return h
                    }
                }
            },
            setValue: function (a, e, g) {
                var i;
                if (parseInt(e, 10) >= -1) {
                    a = y(a);
                    e = y(e);
                    g = y(g);
                    i = new Date(a, e, g)
                }
                else {
                    i = a || l;
                    a = i.getFullYear();
                    e = i.getMonth();
                    g = i.getDate()
                }
                if (e == -1) {
                    e = 11;
                    a--
                }
                else
                    if (e == 12) {
                        e = 0;
                        a++
                    }
                if (!u) {
                    j(i, c);
                    return h
                }
                E = e;
                D = a;
                i = new Date(a, e, 1 - c.firstDay);
                g = i.getDay();
                var p = R(a, e), q = R(a, e - 1), P;
                if (c.selectors) {
                    z.empty();
                    d.each(o.months, function (v, F) {
                        r < new Date(a, v + 1, -1) && s > new Date(a, v, 0) && z.append(d("<option/>").html(F).attr("value", v))
                    });
                    A.empty();
                    for (i = a + c.yearRange[0]; i < a + c.yearRange[1]; i++)
                        r < new Date(i + 1, -1, 0) && s > new Date(i, 0, 0) && A.append(d("<option/>").text(i));
                    z.val(e);
                    A.val(a)
                }
                else
                    L.html(o.months[e] +
                    " " +
                    a);
                O.empty();
                I.add(J).removeClass(f.disabled);
                for (var w = 0, n, x; w < 42; w++) {
                    n = d("<a/>");
                    if (w % 7 === 0) {
                        P = d("<div/>").addClass(f.week);
                        O.append(P)
                    }
                    if (w < g) {
                        n.addClass(f.off);
                        x = q - g + w + 1;
                        i = new Date(a, e - 1, x)
                    }
                    else
                        if (w >= g + p) {
                            n.addClass(f.off);
                            x = w - p - g + 1;
                            i = new Date(a, e + 1, x)
                        }
                        else {
                            x = w - g + 1;
                            i = new Date(a, e, x);
                            if (U(l, i))
                                n.attr("id", f.current).addClass(f.focus);
                            else
                                U(t, i) && n.attr("id", f.today)
                        }
                    r && i < r && n.add(I).addClass(f.disabled);
                    s && i > s && n.add(J).addClass(f.disabled);
                    n.attr("href", "#" + x).text(x).data("date", i);
                    P.append(n);
                    n.click(function (v) {
                        var F = d(this);
                        if (!F.hasClass(f.disabled)) {
                            d("#" + f.current).removeAttr("id");
                            F.attr("id", f.current);
                            j(F.data("date"), c, v)
                        }
                        return false
                    })
                }
                f.sunday && O.find(f.week).each(function () {
                    var v = c.firstDay ? 7 - c.firstDay : 0;
                    d(this).children().slice(v, v + 1).addClass(f.sunday)
                });
                return h
            },
            setMin: function (a, e) {
                r = C(a);
                e && l < r && h.setValue(r);
                return h
            },
            setMax: function (a, e) {
                s = C(a);
                e && l > s && h.setValue(s);
                return h
            },
            today: function () {
                return h.setValue(t)
            },
            addDay: function (a) {
                return this.setValue(D, E, G +
                (a ||
                1))
            },
            addMonth: function (a) {
                return this.setValue(D, E + (a || 1), G)
            },
            addYear: function (a) {
                return this.setValue(D + (a || 1), E, G)
            },
            hide: function (a) {
                if (u) {
                    a = a || d.Event();
                    a.type = "onHide";
                    H.trigger(a);
                    d(document).unbind("click.d").unbind("keydown.d");
                    if (a.isDefaultPrevented())
                        return;
                    k.hide();
                    u = false
                }
                return h
            },
            getConf: function () {
                return c
            },
            getInput: function () {
                return b
            },
            getCalendar: function () {
                return k
            },
            getValue: function (a) {
                return a ? T(l, a, c.lang) : l
            },
            isOpen: function () {
                return u
            }
        });
        d.each(["onBeforeShow", "onShow", "change", "onHide"], function (a, e) {
            d.isFunction(c[e]) && d(h).bind(e, c[e]);
            h[e] = function (g) {
                d(h).bind(e, g);
                return h
            }
        });
        b.bind("focus click", h.show).keydown(function (a) {
            var e = a.keyCode;
            if (!u && d(V).index(e) >= 0) {
                h.show(a);
                return a.preventDefault()
            }
            return a.shiftKey || a.ctrlKey || a.altKey || e == 9 ? true : a.preventDefault()
        });
        C(b.val()) && j(l, c)
    }
    d.tools = d.tools ||
    {
        version: "1.2.3"
    };
    var W = [], Q, V = [75, 76, 38, 39, 74, 72, 40, 37], B = {};
    Q = d.tools.dateinput = {
        conf: {
            format: "mm/dd/yy",
            selectors: false,
            yearRange: [-5, 5],
            lang: "en",
            offset: [0, 0],
            speed: 0,
            firstDay: 0,
            min: 0,
            max: 0,
            trigger: false,
            css: {
                prefix: "cal",
                input: "date",
                root: 0,
                head: 0,
                title: 0,
                prev: 0,
                next: 0,
                month: 0,
                year: 0,
                days: 0,
                body: 0,
                weeks: 0,
                today: 0,
                current: 0,
                week: 0,
                off: 0,
                sunday: 0,
                focus: 0,
                disabled: 0,
                trigger: 0
            }
        },
        localize: function (b, c) {
            d.each(c, function (j, m) {
                c[j] = m.split(",")
            });
            B[b] = c
        }
    };
    Q.localize("en", {
        months: "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月",
        shortMonths: "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月",
        days: "日,一,二,三,四,五,六",
        shortDays: "日,一,二,三,四,五,六"
    });
    var X = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, Y = d("<a/>");
    d.expr[":"].date = function (b) {
        var c = b.getAttribute("type");
        return c && c == "date" || !!d(b).data("dateinput")
    };
    d.fn.dateinput = function (b) {
        if (this.data("dateinput"))
            return this;
        b = d.extend(true, {}, Q.conf, b);
        d.each(b.css, function (j, m) {
            if (!m && j != "prefix")
                b.css[j] = (b.css.prefix || "") + (m || j)
        });
        var c;
        this.each(function () {
            var j = new Z(d(this), b);
            W.push(j);
            j = j.getInput().data("dateinput", j);
            c = c ? c.add(j) : j
        });
        return c ? c : this
    }
})(jQuery);

/*
 * JQuery URL Parser plugin, v2.2.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD available; use anonymous module
        if (typeof jQuery !== 'undefined') {
            define(['jquery'], factory);
        } else {
            define([], factory);
        }
    } else {
        // No AMD available; mutate global vars
        if (typeof jQuery !== 'undefined') {
            factory(jQuery);
        } else {
            factory();
        }
    }
})(function ($, undefined) {

    var tag2attr = {
        a: 'href',
        img: 'src',
        form: 'action',
        base: 'href',
        script: 'src',
        iframe: 'src',
        link: 'href'
    },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor': 'fragment' }, // aliases for backwards compatability

        parser = {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        toString = Object.prototype.toString,

        isint = /^[0-9]+$/;

    function parseUri(url, strictMode) {
        var str = decodeURI(url),
        res = parser[strictMode || false ? 'strict' : 'loose'].exec(str),
        uri = { attr: {}, param: {}, seg: {} },
        i = 14;

        while (i--) {
            uri.attr[key[i]] = res[i] || '';
        }

        // build query and fragment parameters		
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments		
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g, '').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g, '').split('/');

        // compile a 'base' domain attribute        
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ? uri.attr.protocol + '://' + uri.attr.host : uri.attr.host) + (uri.attr.port ? ':' + uri.attr.port : '') : '';

        return uri;
    };

    function getAttrName(elm) {
        var tn = elm.tagName;
        if (typeof tn !== 'undefined') return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length == 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' != val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('['),
            len = parts.length,
            last = len - 1;
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            set(parent.base, key, val);
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function (ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch (e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length),
                val = val.substr(val.indexOf('=') + 1, val.length);

            if ('' == key) key = pair, val = '';

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (undefined === v) {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
             brace, c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator) {
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var keys = [];
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) keys.push(prop);
        }
        return keys;
    }

    function purl(url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data: parseUri(url, strictMode),

            // get various attributes from the URI
            attr: function (attr) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param: function (param) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam: function (param) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment: function (seg) {
                if (typeof seg === 'undefined') {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment: function (seg) {
                if (typeof seg === 'undefined') {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    };

    if (typeof $ !== 'undefined') {

        $.fn.url = function (strictMode) {
            var url = '';
            if (this.length) {
                url = $(this).attr(getAttrName(this[0])) || '';
            }
            return purl(url, strictMode);
        };

        $.url = purl;

    } else {
        window.purl = purl;
    }

});

/*--密码强度--*/
function isSecurity(v) {
    if (v.length < 6) {
        iss.reset(v.length);
        return
    }
    var a = -1;
    var b = (v.search(/[a-zA-Z]/) != -1) ? 1 : 0;
    var c = (v.search(/[0-9]/) != -1) ? 1 : 0;
    var d = (v.search(/[^A-Za-z0-9_]/) != -1) ? 1 : 0;
    var a = b + c + d;
    switch (a) {
        case 1:
            iss.level0();
            break;
        case 2:
            iss.level1();
            break;
        case 3:
            iss.level2();
            break;
        default:
            iss.reset(v.length)
    }
};

var iss = {
    width: ["60", "80", "100", "10"],
    reset: function (a) {
        $("#BarBorder_TxtUserPassword").html("<span style='color:red'>  密码强度：弱</span>");
    },
    level0: function () {
        $("#BarBorder_TxtUserPassword").html("<span style='color:#FF3300'>  密码强度：一般</span>");
    },
    level1: function () {
        $("#BarBorder_TxtUserPassword").html("<span style='color:green'>  密码强度：强</span>");
    },
    level2: function () {
        $("#BarBorder_TxtUserPassword").html("<span style='color:green'>  密码强度：很强</span>");
    }
};
function Bardisplaynone() {
    $("#BarBorder_TxtUserPassword").hide();
};

function Bardisplayshow() {
    $("#BarBorder_TxtUserPassword").empty();
    $("#ctl00_CphContent_ValrUserPassword").hide();
    document.getElementById("BarBorder_TxtUserPassword").style.display = "inline"
};

String.prototype.endWith = function (a) {
    var b = new RegExp(a + "$");
    return b.test(this)
};
function batchconfirm(a, b) {
    var a = (arguments.length > 0) ? arguments[0] : "确定要进行此批量操作？";
    var b = (arguments.length > 1) ? arguments[1] : "请选择所要操作的记录！";
    var c = false;
    for (var i = 0; i < document.forms[0].length; i++) {
        var o = document.forms[0][i];
        if (o.type == "checkbox" && o.name.endWith("CheckBoxButton") && o.checked == true) {
            c = true;
            break
        }
    }
    if (!c) {
        alert(b);
        return false
    }
    else {
        if (!confirm(a)) {
            return false
        }
    }
};

(function (C) {if(!C.curCSS){ C.curCSS = C.css;}C.ui = C.ui || {}; C.extend(C.ui, { plugin: { add: function (E, F, H) { var G = C.ui[E].prototype; for (var D in H) { G.plugins[D] = G.plugins[D] || []; G.plugins[D].push([F, H[D]]) } }, call: function (D, E, G) { var H = D.plugins[E]; if (!H) { return } for (var F = 0; F < H.length; F++) { if (D.options[H[F][0]]) { H[F][1].apply(D.element, G) } } } }, cssCache: {}, css: function (D) { if (C.ui.cssCache[D]) { return C.ui.cssCache[D] } var E = C('<div class="ui-resizable-gen">').addClass(D).css({ position: "absolute", top: "-5000px", left: "-5000px", display: "block" }).appendTo("body"); C.ui.cssCache[D] = !!((!/auto|default/.test(E.css("cursor")) || (/^[1-9]/).test(E.css("height")) || (/^[1-9]/).test(E.css("width")) || !(/none/).test(E.css("backgroundImage")) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(E.css("backgroundColor")))); try { C("body").get(0).removeChild(E.get(0)) } catch (F) { } return C.ui.cssCache[D] }, disableSelection: function (D) { D.unselectable = "on"; D.onselectstart = function () { return false }; if (D.style) { D.style.MozUserSelect = "none" } }, enableSelection: function (D) { D.unselectable = "off"; D.onselectstart = function () { return true }; if (D.style) { D.style.MozUserSelect = "" } }, hasScroll: function (G, E) { var D = /top/.test(E || "top") ? "scrollTop" : "scrollLeft", F = false; if (G[D] > 0) { return true } G[D] = 1; F = G[D] > 0 ? true : false; G[D] = 0; return F } }); C.each(["Left", "Top"], function (E, D) { if (!C.fn["scroll" + D]) { C.fn["scroll" + D] = function (F) { return F != undefined ? this.each(function () { this == window || this == document ? window.scrollTo(D == "Left" ? F : C(window)["scrollLeft"](), D == "Top" ? F : C(window)["scrollTop"]()) : this["scroll" + D] = F }) : this[0] == window || this[0] == document ? self[(D == "Left" ? "pageXOffset" : "pageYOffset")] || C.boxModel && document.documentElement["scroll" + D] || document.body["scroll" + D] : this[0]["scroll" + D] } } }); var B = C.fn.remove; C.fn.extend({ position: function () { var F = this.offset(); var E = this.offsetParent(); var D = E.offset(); return { top: F.top - A(this[0], "marginTop") - D.top - A(E, "borderTopWidth"), left: F.left - A(this[0], "marginLeft") - D.left - A(E, "borderLeftWidth") } }, offsetParent: function () { var D = this[0].offsetParent; while (D && (!/^body|html$/i.test(D.tagName) && C.css(D, "position") == "static")) { D = D.offsetParent } return C(D) }, mouseInteraction: function (D) { return this.each(function () { new C.ui.mouseInteraction(this, D) }) }, removeMouseInteraction: function (D) { return this.each(function () { if (C.data(this, "ui-mouse")) { C.data(this, "ui-mouse").destroy() } }) }, remove: function () { jQuery("*", this).add(this).trigger("remove"); return B.apply(this, arguments) } }); function A(D, E) { return parseInt(C.curCSS(D.jquery ? D[0] : D, E, true)) || 0 } C.ui.mouseInteraction = function (F, E) { var D = this; this.element = F; C.data(this.element, "ui-mouse", this); this.options = C.extend({}, E); C(F).bind("mousedown.draggable", function () { return D.click.apply(D, arguments) }); if (C.browser.msie) { C(F).attr("unselectable", "on") } C(F).mouseup(function () { if (D.timer) { clearInterval(D.timer) } }) }; C.extend(C.ui.mouseInteraction.prototype, { destroy: function () { C(this.element).unbind("mousedown.draggable") }, trigger: function () { return this.click.apply(this, arguments) }, click: function (F) { if (F.which != 1 || C.inArray(F.target.nodeName.toLowerCase(), this.options.dragPrevention || []) != -1 || (this.options.condition && !this.options.condition.apply(this.options.executor || this, [F, this.element]))) { return true } var E = this; var D = function () { E._MP = { left: F.pageX, top: F.pageY }; C(document).bind("mouseup.draggable", function () { return E.stop.apply(E, arguments) }); C(document).bind("mousemove.draggable", function () { return E.drag.apply(E, arguments) }); if (!E.initalized && Math.abs(E._MP.left - F.pageX) >= E.options.distance || Math.abs(E._MP.top - F.pageY) >= E.options.distance) { if (E.options.start) { E.options.start.call(E.options.executor || E, F, E.element) } if (E.options.drag) { E.options.drag.call(E.options.executor || E, F, this.element) } E.initialized = true } }; if (this.options.delay) { if (this.timer) { clearInterval(this.timer) } this.timer = setTimeout(D, this.options.delay) } else { D() } return false }, stop: function (D) { var E = this.options; if (!this.initialized) { return C(document).unbind("mouseup.draggable").unbind("mousemove.draggable") } if (this.options.stop) { this.options.stop.call(this.options.executor || this, D, this.element) } C(document).unbind("mouseup.draggable").unbind("mousemove.draggable"); this.initialized = false; return false }, drag: function (D) { var E = this.options; if (C.browser.msie && !D.button) { return this.stop.apply(this, [D]) } if (!this.initialized && (Math.abs(this._MP.left - D.pageX) >= E.distance || Math.abs(this._MP.top - D.pageY) >= E.distance)) { if (this.options.start) { this.options.start.call(this.options.executor || this, D, this.element) } this.initialized = true } else { if (!this.initialized) { return false } } if (E.drag) { E.drag.call(this.options.executor || this, D, this.element) } return false } })
})(jQuery);
(function(A){A.fn.tabs=function(){var C=typeof arguments[0]=="string"&&arguments[0];var B=C&&Array.prototype.slice.call(arguments,1)||arguments;return C=="length"?A.data(this[0],"tabs").$tabs.length:this.each(function(){if(C){var D=A.data(this,"tabs");if(D){D[C].apply(D,B)}}else{new A.ui.tabs(this,B[0]||{})}})};A.ui.tabs=function(D,C){var B=this;this.options=A.extend({},A.ui.tabs.defaults,C);this.element=D;if(C.selected===null){this.options.selected=null}this.options.event+=".tabs";A(D).bind("setData.tabs",function(F,E,G){if((/^selected/).test(E)){B.select(G)}else{B.options[E]=G;B.tabify()}}).bind("getData.tabs",function(F,E){return B.options[E]});A.data(D,"tabs",this);this.tabify(true)};A.ui.tabs.defaults={selected:0,unselect:false,event:"click",disabled:[],cookie:null,spinner:"Loading&#8230;",cache:false,idPrefix:"ui-tabs-",ajaxOptions:{},fx:null,tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:"<div></div>",navClass:"ui-tabs-nav",selectedClass:"ui-tabs-selected",unselectClass:"ui-tabs-unselect",disabledClass:"ui-tabs-disabled",panelClass:"ui-tabs-panel",hideClass:"ui-tabs-hide",loadingClass:"ui-tabs-loading"};A.extend(A.ui.tabs.prototype,{tabId:function(B){return B.title&&B.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+A.data(B)},ui:function(C,B){return{instance:this,options:this.options,tab:C,panel:B}},tabify:function(N){this.$lis=A("li:has(a[href])",this.element);this.$tabs=this.$lis.map(function(){return A("a",this)[0]});this.$panels=A([]);var O=this,E=this.options;this.$tabs.each(function(Q,P){if(P.hash&&P.hash.replace("#","")){O.$panels=O.$panels.add(P.hash)}else{if(A(P).attr("href")!="#"){A.data(P,"href.tabs",P.href);A.data(P,"load.tabs",P.href);var S=O.tabId(P);P.href="#"+S;var R=A("#"+S);if(!R.length){R=A(E.panelTemplate).attr("id",S).addClass(E.panelClass).insertAfter(O.$panels[Q-1]||O.element);R.data("destroy.tabs",true)}O.$panels=O.$panels.add(R)}else{E.disabled.push(Q+1)}}});if(N){A(this.element).hasClass(E.navClass)||A(this.element).addClass(E.navClass);this.$panels.each(function(){var P=A(this);P.hasClass(E.panelClass)||P.addClass(E.panelClass)});this.$tabs.each(function(S,P){if(location.hash){if(P.hash==location.hash){E.selected=S;if(A.browser.msie||A.browser.opera){var R=A(location.hash),T=R.attr("id");R.attr("id","");setTimeout(function(){R.attr("id",T)},500)}scrollTo(0,0);return false}}else{if(E.cookie){var Q=parseInt(A.cookie("ui-tabs"+A.data(O.element)),10);if(Q&&O.$tabs[Q]){E.selected=Q;return false}}else{if(O.$lis.eq(S).hasClass(E.selectedClass)){E.selected=S;return false}}}});this.$panels.addClass(E.hideClass);this.$lis.removeClass(E.selectedClass);if(E.selected!==null){this.$panels.eq(E.selected).show().removeClass(E.hideClass);this.$lis.eq(E.selected).addClass(E.selectedClass)}var D=E.selected!==null&&A.data(this.$tabs[E.selected],"load.tabs");if(D){this.load(E.selected)}E.disabled=A.unique(E.disabled.concat(A.map(this.$lis.filter("."+E.disabledClass),function(Q,P){return O.$lis.index(Q)}))).sort();A(window).bind("unload",function(){O.$tabs.unbind(".tabs");O.$lis=O.$tabs=O.$panels=null})}for(var H=0,M;M=this.$lis[H];H++){A(M)[A.inArray(H,E.disabled)!=-1&&!A(M).hasClass(E.selectedClass)?"addClass":"removeClass"](E.disabledClass)}if(E.cache===false){this.$tabs.removeData("cache.tabs")}var C,J,B={"min-width":0,duration:1},F="normal";if(E.fx&&E.fx.constructor==Array){C=E.fx[0]||B,J=E.fx[1]||B}else{C=J=E.fx||B}var I={display:"",overflow:"",height:""};if(!A.browser.msie){I.opacity=""}function L(Q,P,R){P.animate(C,C.duration||F,function(){P.addClass(E.hideClass).css(I);if(A.browser.msie&&C.opacity){P[0].style.filter=""}if(R){K(Q,R,P)}})}function K(Q,R,P){if(J===B){R.css("display","block")}R.animate(J,J.duration||F,function(){R.removeClass(E.hideClass).css(I);if(A.browser.msie&&J.opacity){R[0].style.filter=""}A(O.element).triggerHandler("tabsshow",[O.ui(Q,R[0])],E.show)})}function G(Q,S,P,R){S.addClass(E.selectedClass).siblings().removeClass(E.selectedClass);L(Q,P,R)}this.$tabs.unbind(".tabs").bind(E.event,function(){var S=A(this).parents("li:eq(0)"),P=O.$panels.filter(":visible"),R=A(this.hash);if((S.hasClass(E.selectedClass)&&!E.unselect)||S.hasClass(E.disabledClass)||A(this).hasClass(E.loadingClass)||A(O.element).triggerHandler("tabsselect",[O.ui(this,R[0])],E.select)===false){this.blur();return false}O.options.selected=O.$tabs.index(this);if(E.unselect){if(S.hasClass(E.selectedClass)){O.options.selected=null;S.removeClass(E.selectedClass);O.$panels.stop();L(this,P);this.blur();return false}else{if(!P.length){O.$panels.stop();var Q=this;O.load(O.$tabs.index(this),function(){S.addClass(E.selectedClass).addClass(E.unselectClass);K(Q,R)});this.blur();return false}}}if(E.cookie){A.cookie("ui-tabs"+A.data(O.element),O.options.selected,E.cookie)}O.$panels.stop();if(R.length){var Q=this;O.load(O.$tabs.index(this),P.length?function(){G(Q,S,P,R)}:function(){S.addClass(E.selectedClass);K(Q,R)})}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(A.browser.msie){this.blur()}return false});if(!(/^click/).test(E.event)){this.$tabs.bind("click.tabs",function(){return false})}},add:function(E,D,C){if(C==undefined){C=this.$tabs.length}var G=this.options;var I=A(G.tabTemplate.replace(/#\{href\}/,E).replace(/#\{label\}/,D));I.data("destroy.tabs",true);var H=E.indexOf("#")==0?E.replace("#",""):this.tabId(A("a:first-child",I)[0]);var F=A("#"+H);if(!F.length){F=A(G.panelTemplate).attr("id",H).addClass(G.panelClass).addClass(G.hideClass);F.data("destroy.tabs",true)}if(C>=this.$lis.length){I.appendTo(this.element);F.appendTo(this.element.parentNode)}else{I.insertBefore(this.$lis[C]);F.insertBefore(this.$panels[C])}G.disabled=A.map(G.disabled,function(K,J){return K>=C?++K:K});this.tabify();if(this.$tabs.length==1){I.addClass(G.selectedClass);F.removeClass(G.hideClass);var B=A.data(this.$tabs[0],"load.tabs");if(B){this.load(C,B)}}A(this.element).triggerHandler("tabsadd",[this.ui(this.$tabs[C],this.$panels[C])],G.add)},remove:function(B){var D=this.options,E=this.$lis.eq(B).remove(),C=this.$panels.eq(B).remove();if(E.hasClass(D.selectedClass)&&this.$tabs.length>1){this.select(B+(B+1<this.$tabs.length?1:-1))}D.disabled=A.map(A.grep(D.disabled,function(G,F){return G!=B}),function(G,F){return G>=B?--G:G});this.tabify();A(this.element).triggerHandler("tabsremove",[this.ui(E.find("a")[0],C[0])],D.remove)},enable:function(B){var C=this.options;if(A.inArray(B,C.disabled)==-1){return }var D=this.$lis.eq(B).removeClass(C.disabledClass);if(A.browser.safari){D.css("display","inline-block");setTimeout(function(){D.css("display","block")},0)}C.disabled=A.grep(C.disabled,function(F,E){return F!=B});A(this.element).triggerHandler("tabsenable",[this.ui(this.$tabs[B],this.$panels[B])],C.enable)},disable:function(C){var B=this,D=this.options;if(C!=D.selected){this.$lis.eq(C).addClass(D.disabledClass);D.disabled.push(C);D.disabled.sort();A(this.element).triggerHandler("tabsdisable",[this.ui(this.$tabs[C],this.$panels[C])],D.disable)}},select:function(B){if(typeof B=="string"){B=this.$tabs.index(this.$tabs.filter("[href$="+B+"]")[0])}this.$tabs.eq(B).trigger(this.options.event)},load:function(F,K){var L=this,C=this.options,D=this.$tabs.eq(F),J=D[0],G=K==undefined||K===false,B=D.data("load.tabs");K=K||function(){};if(!B||(A.data(J,"cache.tabs")&&!G)){K();return }if(C.spinner){var H=A("span",J);H.data("label.tabs",H.html()).html("<em>"+C.spinner+"</em>")}var I=function(){L.$tabs.filter("."+C.loadingClass).each(function(){A(this).removeClass(C.loadingClass);if(C.spinner){var M=A("span",this);M.html(M.data("label.tabs")).removeData("label.tabs")}});L.xhr=null};var E=A.extend({},C.ajaxOptions,{url:B,success:function(N,M){A(J.hash).html(N);I();K();if(C.cache){A.data(J,"cache.tabs",true)}A(L.element).triggerHandler("tabsload",[L.ui(L.$tabs[F],L.$panels[F])],C.load);C.ajaxOptions.success&&C.ajaxOptions.success(N,M)}});if(this.xhr){this.xhr.abort();I()}D.addClass(C.loadingClass);setTimeout(function(){L.xhr=A.ajax(E)},0)},url:function(C,B){this.$tabs.eq(C).removeData("cache.tabs").data("load.tabs",B)},destroy:function(){var B=this.options;A(this.element).unbind(".tabs").removeClass(B.navClass).removeData("tabs");this.$tabs.each(function(){var C=A.data(this,"href.tabs");if(C){this.href=C}var D=A(this).unbind(".tabs");A.each(["href","load","cache"],function(E,F){D.removeData(F+".tabs")})});this.$lis.add(this.$panels).each(function(){if(A.data(this,"destroy.tabs")){A(this).remove()}else{A(this).removeClass([B.selectedClass,B.unselectClass,B.disabledClass,B.panelClass,B.hideClass].join(" "))}})}});A.extend(A.ui.tabs.prototype,{rotation:null,rotate:function(C,F){F=F||false;var B=this,E=this.options.selected;function G(){B.rotation=setInterval(function(){E=++E<B.$tabs.length?E:0;B.select(E)},C)}function D(H){if(!H||H.clientX){clearInterval(B.rotation)}}if(C){G();if(!F){this.$tabs.bind(this.options.event,D)}else{this.$tabs.bind(this.options.event,function(){D();E=B.options.selected;G()})}}else{D();this.$tabs.unbind(this.options.event,D)}}})})(jQuery);
/// <reference path="~/js/jquery-1.8.3.js"/>
$(document).ready(function () {
    $("#featured > ul").tabs({ fx: [{ opacity: 'fadeOut', duration: 'fast' }, { opacity: "toggle", duration: 'fast' }] }).tabs("rotate", 5000, true);
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
        DD_belatedPNG.fix('div, ul, img, li, input , a:hover');
    }
    $("#featured > ul a").each(function () {
        $(this).focus(function () {
            $(this).blur();
        });
    });
});
///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
(function ($) {
    $.fn.ContentHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: $this.attr("generalId"),
                    script: "3"
                },
                success: function (data) {
                    $this.html(data.hits);
                }
            });
        });
    };

    $.fn.ContentHrefHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            var hot = 'false';
            if ($this.attr("data-hot")) {
                hot = $this.attr("data-hot");
            }
            var fieldName = "";
            if ($this.attr("data-fieldName")) {
                fieldName = $this.attr("data-fieldName");
            }
            $this.click(function () {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://click.gamersky.com/Common/GetHits.aspx",
                    data: {
                        id: $this.attr("data-itemid"),
                        script: "3",
                        hot: hot,
                        fieldName: fieldName
                    },
                    success: function (data) {
                    }
                });
            });
        });
    };


    $.fn.PagerHotKey = function (options) {
        return this.each(function () {
            var $this = $(this);
            $(document).bind('keydown', 'left', function (event) {
                if ($(event.target).is('textarea')) {
                    return;
                }
                var currentPage = $this.find("b");
                if (currentPage.prev("a").length > 0) {
                    window.location.href = currentPage.prev("a").attr("href");
                }
            });
            $(document).bind('keydown', 'right', function (event) {
                if ($(event.target).is('textarea')) {
                    return;
                }
                var currentPage = $this.find("b");
                if (currentPage.next("a").length > 0) {
                    window.location.href = currentPage.next("a").attr("href");
                }
            });
        });
    }
})(jQuery);

$("#countn").ContentHit();
//init
$(document).ready(function () {
    // $(".countHit").ContentHrefHit();
    $(document).on("click", ".countHit,.countHitSql", function () {
        var $this = $(this);
        var judge = "false";
        if ($this.hasClass("countHitSql")) {
            judge = "true";
        }
        var hot = 'false';
        if ($this.attr("data-hot"))
        {
            hot = $this.attr("data-hot");
        }
        var fieldName = "";
        if ($this.attr("data-fieldName"))
        {
            fieldName = $this.attr("data-fieldName");
        }
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://click.gamersky.com/Common/GetHits.aspx",
            data: { id: $this.attr("data-itemid"), script: "3", hot: hot, fieldName: fieldName, judge: judge },
            success: function (data){ }
        });
    });

    $(".page_css").PagerHotKey();

    var cycm = "";
    $(".cy_comment").each(function () {
        if (cycm != "") {
            cycm = cycm + ","
        }
        cycm = cycm + $(this).attr("data-sid");
    });
    var cycmIds = "";
    $(".cy_commentnum").each(function () {
        if (cycmIds != "") {
            cycmIds = cycmIds + ","
        }
        cycmIds = cycmIds + $(this).attr("data-sid");
    });
    var gshit = "";
    $(".gshit").each(function () {
        if (gshit != "") {
            gshit = gshit + ","
        }
        gshit = gshit + $(this).attr("data-gid");
    });
    function addCyComment(arr) {
        $.ajax({
            type: "GET",
            url: "http://cm.gamersky.com/commentapi/count",
            dataType: "jsonp",
            data: {
                topic_source_id: arr
            },
            success: function (responseJson) {
                $(".cy_comment").each(function () {
                    if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                        var cmobj = responseJson.result[$(this).attr("data-sid")];
                        $(this).text(cmobj.joinCount).attr('data-lddt','yes');
                    }
                });
            }
        });
    }
    function addCyCommentnum(arr) {
        $.ajax({
            type: "GET",
            url: "http://cm.gamersky.com/commentapi/count",
            dataType: "jsonp",
            data: {
                topic_source_id: arr
            },
            success: function (responseJson) {

                $(".cy_commentnum").each(function () {
                    if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                        var cmobj = responseJson.result[$(this).attr("data-sid")];
                        $(this).text(cmobj.comments).attr('data-lddt','yes');
                    }
                });
            }
        });
    }
    function addGshit(arr) {
        $.ajax({
            type: "GET",
            url: "http://db2.gamersky.com/showAllHits.aspx",
            dataType: "jsonp",
            data: {
                id: arr
            },
            success: function (responseJson) {
                for (var i = 0; i < responseJson.length; i++) {
                    var hitobj = responseJson[i];
                    $(".gshit[data-gid='" + hitobj.generalId + "']").text(hitobj.hits).attr('data-lddt','yes');
                }
            }
        });
    }
    function separateArray(targetArr,size,callback) {
        function sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        }
        var arrTmp = targetArr.split(','),arr = [];
        arr = sliceArray(arrTmp,size);
        $.each(arr,function (i,item) {
            var getArr = item+'';
            if(typeof callback === 'function'){
                callback(getArr);
            }
        });
    }
    if (cycm != "") {
        separateArray(cycm,180,addCyComment);
    }
    if (cycmIds != "") {
        separateArray(cycmIds,180,addCyCommentnum);
    }
    if (gshit != "") {
        separateArray(gshit,180,addGshit);
    }

});
/// <reference path="~/js/jquery-1.8.3.js"/>
/// <reference path="/js/jquery.peex.js"/>
/// <reference path="/js/jquery.cookie.js"/>
/// <reference path="/js/json2.js"/>
(function ($) {
    var commentJsonpUrl = "http://cm.gamersky.com/commentajax.aspx";
    var commentCookieName = "CommentConent";
    var randomNumber = function (n) {
        var rnd = '';
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    };
    var chineseStrLen = function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1   
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
        }
        return len;
    };
    var addComment = function (userName, commentContent, commentValidCode, referenceId, isGuest, commentValidCodeEle) {

        if (commentContent.length > 500) {
            alert("发表评论字数不能超500字！");
            return;
        }

        var _commentContent = commentContent.replace(/[\r\n]/g, '<br />');
        _commentContent = encodeURI($.trim(_commentContent));


        var jsondata = {
            type: "addcomment",
            username: userName,
            commenttitle: '',
            content: _commentContent,
            email: '',
            gid: $(".commentStatus").attr("itemid"),
            nid: $(".commentStatus").attr("nodeid"),
            "private": false,
            position: 0,
            score: 0,
            TxtValidCode: commentValidCode,
            isguest: isGuest.toString(),
            referenceid: referenceId
        };

        $.ajax({
            type: "GET",
            url: commentJsonpUrl,
            dataType: "jsonp",
            data: {
                jsondata: JSON2.stringify(jsondata)
            },
            success: function (responseJson) {
                switch (responseJson.status) {
                    case "ok":
                        $.removeCookie(commentCookieName, { path: '/' });
                        if (typeof (initComment) == "function") {

                            $.ajax({
                                type: "GET",
                                url: commentJsonpUrl,
                                dataType: "jsonp",
                                data: {
                                    jsondata: JSON2.stringify({ type: "removecache", itemId: $(".commentStatus").attr("itemid") })
                                },
                                success: function (responseJson) {
                                    initComment();
                                }
                            });

                        }
                        break;
                    case "check":
                        $.removeCookie(commentCookieName, { path: '/' });
                        if (typeof (initComment) == "function") {

                            $.ajax({
                                type: "GET",
                                url: commentJsonpUrl,
                                dataType: "jsonp",
                                data: {
                                    jsondata: JSON2.stringify({ type: "removecache", itemId: $(".commentStatus").attr("itemid") })
                                },
                                success: function (responseJson) {
                                    initComment();
                                }
                            });

                        }
                        else {
                            window.location.href = '#commentform';
                        }
                        break;
                    case "err":
                        alert("发表评论失败！");
                        break;
                    case "nopurview":
                        alert("此栏目已禁止发表评论！");
                        break;
                    case "noTourists":
                        alert("此栏目已禁止游客发表评论！");
                        break;
                    case "checkCodeError":
                        $(commentValidCodeEle).click();
                        alert("您输入的验证码和系统产生的不一致，请重新输入！");
                        break;
                    case "lenError":
                        alert("发表评论字数不能超500字！");
                        break;
                    default:
                        alert("发表评论失败！");
                        break;
                }
            }
        });

    };
    $.fn.extend({
        comment: function (options) {
            $(window).unload(function () {
                $.removeCookie(commentCookieName, { path: '/' });
            });

            return this.each(function () {
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    isShowMore: $(this).attr("isShowMore"),
                    isShowHot: $(this).attr("isShowHot"),
                    showListType: $(this).attr("showListType"),
                    isPage: 'true',
                    pageSize: parseInt($(this).attr("pageSize")) == 0 ? 10 : parseInt($(this).attr("pageSize")),
                    currentPage: 0
                }, options);

                var $this = $(this);
                $this.html("");
                $(".commentloading").show();

                var jsondata = {
                    type: "updatelabel", labelname: "游民星空评论", attr: {
                        generalId: op.itemId,
                        nodeId: op.nodeId,
                        displayType: 'all',
                        isShowMore: op.isShowMore,
                        isShowHot: op.isShowHot,
                        commnetPageSize: op.pageSize,
                        showListType: op.showListType
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.append($(responseJson.body));
                        $this.find(".commentlist").commentList({
                            callback: function () {
                                $(".commentloading").hide();

                                $this.find(".commentCount").text($this.find(".commentlist").attr("total"));
                                var showCommentList = $this.find(".commentlist").attr("showCommentList");
                                if (showCommentList == "false") {
                                    $this.find(".hd").hide();
                                    $this.find(".bd .title").remove();
                                    $this.find(".bd").prepend($this.find(".hd .title"));
                                }
                            }
                        });

                        $this.find(".commentHotList").commentHot();

                        $this.find(".mainCommentContainer").commentAdd();
                        $this.find(".mainCommentContainer").commentUserLogin();
                    }
                });
            });
        },
        commentHot: function (options) {
            return this.each(function () {
                var $this = $(this);
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    listLabelName: '游民星空热门评论'
                }, options);

                var jsondata = {
                    type: "updatelabel", labelname: op.listLabelName, attr: {
                        itemId: op.itemId
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.html(responseJson.body);
                        $this.commentAction();
                    }
                });
            });
        },
        commentAdd: function (options) {
            return this.each(function () {
                var $this = $(this);
                var $title = $this.find(".title");
                var template = $("#addCommentTemplate").html();
                $this.html("");
                $this.append($title);
                $this.append($(template));

                var _$mainCommentContent = $this.find('.mainCommentContent');

                _$mainCommentContent.keyup(function () {
                    var maxChars = 500;
                    if ($(this).val().length > maxChars)
                        $(this).val($(this).val().substring(0, maxChars));
                    var curr = maxChars - $(this).val().length;
                    $this.find('.butleft').html('剩余字数：' + curr.toString());
                });
                _$mainCommentContent.keydown(function (event) {
                    event.stopPropagation();
                });
                var _userName = $(".commentStatus").attr("commentusername");

                $this.find('.mainCommentValidCodeImg').click(function () {
                    var imageSrc = $(this).attr("src");
                    if (imageSrc.indexOf("?") >= 0) {
                        $(this).attr("src", imageSrc.split("?")[0] + '?code=' + randomNumber(10));
                    }
                    else {
                        $(this).attr("src", imageSrc + '?code=' + randomNumber(10));
                    }
                });

                $this.find(".mainSubmitButton").click(function () {
                    var _userName = $(".commentStatus").attr("commentusername");
                    var commentPermissionType = $(".commentStatus").attr("commentpermissiontype");
                    var _$replyIsUser = $this.find('.replyIsGuest');
                    if (commentPermissionType == "1" && _userName == '游客') {
                        alert("请先登录再发表评论！");
                        return false;
                    }
                    if (commentPermissionType == 0 && !_$replyIsUser.attr("checked") && _userName == '游客') {
                        alert("请先登录或选择游客发表！");
                        return false;
                    }

                    if ($.trim(_$mainCommentContent.val()) == '') {
                        alert("请输入评论内容！");
                        _$mainCommentContent.focus();
                        return false;
                    }

                    if (_$replyIsUser.attr("checked") && _userName == '游客' && chineseStrLen(_$mainCommentContent.val()) < 10) {
                        alert("游客发表，评论内容不得少于5个字！");
                        _$mainCommentContent.focus();
                        return false;
                    }

                    var _validCode = '';
                    var _validCodeType = $(".commentStatus").attr("commentvalidatecodetype");
                    if (_validCodeType == '0' || (_validCodeType == '1' && _userName == '游客')) {
                        var _$mainCommentValidCode = $this.find('.mainCommentValidCode');
                        if (_$mainCommentValidCode.length != 0 && _$mainCommentValidCode.val() == '') {
                            alert("请输入验证码！");
                            _$mainCommentValidCode.focus();
                            return false;
                        }
                        _validCode = _$mainCommentValidCode.val();
                    }
                    var _commentContent = _$mainCommentContent.val();

                    addComment(_userName, _commentContent, _validCode, 0, false, '.mainCommentValidCode');
                });
            });
        },
        commentList: function (options) {
            return this.each(function () {
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    pageSize: parseInt($(this).attr("pageSize")) == 0 ? 10 : parseInt($(this).attr("pageSize")),
                    listLabelName: '游民星空评论列表',
                    currentPage: parseInt($(this).attr("currentPage")) == 0 ? 1 : parseInt($(this).attr("currentPage")),
                    showCommentList: $(this).attr("showCommentList"),
                    callback: function () { }
                }, options);
                var $this = $(this);

                var jsondata = {
                    type: "updatelabel", labelname: op.listLabelName, currentpage: op.currentPage, cachetime: 60, attr: {
                        itemId: op.itemId,
                        page: 'true',
                        pagesize: op.pageSize,
                        currentpage: op.currentPage
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        if (op.showCommentList == "false") {
                            $this.hide();
                        }
                        $this.html(responseJson.body);
                        $this.attr("total", responseJson.total);
                        $($this.attr("pager")).commentPager();
                        $this.commentAction();
                        op.callback();
                    }
                });
            });
        },
        commentUserLogin: function (options) {
            return this.each(function () {
                var $this = $(this);

                $(document).bind('login', function () {
                    var parentComment = $this.parents("#commentform");
                    var op = {
                        itemId: parseInt(parentComment.attr("itemId")),
                        nodeId: parseInt(parentComment.attr("nodeId")),
                        isShowMore: parentComment.attr("isShowMore"),
                        isShowHot: parentComment.attr("isShowHot"),
                        showListType: parentComment.attr("showListType"),
                        pageSize: parseInt(parentComment.attr("pageSize")) == 0 ? 10 : parseInt(parentComment.attr("pageSize"))
                    };
                    var jsondata = {
                        type: "updatelabel", labelname: "游民星空评论", attr: {
                            generalId: op.itemId,
                            nodeId: op.nodeId,
                            displayType: 'template',
                            isShowMore: op.isShowMore,
                            isShowHot: op.isShowHot,
                            commnetPageSize: op.pageSize,
                            showListType: op.showListType
                        }
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $("#replayCommentTemplate,#addCommentTemplate,.commentStatus").remove();
                            parentComment.append($(responseJson.body));
                            $(document).trigger('updateReplay');
                            $(".mainCommentContainer").commentAdd();
                            $(".mainCommentContainer").commentUserLogin();
                        }
                    });
                });

                $(document).bind('logout', function () {
                    var parentComment = $this.parents("#commentform");
                    var op = {
                        itemId: parseInt(parentComment.attr("itemId")),
                        nodeId: parseInt(parentComment.attr("nodeId")),
                        isShowMore: parentComment.attr("isShowMore"),
                        isShowHot: parentComment.attr("isShowHot"),
                        showListType: parentComment.attr("showListType"),
                        pageSize: parseInt(parentComment.attr("pageSize")) == 0 ? 10 : parseInt(parentComment.attr("pageSize"))
                    };
                    var jsondata = {
                        type: "updatelabel", labelname: "游民星空评论", attr: {
                            generalId: op.itemId,
                            nodeId: op.nodeId,
                            displayType: 'template',
                            isShowMore: op.isShowMore,
                            isShowHot: op.isShowHot,
                            commnetPageSize: op.pageSize,
                            showListType: op.showListType
                        }
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $("#replayCommentTemplate,#addCommentTemplate,.commentStatus").remove();
                            parentComment.append($(responseJson.body));
                            $(document).trigger('updateReplay');
                            $(".mainCommentContainer").commentAdd();
                            $(".mainCommentContainer").commentUserLogin();
                        }
                    });
                });

            });
        },
        commentAction: function (options) {
            return this.each(function () {
                var $this = $(this);
                $this.find(".addpkzone").click(function (event) {
                    event.preventDefault();
                    var $addpkzone = $(this);

                    var jsondataPK = {
                        type: "addcommentpk", commentid: parseInt($addpkzone.attr("rel")), position: 1, content: "support"
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondataPK)
                        },
                        success: function (responseJson) {
                            switch (responseJson.status) {
                                case "ok":
                                    $addpkzone.find(".comment_pkcount").html(parseInt($addpkzone.find(".comment_pkcount").html()) + 1);
                                    break;
                                case "AnonymousAgain":
                                case "UserAgain":
                                    alert("对不起，您已经顶过了！");
                                    break;
                                case "NotAuthenticated":
                                    alert("登录会员才能使用！");
                                    if (window.location.hash) {
                                        window.location.hash = "";
                                    }
                                    window.location.hash = "#commentLogin";
                                    break;
                                default:
                                    alert("提交失败！");
                                    break;
                            }
                        }
                    });

                });

                $this.find("a[rel='moreline']").click(function (event) {
                    event.preventDefault();
                    var refCommentId = $(this).attr("refCommentId");
                    $this.find("li[rel='refCommentList'][refCommentId='" + refCommentId + "']").show();
                    $(this).parents(".refCommentMore").hide();
                });

                $this.find(".replyButtonLink,.repalyLink a").click(function (event) {
                    event.preventDefault();

                    $this.find(".closeReplayCommentButton").click();

                    var $replayButtonLink = $(this);

                    var commentId = $replayButtonLink.attr("rel");
                    var $replay = $("");

                    if ($(this).attr("refcommentid")) {
                        var refCommentId = $(this).attr("refcommentid");
                        $replay = $this.find('.replyBox[rel="' + commentId + '"][refcommentid="' + refCommentId + '"]');
                    }
                    else {
                        $replay = $this.find('.newreply[rel="' + commentId + '"]');
                    }

                    var template = $("#replayCommentTemplate").html();
                    var _$replyContainer = $(template);
                    $replay.html("");
                    _$replyContainer.appendTo($replay).show();
                    $replayButtonLink.attr("data-state", "open");
                    $replay.focus();
                    $replay.find(".closeReplayCommentButton").click(function () {
                        $replay.html("");
                        $replayButtonLink.attr("data-state", "close");
                    });


                    $replay.commentUserLogin();

                    $(document).one('updateReplay', function () {
                        if ($replayButtonLink.attr("data-state") == "open") {
                            $replayButtonLink.click();
                        }
                    });

                    var $cookieContent = $.cookie(commentCookieName);
                    if ($cookieContent) {
                        $replay.find(".replyCommentContent").val($cookieContent);
                    }

                    $replay.find(".replyCommentContent").keyup(function () {
                        var maxChars = 500;
                        $.cookie(commentCookieName, $(this).val(), { expires: 7, path: '/' });
                        if ($(this).val().length > maxChars)
                            $(this).val($(this).val().substring(0, maxChars));
                        var curr = maxChars - $(this).val().length;
                        $replay.find('.replyChLeft').html(curr.toString());
                    });
                    $replay.find(".replyCommentContent").keydown(function (event) {
                        event.stopPropagation();
                    });

                    $replay.find('.replyCommentValidCodeImg').click(function () {
                        var imageSrc = $(this).attr("src");
                        if (imageSrc.indexOf("?") >= 0) {
                            $(this).attr("src", imageSrc.split("?")[0] + '?code=' + randomNumber(10));
                        }
                        else {
                            $(this).attr("src", imageSrc + '?code=' + randomNumber(10));
                        }
                    });
                    $replay.find(".replySubmitButton").click(function () {
                        var _userName = $(".commentStatus").attr("commentusername");
                        var commentPermissionType = $(".commentStatus").attr("commentpermissiontype");
                        var _$replyIsUser = $replay.find('.replyIsGuest');
                        if (commentPermissionType == "1" && _userName == '游客') {
                            alert("请先登录再发表评论！");
                            return false;
                        }
                        if (commentPermissionType == 0 && !_$replyIsUser.attr("checked") && _userName == '游客') {
                            alert("请先登录或选择游客发表！");
                            return false;
                        }
                        var _commentId = commentId;
                        var _$replyCommentContent = $replay.find(".replyCommentContent");
                        if ($.trim(_$replyCommentContent.val()) == '') {
                            alert("请输入评论内容！");
                            _$replyCommentContent.focus();
                            return false;
                        }

                        if (_$replyIsUser.attr("checked") && _userName == '游客' && chineseStrLen(_$replyCommentContent.val()) < 10) {
                            alert("游客发表，评论内容不得少于5个字！");
                            _$replyCommentContent.focus();
                            return false;
                        }

                        var _validCode = '';
                        var _validCodeType = $(".commentStatus").attr("commentvalidatecodetype");
                        if (_validCodeType == '0' || (_validCodeType == '1' && _userName == '游客')) {
                            var _$replyCommentValidCode = $replay.find(".replyCommentValidCode");
                            if (_$replyCommentValidCode.length != 0 && _$replyCommentValidCode.val() == '') {
                                alert("请输入验证码！");
                                _$replyCommentValidCode.focus();
                                return false;
                            }
                            _validCode = _$replyCommentValidCode.val();
                        }
                        var _commentContent = _$replyCommentContent.val();
                        var _isGuest = false;
                        addComment(_userName, _commentContent, _validCode, _commentId, _isGuest, '.replyCommentValidCodeImg');
                    });
                });
            });
        },
        commentPager: function (options) {

            return this.each(function () {
                var op = $.extend({
                    commentList: $(this).attr("commentList"),
                    pageSize: 10,
                    listLabelName: '游民星空评论列表',
                    pageLabelName: '游民评论分页',
                    callback: function () { }
                }, options);

                var recordCount = parseInt($(op.commentList).attr("total"));
                var currentPage = parseInt($(op.commentList).attr("currentPage")) == 0 ? 1 : parseInt($(op.commentList).attr("currentPage"));
                var pageSize = parseInt($(op.commentList).attr("pageSize")) == 0 ? 10 : parseInt($(op.commentList).attr("pageSize"));
                var $this = $(this);
                if (recordCount > 0) {
                    $this.show();

                    var jsondata = {
                        type: "updatepage", labelname: op.pageLabelName, sourcename: op.listLabelName, pagesize: pageSize, currentpage: currentPage, cachetime: 60, total: recordCount
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $this.html(responseJson.body);
                            $this.find("a").click(function (event) {
                                event.preventDefault();
                                $(op.commentList).attr("currentPage", $(this).attr("page"));
                                $(op.commentList).commentList({
                                    callback: function () {
                                        var hash = window.location.hash;
                                        if (!hash) {
                                            window.location.href = window.location.href + "#comment";
                                        } else {
                                            window.location.href = window.location.href.substring(0, window.location.href.indexOf('#')) + "#comment";
                                        }

                                        if ($.browser.msie) {
                                            var cleanTitle = function (title) {
                                                if (title.indexOf('#') != -1) {
                                                    var cleanedTitle = title.substring(0, title.indexOf('#'));
                                                    title = cleanedTitle
                                                }
                                                return title;
                                            };
                                            var oldTitle = document.title || '';
                                            document.title = cleanTitle(oldTitle);
                                        }
                                    }
                                });
                            });

                            op.callback();
                        }
                    });
                }
                else {
                    $this.hide();
                }
            });
        }
    });

    function initComment() {
        $("#commentform").comment();
    };
    initComment();

    (function () {
        var cleanTitle = function (title) {
            if (title.indexOf('#') != -1) {
                var cleanedTitle = title.substring(0, title.indexOf('#'));
                title = cleanedTitle
            }
            return title;
        };
        var oldTitle = document.title || '';
        document.title = cleanTitle(oldTitle);
        document.onpropertychange = function () {
            var docTitle = document.title || '';
            if (window.event.propertyName === 'title' && docTitle !== oldTitle) {
                document.title = cleanTitle(docTitle);
            }
        }
    })();
})(jQuery);
/// <reference path="~/js/jquery-1.8.3.js"/>
(function ($) {
    $.fn.ContentScore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find(".contentscore").mouseout(function () {
                var scoreRanking = parseInt($(".contentscore[scored='true']").attr("ranking"));

                $this.find(".contentscore").each(function () {
                    var ranking = parseInt($(this).attr("ranking"));
                    var src = ranking <= scoreRanking ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
                    $(this).attr("src", src);
                });

            }).mouseover(function () {
                var scoreRanking = parseInt($(this).attr("ranking"));

                $this.find(".contentscore").each(function () {
                    var ranking = parseInt($(this).attr("ranking"));
                    var src = ranking <= scoreRanking ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
                    $(this).attr("src", src);
                });

            }).click(function () {
                var genneralId = parseInt($(this).attr("itemId"));
                $.pe.ajax('contentpk', {
                    params: {
                        GenneralId: genneralId,
                        Score: parseInt($(this).attr("ranking")),
                        Type: 0
                    },
                    success: function (response) {
                        var data = $(response);
                        var status = data.find('status').text();
                        var result = data.find('result').text();
                        switch (status) {
                            case "ok":
                                $("#contentScoreInit").ContentScoreInit();
                                break;
                            case "AnonymousAgain":
                            case "UserAgain":
                                alert("对不起，您已经评价过了，请勿再评价！");
                                break;
                            case "err":
                                alert("文章评分失败！");
                                break;

                        }
                    }
                });
            });
        });
    };

    $.fn.ContentScoreInit = function (options) {
        return this.each(function () {
            $this = $(this);
            $.pe.ajax('GetContentPKResult', {
                params: {
                    GenneralId: $this.attr("itemId")
                },
                success: function (response) {
                    var data = $(response);
                    var status = data.find('status').text();
                    var totalCount = data.find('totalCount').text();
                    var averageScore = data.find('averageScore').text();
                    switch (status) {
                        case "ok":
                            $this.find(".totalCount").html(totalCount);
                            $this.find(".averageScore").html(averageScore);
                            break;
                        case "err":
                            break;
                    }
                }
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    $("#contentScoreInit").ContentScoreInit();
    $("#contentScoreRanking").ContentScore();
});
///<reference path="/js/jquery-1.8.3.js"/>
(function ($) {
    $.fn.ThunderDownLoad = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://click.gamersky.com/Common/GetHits.aspx",
                    data: {
                        id: $this.attr("itemid"),
                        script: "3",
                        hot: "true"
                    },
                    success: function (data) {
                    }
                });

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db4.gamersky.com/Common/ShowDownloadUrlJsonp.aspx",
                    data: {
                        urlid: $this.attr("urlid"),
                        id: $this.attr("itemid")
                    },
                    success: function (data) {
                        if (data.status == "ok") {
                            var thunder_url = data.body;
                            if (thunderHrefAttr) {
                                $this.attr(thunderHrefAttr, ThunderEncode(thunder_url));
                            }
                            else {
                                $this.attr("thunderHref", ThunderEncode(thunder_url));
                            }

                            $this.attr("thunderPid", "51185");
                            $this.attr("thunderResTitle", "");
                            $this.contextmenu(function () {
                                ThunderNetwork_SetHref(this);
                            });

                            $this.unbind("click");
                            $this.click(function (event) {
                                event.preventDefault();
                                OnDownloadClick_Simple(this, 2, 4);
                            });

                            OnDownloadClick_Simple($this.get(0), 2, 4);
                        }
                        else {
                        }
                    }
                });
            });
        });
    };

    $(document).ready(function () {
        $(".gsthunder").ThunderDownLoad();
        $(".dvurl1 li a").attr("target", "_blank");
    });
})(jQuery);
(function ($) {

    Number.prototype.toFixed = function (d) {
        var s = this + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {
                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

            } if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        } return this + "";

    };


    $.fn.KuScore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $(".midL1_2").bind("selectstart", function () { return false; });	//禁止选中复制

            var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

            if ($.cookie(cookieKey) !== undefined) {
                $this.unbind("mousemove");

                var kuScore = JSON2.parse($.cookie(cookieKey));
                $(".S3_2").html(kuScore.Sorce);
                var scoreEle = parseInt(parseFloat(kuScore.Sorce) * 2) - 1;
                $this.find("ul").attr("class", "u" + String(scoreEle));
                var leftWidth = 0;
                $this.find("ul li").each(function (i) {
                    if (i <= scoreEle) {
                        if ((i & 1) != 0) {
                            leftWidth = leftWidth + 1;
                        }
                        leftWidth = leftWidth + $(this).width();
                    }
                });
                $this.find("span").css("left", leftWidth);
            }
            else {
                var vL = $this.offset().left + 1.5, vW = $this.width();
                $this.mousemove(function (event) {
                    var Le = event.pageX - vL, inde = $this.find("ul li").index();
                    if (Le >= 0 && Le <= vW - 13) {
                        $this.find("span").css("left", Le);
                        if (Le <= 0) { $(".S3_2").html("0.0"); $this.find("ul").attr("class", ""); }
                        var LL = 0, j = 0, htm = "";
                        for (var i = 0; i <= inde; i++) {
                            LL = (i & 1) != 0 ? LL + 7 : LL + 6;
                            j = j + 0.5;
                            htm = String(j).length == 1 ? j.toFixed(1) : j;
                            if (Le > LL - ((i & 1) != 0 ? 7 : 6) && Le <= LL) { $(".S3_2").html(htm); $this.attr("data-sorce", htm); $this.find("ul").attr("class", "u" + i); }
                        }
                    }
                });
            }
        });
    };


    $.fn.Rating = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }
              
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };
    $.fn.RatingGame = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };

    $.fn.RatingGamersky = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.RatingUrl != "") {
                        var html = " <a href='" + data.RatingUrl + "'  target='_blank'><div class='PFl_num S1_2'>" + data.EditorRating + "</div></a>";
                        $this.append(html);
                    }
                    else {
                        var html = "<div class='PFl_num S1_2'>--</div>";
                        $this.append(html);
                    }

                }
            });


        });
    };


    $.fn.RatingGroup = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            var number1 = $(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:

                                break;
                        }
                    }
                    else {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $("#" + totleid).html(0);
                            }
                        });

                        var like = $("#like").html();
                        var unlike = $("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".btn12").width();
                        if (isNaN(sorce)) {
                            $(".btn12").attr("style", "margin-left:-"+btnWidth/2+"px;");
                            $(".ZSr_m").attr("style", "background-position:-74px  0;");
                            $("#Sorce").html(0);
                        }
                        else {
                            $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                            $("#Sorce").html(sorce);
                        }
                    }
                }
            });


            $this.find(".ratingGroupAction").click(function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                //if ($.cookie(cookieKey) !== undefined && $.cookie(cookieKey) !== null) {
                //    alert("已" + tips + "！");
                //    return;
                //}

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {

                            $("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $("#like").html();
                            var unlike = $("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".btn12").width();
                            if (isNaN(sorce)) {
                                $(".btn12").attr("style", "margin-left:-"+btnWidth+"px;");
                                $(".ZSr_m").attr("style", "background-position:-74px 0;");
                                $("#Sorce").html(0);
                            }
                            else {
                                $("#Sorce").html(sorce);
                                $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                                $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            }
                            $("#" + $thisAction.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });
            });


        });
    };

    $.fn.RatingGroupLike = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find("li").each(function (i, element) {
                var $lithis = $(element);
                var generalid = $(element).attr("data-generalid");
                var types = $(element).attr("data-type");
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/initgroup",
                    data: { 'generalId': generalid, 'ratingGroupType': types, 'Action': "initGroup" },
                    success: function (data) {
                        if (data.length = 1) {
                            $lithis.find("div a .huo").html(data[0].Times);
                        }
                    }
                });

            });
        });
    };

    $.fn.Ratingmore = function (options) {
        return this.each(function () {
            var $this = $(this);
            var gamerskyrating = $this.find(".gamerskyrating");//本站评分
            var userrating = $this.find(".userrating");//用户评分
            //用户评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.EditorRating != "0") {
                        $(gamerskyrating).html(data.EditorRating);
                    }
                    else {
                        $(gamerskyrating).html("--");
                    }
                }
            });
            //本站评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $(userrating).attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(userrating).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }
                }
            });
            //喜欢和不喜欢
            var number1 = $this.find(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $this.find(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $this.find("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $this.find("#" + totleid).html(0);
                            }
                        });

                        var like = $this.find("#like").html();
                        var unlike = $this.find("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".jindu").width();
                        if (isNaN(sorce)) {
                            $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                        }
                        else {
                            $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                        }
                    }
                }
            });


            $this.find(".ratingGroupAction").click(function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                var tips = $this.attr("data-tips");
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                //if ($.cookie(cookieKey) !== undefined && $.cookie(cookieKey) !== null) {
                //    alert("已" + tips + "！");
                //    return;
                //}

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $this.find("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $this.find("#like").html();
                            var unlike = $this.find("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".jindu").width();
                            if (isNaN(sorce)) {
                                $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                            }
                            else {
                                $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                            }
                            $.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                        }
                    }
                });
            });
        });
    };

    $(document).ready(function () {
        $(".ratingGroup").RatingGroup();
        $(".ratingAction").Rating();
        $(".gameratingAction").RatingGame();
        $(".S31_2").KuScore();
        $("#gamerskyrating").RatingGamersky();
        $(".ratingGroupLike").RatingGroupLike();
        $(".ratingmore").Ratingmore();       
    });

})(jQuery);

function loadJs(sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0];
    var nodeScript = null;
    if (document.getElementById(sid) == null) {
        nodeScript = document.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', jsurl);
        nodeScript.setAttribute('id', sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function () {
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeScript);
    } else {
        if (callback != null) {
            callback();
        }
    }
};

(function ($) {
    function checkIsNullOrEmpty(value) {
        if (!value || value == "") {
            alert("描述不能为空！");
            return false;
        }

        return true;
    };


    function checkEmail(value) {
        if (value) {
            if (!isEmail(value)) {
                alert("您输入的邮箱有误请从新输入");
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    };

    function checkPhone(value) {
        if (value) {
            if (!isPhone(value)) {
                alert("您输入的电话有误请从新输入");
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    };

    function checkQQ(value) {
        if (value) {
            if (!isQQ(value)) {
                alert("您输入的QQ号有误请从新输入");
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    };

    function isQQ(str) {
        var reg = /^[1-9][0-9]{4,}$/;
        return reg.test(str);
    };
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    };

    function isPhone(str) {
        var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;     
        return reg.test(str);
    };


    function getQueryString(name) {
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    };

    $.fn.ContentCorrect = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                loadJs("uploadify", "http://j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
                    var html = '<div class="ui-error-bj" style="display:none" ><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px"><input id="buttonbj" style="display:none" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">	</div></div><div class="ui-error-mail">  <span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div> </div> </div></div>';

                    $.blockUI({
                        message: $(html),
                        css: {
                            cursor: 'auto',
                            width: '0px',
                            height: '0px',
                            left: '50%',
                            top: '50%',
                            overflow: 'visible',
                            border: "0px"
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.6,
                            cursor: 'auto'
                        },
                        onBlock: function () {
                            $('.blockUI').bgiframe();
                            $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title"));
                            $("#buttonbj").uploadify({
                                'swf': '/js/Uploadify/uploadify.swf',
                                'uploader': 'http://up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': 'http://j.gamersky.com/Uploadify/select.jpg',
                                'fileTypeExts': '*.jpg;*.jpge;*.gif;*.png',
                                'wmode': 'transparent',
                                'width': 79,
                                'height': 34,
                                'onUploadSuccess': function (file, data, response) {
                                    var dataObj = eval("(" + data + ")");
                                    $("#showPicture").attr("src", dataObj.OtherParameter);
                                    $("#showPicture").attr("picUrl", dataObj.OtherParameter).show();
                                },
                                'onSelectError': function (file, errorCode, errorMsg) {
                                    switch (errorCode) {
                                        case -100:
                                            alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                            break;
                                        case -110:
                                            alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                            break;
                                        case -120:
                                            alert("文件 [" + file.name + "] 大小异常！");
                                            break;
                                        case -130:
                                            alert("文件 [" + file.name + "] 类型不正确！");
                                            break;
                                        default:
                                            alert("文件上传错误！");
                                            break;
                                    }
                                }
                            });

                            $('.ui-error-bj .tj1-botton').click(function () {
                                var CorrectInfo = {};
                                CorrectInfo.Title = $("#jcjbContentData").attr("title");
                                CorrectInfo.GeneralId = $("#jcjbContentData").attr("data-generalId");
                                CorrectInfo.Description = $(".ui-error-ms .inputbj .tarea").val();
                                if (checkPhone($(".ui-error-phone .inputbj .input").val()) == false || checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) == false || checkEmail($(".ui-error-mail .inputbj .input").val()) == false) {
                                    return;
                                }
                                CorrectInfo.Phone = $(".ui-error-phone .inputbj .input").val();
                                CorrectInfo.Email = $(".ui-error-mail .inputbj .input").val();
                                CorrectInfo.PhotoUrl = $("#showPicture").attr("picUrl");
                                CorrectInfo.IsReport = 0;
                                CorrectInfo.State = 999;
                                $.ajax({
                                    url: 'http://db5.gamersky.com/CorrectReport.aspx',
                                    type: "get",
                                    data: { 'ContentData': JSON2.stringify(CorrectInfo) },
                                    dataType: 'jsonp',
                                    contentType: 'application/json;charset=utf-8',
                                    cache: false,
                                    success: function (data) {
                                        alert(data.body);
                                    },
                                    error: function (xhr) {

                                    }
                                });
                                $.unblockUI();
                            });

                            $('.ui-error-close').click(function () {
                                $.unblockUI();

                            });

                            $('.tj2-botton .buttonbj').click(function () {
                                $.unblockUI();
                            });
                        },
                        onUnblock: function () {
                            $('.ui-error-bj').remove();
                        }
                    });

                });
            });
        });
    }
    $.fn.ContentReport = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                loadJs("uploadify", "http://j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
                    var html = '<div class="ui-error-bj" style="display:none"><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px" ><input id="buttonbj" style="display:none;" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">	</div></div><div class="ui-error-mail"><span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div></div></div></div>';

                    $.blockUI({
                        message: $(html),
                        css: {
                            cursor: 'auto',
                            width: '0px',
                            height: '0px',
                            left: '50%',
                            top: '50%',
                            overflow: 'visible',
                            border: "0px"
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.6,
                            cursor: 'auto'
                        },
                        onBlock: function () {
                            $('.blockUI').bgiframe();
                            $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title"));
                            $("#buttonbj").uploadify({
                                'swf': '/js/Uploadify/uploadify.swf',
                                'uploader': 'http://up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': 'http://j.gamersky.com/Uploadify/select.jpg',
                                'fileTypeExts': '*.jpg;*.jpge;*.gif;*.png',
                                'wmode': 'transparent',
                                'width': 79,
                                'height': 34,
                                'onUploadSuccess': function (file, data, response) {
                                    var dataObj = eval("(" + data + ")");
                                    $("#showPicture").attr("src", dataObj.OtherParameter);
                                    $("#showPicture").attr("picUrl", dataObj.OtherParameter).show();

                                },
                                'onSelectError': function (file, errorCode, errorMsg) {
                                    switch (errorCode) {
                                        case -100:
                                            alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                            break;
                                        case -110:
                                            alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                            break;
                                        case -120:
                                            alert("文件 [" + file.name + "] 大小异常！");
                                            break;
                                        case -130:
                                            alert("文件 [" + file.name + "] 类型不正确！");
                                            break;
                                        default:
                                            alert("文件上传错误！");
                                            break;
                                    }
                                }
                            });


                            $('.ui-error-bj .tj1-botton').click(function () {
                                var ContentData = {};
                                ContentData.Title = $("#jcjbContentData").attr("title");
                                ContentData.GeneralId = $("#jcjbContentData").attr("data-generalId");
                                ContentData.Description = $(".ui-error-ms .inputbj .tarea").val();
                                if (checkPhone($(".ui-error-phone .inputbj .input").val()) == false || checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) == false || checkEmail($(".ui-error-mail .inputbj .input").val()) == false) {
                                    return;
                                }
                                ContentData.Phone = $(".ui-error-phone .inputbj .input").val();
                                ContentData.Email = $(".ui-error-mail .inputbj .input").val();
                                ContentData.PhotoUrl = $("#showPicture").attr("picUrl");
                                ContentData.IsReport = 1;
                                ContentData.IsInit = 1;
                                $.ajax({
                                    url: 'http://db5.gamersky.com/CorrectReport.aspx',
                                    type: "get",
                                    data: { 'ContentData': JSON2.stringify(ContentData) },
                                    dataType: 'jsonp',
                                    contentType: 'application/json;charset=utf-8',
                                    cache: false,
                                    success: function (data) {
                                        alert(data.body);
                                    },
                                    error: function (xhr) {

                                    }
                                });
                                $.unblockUI();
                            });

                            $('.ui-error-close').click(function () {
                                $.unblockUI();
                            });

                            $('.tj2-botton .buttonbj').click(function () {

                                $.unblockUI();
                            });


                        },
                        onUnblock: function () {
                            $('.ui-error-bj').remove();
                        }
                    });

                });
            });
        });
    }
    $.fn.ContentEvaluation = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                loadJs("uploadify", "http://j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
                    var html = '<div class="ui-error-bj" style="display:none" ><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px"><input id="buttonbj" style="display:none" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">	</div></div><div class="ui-error-mail">  <span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div> </div> </div></div>';

                    $.blockUI({
                        message: $(html),
                        css: {
                            cursor: 'auto',
                            width: '0px',
                            height: '0px',
                            left: '50%',
                            top: '50%',
                            overflow: 'visible',
                            border: "0px"
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.6,
                            cursor: 'auto'
                        },
                        onBlock: function () {
                            $('.blockUI').bgiframe();
                            $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title"));
                            $("#buttonbj").uploadify({
                                'swf': '/js/Uploadify/uploadify.swf',
                                'uploader': 'http://up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': 'http://j.gamersky.com/Uploadify/select.jpg',
                                'fileTypeExts': '*.jpg;*.jpge;*.gif;*.png',
                                'wmode': 'transparent',
                                'width': 79,
                                'height': 34,
                                'onUploadSuccess': function (file, data, response) {
                                    var dataObj = eval("(" + data + ")");
                                    $("#showPicture").attr("src", dataObj.OtherParameter);
                                    $("#showPicture").attr("picUrl", dataObj.OtherParameter).show();
                                },
                                'onSelectError': function (file, errorCode, errorMsg) {
                                    switch (errorCode) {
                                        case -100:
                                            alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                            break;
                                        case -110:
                                            alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                            break;
                                        case -120:
                                            alert("文件 [" + file.name + "] 大小异常！");
                                            break;
                                        case -130:
                                            alert("文件 [" + file.name + "] 类型不正确！");
                                            break;
                                        default:
                                            alert("文件上传错误！");
                                            break;
                                    }
                                }
                            });

                            $('.ui-error-bj .tj1-botton').click(function () {
                                var CorrectInfo = {};
                                CorrectInfo.Title = $("#jcjbContentData").attr("title");
                                CorrectInfo.GeneralId = $("#jcjbContentData").attr("data-generalId");
                                CorrectInfo.Description = $(".ui-error-ms .inputbj .tarea").val();
                                if (checkQQ($(".ui-error-phone .inputbj .input").val()) == false || checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) == false || checkEmail($(".ui-error-mail .inputbj .input").val()) == false) {
                                    return;
                                }
                                CorrectInfo.Phone = $(".ui-error-phone .inputbj .input").val();
                                CorrectInfo.Email = $(".ui-error-mail .inputbj .input").val();
                                CorrectInfo.PhotoUrl = $("#showPicture").attr("picUrl");
                                CorrectInfo.IsReport = 0;
                                CorrectInfo.State = 999;
                                $.ajax({
                                    url: 'http://db5.gamersky.com/CorrectReport.aspx',
                                    type: "get",
                                    data: { 'ContentData': JSON2.stringify(CorrectInfo) },
                                    dataType: 'jsonp',
                                    contentType: 'application/json;charset=utf-8',
                                    cache: false,
                                    success: function (data) {
                                        alert(data.body);
                                    },
                                    error: function (xhr) {

                                    }
                                });
                                $.unblockUI();
                            });

                            $('.ui-error-close').click(function () {
                                $.unblockUI();

                            });

                            $('.tj2-botton .buttonbj').click(function () {
                                $.unblockUI();
                            });
                        },
                        onUnblock: function () {
                            $('.ui-error-bj').remove();
                        }
                    });

                });
            });
        });
    }
    $.fn.Collection = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $("#jcjbContentData").attr("data-generalId");
            var gameLib = $("#jcjbContentData").attr("data-gameLib");
            $this.click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: 'http://i.gamersky.com/api/addcollect',
                    type: "get",
                    data: { "generalId": generalId, "gameLib": gameLib},
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.status == "ok") {
                            alert("收藏成功！");
                        }
                        else {
                            alert(data.body);
                        }
                    },
                    error: function (xhr) {

                    }
                });
            });
        });
    }

    $(document).ready(function () {
        if ($("#jcjbContentData").length > 0) {
            $(".JCJB").show();
        }
        $(".btnContentReport").ContentReport();
        $(".btnContentCorrect").ContentCorrect();
        $(".btnContentEvaluation").ContentEvaluation();
        $(".btnCollection").Collection();
    });

})(jQuery);
(function ($) {
    $.fn.SoftGl = function (options) {
        return this.each(function () {
            var tableName = "PE_U_Soft";
            if ($("#jcjbContentData").attr("data-tableName") != null) {
                tableName = $("#jcjbContentData").attr("data-tableName");
            }
            var op = {
                GeneralId: $("#jcjbContentData").attr("data-generalId"),
                NodeId: $("#jcjbContentData").attr("data-nodeId"),
                Top: 8,
                TableName: tableName
            };

            $.ajax({
                type: "POST",
                url: "http://db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcorrelation", GeneralId: op.GeneralId, NodeId: op.NodeId, Top: op.Top, TableName: op.TableName })
                },
                success: function (response) {
                    var data = response;
                    if (data == undefined || data.length <= 0) {
                        $("#softwenda").hide();
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            $("#softwenda").find(".wd").append('<li class="like"><a href="' + data[i].url + '" target="_blank">' + data[i].title + '</a></li>');
                        }
                    }
                }
            });
        });
    };
    $.fn.SoftCorrelation = function (options) {
        return this.each(function () {
            var $this = $(this);
            var location = options;
            var locationContt = $this.find(".contt").eq(location);
            var locationConttLength = locationContt.attr("value");//locationContt.find(".txt .like li").length;
            var isRemove = false;
            $this.find(".contt").each(function (index, element) {
                var conttlilength = $(element).find(".txt .like li").length;
                if (conttlilength <= 0) {
                    $(element).hide();
                    isRemove = true;
                    locationConttLength = parseInt(locationConttLength) + parseInt($(element).attr("value"));
                    locationContt.find(".tit").removeClass().addClass("tit tp" + locationConttLength);
                    locationContt.find(".txt").removeClass().addClass("txt th" + locationConttLength);
                    locationContt.find(".like").removeClass().addClass("like lh" + locationConttLength);
                }
            });
            var lastLength = parseInt(locationConttLength) - 1;
            if (location == 0) {
                $(".txtlist .tl_like.tr .contt:eq(0) .txt .like li:gt(" + lastLength + ")").remove();
            }
            else {
                $(".txtlist .tl_like.tl .contt:eq(1) .txt .like li:gt(" + lastLength + ")").remove();
            }
        });
    };
    $.fn.DownContentHot = function(options){
        return this.each(function(){
            var $this = $(this);
            var ganeralId = $this.attr("data-ganeralId");
            $.ajax({
                type: "POST",
                url: "http://db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcontenthot", GeneralId:ganeralId})
                },
                success: function (response) {
                    var data = response;
                    if (data.status=="ok")
                     {
                        $this.html("&nbsp;"+data.body);
                     };
                }
            });
        })
    }

    $(document).ready(function () {
        $(".td_dl[itemprop='inContentHot']").DownContentHot();
        $("#softwenda").SoftGl();
        $(".txtlist .tl_like.tl").SoftCorrelation(1);
        $(".txtlist .tl_like.tr").SoftCorrelation(0);
    });
})(jQuery);
///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
(function ($) {
    $.fn.ContentVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $this.attr("data-id");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                data: {
                    id: generalId, a: "0"
                },
                success: function (data) {
                    $this.find(".votelist .tit").text(data.vote.VoteTitle);

                    for (var i = 0; i < data.items.length; i++) {
                        var li = $('<li class="txt"><input type="radio" id="v' + i + '" name="v" value=""><label for="v' + i + '"></label></li>');

                        if (data.vote.ItemType > 0) {
                            li = $('<li class="txt"><input type="checkbox" name="v"id="v' + i + '" value=""><label for="v' + i + '"></label></li>');
                        }
                        li.find("input[name='v']").attr("value", data.items[i].Title);
                        li.find("label").text(data.items[i].Title);

                        $this.find(".votelist .btn").before(li);
                    }

                    $this.find(".toupiao-vbtn").click(function () {
                        var v = "";
                        $this.find("input[name='v']").each(function () {
                            if ($(this).attr("checked")) {
                                if (v.length > 0)
                                    v = v + ",";
                                v = v + $(this).attr("value");
                            }
                        });
                        if (v.length == 0)
                            alert("请至少选择一个选项！");
                            $.ajax({
                                type: "GET",
                                dataType: "jsonp",
                                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                                data: {
                                    id: generalId, a: "1", v: v
                                },
                                success: function (data) {
                                    if (data.status == "ok") {
                                        alert("投票成功！");
                                    }
                                    else {
                                        alert(data.message);
                                    }
                                }
                            });

                        return false;
                    });

                    $this.show();
                }
            });
        });
    };

    $.fn.HotVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $(this).attr("data-itemId");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/VoteJson.aspx",
                data: {
                    id: generalId, a: "init"
                },
                success: function (data) {

                    $this.find(".redPollNumber").html(data.RedPoll);
                    $this.find(".bluePollNumber").html(data.BluePoll);
                    if ((parseInt(data.RedPoll) + parseInt(data.BluePoll)) > 0) {
                        $this.find(".tiao").width(data.RedPoll / (parseInt(data.RedPoll) + parseInt(data.BluePoll)) * 100 + "%");
                    }
                }
            });

            $this.find(".votebtn").click(function () {
                $votebtn = $(this);
                var cookieKey = "hotvote-" + generalId;
                if ($.cookie(cookieKey) !== undefined && $.cookie(cookieKey) !== null) {
                    if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                        alert("当前主题只允许同一IP投票1次，您已经超过了投票次数");
                    }
                    return;
                }
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db5.gamersky.com/VoteJson.aspx",
                    data: {
                        id: generalId, a: "vote", p: $votebtn.attr("data-point")
                    },
                    success: function (data) {
                        if (data.status == "ok") {
                            if ($votebtn.attr("data-point") == "red") {
                                $this.find(".redPollNumber").html(parseInt($this.find(".redPollNumber").html()) + 1);
                            }
                            else {
                                $this.find(".bluePollNumber").html(parseInt($this.find(".bluePollNumber").html()) + 1);
                            }

                            var redPoll = parseInt($this.find(".redPollNumber").html());
                            var bluePoll = parseInt($this.find(".bluePollNumber").html());

                            if ((redPoll + bluePoll) > 0) {
                                $this.find(".tiao").width(redPoll / (redPoll + bluePoll)*100 + "%");
                            }

                            $.cookie(cookieKey, "1", { path: "/", expires: 365 });
                        }
                        else {
                            if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                                alert("当前主题只允许同一IP投票1次，您已经超过了投票次数");
                            }
                        }
                    }
                });
            });
        });
    };

    $(document).ready(function () {
        if ($(".toupiao-Content").length > 0) {
            $(".toupiao-Content").html($(".toupiao-init").html());
            $(".toupiao-Content").attr("data-id", $(".toupiao-init").attr("data-id"));
            $(".toupiao-Content").ContentVote();
            $(".toupiao-init").hide();
        }
        else {
            $(".toupiao-init").ContentVote();
        }

        $(".hotVote").HotVote();
    });

})(jQuery);

