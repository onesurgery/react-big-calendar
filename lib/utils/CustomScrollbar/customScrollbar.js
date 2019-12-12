'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var scrollBarRef = props.scrollBarRef;

  var clonedProps = _extends({}, props);
  delete clonedProps.scrollBarRef;

  return _react2.default.createElement(_reactCustomScrollbars.Scrollbars, _extends({
    autoHideTimeout: 1000,
    autoHideDuration: 200
  }, clonedProps, {
    ref: scrollBarRef,
    renderTrackHorizontal: function renderTrackHorizontal(props) {
      return _react2.default.createElement('div', _extends({}, props, { className: 'track-horizontal' }));
    },
    renderTrackVertical: function renderTrackVertical(props) {
      return _react2.default.createElement('div', _extends({}, props, { className: 'track-vertical' }));
    },
    renderThumbHorizontal: function renderThumbHorizontal(props) {
      return _react2.default.createElement('div', _extends({}, props, { className: 'thumb-horizontal' }));
    },
    renderThumbVertical: function renderThumbVertical(props) {
      return _react2.default.createElement('div', _extends({}, props, { className: 'thumb-vertical' }));
    }
    // autoHide
  }));
};

module.exports = exports['default'];