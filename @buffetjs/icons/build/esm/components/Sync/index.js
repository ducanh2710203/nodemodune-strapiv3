function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var Sync = function Sync(_ref) {
  var fill = _ref.fill,
      rest = _objectWithoutProperties(_ref, ["fill"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 11 11",
    width: "11",
    height: "11"
  }, rest, {
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 .917v3.208a.44.44 0 01-.136.322.44.44 0 01-.322.136H7.333c-.2 0-.341-.095-.422-.286-.081-.186-.048-.351.1-.494L8 2.814a3.558 3.558 0 00-2.499-.98c-.497 0-.97.096-1.422.29a3.695 3.695 0 00-1.17.784c-.33.329-.591.72-.785 1.17-.193.452-.29.925-.29 1.422 0 .497.097.97.29 1.422.194.45.455.841.785 1.17.329.33.72.591 1.17.785.452.193.925.29 1.422.29.568 0 1.105-.124 1.611-.373.506-.248.934-.599 1.282-1.052.034-.048.089-.077.165-.086.072 0 .131.021.179.064l.981.988a.199.199 0 01.068.147.235.235 0 01-.054.161 5.377 5.377 0 01-1.89 1.465c-.74.346-1.52.519-2.342.519a5.351 5.351 0 01-2.134-.437A5.549 5.549 0 011.61 9.39 5.549 5.549 0 01.437 7.634 5.351 5.351 0 010 5.5c0-.745.146-1.456.437-2.134A5.549 5.549 0 011.61 1.61 5.549 5.549 0 013.366.437 5.351 5.351 0 015.5 0a5.56 5.56 0 013.788 1.518l.931-.924c.139-.148.306-.181.502-.1.186.081.279.222.279.423z",
    fill: fill,
    fillRule: "nonzero"
  }));
};

Sync.defaultProps = {
  fill: '#fff'
};
Sync.propTypes = {
  fill: PropTypes.string
};
export default Sync;