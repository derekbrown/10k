'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rpc = require('@shopify/rpc');

function expose(api) {
  const endpoint = rpc.createEndpoint(rpc.fromWebWorker(self));
  self.addEventListener('message', ({
    data
  }) => {
    if (data == null) {
      return;
    }

    if (data.__replace instanceof MessagePort) {
      endpoint.replace(data.__replace);

      data.__replace.start();
    }
  });
  Reflect.defineProperty(self, 'endpoint', {
    value: endpoint
  });
  endpoint.expose(api);
}

exports.expose = expose;
