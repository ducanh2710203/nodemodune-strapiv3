function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var SingleType = function SingleType(_ref) {
  var fill = _ref.fill,
      rest = _objectWithoutProperties(_ref, ["fill"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "19",
    height: "12"
  }, rest, {
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React.createElement("path", {
    fill: fill,
    d: "M6.084.223c.48 0 .48 0 .934.1.453.101.453.101.849.28.395.177.395.177.72.422.326.244.326.244.55.53l-.759 1.039-.066.087c-.1.12-.1.12-.201.184-.136.085-.136.085-.322.085-.178 0-.178 0-.357-.116-.178-.116-.178-.116-.399-.256-.22-.139-.22-.139-.507-.255-.287-.116-.287-.116-.675-.116-.356 0-.356 0-.623.1-.268.101-.268.101-.446.28-.178.177-.178.177-.267.418-.09.24-.09.24-.09.527 0 .31 0 .31.175.519.174.21.174.21.465.368.29.159.29.159.655.29.364.133.364.133.748.287.383.155.383.155.751.357.369.202.369.202.66.504.29.302.29.302.464.728.174.426.174.426.174 1.023 0 .853 0 .853-.294 1.605-.295.751-.295.751-.845 1.313-.55.562-.55.562-1.337.891-.786.33-.786.33-1.77.33-.489 0-.489 0-.98-.109-.493-.108-.493-.108-.946-.306-.454-.198-.454-.198-.841-.469-.388-.271-.388-.271-.659-.604l.899-1.178.074-.083c.081-.077.081-.077.19-.134.162-.086.162-.086.325-.086.217 0 .217 0 .422.152l.454.333c.248.182.248.182.577.333.33.151.33.151.81.151.705 0 .705 0 1.089-.383.384-.384.384-.384.384-1.136 0-.348 0-.348-.175-.573-.174-.225-.174-.225-.457-.38C5.154 7.12 5.154 7.12 4.79 7c-.365-.12-.365-.12-.744-.26-.38-.14-.38-.14-.744-.33-.365-.189-.365-.189-.647-.495-.283-.306-.283-.306-.458-.752-.174-.446-.174-.446-.174-1.097 0-.751 0-.751.283-1.445.283-.693.283-.693.81-1.228.527-.535.527-.535 1.279-.853.751-.317.751-.317 1.689-.317zm12.157.4l-.255 1.935H15.21L14.1 11.55h-2.43l1.095-8.992h-2.79l.24-1.935h8.025z",
    fillRule: "evenodd"
  }));
};

SingleType.defaultProps = {
  fill: '#fff'
};
SingleType.propTypes = {
  fill: PropTypes.string
};
export default SingleType;