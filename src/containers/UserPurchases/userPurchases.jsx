import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import TransactionCard from '../../components/TransactionsCard/transactionCard';
import Spinner from '../../components/Spinner/spinner';
import Modal from '../../components/Modal/modal';
import ConfirmDialog from '../../components/DialogBox/dialogBox';
import CheckOutForm from '../../components/CheckOutForm/checkoutForm';
import { Col, Row } from 'react-bootstrap';
class UserPurchases extends Component {
  state = {
    cryptoName: '',
    units: 0,
    dialogOpen: false,
    dialogAnswer: false,
    formErrors: [],
    deleteInProgressId: '',
    editingPurchase: [],
    totalCostInAUD: 0,
    editInProgress: false
  }
  componentDidMount() {
    this.props.getCryptoData();
    this.props.getUserPurchases(this.props.token, this.props.userId);
  }
  handleClose = async () => {
    await this.setState({ editInProgress: false });
  };
  dialogOpenHandler = () => {
    this.setState({ dialogOpen: true })
  }
  dialogCloseHandler = () => {
    this.setState({ dialogOpen: false })
  }

  dialogAgreeHanlder = async () => {
    await this.setState({ dialogAnswer: true });
    this.props.onDeleteTransaction(this.props.token, this.state.deleteInProgressId);
    this.dialogCloseHandler();

  }
  compare = (firstTransaction, secondTransaction) => {
    const fName = firstTransaction.cryptoName.toUpperCase();
    const sName = secondTransaction.cryptoName.toUpperCase();
    let comparison = 0;
    if (fName > sName) {
      comparison = 1;
    } else if (fName < sName) {
      comparison = -1;
    }
    return comparison;
  }

  onDeletePurchaseHandler = async _id => {
    this.dialogOpenHandler();
    await this.setState({ deleteInProgressId: _id })
  }
  totalSpendingOnCurrencies = () => {
    let amount = 0;
    this.props.userPurchases.map(x => {
      return amount += x.totalPurchaseAmount
    })
    return amount;
  }
  handleCurrencyChange = event => {
    this.setState({ cryptoName: event.target.value });
  }
  handleUnitsChange = async event => {
    await this.setState({ units: event.target.value });
    if (this.state.cryptoName) {
      const data = await this.props.cryptoData.find(crypto => crypto.name === this.state.cryptoName)
      await this.setState({ totalCostInAUD: data.currentValueinAUD * this.state.units });
    }
  }
  onEditProgressHandler = async (purchase) => {
    await this.setState({ editInProgress: true, editingPurchase: purchase });
  }
  onEditPurchaseHandler = async () => {
    let errors = [];
    if (!this.state.cryptoName || this.state.cryptoName === '') {
      errors.push({ field: 'name', msg: 'The Crypto Currency Name is required' });

    }
    if (this.state.units === 0) {
      errors.push({ field: 'units', msg: 'Currency units must be greater than 0 ' })
    }
    await this.setState({ formErrors: errors });
    const purchaseData = {
      cryptoName: this.state.cryptoName,
      units: this.state.units,
      totalPurchaseAmount: this.state.totalCostInAUD
    }
    if (this.state.formErrors.length === 0) {
      console.log(purchaseData)
      this.props.OnEditPurchase(this.props.token, this.state.editingPurchase._id, purchaseData);
      this.props.history.push('/yourPurchases');
    }
  }
  render() {
    let purchases = <Spinner />
    if (!this.props.loading) {
      this.props.userPurchases.sort(this.compare)
      purchases = (
        <TransactionCard
          onEditProgressHandler={this.onEditProgressHandler}
          onDeletePurchaseHandler={this.onDeletePurchaseHandler}
          userPurchases={this.props.userPurchases}
          cryptoData={this.props.cryptoData}
        />
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.editInProgress}
          modalClosed={this.handleClose}
        >
          <CheckOutForm
            handleUnitsChange={this.handleUnitsChange}
            handleCurrencyChange={this.handleCurrencyChange}
            cryptoName={this.state.cryptoName}
            units={this.state.units}
            formErrors={this.state.formErrors}
            totalCostInAUD={this.state.totalCostInAUD}
            cryptoData={this.props.cryptoData}
            editInProgress={true}
            onEditPurchaseHandler={this.onEditPurchaseHandler}
          />
        </Modal>
        <ConfirmDialog
          dialogAgreeHanlder={this.dialogAgreeHanlder}
          dialogOpen={this.state.dialogOpen}
          dialogOpenHandler={this.dialogOpenHandler}
          dialogCloseHandler={this.dialogCloseHandler}
        />
        <div style={{ color: 'white' }}>
          <Row>
            <Col >
              <h5>Your total expenditure on all Currencies</h5>
            </Col>
            <Col style={{ alignContent: 'right' }}>
              {/* <Row>
                <Col> */}
              Total Amount Paid in AUD <h4>{this.totalSpendingOnCurrencies().toFixed(3)}</h4>
              {/* </Col>
                <Col>
                  Current Value in AUD
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
        <div
          style={{ height: '1vh', width: '100%', backgroundColor: 'white', marginBottom: '3vh' }}
        ></div>
        {purchases}
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    userPurchases: state.purchase.purchases,
    cryptoData: state.crypto.cryptoData,
    loading: state.purchase.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCryptoData: () => dispatch(actions.fetchCryptoData()),
    getUserPurchases: (token, userId) => dispatch(actions.fetchPurchases(token, userId)),
    onDeleteTransaction: (token, _id) => dispatch(actions.deletePurchase(token, _id)),
    OnEditPurchase: (token, _id, data) => dispatch(actions.updatePurchase(token, _id, data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPurchases);