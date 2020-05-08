"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var PapsOrderStatus;
(function (PapsOrderStatus) {
    PapsOrderStatus[PapsOrderStatus["ASSIGNED"] = 0] = "ASSIGNED";
    PapsOrderStatus[PapsOrderStatus["STARTED"] = 1] = "STARTED";
    PapsOrderStatus[PapsOrderStatus["SUCCESSFUL"] = 2] = "SUCCESSFUL";
    PapsOrderStatus[PapsOrderStatus["FAILED"] = 3] = "FAILED";
    PapsOrderStatus[PapsOrderStatus["IN_PROGRESS"] = 4] = "IN_PROGRESS";
    PapsOrderStatus[PapsOrderStatus["ACCEPTED"] = 7] = "ACCEPTED";
    PapsOrderStatus[PapsOrderStatus["UNASSIGNED"] = 6] = "UNASSIGNED";
    PapsOrderStatus[PapsOrderStatus["DECLINED"] = 8] = "DECLINED";
    PapsOrderStatus[PapsOrderStatus["CANCELLED"] = 9] = "CANCELLED";
    PapsOrderStatus[PapsOrderStatus["DELETED"] = 1] = "DELETED";
})(PapsOrderStatus = exports.PapsOrderStatus || (exports.PapsOrderStatus = {}));
exports.PAPS_MESSAGES = (_a = {},
    _a[PapsOrderStatus.ASSIGNED] = "La t\u00E2che a \u00E9t\u00E9 confi\u00E9e \u00E0 un agent.",
    _a[PapsOrderStatus.STARTED] = "La t\u00E2che a \u00E9t\u00E9 d\u00E9marr\u00E9 et l'agent est sur le chemin.",
    _a[PapsOrderStatus.SUCCESSFUL] = "La t\u00E2che a \u00E9t\u00E9 achev\u00E9e avec succ\u00E8s.",
    _a[PapsOrderStatus.FAILED] = "La t\u00E2che a \u00E9t\u00E9 sold\u00E9e par un \u00E9chec.",
    _a[PapsOrderStatus.IN_PROGRESS] = "La t\u00E2che est en cours d'ex\u00E9cution et l'agent a atteint la destination.",
    _a[PapsOrderStatus.ACCEPTED] = "La t\u00E2che a \u00E9t\u00E9 accept\u00E9e par l'agent qui lui est attribu\u00E9.",
    _a[PapsOrderStatus.UNASSIGNED] = "La t\u00E2che n'a pas \u00E9t\u00E9 affect\u00E9 \u00E0 un agent.",
    _a[PapsOrderStatus.DECLINED] = "La t\u00E2che a \u00E9t\u00E9 refus\u00E9e par l'agent qui lui est attribu\u00E9.",
    _a[PapsOrderStatus.CANCELLED] = "La t\u00E2che a \u00E9t\u00E9 annul\u00E9e par l'agent qui est accept\u00E9 par lui.",
    _a[PapsOrderStatus.DELETED] = "\tLorsque la t\u00E2che est supprim\u00E9e de notre syst\u00E8me d'informations",
    _a);
var headers = {
    'content-type': 'application/json',
    'accept': 'application/json'
};
var Paps = (function () {
    function Paps(options) {
        var defaultOptions = {};
        this.options = Object.assign({}, defaultOptions, options);
    }
    Paps.prototype.getUrl = function (options) {
        var method = options.method, queries = __rest(options, ["method"]);
        var _a = this.options, apiKey = _a.apiKey, url = _a.url, rootQueries = __rest(_a, ["apiKey", "url"]);
        var fullUrl = url
            .replace(':method', method);
        var allQueries = Object.assign({ apiKey: apiKey }, rootQueries, queries);
        var queryString = Object.keys(allQueries)
            .sort()
            .map(function (key) { return key + "=" + allQueries[key]; })
            .join('&');
        return decodeURIComponent("" + fullUrl + (queryString ? '?' + queryString : ''));
    };
    Paps.prototype.createPickup = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'createPickUp' }),
                method: 'POST',
                data: payload,
                headers: headers
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.createDelivery = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'createDelivery' }),
                method: 'POST',
                data: payload,
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                }
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.createPickupAndDelivery = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'createPickupAndDelivery' }),
                method: 'POST',
                data: payload,
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                }
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.createMultipleTasks = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'createMultipleTasks' }),
                method: 'POST',
                data: payload,
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                }
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.createTasksWithClientApp = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'createTasksWithClientApp' }),
                method: 'POST',
                data: payload,
                headers: headers
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.viewTasks = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl(__assign({ method: 'viewAllTasksDetails' }, options)),
                method: 'GET',
                headers: headers
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.viewTask = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl({ method: 'viewTask', id: id }),
                method: 'GET',
                headers: headers
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    Paps.prototype.cancelTask = function (id) {
    };
    Paps.prototype.getQuotes = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default({
                url: _this.getUrl(__assign({ method: 'getQuotes' }, payload)),
                method: 'GET',
                headers: headers
            })
                .then(function (response) { return resolve(response.data); })
                .catch(function (error) { return reject(error); });
        });
    };
    return Paps;
}());
exports.default = Paps;
//# sourceMappingURL=Paps.js.map