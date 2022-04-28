'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createWorkerMessenger(url) {
  const workerScript = URL.createObjectURL(new Blob([`importScripts(${JSON.stringify(url.href)})`]));
  const worker = new Worker(workerScript);
  const originalTerminate = worker.terminate.bind(worker);

  worker.terminate = () => {
    URL.revokeObjectURL(workerScript);
    originalTerminate();
  };

  return worker;
}

exports.createWorkerMessenger = createWorkerMessenger;
