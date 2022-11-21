"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var _ = __importStar(require("lodash"));
var AbstractResource_1 = __importDefault(require("./AbstractResource"));
var Drops = /** @class */ (function (_super) {
    __extends(Drops, _super);
    function Drops(client) {
        var _this = _super.call(this, client) || this;
        _this.path = 'drops';
        return _this;
    }
    Drops.prototype.get = function (id, params, options) {
        var localOptions = {
            headers: {
                'x-drop-password': null,
                'content-disposition': null,
            },
        };
        if (params.password) {
            localOptions.headers['x-drop-password'] = params.password;
        }
        if (params.contentDisposition) {
            localOptions.headers['content-disposition'] = params.contentDisposition;
        }
        return _super.prototype.get.call(this, id, _.merge(localOptions, options));
    };
    Drops.prototype.create = function (data, options) {
        var endpoints = {
            NOTE: 'notes',
            LINK: 'links',
            FILE: 'files',
        };
        chai_1.assert.isObject(data);
        chai_1.assert.property(endpoints, data.type, 'You have to specify proper drop type');
        var localOptions = {
            headers: {
                'content-type': data.variant,
            },
            params: {
                board: null,
                filename: null,
                pixel_density: null,
            },
        };
        if (data.board)
            localOptions.params.board = data.board;
        if (data.type === 'FILE') {
            if (data.title)
                localOptions.params.filename = data.title;
            if (data.pixelDensity)
                localOptions.params.pixel_density = data.pixelDensity;
        }
        if (data.type === 'LINK') {
            localOptions.headers['content-type'] = 'text/plain';
        }
        var endpoint = endpoints[data.type];
        return this._post(endpoint, data.content, _.merge(localOptions, options));
    };
    Drops.prototype.getStats = function (id, options) {
        return this._get("".concat(this.path, "/").concat(id, "/stats"), options);
    };
    Drops.prototype.getReferrers = function (id, options) {
        return this._get("".concat(this.path, "/").concat(id, "/referrers"), options);
    };
    Drops.prototype.view = function (id, options) {
        return this._post("".concat(this.path, "/").concat(id, "/view"), undefined, options);
    };
    Drops.prototype.listHits = function (id, params, options) {
        var localOptions = {
            params: params,
        };
        return this._list("".concat(this.path, "/").concat(id, "/hits"), _.merge(localOptions, options));
    };
    return Drops;
}(AbstractResource_1.default));
exports.default = Drops;
