'use strict';

var fs = require('fs');
var http = require('http');

var agitoHttpProtocol = function() {

  /**
   * The HTTP server.
   *
   * @type {http.Server}
   */
  var _server;

  var httpProtocol = {};

  /**
   * Protocol's name.
   *
   * @type {String}
   */
  httpProtocol.name = 'http';

  /**
   * Called on each new request to determine if the HTTP protocol is effectively
   * used.
   *
   * @param {String} buffer - The beginning of the request
   *
   * @return {Boolean} - True if the request uses the HTTP protocol, false
   * otherwise
   */
  httpProtocol.match = function(buffer) {
    var mark = 'HTTP/';

    return buffer.indexOf(mark) > -1;
  };

  httpProtocol.proxy = {};

  /**
   * Where the proxy will be listening.
   *
   * @type {String}
   */
  httpProtocol.proxy.address = './agito-http-protocol-proxy.socket';

  /**
   * Start the proxy server.
   */
  httpProtocol.proxy.start = function() {
    var that = this;

    fs.unlink(httpProtocol.proxy.address, function() {

      _server = http.createServer(function onRequest(request, response) {

        that.triggers.every(function(trigger) {

          // TODO(aymeric): dynamically match the request
          if (true) {
            (that.actions[trigger.action.name].fn)(
              request, response, trigger.action.options
            );
            return false;
          }

          return true;

        });

        response.end();
      });

      _server.listen(httpProtocol.proxy.address, that.done);

    });
  };

  return function() {
    this.protocols.push(httpProtocol);

    return this.done();
  };

};

module.exports = agitoHttpProtocol;
