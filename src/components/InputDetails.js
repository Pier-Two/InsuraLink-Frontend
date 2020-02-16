import React, { Component } from 'react';
import { Typography, Button, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextField, MenuItem, Slider } from 'material-ui';



class InputDetails extends Component {
    state = {
        contractType: "Custom",
        temp: 0,
        humidty: 0,
        angle: 0,
    }

    componentDidMount = async () => {

    }

    onHumidityChange = value => {
        this.setState({ humidty: value })
    }

    onTempChange = value => {
        this.setState({ temp: value })
    }

    onAngleChange = value => {
        this.setState({ angle: value })
    }

    render() {
        return (
            <div>
                <Paper style={{
                    width: '95%', marginLeft: 'auto', backgroundColor: "#f0f0f0", marginRight: 'auto', marginTop: '30px', marginBottom: '30px',
                    paddingBottom: '10px', paddingTop: '10px', height: '100%',
                }}>
                    <Typography style={{ paddingBottom: '10px' }}> Contract Terms </Typography>
                    <div style={{ marginLeft: '10px', flexDirection: 'column', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingBottom: '20px' }}>
                        <div style={{ width: '600px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '20px', width: '20%'  }}> Temperature less than </Typography>
                            <Slider
                                style={{ width: '500px', marginTop: '20px' }}
                                defaultValue={0}
                                value={this.state.temp}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                                onChange={(event, value) => this.onTempChange(value)}
                            />
                            <Typography style={{ paddingLeft: '10px' }}> {this.state.temp} </Typography>
                        </div>
                        <div style={{ width: '600px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '20px', width: '20%' }}> Humidity less than </Typography>
                            <Slider
                                style={{ width: '500px', marginTop: '20px' }}
                                defaultValue={0}
                                value={this.state.humidty}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                                onChange={(event, value) => this.onHumidityChange(value)}
                            />
                            <Typography style={{ paddingLeft: '10px' }}> {this.state.humidty} </Typography>
                        </div>
                        <div style={{ width: '600px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography style={{ paddingRight: '20px', width: '20%'  }}> Angle </Typography>
                            <Slider
                                style={{ width: '500px', marginTop: '20px' }}
                                defaultValue={0}
                                value={this.state.angle}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={90}
                                onChange={(event, value) => this.onAngleChange(value)}
                            />
                            <Typography style={{ paddingLeft: '10px' }}> {this.state.angle} </Typography>
                        </div>
                    </div>
                </Paper>
            </div >
        );
    }

}

export default (InputDetails);