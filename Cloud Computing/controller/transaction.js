const express = require('express');
const transactions = require('../model/transaction_model');
const products = require('../model/products_model');

const getAllTransaction = async (req, res) => {
    try {
        const transaction = await transactions.findAll();
        res.status(200).json({
            status: "success",
            message: "Successfully fetched all transaction data",
            transactions: transaction
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

const getAllTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await transactions.findByPk(transactionId);

        if (!transaction) {
            return res.status(400).json({
                status: "Error",
                message: `Transaction with id ${transactionId} does not exist!`
            });
        }
        res.status(200).json({
            status: "success",
            transaction: transaction
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }

};

const newTransaction = async (req, res) => {
    try {
        const { count, buyerId, productId, sellerId } = req.body;
        const product = await products.findByPk(productId);

        if (!product) {
            return res.status(400).json({
                status: "Error",
                message: `Product with id ${productId} does not exist!`
            });
        }

        const total_price = product.price * count;
  
        const newTransaction = await transactions.create({
            count: count,
            total_price: total_price,
            buyerId: buyerId,
            productId: productId,
            sellerId: sellerId

        });
        res.status(201).json({
            status: "success",
            message: "successfull add new transaction!",
            newTransaction
        })
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const targetTransaction = await transactions.destroy({
            where: {
                id: transactionId
            }
        })

        if (targetTransaction === 0) {
            res.status(400).json({
                status: 'failed',
                message: `Transaction with id ${transactionId} is not exist!`
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully delete Transaction"
        })

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
}

module.exports = {
    getAllTransaction,
    getAllTransactionById,
    newTransaction,
    deleteTransaction
}