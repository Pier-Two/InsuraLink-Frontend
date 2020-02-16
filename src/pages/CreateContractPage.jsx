import React, { Component } from "react";
import CreateContractForm from "../components/CreateContractForm/CreateContractForm";
import AppBar from "../components/AppBar";


class CreateContractPage extends Component {

    render() {
        return (
            <div style={{height:'100vh'}}>
                <AppBar web3={this.props.web3}/>
                <CreateContractForm web3={this.props.web3}/>
            </div>
        )
    }
}

export default CreateContractPage;