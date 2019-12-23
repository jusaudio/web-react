"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var gapi = require('googleapis').google;
var GoogleScopes;
(function (GoogleScopes) {
    GoogleScopes["SpreadSheets"] = "https://www.googleapis.com/auth/spreadsheets";
})(GoogleScopes = exports.GoogleScopes || (exports.GoogleScopes = {}));
var IMajorDimensions;
(function (IMajorDimensions) {
    IMajorDimensions["Rows"] = "ROWS";
    IMajorDimensions["Columns"] = "COLUMNS";
})(IMajorDimensions || (IMajorDimensions = {}));
var IValueInputOption;
(function (IValueInputOption) {
    IValueInputOption["USER_ENTERED"] = "USER_ENTERED";
    IValueInputOption["RAW"] = "RAW";
})(IValueInputOption || (IValueInputOption = {}));
var GoogleSheets = /** @class */ (function () {
    function GoogleSheets(spreadsheetId, sheetName) {
        this.spreadsheetId = spreadsheetId;
        this.sheetName = sheetName;
    }
    GoogleSheets.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var auth, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.connection) {
                            return [2 /*return*/, this.connection];
                        }
                        return [4 /*yield*/, gapi.auth.getClient({
                                scopes: [GoogleScopes.SpreadSheets]
                            })];
                    case 1:
                        auth = _b.sent();
                        _a = this;
                        return [4 /*yield*/, gapi.sheets({ version: 'v4', auth: auth })];
                    case 2:
                        _a.connection = _b.sent();
                        return [2 /*return*/, this.connection];
                }
            });
        });
    };
    /**
     * Query for a specific google sheets within a spreadsheet
     *
     * @param sheet The sheet to query from google sheets api
     * @param limit How many rows you want including the header titles
     */
    GoogleSheets.prototype.getRows = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var targetSheet, statusText, status, data, majorDimension, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                majorDimension: IMajorDimensions.Rows,
                                range: this.sheetName + this._computeRange(limit)
                            })];
                    case 2:
                        targetSheet = _a.sent();
                        statusText = targetSheet.statusText, status = targetSheet.status, data = targetSheet.data;
                        if (statusText !== 'OK' || status !== 200) {
                            console.error('Error: Not able to get google sheet');
                            return [2 /*return*/, null];
                        }
                        majorDimension = data.majorDimension, values = data.values;
                        if (majorDimension !== IMajorDimensions.Rows || !values || !values.length) {
                            console.error('Error: Values are wrong format');
                            return [2 /*return*/, null];
                        }
                        this.headers = values.shift();
                        return [2 /*return*/, this._convertRows(values)];
                }
            });
        });
    };
    GoogleSheets.prototype.getHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstRow, statusText, status, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.headers && this.headers.length) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.connection.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                majorDimension: IMajorDimensions.Rows,
                                range: this.sheetName + "!1:1"
                            })];
                    case 1:
                        firstRow = _a.sent();
                        statusText = firstRow.statusText, status = firstRow.status, data = firstRow.data;
                        if (statusText !== 'OK' || status !== 200) {
                            console.error('Error: Not able to get google sheet');
                            return [2 /*return*/, null];
                        }
                        this.headers = data.values[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    GoogleSheets.prototype.getColumn = function (columnName) {
        return __awaiter(this, void 0, void 0, function () {
            var targetedColumn, index, entireColumn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeaders()];
                    case 2:
                        _a.sent();
                        index = this.headers.indexOf(columnName);
                        if (index > -1) {
                            targetedColumn = this._getNotationLetterFromIndex(index);
                        }
                        else {
                            throw Error('Column not found');
                        }
                        return [4 /*yield*/, this.connection.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                majorDimension: IMajorDimensions.Rows,
                                range: this.sheetName + "!" + targetedColumn + ":" + targetedColumn
                            })];
                    case 3:
                        entireColumn = _a.sent();
                        return [2 /*return*/, [].concat.apply([], entireColumn.data.values)];
                }
            });
        });
    };
    GoogleSheets.prototype.getRow = function (rowNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var rowRange, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeaders()];
                    case 2:
                        _a.sent();
                        rowRange = this.sheetName + "!" + rowNumber + ":" + rowNumber;
                        return [4 /*yield*/, this.connection.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                majorDimension: IMajorDimensions.Rows,
                                range: rowRange
                            })];
                    case 3:
                        row = _a.sent();
                        return [2 /*return*/, this._convertRows(row.data.values)[0]];
                }
            });
        });
    };
    GoogleSheets.prototype.updateRow = function (rowNumber, updateValues) {
        return __awaiter(this, void 0, void 0, function () {
            var rowRange, updateRow, afterUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeaders()];
                    case 2:
                        _a.sent();
                        rowRange = this.sheetName + "!" + rowNumber + ":" + rowNumber;
                        updateRow = this._convertColumnFormat(updateValues);
                        return [4 /*yield*/, this.connection.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: rowRange,
                                valueInputOption: IValueInputOption.USER_ENTERED,
                                resource: {
                                    values: [updateRow]
                                }
                            })];
                    case 3:
                        afterUpdate = _a.sent();
                        return [2 /*return*/, afterUpdate];
                }
            });
        });
    };
    /**
     * Add a new row to specified spread sheet
     *
     * @param sheetId The sheet to query from google sheets api
     * @param appendValues Data values to add to Google Sheets
     */
    GoogleSheets.prototype.appendRow = function (appendValues) {
        return __awaiter(this, void 0, void 0, function () {
            var updateValues, appendResponse, _a, spreadsheetId, updatedRows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getHeaders()];
                    case 2:
                        _b.sent();
                        updateValues = this._convertColumnFormat(appendValues);
                        return [4 /*yield*/, this.connection.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: this.sheetName,
                                valueInputOption: IValueInputOption.USER_ENTERED,
                                resource: {
                                    values: [updateValues]
                                }
                            })];
                    case 3:
                        appendResponse = _b.sent();
                        _a = appendResponse.data.updates, spreadsheetId = _a.spreadsheetId, updatedRows = _a.updatedRows;
                        return [2 /*return*/, { spreadsheetId: spreadsheetId, updatedRows: updatedRows }];
                }
            });
        });
    };
    GoogleSheets.prototype.clearRowsWithRange = function (from, to) {
        if (from === void 0) { from = 2; }
        if (to === void 0) { to = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var range, clearResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeaders()];
                    case 2:
                        _a.sent();
                        range = this.sheetName + "!" + from + ":" + to;
                        console.info("Will clear rows range: " + range);
                        return [4 /*yield*/, this.connection.spreadsheets.values.clear({
                                spreadsheetId: this.spreadsheetId,
                                range: range
                            })];
                    case 3:
                        clearResults = _a.sent();
                        return [2 /*return*/, clearResults];
                }
            });
        });
    };
    GoogleSheets.prototype._getNotationLetterFromIndex = function (index) {
        return ((index >= 26
            ? this._getNotationLetterFromIndex(((index / 26) >> 0) - 1)
            : '') + 'abcdefghijklmnopqrstuvwxyz'[index % 26 >> 0].toUpperCase());
    };
    GoogleSheets.prototype._convertRows = function (rows) {
        var _this = this;
        return rows.map(function (row) {
            var obj = {};
            _this.headers.forEach(function (key, i2) {
                obj[key] = row[i2];
            });
            return obj;
        });
    };
    GoogleSheets.prototype._convertColumnFormat = function (appendValues) {
        return this.headers.map(function (c) {
            var columnValue = appendValues[c];
            if (columnValue === null || columnValue === undefined) {
                columnValue = '';
            }
            return columnValue;
        });
    };
    GoogleSheets.prototype._computeRange = function (limit) {
        if (!limit) {
            return '';
        }
        return "!A1:" + (limit + 1);
    };
    GoogleSheets.prototype._errorHandler = function (error) {
        console.error('Something bad happened: ', error);
    };
    return GoogleSheets;
}());
exports["default"] = GoogleSheets;
