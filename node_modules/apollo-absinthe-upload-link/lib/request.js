'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = require('rxjs/ajax');

var _operators = require('rxjs/operators');

/**
 * Request function
 *
 * @param {Object} opts
 */
var request = function request(opts) {
  return (0, _ajax.ajax)({
    url: opts.uri,
    body: opts.body,
    method: 'POST',
    headers: opts.headers,
    withCredentials: opts.withCredentials,
    crossDomain: opts.crossDomain
  }).pipe((0, _operators.map)(function (_ref) {
    var response = _ref.response;
    return response;
  }));
};

exports.default = request;