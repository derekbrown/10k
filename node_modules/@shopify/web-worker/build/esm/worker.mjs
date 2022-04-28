import { createEndpoint, fromWebWorker } from '@shopify/rpc';

function expose(api) {
  const endpoint = createEndpoint(fromWebWorker(self));
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

export { expose };
