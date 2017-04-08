
import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color'

const styles = {
    container: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        display: 'inline-block'
    },
    colorBox: {
        width: '36px',
        height: '14px',
        border: '1px solid #E5E5E5',
        borderRadius: '2px'
    },
    popup: {
        position: 'absolute',
        zIndex: '100'
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    }
}

const Color = props => (
    <div style={styles.container} onClick={props.onClick}>
        <div style={{...styles.colorBox, background:props.color }}></div>
        { props.showPicker === true ? <div style={ styles.popup }>
          <div style={ styles.cover } onClick={ props.closePicker }/>
          <div style={{ position: 'absolute', right: 0 }}><SketchPicker color={ props.color } onChange={ props.onColorChange } /></div>
        </div> : null } 
    </div>
);

export class ColorPicker extends React.Component {

    static propTypes = {
        foreground: PropTypes.string,
        background: PropTypes.string,
        onBackgroundColorChange: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = { showForegroundPicker: false, showBackgroundPicker: false }
    }

    onForegroundClicked = () => {
        this.setState({ showForegroundPicker: true });
    }
    onBackgroundClicked = () => {
        this.setState({ showBackgroundPicker: true });
    }
    closeBackgroundColorPicker = () => {                  
        setTimeout( () => {
            this.setState({ showBackgroundPicker: false });
        });        
    }
    closeForegroundColorPicker = () => {
        setTimeout( () => {
            this.setState({ showForegroundPicker: false });
        });        
    }

    render() {        
        return (
            <div>
                <Color color={this.props.background} 
                       showPicker={this.state.showBackgroundPicker} 
                       closePicker={this.closeBackgroundColorPicker}                        
                       onClick={this.onBackgroundClicked}
                       onColorChange={this.props.onBackgroundColorChange} />                
                <span style={{paddingRight: 4}}/>
                <Color color={this.props.foreground}
                       showPicker={this.state.showForegroundPicker} 
                       closePicker={this.closeForegroundColorPicker}                        
                       onClick={this.onForegroundClicked}
                       onColorChange={this.props.onForegroundColorChange} />                
            </div>
        );
    }
}

export default ColorPicker;