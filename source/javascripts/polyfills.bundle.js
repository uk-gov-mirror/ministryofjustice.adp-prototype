/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	module.exports = __webpack_require__(63);


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	// For use in Node.js

	var JSON2 = __webpack_require__(61);
	var cycle = __webpack_require__(62);

	JSON2.decycle = cycle.decycle;
	JSON2.retrocycle = cycle.retrocycle;

	module.exports = JSON2;


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	/*
	    json2.js
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


	(function (JSON) {
	    'use strict';

	    function f(n) {
	        // Format integers to have at least two digits.
	        return n < 10 ? '0' + n : n;
	    }

	    /* DDOPSON-2012-04-16 - mutating global prototypes is NOT allowed for a well-behaved module.  
	     * It's also unneeded, since Date already defines toJSON() to the same ISOwhatever format below
	     * Thus, we skip this logic for the CommonJS case where 'exports' is defined
	     */
	    if (false) {
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
	      }
	      
	      if (typeof String.prototype.toJSON !== 'function') {
	        String.prototype.toJSON = function (key) { return this.valueOf(); };
	      }

	      if (typeof Number.prototype.toJSON !== 'function') {
	        Number.prototype.toJSON = function (key) { return this.valueOf(); };
	      }
	      
	      if (typeof Boolean.prototype.toJSON !== 'function') {
	        Boolean.prototype.toJSON = function (key) { return this.valueOf(); };
	      }
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

	    if (typeof JSON.stringify !== 'function') {
	        JSON.stringify = function (value, replacer, space) {

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
	                throw new Error('JSON.stringify');
	            }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	            return str('', {'': value});
	        };
	    }


	// If the JSON object does not yet have a parse method, give it one.

	    if (typeof JSON.parse !== 'function') {
	        JSON.parse = function (text, reviver) {

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

	            throw new SyntaxError('JSON.parse');
	        };
	    }
	})(
	    
	    // Create a JSON object only if one does not already exist. We create the
	    // methods in a closure to avoid creating global variables.
	    
	  ( true) ? 
	    exports : 
	    (window.JSON ? 
	      (window.JSON) :
	      (window.JSON = {})
	    )
	);


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	// cycle.js
	// 2011-08-24

	/*jslint evil: true, regexp: true */

	/*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
	    retrocycle, stringify, test, toString
	*/

	(function (exports) {

	if (typeof exports.decycle !== 'function') {
	    exports.decycle = function decycle(object) {
	        'use strict';

	// Make a deep copy of an object or array, assuring that there is at most
	// one instance of each object or array in the resulting structure. The
	// duplicate references (which might be forming cycles) are replaced with
	// an object of the form
	//      {$ref: PATH}
	// where the PATH is a JSONPath string that locates the first occurance.
	// So,
	//      var a = [];
	//      a[0] = a;
	//      return JSON.stringify(JSON.decycle(a));
	// produces the string '[{"$ref":"$"}]'.

	// JSONPath is used to locate the unique object. $ indicates the top level of
	// the object or array. [NUMBER] or [STRING] indicates a child member or
	// property.

	        var objects = [],   // Keep a reference to each unique object or array
	            paths = [];     // Keep the path to each unique object or array

	        return (function derez(value, path) {

	// The derez recurses through the object, producing the deep copy.

	            var i,          // The loop counter
	                name,       // Property name
	                nu;         // The new object or array

	            switch (typeof value) {
	            case 'object':

	// typeof null === 'object', so get out if this value is not really an object.

	                if (!value) {
	                    return null;
	                }

	// If the value is an object or array, look to see if we have already
	// encountered it. If so, return a $ref/path object. This is a hard way,
	// linear search that will get slower as the number of unique objects grows.

	                for (i = 0; i < objects.length; i += 1) {
	                    if (objects[i] === value) {
	                        return {$ref: paths[i]};
	                    }
	                }

	// Otherwise, accumulate the unique value and its path.

	                objects.push(value);
	                paths.push(path);

	// If it is an array, replicate the array.

	                if (Object.prototype.toString.apply(value) === '[object Array]') {
	                    nu = [];
	                    for (i = 0; i < value.length; i += 1) {
	                        nu[i] = derez(value[i], path + '[' + i + ']');
	                    }
	                } else {

	// If it is an object, replicate the object.

	                    nu = {};
	                    for (name in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, name)) {
	                            nu[name] = derez(value[name],
	                                path + '[' + JSON.stringify(name) + ']');
	                        }
	                    }
	                }
	                return nu;
	            case 'number':
	            case 'string':
	            case 'boolean':
	                return value;
	            }
	        }(object, '$'));
	    };
	}


	if (typeof exports.retrocycle !== 'function') {
	    exports.retrocycle = function retrocycle($) {
	        'use strict';

	// Restore an object that was reduced by decycle. Members whose values are
	// objects of the form
	//      {$ref: PATH}
	// are replaced with references to the value found by the PATH. This will
	// restore cycles. The object will be mutated.

	// The eval function is used to locate the values described by a PATH. The
	// root object is kept in a $ variable. A regular expression is used to
	// assure that the PATH is extremely well formed. The regexp contains nested
	// * quantifiers. That has been known to have extremely bad performance
	// problems on some browsers for very long strings. A PATH is expected to be
	// reasonably short. A PATH is allowed to belong to a very restricted subset of
	// Goessner's JSONPath.

	// So,
	//      var s = '[{"$ref":"$"}]';
	//      return JSON.retrocycle(JSON.parse(s));
	// produces an array containing a single element which is the array itself.

	        var px =
	            /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

	        (function rez(value) {

	// The rez function walks recursively through the object looking for $ref
	// properties. When it finds one that has a value that is a path, then it
	// replaces the $ref object with a reference to the value that is found by
	// the path.

	            var i, item, name, path;

	            if (value && typeof value === 'object') {
	                if (Object.prototype.toString.apply(value) === '[object Array]') {
	                    for (i = 0; i < value.length; i += 1) {
	                        item = value[i];
	                        if (item && typeof item === 'object') {
	                            path = item.$ref;
	                            if (typeof path === 'string' && px.test(path)) {
	                                value[i] = eval(path);
	                            } else {
	                                rez(item);
	                            }
	                        }
	                    }
	                } else {
	                    for (name in value) {
	                        if (typeof value[name] === 'object') {
	                            item = value[name];
	                            if (item) {
	                                path = item.$ref;
	                                if (typeof path === 'string' && px.test(path)) {
	                                    value[name] = eval(path);
	                                } else {
	                                    rez(item);
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }($));
	        return $;
	    };
	}
	}) (
	  ( true) ? 
	    exports : 
	    (window.JSON ? 
	      (window.JSON) :
	      (window.JSON = {})
	    )
	);


/***/ },

/***/ 63:
/***/ function(module, exports) {

	/**
	* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
	*/
	;(function(window, document) {
	/*jshint evil:true */
	  /** version */
	  var version = '3.7.3-pre';

	  /** Preset options */
	  var options = window.html5 || {};

	  /** Used to skip problem elements */
	  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

	  /** Not all elements can be cloned in IE **/
	  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

	  /** Detect whether the browser supports default html5 styles */
	  var supportsHtml5Styles;

	  /** Name of the expando, to work with multiple documents or to re-shiv one document */
	  var expando = '_html5shiv';

	  /** The id for the the documents expando */
	  var expanID = 0;

	  /** Cached data for each document */
	  var expandoData = {};

	  /** Detect whether the browser supports unknown elements */
	  var supportsUnknownElements;

	  (function() {
	    try {
	        var a = document.createElement('a');
	        a.innerHTML = '<xyz></xyz>';
	        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
	        supportsHtml5Styles = ('hidden' in a);

	        supportsUnknownElements = a.childNodes.length == 1 || (function() {
	          // assign a false positive if unable to shiv
	          (document.createElement)('a');
	          var frag = document.createDocumentFragment();
	          return (
	            typeof frag.cloneNode == 'undefined' ||
	            typeof frag.createDocumentFragment == 'undefined' ||
	            typeof frag.createElement == 'undefined'
	          );
	        }());
	    } catch(e) {
	      // assign a false positive if detection fails => unable to shiv
	      supportsHtml5Styles = true;
	      supportsUnknownElements = true;
	    }

	  }());

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a style sheet with the given CSS text and adds it to the document.
	   * @private
	   * @param {Document} ownerDocument The document.
	   * @param {String} cssText The CSS text.
	   * @returns {StyleSheet} The style element.
	   */
	  function addStyleSheet(ownerDocument, cssText) {
	    var p = ownerDocument.createElement('p'),
	        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

	    p.innerHTML = 'x<style>' + cssText + '</style>';
	    return parent.insertBefore(p.lastChild, parent.firstChild);
	  }

	  /**
	   * Returns the value of `html5.elements` as an array.
	   * @private
	   * @returns {Array} An array of shived element node names.
	   */
	  function getElements() {
	    var elements = html5.elements;
	    return typeof elements == 'string' ? elements.split(' ') : elements;
	  }

	  /**
	   * Extends the built-in list of html5 elements
	   * @memberOf html5
	   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
	   * @param {Document} ownerDocument The context document.
	   */
	  function addElements(newElements, ownerDocument) {
	    var elements = html5.elements;
	    if(typeof elements != 'string'){
	      elements = elements.join(' ');
	    }
	    if(typeof newElements != 'string'){
	      newElements = newElements.join(' ');
	    }
	    html5.elements = elements +' '+ newElements;
	    shivDocument(ownerDocument);
	  }

	   /**
	   * Returns the data associated to the given document
	   * @private
	   * @param {Document} ownerDocument The document.
	   * @returns {Object} An object of data.
	   */
	  function getExpandoData(ownerDocument) {
	    var data = expandoData[ownerDocument[expando]];
	    if (!data) {
	        data = {};
	        expanID++;
	        ownerDocument[expando] = expanID;
	        expandoData[expanID] = data;
	    }
	    return data;
	  }

	  /**
	   * returns a shived element for the given nodeName and document
	   * @memberOf html5
	   * @param {String} nodeName name of the element
	   * @param {Document} ownerDocument The context document.
	   * @returns {Object} The shived element.
	   */
	  function createElement(nodeName, ownerDocument, data){
	    if (!ownerDocument) {
	        ownerDocument = document;
	    }
	    if(supportsUnknownElements){
	        return ownerDocument.createElement(nodeName);
	    }
	    if (!data) {
	        data = getExpandoData(ownerDocument);
	    }
	    var node;

	    if (data.cache[nodeName]) {
	        node = data.cache[nodeName].cloneNode();
	    } else if (saveClones.test(nodeName)) {
	        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
	    } else {
	        node = data.createElem(nodeName);
	    }

	    // Avoid adding some elements to fragments in IE < 9 because
	    // * Attributes like `name` or `type` cannot be set/changed once an element
	    //   is inserted into a document/fragment
	    // * Link elements with `src` attributes that are inaccessible, as with
	    //   a 403 response, will cause the tab/window to crash
	    // * Script elements appended to fragments will execute when their `src`
	    //   or `text` property is set
	    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
	  }

	  /**
	   * returns a shived DocumentFragment for the given document
	   * @memberOf html5
	   * @param {Document} ownerDocument The context document.
	   * @returns {Object} The shived DocumentFragment.
	   */
	  function createDocumentFragment(ownerDocument, data){
	    if (!ownerDocument) {
	        ownerDocument = document;
	    }
	    if(supportsUnknownElements){
	        return ownerDocument.createDocumentFragment();
	    }
	    data = data || getExpandoData(ownerDocument);
	    var clone = data.frag.cloneNode(),
	        i = 0,
	        elems = getElements(),
	        l = elems.length;
	    for(;i<l;i++){
	        clone.createElement(elems[i]);
	    }
	    return clone;
	  }

	  /**
	   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
	   * @private
	   * @param {Document|DocumentFragment} ownerDocument The document.
	   * @param {Object} data of the document.
	   */
	  function shivMethods(ownerDocument, data) {
	    if (!data.cache) {
	        data.cache = {};
	        data.createElem = ownerDocument.createElement;
	        data.createFrag = ownerDocument.createDocumentFragment;
	        data.frag = data.createFrag();
	    }


	    ownerDocument.createElement = function(nodeName) {
	      //abort shiv
	      if (!html5.shivMethods) {
	          return data.createElem(nodeName);
	      }
	      return createElement(nodeName, ownerDocument, data);
	    };

	    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
	      'var n=f.cloneNode(),c=n.createElement;' +
	      'h.shivMethods&&(' +
	        // unroll the `createElement` calls
	        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
	          data.createElem(nodeName);
	          data.frag.createElement(nodeName);
	          return 'c("' + nodeName + '")';
	        }) +
	      ');return n}'
	    )(html5, data.frag);
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Shivs the given document.
	   * @memberOf html5
	   * @param {Document} ownerDocument The document to shiv.
	   * @returns {Document} The shived document.
	   */
	  function shivDocument(ownerDocument) {
	    if (!ownerDocument) {
	        ownerDocument = document;
	    }
	    var data = getExpandoData(ownerDocument);

	    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
	      data.hasCSS = !!addStyleSheet(ownerDocument,
	        // corrects block display not defined in IE6/7/8/9
	        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
	        // adds styling not present in IE6/7/8/9
	        'mark{background:#FF0;color:#000}' +
	        // hides non-rendered elements
	        'template{display:none}'
	      );
	    }
	    if (!supportsUnknownElements) {
	      shivMethods(ownerDocument, data);
	    }
	    return ownerDocument;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The `html5` object is exposed so that more elements can be shived and
	   * existing shiving can be detected on iframes.
	   * @type Object
	   * @example
	   *
	   * // options can be changed before the script is included
	   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
	   */
	  var html5 = {

	    /**
	     * An array or space separated string of node names of the elements to shiv.
	     * @memberOf html5
	     * @type Array|String
	     */
	    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

	    /**
	     * current version of html5shiv
	     */
	    'version': version,

	    /**
	     * A flag to indicate that the HTML5 style sheet should be inserted.
	     * @memberOf html5
	     * @type Boolean
	     */
	    'shivCSS': (options.shivCSS !== false),

	    /**
	     * Is equal to true if a browser supports creating unknown/HTML5 elements
	     * @memberOf html5
	     * @type boolean
	     */
	    'supportsUnknownElements': supportsUnknownElements,

	    /**
	     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
	     * methods should be overwritten.
	     * @memberOf html5
	     * @type Boolean
	     */
	    'shivMethods': (options.shivMethods !== false),

	    /**
	     * A string to describe the type of `html5` object ("default" or "default print").
	     * @memberOf html5
	     * @type String
	     */
	    'type': 'default',

	    // shivs the document according to the specified `html5` object options
	    'shivDocument': shivDocument,

	    //creates a shived element
	    createElement: createElement,

	    //creates a shived documentFragment
	    createDocumentFragment: createDocumentFragment,

	    //extends list of elements
	    addElements: addElements
	  };

	  /*--------------------------------------------------------------------------*/

	  // expose html5
	  window.html5 = html5;

	  // shiv the document
	  shivDocument(document);

	  if(typeof module == 'object' && module.exports){
	    module.exports = html5;
	  }

	}(typeof window !== "undefined" ? window : this, document));


/***/ }

/******/ });