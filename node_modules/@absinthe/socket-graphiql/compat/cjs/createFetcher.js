'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.string.iterator');
require('core-js/modules/es6.map');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
require('core-js/modules/es7.symbol.async-iterator');
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.find');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));
var withAbsintheSocket = require('@absinthe/socket');
var utilsGraphql = require('@jumpn/utils-graphql');
var phoenix = require('phoenix');

var _this = undefined;

var observe = function observe(subscriptionsClient, notifier, callback) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return withAbsintheSocket.observe(subscriptionsClient.absintheSocket, notifier, {
    onAbort: callback,
    onResult: function onResult(result) {
      _newArrowCheck(this, _this2);

      return callback(null, result);
    }.bind(this)
  });
}.bind(undefined);

var generateRequestKey = function generateRequestKey(subscriptionsClient) {
  _newArrowCheck(this, _this);

  subscriptionsClient.requestsCount += 1;
  return String(subscriptionsClient.requestsCount);
}.bind(undefined);

var storeRequest = function storeRequest(subscriptionsClient, request) {
  _newArrowCheck(this, _this);

  var requestKey = generateRequestKey(subscriptionsClient);
  subscriptionsClient.requests.set(request, requestKey);
  return requestKey;
}.bind(undefined);

var storeRequestIfNeeded = function storeRequestIfNeeded(subscriptionsClient, request) {
  _newArrowCheck(this, _this);

  var requestKey = subscriptionsClient.requests.get(request);
  return requestKey !== undefined ? requestKey : storeRequest(subscriptionsClient, request);
}.bind(undefined);

var findNotifier = function findNotifier(subscriptionsClient, request) {
  var _this3 = this;

  _newArrowCheck(this, _this);

  return subscriptionsClient.absintheSocket.notifiers.find(function (notifier) {
    _newArrowCheck(this, _this3);

    return notifier.request === request;
  }.bind(this));
}.bind(undefined); // eslint-disable-next-line consistent-return


var findRequest = function findRequest(subscriptionsClient, requestKey) {
  _newArrowCheck(this, _this);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = subscriptionsClient.requests.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          request = _step$value[0],
          key = _step$value[1];

      if (key === requestKey) return request;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}.bind(undefined);

var cancel = function cancel(subscriptionsClient, notifier) {
  _newArrowCheck(this, _this);

  withAbsintheSocket.cancel(subscriptionsClient.absintheSocket, notifier);
  subscriptionsClient.requests.delete(notifier.request);
}.bind(undefined);

var SubscriptionsClient =
/*#__PURE__*/
function () {
  function SubscriptionsClient(socketUrl, options) {
    _classCallCheck(this, SubscriptionsClient);

    _defineProperty(this, "absintheSocket", void 0);

    _defineProperty(this, "requestsCount", 0);

    _defineProperty(this, "requests", void 0);

    this.absintheSocket = withAbsintheSocket.create(new phoenix.Socket(socketUrl, options));
    this.requests = new Map();
  }

  _createClass(SubscriptionsClient, [{
    key: "close",
    value: function close() {
      this.absintheSocket.phoenixSocket.disconnect();
    }
  }, {
    key: "subscribe",
    value: function subscribe(requestCompat, callback) {
      var notifier = withAbsintheSocket.send(this.absintheSocket, utilsGraphql.requestFromCompat(requestCompat));
      var requestKey = storeRequestIfNeeded(this, notifier.request);
      observe(this, notifier, callback);
      return requestKey;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(requestKey) {
      var request = findRequest(this, requestKey);

      if (request) {
        var notifier = findNotifier(this, request);
        if (notifier) cancel(this, notifier);
      }
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll() {
      var _this4 = this;

      this.absintheSocket.notifiers.forEach(function (notifier) {
        _newArrowCheck(this, _this4);

        return cancel(this, notifier);
      }.bind(this));
    }
  }]);

  return SubscriptionsClient;
}();

var _this$1 = undefined;

var parseIfJson = function parseIfJson(text) {
  _newArrowCheck(this, _this$1);

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}.bind(undefined);

var responseToText = function responseToText(response) {
  _newArrowCheck(this, _this$1);

  return response.text();
}.bind(undefined);

var postJson = function postJson(url, body) {
  _newArrowCheck(this, _this$1);

  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  }).then(responseToText).then(parseIfJson);
}.bind(undefined);

var getSubscribeCallback = function getSubscribeCallback(observer) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (error, result) {
    _newArrowCheck(this, _this2);

    if (error) {
      observer.error(error);
    } else {
      observer.next(result);
    }
  }.bind(this);
}.bind(undefined);

var subscribeWithObservable = function subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat) {
  var _this3 = this;

  _newArrowCheck(this, _this$1);

  return {
    subscribe: function subscribe(observer) {
      _newArrowCheck(this, _this3);

      observer.next(subscriptionSentMessage);
      state.activeSubscriptionId = subscriptionsClient.subscribe(gqlRequestCompat, getSubscribeCallback(observer));
    }.bind(this)
  };
}.bind(undefined);
/**
 * Creates a Fetcher using the given arguments
 */


var createFetcher = function createFetcher(apiUrl, subscriptionsClient, subscriptionSentMessage) {
  var _this4 = this;

  _newArrowCheck(this, _this$1);

  var state = {
    activeSubscriptionId: undefined
  };
  return function (gqlRequestCompat) {
    _newArrowCheck(this, _this4);

    if (state.activeSubscriptionId) {
      subscriptionsClient.unsubscribe(state.activeSubscriptionId);
    }

    return utilsGraphql.getOperationType(gqlRequestCompat.query) !== "subscription" ? postJson(apiUrl, gqlRequestCompat) : subscribeWithObservable(state, subscriptionsClient, subscriptionSentMessage, gqlRequestCompat);
  }.bind(this);
}.bind(undefined);

module.exports = createFetcher;
//# sourceMappingURL=createFetcher.js.map
