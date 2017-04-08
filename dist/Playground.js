'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Playground = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectStyle = {
    padding: '6px 8px',
    border: '2px solid #E5E5E5',
    boxShadow: 'none',
    borderRadius: '2px',
    background: 'transparent',
    backgroundImage: 'none'
};

var colorPickerStyle = {
    position: 'absolute',
    right: 4,
    top: 4
};

var containerDefaultStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

var collectElements = function collectElements(module) {

    return Object.keys(module || {}).reduce(function (partial, key) {
        var possibleReactComponent = module[key];

        if (key.indexOf('__Play') >= 0) {
            partial[key] = { type: 'playgroundFn', component: possibleReactComponent };
        } else {
            try {
                _react2.default.createElement(possibleReactComponent);
                partial[key] = { type: 'component', component: possibleReactComponent };
            } catch (e) {}
        }
        return partial;
    }, {});
};

var ListComponents = function ListComponents(props) {

    return _react2.default.createElement(
        'div',
        { style: { padding: 4 } },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'span',
                { style: { paddingRight: 12 } },
                'Components/Playground'
            ),
            _react2.default.createElement(
                'select',
                { style: selectStyle, onChange: props.onChange },
                Object.keys(props.components).map(function (key) {
                    return _react2.default.createElement(
                        'option',
                        { key: key, value: key },
                        key
                    );
                })
            )
        )
    );
};

ListComponents.propTypes = {
    components: _propTypes2.default.object,
    onChange: _propTypes2.default.func
};

var Playground = exports.Playground = function (_React$Component) {
    _inherits(Playground, _React$Component);

    function Playground(props) {
        _classCallCheck(this, Playground);

        var _this = _possibleConstructorReturn(this, (Playground.__proto__ || Object.getPrototypeOf(Playground)).call(this, props));

        _this.onChangeComponent = function (e) {
            var target = e.target;

            _this.setState({ selectedComponent: target.value });
        };

        _this.onBackgroundColorChange = function (color) {
            var hex = color.hex;

            _this.setState({ background: hex });
        };

        _this.onForegroundColorChange = function (color) {
            var hex = color.hex;

            _this.setState({ foreground: hex });
        };

        var components = collectElements(_this.props.module);
        var keys = Object.keys(components || {});
        var selectedComponent = keys[0] || null;
        _this.state = { foreground: '#000', background: '#FFF', components: components, selectedComponent: selectedComponent };
        return _this;
    }

    _createClass(Playground, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                components = _state.components,
                selectedComponent = _state.selectedComponent;

            var containerStyle = _extends({}, containerDefaultStyle, this.props.containerStyle, { background: this.state.background, color: this.state.foreground });
            var component = components[selectedComponent];

            return _react2.default.createElement(
                'div',
                { style: containerStyle },
                _react2.default.createElement(ListComponents, { onChange: this.onChangeComponent, components: this.state.components }),
                _react2.default.createElement('div', { style: colorPickerStyle }),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(component.component)
                )
            );
        }
    }]);

    return Playground;
}(_react2.default.Component);

Playground.propTypes = {
    module: _propTypes2.default.object,
    containerStyle: _propTypes2.default.object
};
Playground.defaultProps = {
    containerStyle: {}
};
exports.default = Playground;

//  <ColorPicker {...this.state}
//                             onBackgroundColorChange={this.onBackgroundColorChange}
//                             onForegroundColorChange={this.onForegroundColorChange} />