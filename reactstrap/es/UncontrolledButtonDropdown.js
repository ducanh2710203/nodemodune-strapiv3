import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonDropdown from './ButtonDropdown';
import { omit } from './utils';
var omitKeys = ['defaultOpen'];

var UncontrolledButtonDropdown =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(UncontrolledButtonDropdown, _Component);

  function UncontrolledButtonDropdown(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      isOpen: props.defaultOpen || false
    };
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = UncontrolledButtonDropdown.prototype;

  _proto.toggle = function toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  _proto.render = function render() {
    return React.createElement(ButtonDropdown, _extends({
      isOpen: this.state.isOpen,
      toggle: this.toggle
    }, omit(this.props, omitKeys)));
  };

  return UncontrolledButtonDropdown;
}(Component);

export { UncontrolledButtonDropdown as default };
UncontrolledButtonDropdown.propTypes = _objectSpread2({
  defaultOpen: PropTypes.bool
}, ButtonDropdown.propTypes);