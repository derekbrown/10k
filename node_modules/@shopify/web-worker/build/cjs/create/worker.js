'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var rpc = require('@shopify/rpc');
var utilities = require('./utilities.js');
var worker = require('../messenger/worker.js');

const workerEndpointCache = new WeakMap();
function createWorkerFactory(script) {
  const scriptUrl = utilities.createScriptUrl(script);

  function createWorker({
    createMessenger = worker.createWorkerMessenger
  } = {}) {
    if (scriptUrl) {
      const endpoint = rpc.createEndpoint(createMessenger(scriptUrl));
      const {
        call: caller
      } = endpoint;
      workerEndpointCache.set(caller, endpoint);
      return caller;
    } // The babel plugin that comes with this package actually turns the argument
    // into a string (the public path of the worker script). If it’s a function,
    // it’s because we’re in an environment where we didn’t transform it into a
    // worker. In that case, we can use the fact that we will get access to the
    // real module and pretend to be a worker that way.


    if (typeof script === 'function') {
      return new Proxy({}, {
        get(_target, property) {
          return /*#__PURE__*/function () {
            var _ref = _rollupPluginBabelHelpers.asyncToGenerator(function* (...args) {
              const module = yield script();
              return module[property](...args);
            });

            return function () {
              return _ref.apply(this, arguments);
            };
          }();
        }

      });
    } // If we aren’t in an environment that supports Workers, just bail out
    // with a dummy worker that throws for every method call.


    if (typeof window === 'undefined') {
      return new Proxy({}, {
        get(_target, _property) {
          return () => {
            throw new Error('You can’t call a method on a worker on the server.');
          };
        }

      });
    }

    throw new Error('Could not create a suitable fallback');
  }

  Reflect.defineProperty(createWorker, 'url', {
    value: scriptUrl
  });
  return createWorker;
}
function expose(caller, api) {
  const endpoint = getEndpoint(caller);
  return endpoint && endpoint.expose(api);
}
function terminate(caller) {
  const endpoint = getEndpoint(caller);

  if (endpoint) {
    endpoint.terminate();
  }

  workerEndpointCache.delete(caller);
}
function getEndpoint(caller) {
  return workerEndpointCache.get(caller);
}

exports.createWorkerFactory = createWorkerFactory;
exports.expose = expose;
exports.getEndpoint = getEndpoint;
exports.terminate = terminate;
