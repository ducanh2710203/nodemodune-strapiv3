function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

var Calendar = function Calendar(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "13",
    height: "12",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M.973 11.143h2.19V9.214H.972v1.929zm2.676 0h2.433V9.214H3.649v1.929zM.973 8.786h2.19V6.643H.972v2.143zm2.676 0h2.433V6.643H3.649v2.143zM.973 6.214h2.19V4.286H.972v1.928zm5.595 4.929h2.433V9.214H6.568v1.929zM3.65 6.214h2.433V4.286H3.649v1.928zm5.838 4.929h2.19V9.214h-2.19v1.929zM6.568 8.786h2.433V6.643H6.568v2.143zM3.892 3V1.071a.195.195 0 00-.072-.15.25.25 0 00-.171-.064h-.487a.25.25 0 00-.17.064.195.195 0 00-.073.15V3c0 .058.024.108.072.15a.25.25 0 00.171.064h.487a.25.25 0 00.171-.063A.195.195 0 003.892 3zm5.595 5.786h2.19V6.643h-2.19v2.143zM6.568 6.214h2.433V4.286H6.568v1.928zm2.92 0h2.189V4.286h-2.19v1.928zM9.73 3V1.071a.195.195 0 00-.073-.15.25.25 0 00-.17-.064H9a.25.25 0 00-.171.064.195.195 0 00-.073.15V3c0 .058.025.108.073.15a.25.25 0 00.17.064h.487a.25.25 0 00.171-.063A.195.195 0 009.731 3zm2.919-.429v8.572a.779.779 0 01-.29.603c-.192.17-.42.254-.683.254H.973c-.263 0-.492-.085-.684-.254A.779.779 0 010 11.143V2.57c0-.232.096-.433.289-.602.192-.17.42-.255.684-.255h.973v-.643c0-.294.12-.546.357-.756.239-.21.525-.315.86-.315h.486c.334 0 .62.105.859.315.238.21.357.462.357.756v.643h2.92v-.643c0-.294.119-.546.357-.756C8.38.105 8.666 0 9 0h.486c.335 0 .621.105.86.315.238.21.357.462.357.756v.643h.973c.263 0 .491.085.684.255.192.17.289.37.289.602z",
    fill: props.fill,
    fillRule: "nonzero"
  }));
};

Calendar.defaultProps = {
  fill: '#fff'
};
Calendar.propTypes = {
  fill: PropTypes.string
};
export default Calendar;