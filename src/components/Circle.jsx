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
            borderRadius: 200,
            border: "3px solid #796b4d",
            width:200,
            textAlign: "center",
            color: "white",
            justifyContent: "center",
            height:200,
            };
        return (
            <div style={circleStyle}>
                <div style={{ paddingTop: "10%" }}>
                    {this.props.data}
                </div> 
            </div>
        );
    }
}

export default (Circle);