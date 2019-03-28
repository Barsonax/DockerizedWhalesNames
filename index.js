'use strict';

let syncDockerHosts = (() => {
    var _ref2 = _asyncToGenerator(function* (hostsFile, checkInterval = 5000) {
        const hostNamesOperator = new HostNamesFileOperator(hostsFile);
        const dockerNamesSynchronizer = new DockerContainerHostNamesSynchronizer(docker, hostNamesOperator);
        const intervalId = setInterval(_asyncToGenerator(function* () {
            try {
                yield dockerNamesSynchronizer.synchronize();
            } catch (err) {
                console.error(err);
            }
        }), checkInterval);
    });

    return function syncDockerHosts(_x) {
        return _ref2.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const nodeVersion = parseInt(/v([0-9]+)./.exec(process.version)[1]);
if (nodeVersion < 8) {
    require('util.promisify/shim')();
}

const docker = require('./docker');
const HostNamesFileOperator = require('./hosts');
const DockerContainerHostNamesSynchronizer = require('./sync');

(() => {
    var _ref = _asyncToGenerator(function* (...args) {
        args = args.slice(2);
        console.log(`Synchronizing docker container hostnames in hosts file.`);
        yield syncDockerHosts(args[0]);
    });

    function main() {
        return _ref.apply(this, process.argv);
    }

    return main;
})()();