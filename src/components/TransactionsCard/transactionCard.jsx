import React, { Fragment } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import classes from './transactionCard.module.css';
import { TableBody, TableCell, TableContainer, Paper, Table, TableHead, TableRow } from '@material-ui/core';
const tCard = props => {
    const purchasesToDisplay = (
        props.userPurchases.map(purchase => {
            let currentValue = 0;
            let unitPrice = 0;
            const crypto = props.cryptoData.filter(crypto => crypto.name === purchase.cryptoName);
            if (crypto.length !== 0) {
                currentValue += crypto[0].currentValueinAUD;
                unitPrice = currentValue;
                currentValue = currentValue * purchase.units;
            }
            return (
                <Card key={purchase._id} className={classes.card}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Currency Name</TableCell>
                                    <TableCell >Currency Units</TableCell>
                                    <TableCell >Total Amount in AUD</TableCell>
                                    <TableCell >Current Value in AUD</TableCell>
                                    <TableCell >Current Value Of One Unit in AUD</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell >{purchase.cryptoName}</TableCell>
                                    <TableCell >{purchase.units}</TableCell>
                                    <TableCell >{purchase.totalPurchaseAmount.toFixed(3)}</TableCell>
                                    <TableCell >{currentValue.toFixed(3)}</TableCell>
                                    <TableCell >{unitPrice.toFixed(3)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Button className={classes.editBtn}
                        onClick={() => props.onEditProgressHandler(purchase)}
                    >Edit </Button>

                    <Button className={classes.deleteBtn}
                        onClick={() => props.onDeletePurchaseHandler(purchase._id)}
                    >Delete</Button>
                </Card>
            )
        })
    );
    return (
        <Fragment>
            <Container>
                {purchasesToDisplay}
            </Container>
        </Fragment>
    );
}
export default tCard;