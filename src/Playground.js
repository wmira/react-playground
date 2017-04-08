
import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

const selectStyle = {
    padding: '6px 8px',
    border: '2px solid #E5E5E5',
    boxShadow: 'none',
    borderRadius: '2px',
    background: 'transparent',
    backgroundImage: 'none'
};


const colorPickerStyle = {
    position: 'absolute',
    right: 4,
    top: 4
};

const containerDefaultStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
};

const collectElements = module => {

    return Object.keys( module || {} ).reduce( (partial, key) => {
        const possibleReactComponent = module[key];

        if ( key.indexOf('__Play') >= 0 ) {
            partial[key] = { type: 'playgroundFn', component: possibleReactComponent };
        } else {
            try {
                React.createElement(possibleReactComponent);
                partial[key] = { type: 'component', component: possibleReactComponent };
            } catch ( e ) {
            }
        }
        return partial;

    }, {} );
};

const ListComponents = props => {

    return (
        <div style={{padding: 4}}>
            <div>
                <span style={{paddingRight: 12}}>Components/Playground</span>
                <select style={selectStyle} onChange={props.onChange}>
                    { Object.keys(props.components).map( key => {
                        return <option key={key} value={key}>{ key }</option>;
                    })}
                </select>
            </div>
        </div>


    );
};

ListComponents.propTypes = {
    components: PropTypes.object,
    onChange: PropTypes.func
};

export class Playground extends React.Component {

    static propTypes = {
        module: PropTypes.object,
        containerStyle: PropTypes.object
    }

    static defaultProps = {
        containerStyle: {}
    }

    constructor(props) {
        super(props);
        const components = collectElements(this.props.module);
        const keys = Object.keys(components || {} );
        const selectedComponent = keys[0] || null;
        this.state = { foreground: '#000', background: '#FFF', components, selectedComponent };
    }

    onChangeComponent = ( e ) => {
        const { target } = e;
        this.setState({ selectedComponent: target.value });
    }

    onBackgroundColorChange = (color) => {
        const { hex } = color;
        this.setState({ background: hex });
    }

    onForegroundColorChange = (color) => {
        const { hex } = color;
        this.setState({ foreground: hex });
    }

    render() {
        const { components, selectedComponent } = this.state;
        const containerStyle = { ...containerDefaultStyle, ...this.props.containerStyle, background: this.state.background, color: this.state.foreground };
        const component = components[selectedComponent];

        return (
            <div style={containerStyle}>
                <ListComponents onChange={this.onChangeComponent} components={this.state.components}/>
                <div style={colorPickerStyle}>
                   
                </div>
                <div>
                    { React.createElement(component.component) }
                </div>
            </div>
        );
    }
}

export default Playground;

//  <ColorPicker {...this.state}
//                             onBackgroundColorChange={this.onBackgroundColorChange}
//                             onForegroundColorChange={this.onForegroundColorChange} />