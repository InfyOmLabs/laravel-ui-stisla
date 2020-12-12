/*
 currency.js - v1.2.2
 http://scurker.github.io/currency.js

 Copyright (c) 2019 Jason Wilson
 Released under MIT license
*/
(function (d, c) {
    'object' === typeof exports && 'undefined' !== typeof module
        ? module.exports = c()
        : 'function' === typeof define && define.amd ? define(c) : (d = d ||
        self, d.currency = c());
})(this, function () {
    function d (b, a) {
        if (!(this instanceof d)) return new d(b, a);
        a = Object.assign({}, m, a);
        var f = Math.pow(10, a.precision);
        this.intValue = b = c(b, a);
        this.value = b / f;
        a.increment = a.increment || 1 / f;
        a.groups = a.useVedic ? n : p;
        this.s = a;
        this.p = f;
    }

    function c (b, a) {
        var f = 2 < arguments.length && void 0 !== arguments[2]
            ? arguments[2]
            : !0, c = a.decimal, g = a.errorOnInvalid;
        var e = Math.pow(10, a.precision);
        var h = 'number' === typeof b;
        if (h || b instanceof d) e *= h ? b : b.value; else if ('string' ===
            typeof b) g = new RegExp('[^-\\d' + c + ']', 'g'), c = new RegExp(
            '\\' + c, 'g'), e = (e *= b.replace(/\((.*)\)/, '-$1').
            replace(g, '').
            replace(c, '.')) || 0; else {
            if (g) throw Error('Invalid Input');
            e = 0;
        }
        e = e.toFixed(4);
        return f ? Math.round(e) : e;
    }

    var m = {
        symbol: '$',
        separator: ',',
        decimal: '.',
        formatWithSymbol: !1,
        errorOnInvalid: !1,
        precision: 2,
        pattern: '!#',
        negativePattern: '-!#',
    }, p = /(\d)(?=(\d{3})+\b)/g, n = /(\d)(?=(\d\d)+\d\b)/g;
    d.prototype = {
        add: function (b) {
            var a = this.s, f = this.p;
            return d((this.intValue + c(b, a)) / f, a);
        },
        subtract: function (b) {
            var a = this.s, f = this.p;
            return d((this.intValue - c(b, a)) / f, a);
        },
        multiply: function (b) {
            var a = this.s;
            return d(this.intValue * b / Math.pow(10, a.precision), a);
        },
        divide: function (b) {
            var a = this.s;
            return d(this.intValue / c(b, a, !1), a);
        },
        distribute: function (b) {
            for (var a = this.intValue, f = this.p, c = this.s, g = [], e = Math[0 <=
            a ? 'floor' : 'ceil'](a / b), h = Math.abs(a - e * b); 0 !==
                 b; b--) {
                var k = d(e / f, c);
                0 < h-- && (k = 0 <= a ? k.add(1 / f) : k.subtract(1 /
                    f));
                g.push(k);
            }
            return g;
        },
        dollars: function () {return ~~this.value;},
        cents: function () {return ~~(this.intValue % this.p);},
        format: function (b) {
            var a = this.s, c = a.pattern, d = a.negativePattern,
                g = a.formatWithSymbol, e = a.symbol, h = a.separator,
                k = a.decimal;
            a = a.groups;
            var l = (this + '').replace(/^-/, '').split('.'), m = l[0];
            l = l[1];
            'undefined' === typeof b && (b = g);
            return (0 <= this.value ? c : d).replace('!', b ? e : '').
                replace('#',
                    ''.concat(m.replace(a, '$1' + h)).concat(l ? k + l : ''));
        },
        toString: function () {
            var b = this.s, a = b.increment;
            return (Math.round(this.intValue /
                this.p / a) * a).toFixed(b.precision);
        },
        toJSON: function () {return this.value;},
    };
    return d;
});
