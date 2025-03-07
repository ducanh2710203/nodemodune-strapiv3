function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var Dots = function Dots(_ref) {
  var fill = _ref.fill,
      rest = _objectWithoutProperties(_ref, ["fill"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "15",
    height: "4",
    viewBox: "0 0 15 4",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M0.450012 1.82254C0.450012 1.64254 0.482512 1.47504 0.547512 1.32004C0.617512 1.16504 0.710012 1.03004 0.825012 0.915039C0.945012 0.800039 1.08501 0.710039 1.24501 0.645039C1.40501 0.575039 1.58001 0.540039 1.77001 0.540039C1.95501 0.540039 2.12751 0.575039 2.28751 0.645039C2.44751 0.710039 2.58751 0.800039 2.70751 0.915039C2.82751 1.03004 2.92001 1.16504 2.98501 1.32004C3.05501 1.47504 3.09001 1.64254 3.09001 1.82254C3.09001 2.00254 3.05501 2.17254 2.98501 2.33254C2.92001 2.48754 2.82751 2.62254 2.70751 2.73754C2.58751 2.85254 2.44751 2.94254 2.28751 3.00754C2.12751 3.07254 1.95501 3.10504 1.77001 3.10504C1.58001 3.10504 1.40501 3.07254 1.24501 3.00754C1.08501 2.94254 0.945012 2.85254 0.825012 2.73754C0.710012 2.62254 0.617512 2.48754 0.547512 2.33254C0.482512 2.17254 0.450012 2.00254 0.450012 1.82254Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.99493 1.82254C5.99493 1.64254 6.02743 1.47504 6.09243 1.32004C6.16243 1.16504 6.25493 1.03004 6.36993 0.915039C6.48993 0.800039 6.62993 0.710039 6.78993 0.645039C6.94993 0.575039 7.12493 0.540039 7.31493 0.540039C7.49993 0.540039 7.67243 0.575039 7.83243 0.645039C7.99243 0.710039 8.13243 0.800039 8.25243 0.915039C8.37243 1.03004 8.46493 1.16504 8.52993 1.32004C8.59993 1.47504 8.63493 1.64254 8.63493 1.82254C8.63493 2.00254 8.59993 2.17254 8.52993 2.33254C8.46493 2.48754 8.37243 2.62254 8.25243 2.73754C8.13243 2.85254 7.99243 2.94254 7.83243 3.00754C7.67243 3.07254 7.49993 3.10504 7.31493 3.10504C7.12493 3.10504 6.94993 3.07254 6.78993 3.00754C6.62993 2.94254 6.48993 2.85254 6.36993 2.73754C6.25493 2.62254 6.16243 2.48754 6.09243 2.33254C6.02743 2.17254 5.99493 2.00254 5.99493 1.82254Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5399 1.82254C11.5399 1.64254 11.5724 1.47504 11.6374 1.32004C11.7074 1.16504 11.7999 1.03004 11.9149 0.915039C12.0349 0.800039 12.1749 0.710039 12.3349 0.645039C12.4949 0.575039 12.6699 0.540039 12.8599 0.540039C13.0449 0.540039 13.2174 0.575039 13.3774 0.645039C13.5374 0.710039 13.6774 0.800039 13.7974 0.915039C13.9174 1.03004 14.0099 1.16504 14.0749 1.32004C14.1449 1.47504 14.1799 1.64254 14.1799 1.82254C14.1799 2.00254 14.1449 2.17254 14.0749 2.33254C14.0099 2.48754 13.9174 2.62254 13.7974 2.73754C13.6774 2.85254 13.5374 2.94254 13.3774 3.00754C13.2174 3.07254 13.0449 3.10504 12.8599 3.10504C12.6699 3.10504 12.4949 3.07254 12.3349 3.00754C12.1749 2.94254 12.0349 2.85254 11.9149 2.73754C11.7999 2.62254 11.7074 2.48754 11.6374 2.33254C11.5724 2.17254 11.5399 2.00254 11.5399 1.82254Z",
    fill: fill
  }));
};

Dots.defaultProps = {
  fill: '#9EA7B8'
};
Dots.propTypes = {
  fill: PropTypes.string
};
export default Dots;