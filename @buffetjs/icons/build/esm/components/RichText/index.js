function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

var RichText = function RichText(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "13",
    height: "10",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M13 8.643V9.5a.397.397 0 01-.138.301.465.465 0 01-.326.128H.464A.465.465 0 01.138 9.8.397.397 0 010 9.5v-.857c0-.116.046-.217.138-.301a.465.465 0 01.326-.128h12.072c.125 0 .234.043.326.128a.397.397 0 01.138.3zM10.214 6.07v.858a.397.397 0 01-.138.3.465.465 0 01-.326.128H.464a.465.465 0 01-.326-.127A.397.397 0 010 6.929V6.07c0-.116.046-.216.138-.3a.465.465 0 01.326-.128H9.75c.126 0 .235.042.326.127a.397.397 0 01.138.301zM12.071 3.5v.857a.397.397 0 01-.137.301.465.465 0 01-.327.128H.464a.465.465 0 01-.326-.128.397.397 0 01-.138-.3V3.5c0-.116.046-.217.138-.301a.465.465 0 01.326-.128h11.143c.126 0 .235.043.327.128a.397.397 0 01.137.301zM9.286.929v.857a.397.397 0 01-.138.301.465.465 0 01-.327.127H.464a.465.465 0 01-.326-.127A.397.397 0 010 1.786V.929C0 .813.046.712.138.627A.465.465 0 01.464.5h8.357c.126 0 .235.042.327.127a.397.397 0 01.138.302z",
    fill: props.fill,
    fillRule: "nonzero"
  }));
};

RichText.defaultProps = {
  fill: '#fff'
};
RichText.propTypes = {
  fill: PropTypes.string
};
export default RichText;