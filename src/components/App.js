import React, { Component } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Loader from './Loader';

import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }

  createProduct(name, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false });
      });
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false });
      });
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load the account from metamask
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      //load smartcontract from blockchain
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address);
      this.setState({ marketplace });
      this.setState({ loading: false });

      //testing purposes for addding product to the blockchain
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // console.log(productCount.toString());

      //load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        });
      }
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }

  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading
                ? <Loader />
                : <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                />}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
