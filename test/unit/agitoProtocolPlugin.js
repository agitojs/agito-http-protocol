'use strict';

describe('An Agito protocol plugin', function() {

  var protocolPlugin = require('../..');

  var f;
  var protocolsMock;

  beforeEach(function() {
    f = protocolPlugin();
    protocolsMock = [];
  });

  it('should expose the `match` method', function(done) {
    f.call({ protocols: protocolsMock, done: function() {

      expect(protocolsMock[0]).to.respondTo('match');
      done();
    }});
  });

  it('should expose a `proxy.start` method', function(done) {
    f.call({ protocols: protocolsMock, done: function() {

      expect(protocolsMock[0]).to.have.property('proxy')
        .that.respondTo('start');
      done();
    }});
  });

  it('should expose a `proxy.address` property', function(done) {
    f.call({ protocols: protocolsMock, done: function() {

      expect(protocolsMock[0]).to.have.property('proxy')
        .that.have.ownProperty('address');
      done();
    }});
  });

  it('should add a new protocol', function(done) {
    f.call({ protocols: protocolsMock, done: function() {

      expect(protocolsMock)
        .to.be.an('array')
        .and
        .to.have.length(1);
      done();
    }});
  });

});
