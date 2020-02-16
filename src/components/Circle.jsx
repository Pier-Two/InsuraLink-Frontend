import React, { Component } from 'react';
import Typography from 'material-ui/styles/typography';



class Circle extends Component {
    state = {

    }

    render() {
        var circleStyle = {
            padding:10,
            margin:20,
            display:"inline-block",
            backgroundColor: "#282828",
            borderRadius: 100,
            border: "3px solid #796b4d",
            width:100,
            textAlign: "center",
            color: "white",
            justifyContent: "center",
            height:100,
            };
        return (
            <div style={circleStyle}> 
                {this.props.data}
            </div>
        );
    }
}

export default (Circle);