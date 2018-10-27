"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function badRequest(req, res, message) {
    console.info("Error in request " + req.method + " " + req.url + ": " + message);
    res.statusCode = 400;
    sendJson(res, { Success: false, Message: message });
}

function success(res, json) {
    if (json) {
        sendJson(res, { Success: true, Result: json });
    } else {
        sendJson(res, { Success: true });
    }
}

function sendJson(res, json) {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(json));
    res.end();
}

var requestHelper = exports.requestHelper = {
    badRequest: badRequest,
    success: success,
    sendJson: sendJson
};