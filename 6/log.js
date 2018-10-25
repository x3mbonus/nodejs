let fs = require("fs");

let events = require('events');
var eventEmitter = new events.EventEmitter();

const folder = __dirname+"\\logs"
const errorFile = folder+"\\node.error.log";
const infoFile = folder+"\\node.info.log";
const warnFile = folder+"\\node.warn.log";
const errorEvent = "log.error";
const infoEvent = "log.info";
const warnEvent = "log.warn";


function folderReady(logCallback){
    fs.exists(folder, function(exists){
        if (!exists){
            fs.mkdir(folder, logCallback);
            console.log(`Folder ${folder} created`);
            return;
        }
        logCallback();
        return;
    })
}

function log(file, event, message) {
    folderReady(err => {
        if (err){
            console.log(err);
            return;
        }
        fs.appendFile(file, "\r\n"+new Date() + ": " + message, () => eventEmitter.emit(event, message));
    })   
}

function info(message) {
    log(infoFile, infoEvent, message);
}

function warn(message) {
    log(warnFile, warnEvent, message);
}

function error(message) {
    log(errorFile, errorEvent, message);
}

function on(event, listener){
    eventEmitter.on(event, listener);
}

module.exports = {
    info: info,
    warn: warn,
    error: error,
    on: on,
    events: {
        info: infoEvent,
        warn: warnEvent,
        error: errorEvent
    }
};