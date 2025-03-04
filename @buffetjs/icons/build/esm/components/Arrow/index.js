function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

var Arrow = function Arrow(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "10",
    height: "10",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8.70908786,0.724302898 C8.70908786,0.79993292 8.67999939,0.8668364 8.62182245,0.92501334 L4.55525437,4.99158142 C4.49707743,5.04975836 4.43017395,5.07884683 4.35454393,5.07884683 C4.27891391,5.07884683 4.21201043,5.04975836 4.15383349,4.99158142 L0.0872654094,0.92501334 C0.0290884698,0.8668364 1.15463195e-14,0.79993292 1.15463195e-14,0.724302898 C1.15463195e-14,0.648672877 0.0290884698,0.581769396 0.0872654094,0.523592457 L0.523592457,0.0872654094 C0.581769396,0.0290884698 0.648672877,6.17284002e-14 0.724302898,6.17284002e-14 C0.79993292,6.17284002e-14 0.8668364,0.0290884698 0.92501334,0.0872654094 L4.35454393,3.516796 L7.78407452,0.0872654094 C7.84225146,0.0290884698 7.90915494,6.17284002e-14 7.98478496,6.17284002e-14 C8.06041499,6.17284002e-14 8.12731847,0.0290884698 8.18549541,0.0872654094 L8.62182245,0.523592457 C8.67999939,0.581769396 8.70908786,0.648672877 8.70908786,0.724302898 Z",
    id: "Path",
    fillRule: "nonzero",
    transform: "translate(4.354544, 2.539423) scale(-1, -1) translate(-4.354544, -2.539423) "
  }), /*#__PURE__*/React.createElement("rect", {
    id: "Rectangle",
    x: "3.8",
    y: "1",
    width: "1.2",
    height: "8",
    rx: "0.2"
  }));
};

Arrow.defaultProps = {
  fill: '#fff'
};
Arrow.propTypes = {
  fill: PropTypes.string
};
export default Arrow;