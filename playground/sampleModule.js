
import React from 'react';

export class RCls extends React.Component {

    render() {
        return (
            <div style={{padding: 10}}>
                <div style={{background: 'red', color: '#FFF'}}>Component One</div>
            </div>
        );
    }
}
export const Div = () => <div>Hello World</div>;
export default Div;