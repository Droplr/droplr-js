"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var _ = __importStar(require("lodash"));
var ClientError_1 = __importDefault(require("./ClientError"));
var AnonymousAuth_1 = __importDefault(require("./auth/AnonymousAuth"));
var Boards_1 = __importDefault(require("./resources/Boards"));
var Drops_1 = __importDefault(require("./resources/Drops"));
var Teams_1 = __importDefault(require("./resources/Teams"));
var Users_1 = __importDefault(require("./resources/Users"));
var RootRedirect_1 = __importDefault(require("./resources/RootRedirect"));
var Client = /** @class */ (function () {
    function Client(options) {
        this.options = _.merge({
            baseUrl: 'https://api.droplr.com',
            auth: new AnonymousAuth_1.default(),
        }, options);
        this.boards = new Boards_1.default(this);
        this.drops = new Drops_1.default(this);
        this.teams = new Teams_1.default(this);
        this.users = new Users_1.default(this);
        this.rootRedirect = new RootRedirect_1.default(this);
    }
    Client.prototype.get = function (path, options) {
        return this._request('get', path, options);
    };
    Client.prototype.post = function (path, data, options) {
        var config = options;
        config.data = data;
        return this._request('post', path, config);
    };
    Client.prototype.put = function (path, data, options) {
        var config = options;
        config.data = data;
        return this._request('put', path, config);
    };
    Client.prototype.delete = function (path, options) {
        return this._request('delete', path, options);
    };
    Client.prototype._request = function (method, path, config) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = config;
                        request.url = "".concat(this.options.baseUrl, "/").concat(path);
                        request.method = method;
                        this.options.auth.authorize(request);
                        request = _.merge(request, this.options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.request(request)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, this._handleResponse(request, response)];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, this._handleError(request, error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype._handleResponse = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.onResponse) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(this.options.onResponse(request, response))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype._handleError = function (request, error) {
        return __awaiter(this, void 0, void 0, function () {
            var clientError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientError = new ClientError_1.default(error);
                        if (!this.options.onError) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(this.options.onError(request, clientError))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: throw clientError;
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
