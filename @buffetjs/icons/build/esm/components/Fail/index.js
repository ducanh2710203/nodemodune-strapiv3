function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var Fail = function Fail(_ref) {
  var fill = _ref.fill,
      rest = _objectWithoutProperties(_ref, ["fill"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 15 15",
    width: "15px",
    height: "15px"
  }, rest), /*#__PURE__*/React.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(-765.000000, -186.000000)",
    stroke: fill
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(537.154730, 162.000000)"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(228.345270, 24.500000)"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", {
    transform: "translate(0.200000, 0.000000)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-2.30926389e-14",
    y: "9.05941988e-14",
    width: "13.3",
    height: "13.3",
    rx: "6.65"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.1383821,5.9023905 C10.1383821,5.94440718 10.1222219,5.98157578 10.0899014,6.0138963 L7.83069687,8.27310079 C7.79837635,8.30542131 7.76120775,8.32158157 7.71919107,8.32158157 C7.67717439,8.32158157 7.64000579,8.30542131 7.60768527,8.27310079 L5.34848078,6.0138963 C5.31616026,5.98157578 5.3,5.94440718 5.3,5.9023905 C5.3,5.86037382 5.31616026,5.82320522 5.34848078,5.7908847 L5.5908847,5.54848078 C5.62320522,5.51616026 5.66037382,5.5 5.7023905,5.5 C5.74440718,5.5 5.78157578,5.51616026 5.8138963,5.54848078 L7.71919107,7.45377556 L9.62448585,5.54848078 C9.65680637,5.51616026 9.69397497,5.5 9.73599165,5.5 C9.77800833,5.5 9.81517693,5.51616026 9.84749745,5.54848078 L10.0899014,5.7908847 C10.1222219,5.82320522 10.1383821,5.86037382 10.1383821,5.9023905 Z",
    strokeWidth: "0.7",
    fill: fill,
    fillRule: "nonzero",
    transform: "translate(7.719191, 6.910791) scale(-1, -1) rotate(270.000000) translate(-7.719191, -6.910791) "
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.04758642,5.9795045 C8.04758642,6.02152118 8.03142616,6.05868978 7.99910564,6.09101031 L5.73990115,8.35021479 C5.70758063,8.38253532 5.67041203,8.39869558 5.62839535,8.39869558 C5.58637867,8.39869558 5.54921007,8.38253532 5.51688955,8.35021479 L3.25768506,6.09101031 C3.22536454,6.05868978 3.20920428,6.02152118 3.20920428,5.9795045 C3.20920428,5.93748783 3.22536454,5.90031923 3.25768506,5.8679987 L3.50008897,5.62559479 C3.5324095,5.59327427 3.5695781,5.57711401 3.61159478,5.57711401 C3.65361145,5.57711401 3.69078005,5.59327427 3.72310058,5.62559479 L5.62839535,7.53088956 L7.53369012,5.62559479 C7.56601064,5.59327427 7.60317924,5.57711401 7.64519592,5.57711401 C7.6872126,5.57711401 7.7243812,5.59327427 7.75670172,5.62559479 L7.99910564,5.8679987 C8.03142616,5.90031923 8.04758642,5.93748783 8.04758642,5.9795045 Z",
    strokeWidth: "0.7",
    fill: fill,
    fillRule: "nonzero",
    transform: "translate(5.628395, 6.987905) scale(-1, -1) rotate(90.000000) translate(-5.628395, -6.987905) "
  })))))))));
};

Fail.defaultProps = {
  fill: '#f64d0a'
};
Fail.propTypes = {
  fill: PropTypes.string
};
export default Fail;