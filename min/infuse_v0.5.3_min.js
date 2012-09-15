(function(e,t){"use strict";e.version="0.5.3";var n=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,r=/,/,i=/^\s*(_?)(\S+?)\1\s*$/,s=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;Array.prototype.contains||(Array.prototype.contains=function(e){var t=this.length;while(t--)if(this[t]===e)return!0;return!1}),e.InjectorError={MAPPING_BAD_PROP:"[Error infuse.Injector.mapClass/mapValue] the first parameter is invalid, a string is expected",MAPPING_BAD_VALUE:"[Error infuse.Injector.mapClass/mapValue] the sescond parameter is invalid, it can't null or undefined, with property: ",MAPPING_BAD_CLASS:"[Error infuse.Injector.mapClass/mapValue] the second parameter is invalid, a function is expected, with property: ",MAPPING_BAD_SINGLETON:"[Error infuse.Injector.mapClass] the third parameter is invalid, a boolean is expected, with property: ",MAPPING_ALREADY_EXISTS:"[Error infuse.Injector.mapClass/mapValue] this mapping already exists, with property: ",CREATE_INSTANCE_INVALID_PARAM:"[Error infuse.Injector.createInstance] invalid parameter, a function is expected",GET_INSTANCE_NO_MAPPING:"[Error infuse.Injector.getInstance] no mapping found",INJECT_INSTANCE_IN_ITSELF_PROPERTY:"[Error infuse.Injector.getInjectedValue] A matching property has been found in the target, you can't inject an instance in itself",INJECT_INSTANCE_IN_ITSELF_CONSTRUCTOR:"[Error infuse.Injector.getInjectedValue] A matching constructor parameter has been found in the target, you can't inject an instance in itself"};var o=function(e,t,n,r){this.prop=e,this.value=t,this.cl=n,this.singleton=r||!1},u=function(t){if(typeof t!="string")throw new Error(e.InjectorError.MAPPING_BAD_PROP)},a=function(t,n){if(!n)throw new Error(e.InjectorError.MAPPING_BAD_VALUE+t)},f=function(t,n){if(typeof n!="function")throw new Error(e.InjectorError.MAPPING_BAD_CLASS+t)},l=function(t,n){if(typeof n!="boolean")throw new Error(e.InjectorError.MAPPING_BAD_SINGLETON+t)},c=function(t,n){var r=p(n);if(r.contains(t))throw new Error(e.InjectorError.INJECT_INSTANCE_IN_ITSELF_CONSTRUCTOR)},h=function(t,n){if(n.hasOwnProperty(t))throw new Error(e.InjectorError.INJECT_INSTANCE_IN_ITSELF_PROPERTY)},p=function(e){var t=[],o=e.toString().replace(s,""),u=o.match(n),a=u[1].split(r);for(var f=0;f<a.length;f++){var l=a[f];l.replace(i,function(e,n,r){t.push(r)})}return t},d=function(){if(typeof arguments[0]!="function")throw new Error(e.InjectorError.CREATE_INSTANCE_INVALID_PARAM);var t=arguments[0],n=[null];for(var r=1;r<arguments.length;r++)n.push(arguments[r]);return new(Function.prototype.bind.apply(t,n))};e.Injector=function(){this.mappings={},this.parent=null},e.Injector.prototype={createChild:function(){var t=new e.Injector;return t.parent=this,t},getMappingVo:function(e){return this.mappings?this.mappings[e]?this.mappings[e]:this.parent?this.parent.getMappingVo(e):null:null},mapValue:function(t,n){if(this.mappings[t])throw new Error(e.InjectorError.MAPPING_ALREADY_EXISTS+t);return u(t),a(t,n),this.mappings[t]=new o(t,n),this},mapClass:function(t,n,r){if(this.mappings[t])throw new Error(e.InjectorError.MAPPING_ALREADY_EXISTS+t);return u(t),f(t,n),r&&l(t,r),this.mappings[t]=new o(t,null,n,r),this},removeMapping:function(e){return this.mappings[e]=null,delete this.mappings[e],this},hasMapping:function(e){return!!this.mappings[e]},hasInheritedMapping:function(e){return!!this.getMappingVo(e)},getMapping:function(e){for(var t in this.mappings){var n=this.mappings[t];if(n.value===e||n.cl===e)return n.prop}},getMappingValue:function(e){var n=this.mappings[e];return n?n.cl?n.cl:n.value?n.value:t:t},instantiate:function(n){if(typeof n!="function")throw new Error(e.InjectorError.CREATE_INSTANCE_INVALID_PARAM);var n=arguments[0],r=[null],i=p(n,this.mappings);for(var s=0;s<i.length;s++)if(arguments[s+1])r.push(arguments[s+1]);else{var o=i[s],u=this.getMappingVo(o);if(!u)r.push(t);else{var a=this.getInjectedValue(u,o);r.push(a)}}return new(Function.prototype.bind.apply(n,r))},inject:function(e){this.parent&&this.parent.inject(e);for(var t in this.mappings){var n=this.getMappingVo(t);if(e.hasOwnProperty(n.prop)){var r=this.getInjectedValue(n,t);e[t]=r}}return typeof e.postConstruct=="function"&&e.postConstruct(),this},getInjectedValue:function(e,t){var n=e.value,r;if(e.cl){var i=p(e.cl);e.singleton?(e.value||(c(t,e.cl),e.value=this.instantiate(e.cl),r=e.value),n=e.value):(c(t,e.cl),n=this.instantiate(e.cl),r=n)}return r&&(h(t,r),this.inject(r)),n},createInstance:function(){var e=this.instantiate.apply(this,arguments);return this.inject(e),e},getInstance:function(t){for(var n in this.mappings){var r=this.mappings[n];if(r.cl==t)return r.singleton?(r.value||(r.value=this.createInstance.apply(this,arguments)),r.value):this.createInstance.apply(this,arguments)}if(this.parent)return this.parent.getInstance(t);throw new Error(e.InjectorError.GET_INSTANCE_NO_MAPPING)},dispose:function(){this.mappings={}}},Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new Error("Error, you must bind a function.");var r=Array.prototype.slice.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(Array.prototype.slice.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(Array.prototype.slice.call(arguments)))};return i}),console.log(typeof define,typeof define=="function",define.amd,e),typeof define=="function"&&define.amd&&(console.log("define",e),define("infuse",e)),typeof exports!="undefined"&&(typeof module!="undefined"&&module.exports&&(exports=module.exports=e),exports=e)})(this.infuse=this.infuse||{})