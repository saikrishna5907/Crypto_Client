import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CheckOutForm from '../../components/CheckOutForm/checkoutForm';
class PurchaseCrypto extends Component {
    state = {
        cryptoName: '',
        units: 0,
        formErrors: [],
        totalCostInAUD: 0
    }
    priceUpdataHandler = async() => {
        const data = await this.props.cryptoData.find(crypto => crypto.name === this.state.cryptoName)
        await this.setState({ totalCostInAUD: data.currentValueinAUD * this.state.units });
    }
    handleCurrencyChange = async event => {
        await this.setState({ cryptoName: event.target.value });
        this.priceUpdataHandler();
    }
    handleUnitsChange = async event => {
        await this.setState({ units: event.target.value });
        if (this.state.cryptoName) {
            this.priceUpdataHandler();
        }
    }
    componentDidMount() {
        this.props.getCryptoData();
    }
    onBuyNowClickHandler = async () => {
        let errors = [];
        if (!this.state.cryptoName || this.state.cryptoName === '') {
            errors.push({ field: 'name', msg: 'The Crypto Currency Name is required' });

        }
        if (this.state.units === 0) {
            errors.push({ field: 'units', msg: 'Currency units must be greater than 0 ' })
        }
        await this.setState({ formErrors: errors });
        if (this.state.formErrors.length === 0) {
            const token = localStorage.getItem('token');
            this.props.onPurchase(this.state, token);
            this.props.history.push('/yourPurchases');
        }
    }
    render() {
        return (
            <Fragment>
                <CheckOutForm
                    handleUnitsChange={this.handleUnitsChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    cryptoName={this.state.cryptoName}
                    units={this.state.units}
                    formErrors={this.state.formErrors}
                    totalCostInAUD={this.state.totalCostInAUD}
                    cryptoData={this.props.cryptoData}
                    // getCryptoData={this.props.getCryptoData}
                    onPurchaseHandler={this.onBuyNowClickHandler}
                />
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        cryptoData: state.crypto.cryptoData,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCryptoData: () => dispatch(actions.fetchCryptoData()),
        onPurchase: (purchaseData, token) => dispatch(actions.purchaseCrypto(purchaseData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCrypto);