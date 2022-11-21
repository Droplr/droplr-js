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
Object.defineProperty(exports, "__esModule", { value: true });
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(httpError) {
        var _this = _super.call(this) || this;
        var response = httpError.response || {};
        var responseData = response.data || {};
        _this.code = responseData.code || response.status;
        _this.message = responseData.message || response.statusText;
        _this.statusCode = responseData.statusCode || response.status;
        _this.errors = responseData.errors || [];
        _this.request = httpError.request;
        _this.response = response;
        _this.httpError = httpError;
        return _this;
    }
    return ClientError;
}(Error));
exports.default = ClientError;
