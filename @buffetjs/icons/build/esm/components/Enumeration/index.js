function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

var Enumeration = function Enumeration(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "12",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3.214 10.179c0 .446-.156.825-.468 1.138a1.55 1.55 0 01-1.139.469 1.55 1.55 0 01-1.138-.469A1.55 1.55 0 010 10.179c0-.447.156-.826.469-1.139a1.55 1.55 0 011.138-.469c.447 0 .826.157 1.139.47.312.312.468.691.468 1.138zm0-4.286c0 .446-.156.826-.468 1.138a1.55 1.55 0 01-1.139.469A1.55 1.55 0 01.47 7.031 1.55 1.55 0 010 5.893c0-.447.156-.826.469-1.139a1.55 1.55 0 011.138-.468c.447 0 .826.156 1.139.468.312.313.468.692.468 1.139zM15 9.375v1.607a.257.257 0 01-.08.188.257.257 0 01-.188.08H4.554a.257.257 0 01-.189-.08.257.257 0 01-.08-.188V9.375c0-.073.027-.135.08-.188a.257.257 0 01.189-.08h10.178c.073 0 .135.027.188.08.053.053.08.115.08.188zM3.214 1.607c0 .447-.156.826-.468 1.139a1.55 1.55 0 01-1.139.468A1.55 1.55 0 01.47 2.746 1.55 1.55 0 010 1.607C0 1.161.156.781.469.47A1.55 1.55 0 011.607 0c.447 0 .826.156 1.139.469.312.312.468.692.468 1.138zM15 5.09v1.607a.257.257 0 01-.08.189.257.257 0 01-.188.08H4.554a.257.257 0 01-.189-.08.257.257 0 01-.08-.189V5.09c0-.072.027-.135.08-.188a.257.257 0 01.189-.08h10.178c.073 0 .135.027.188.08.053.053.08.116.08.188zm0-4.285V2.41a.257.257 0 01-.08.188.257.257 0 01-.188.08H4.554a.257.257 0 01-.189-.08.257.257 0 01-.08-.188V.804c0-.073.027-.136.08-.189a.257.257 0 01.189-.08h10.178c.073 0 .135.027.188.08.053.053.08.116.08.189z",
    fill: props.fill,
    fillRule: "nonzero"
  }));
};

Enumeration.defaultProps = {
  fill: '#fff'
};
Enumeration.propTypes = {
  fill: PropTypes.string
};
export default Enumeration;