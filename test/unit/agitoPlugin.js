'use strict';

describe('An Agito plugin', function() {

  var plugin = require('../..');

  it('should be a function', function() {
    expect(plugin).to.be.a('function');
  });

  it('should return a function when called', function() {
    var ret = plugin();

    expect(ret).to.be.a('function');
  });

  it('should call the done callback once it finishes', function(done) {
    var f = plugin();

    f.call({ protocols: [], triggers: [], actions: [], done: done });
  });

});
