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
        while (_) try {
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
import { findAllByUserId, findById, findTitleById, insert, remove, softFindById, } from "../repositories/credentialRepositories.js";
import { decryptSensitiveInfo, encryptSensitiveInfo, } from "./encryptionServices.js";
export function newCredentialsRoutine(credentialData, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkForDuplicateTitles(userId, credentialData.title)];
                case 1:
                    _a.sent();
                    credentialData.password = encryptSensitiveInfo(credentialData.password);
                    return [4 /*yield*/, insert(credentialData, userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function checkForDuplicateTitles(id, credentialsTitle) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findTitleById(id, credentialsTitle)];
                case 1:
                    data = _a.sent();
                    if (data !== null)
                        throw { type: "title_conflict", message: "titles must be unique" };
                    return [2 /*return*/];
            }
        });
    });
}
export function listCredentialsRoutine(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findAllByUserId(userId)];
                case 1:
                    data = _a.sent();
                    data.map(function (item) { return removeUnnecessaryKeys(item); });
                    data.forEach(function (item) { return (item.password = decryptSensitiveInfo(item.password)); });
                    return [2 /*return*/, data];
            }
        });
    });
}
export function getCredentialByIdRoutine(itemId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(itemId, userId)];
                case 1:
                    data = _a.sent();
                    if (data === null)
                        return [2 /*return*/, []];
                    if (data.ownerId !== userId)
                        throw { type: "authentication_error" };
                    removeUnnecessaryKeys(data);
                    data.password = decryptSensitiveInfo(data.password);
                    return [2 /*return*/, data];
            }
        });
    });
}
export function deleteCredentialsRoutine(itemId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, softFindById(itemId)];
                case 1:
                    data = _a.sent();
                    if (data === null)
                        throw { type: "not_found_error" };
                    if (data.ownerId !== userId)
                        throw { type: "authentication_error" };
                    return [4 /*yield*/, remove(itemId, userId)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function excludeKeys(data) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
        var key = keys_1[_a];
        delete data[key];
    }
    return data;
}
function removeUnnecessaryKeys(data) {
    excludeKeys(data, "ownerId");
    excludeKeys(data, "createdAt");
}
