"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JwtAuth = /** @class */ (function () {
    function JwtAuth(token) {
        this.token = token;
    }
    JwtAuth.prototype.authorize = function (request) {
        if (!request.headers)
            request.headers = {};
        request.headers.authorization = "Bearer ".concat(this.token);
    };
    return JwtAuth;
}());
exports.default = JwtAuth;
