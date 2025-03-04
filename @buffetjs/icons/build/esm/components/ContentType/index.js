function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

var ContentType = function ContentType(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "19",
    height: "13",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M5.438 10.11c.275 0 .513-.021.716-.064.202-.042.376-.096.521-.161.145-.065.267-.136.368-.214.1-.077.19-.148.27-.213.08-.066.154-.12.225-.162a.426.426 0 01.224-.063c.08 0 .147.013.2.04a.324.324 0 01.116.095l.855 1.027a4.7 4.7 0 01-1.692 1.286c-.652.293-1.393.439-2.223.439-.69 0-1.302-.121-1.834-.364a3.854 3.854 0 01-1.346-1.001 4.321 4.321 0 01-.83-1.511 6.123 6.123 0 01-.28-1.886c0-.626.07-1.218.21-1.778.14-.56.337-1.077.592-1.553a6.01 6.01 0 01.919-1.282c.357-.38.753-.702 1.188-.968a5.669 5.669 0 012.97-.825c.41 0 .784.04 1.122.117.337.077.642.185.915.322a3.433 3.433 0 011.293 1.122l-.854.99c-.06.07-.13.132-.21.187a.546.546 0 01-.315.083.46.46 0 01-.233-.06 1.716 1.716 0 01-.214-.147 32.955 32.955 0 00-.244-.191 1.64 1.64 0 00-.322-.191 2.336 2.336 0 00-.446-.147 2.733 2.733 0 00-.611-.06c-.46 0-.89.098-1.287.293a3.043 3.043 0 00-1.035.836 4.025 4.025 0 00-.686 1.32 5.7 5.7 0 00-.248 1.736c0 .466.057.88.17 1.246.112.365.265.673.46.926.196.252.428.445.698.577.27.133.562.199.878.199zm12.84-7.102h-2.775L14.393 12h-2.43l1.095-8.992h-2.79l.24-1.936h8.024l-.255 1.936z",
    fill: props.fill,
    fillRule: "evenodd"
  }));
};

ContentType.defaultProps = {
  fill: '#fff'
};
ContentType.propTypes = {
  fill: PropTypes.string
};
export default ContentType;