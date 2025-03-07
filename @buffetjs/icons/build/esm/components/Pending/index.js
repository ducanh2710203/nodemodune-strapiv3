function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var Pending = function Pending(_ref) {
  var fill = _ref.fill,
      rest = _objectWithoutProperties(_ref, ["fill"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 14 14",
    width: "14px",
    height: "14px"
  }, rest), /*#__PURE__*/React.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(-764.000000, -186.000000)",
    fill: fill,
    fillRule: "nonzero"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(537.154730, 162.000000)"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(226.845270, 24.000000)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.16666667,3.79166667 L8.16666667,7.875 C8.16666667,7.96006944 8.13932292,8.02994792 8.08463542,8.08463542 C8.02994792,8.13932292 7.96006944,8.16666667 7.875,8.16666667 L4.95833333,8.16666667 C4.87326389,8.16666667 4.80338542,8.13932292 4.74869792,8.08463542 C4.69401042,8.02994792 4.66666667,7.96006944 4.66666667,7.875 L4.66666667,7.29166667 C4.66666667,7.20659722 4.69401042,7.13671875 4.74869792,7.08203125 C4.80338542,7.02734375 4.87326389,7 4.95833333,7 L7,7 L7,3.79166667 C7,3.70659722 7.02734375,3.63671875 7.08203125,3.58203125 C7.13671875,3.52734375 7.20659722,3.5 7.29166667,3.5 L7.875,3.5 C7.96006944,3.5 8.02994792,3.52734375 8.08463542,3.58203125 C8.13932292,3.63671875 8.16666667,3.70659722 8.16666667,3.79166667 Z M11.9583333,7 C11.9583333,6.10069444 11.7365451,5.27126736 11.2929687,4.51171875 C10.8493924,3.75217014 10.2478299,3.15060764 9.48828125,2.70703125 C8.72873264,2.26345486 7.89930556,2.04166667 7,2.04166667 C6.10069444,2.04166667 5.27126736,2.26345486 4.51171875,2.70703125 C3.75217014,3.15060764 3.15060764,3.75217014 2.70703125,4.51171875 C2.26345486,5.27126736 2.04166667,6.10069444 2.04166667,7 C2.04166667,7.89930556 2.26345486,8.72873264 2.70703125,9.48828125 C3.15060764,10.2478299 3.75217014,10.8493924 4.51171875,11.2929687 C5.27126736,11.7365451 6.10069444,11.9583333 7,11.9583333 C7.89930556,11.9583333 8.72873264,11.7365451 9.48828125,11.2929687 C10.2478299,10.8493924 10.8493924,10.2478299 11.2929687,9.48828125 C11.7365451,8.72873264 11.9583333,7.89930556 11.9583333,7 Z M14,7 C14,8.26996528 13.687066,9.44118924 13.0611979,10.5136719 C12.4353299,11.5861545 11.5861545,12.4353299 10.5136719,13.0611979 C9.44118924,13.687066 8.26996528,14 7,14 C5.73003472,14 4.55881076,13.687066 3.48632812,13.0611979 C2.41384549,12.4353299 1.56467014,11.5861545 0.938802083,10.5136719 C0.312934028,9.44118924 0,8.26996528 0,7 C0,5.73003472 0.312934028,4.55881076 0.938802083,3.48632812 C1.56467014,2.41384549 2.41384549,1.56467014 3.48632812,0.938802083 C4.55881076,0.312934028 5.73003472,0 7,0 C8.26996528,0 9.44118924,0.312934028 10.5136719,0.938802083 C11.5861545,1.56467014 12.4353299,2.41384549 13.0611979,3.48632812 C13.687066,4.55881076 14,5.73003472 14,7 Z"
  }))))));
};

Pending.defaultProps = {
  fill: '#6DBB1A'
};
Pending.propTypes = {
  fill: PropTypes.string
};
export default Pending;