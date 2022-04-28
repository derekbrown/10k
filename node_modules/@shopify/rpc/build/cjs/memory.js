'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('./types.js');

class StackFrame {
  constructor() {
    this.memoryManaged = new Set();
  }

  add(memoryManageable) {
    this.memoryManaged.add(memoryManageable);
    memoryManageable[types.RETAINED_BY].add(this);
    memoryManageable[types.RETAIN_METHOD]();
  }

  release() {
    for (const memoryManaged of this.memoryManaged) {
      memoryManaged[types.RETAINED_BY].delete(this);
      memoryManaged[types.RELEASE_METHOD]();
    }

    this.memoryManaged.clear();
  }

}
function isMemoryManageable(value) {
  return Boolean(value && value[types.RETAIN_METHOD] && value[types.RELEASE_METHOD]);
}
function retain(value, {
  deep = true
} = {}) {
  const canRetain = isMemoryManageable(value);

  if (canRetain) {
    value[types.RETAIN_METHOD]();
  }

  if (deep) {
    if (Array.isArray(value)) {
      return value.reduce((canRetain, item) => retain(item, {
        deep
      }) || canRetain, canRetain);
    } else if (typeof value === 'object' && value != null) {
      return Object.keys(value).reduce((canRetain, key) => retain(value[key], {
        deep
      }) || canRetain, canRetain);
    }
  }

  return canRetain;
}
function release(value, {
  deep = true
} = {}) {
  const canRelease = isMemoryManageable(value);

  if (canRelease) {
    value[types.RELEASE_METHOD]();
  }

  if (deep) {
    if (Array.isArray(value)) {
      return value.reduce((canRelease, item) => release(item, {
        deep
      }) || canRelease, canRelease);
    } else if (typeof value === 'object' && value != null) {
      return Object.keys(value).reduce((canRelease, key) => release(value[key], {
        deep
      }) || canRelease, canRelease);
    }
  }

  return canRelease;
}

exports.RELEASE_METHOD = types.RELEASE_METHOD;
exports.RETAINED_BY = types.RETAINED_BY;
exports.RETAIN_METHOD = types.RETAIN_METHOD;
exports.StackFrame = StackFrame;
exports.isMemoryManageable = isMemoryManageable;
exports.release = release;
exports.retain = retain;
