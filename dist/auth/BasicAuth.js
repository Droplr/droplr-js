"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicAuth = /** @class */ (function () {
    function BasicAuth(username, password) {
        this.username = username;
        this.password = password;
    }
    BasicAuth.prototype.authorize = function (request) {
        request.auth = {
            username: this.username,
            password: this.password,
        };
    };
    return BasicAuth;
}());
exports.default = BasicAuth;
