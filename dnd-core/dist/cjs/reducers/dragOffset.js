"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dragOffset;

var _dragDrop = require("../actions/dragDrop");

var _equality = require("../utils/equality");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};

function dragOffset() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;

  switch (action.type) {
    case _dragDrop.INIT_COORDS:
    case _dragDrop.BEGIN_DRAG:
      return {
        initialSourceClientOffset: payload.sourceClientOffset,
        initialClientOffset: payload.clientOffset,
        clientOffset: payload.clientOffset
      };

    case _dragDrop.HOVER:
      if ((0, _equality.areCoordsEqual)(state.clientOffset, payload.clientOffset)) {
        return state;
      }

      return _objectSpread({}, state, {
        clientOffset: payload.clientOffset
      });

    case _dragDrop.END_DRAG:
    case _dragDrop.DROP:
      return initialState;

    default:
      return state;
  }
}