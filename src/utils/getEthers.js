import { ethers } from 'ethers';


const getEthers = (web3) => {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);
    console.log(provider)
}

export default getEthers;
