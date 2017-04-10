
import React from 'react';
import styled from 'styled-components';
import { LeftRightSection } from 'react-containers';
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

const Header = styled.div`
    background: #333;
    height: 52px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
`
const Title = styled.div`
    padding-left: 8px;
    font-weight: bold;
    color: #00d8ff;
    font-size: 20px;
    font-family: Arial;
    line-height: 52px;
`

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
        const selectedComponent = Object.keys(components||{})[0];
        this.state = { foreground: '#000', background: '#FFF', components, selectedComponent };
    }

    componentDidMount() {
        //get the hash and use that
        const hashValue = window.location.hash;
        if ( hashValue && hashValue.length > 0 ) {
            const selectedComponent = hashValue.substring(1);
            const isSelectedInComponents = Object.keys(this.state.components || {}).some( key => key === selectedComponent);
            if ( isSelectedInComponents ) {
                this.setState({ selectedComponent });
            }
        }
    }

    onChangeComponent = ( e ) => {
        const { target } = e;
        this.setState({ selectedComponent: target.value }, () => {
            window.history.replaceState(null, null, `#${this.state.selectedComponent}`);
        });
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
        const { components = {}, selectedComponent } = this.state;
        const containerStyle = { ...containerDefaultStyle, ...this.props.containerStyle, background: this.state.background, color: this.state.foreground };
        
        const component = components[selectedComponent];
        return (
            <div style={{width: '100%', height: '100%'}}>
                <Header>
                    <LeftRightSection>
                        <Title>React Playground</Title>
                        <div></div>
                    </LeftRightSection>
                    <div>
                        <ListComponents onChange={this.onChangeComponent} components={this.state.components}/>
                        { component ? React.createElement(component.component) : <div>No Component Selected</div> }
                    </div>
                </Header>
            </div>      
        );
        
        
    }
}

export default Playground;
