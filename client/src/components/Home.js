import React, { useState } from 'react';
import '../assets/css/all.min.css';

const Home = props =>  {


    const onSubmit = (e) => {
        e.preventDefault();
        console.log('button working');
    }

    return (
        
            <div className="home-content">
            <section className="expense-input">
                <form onSubmit={onSubmit} className="expense-input_form">
                    <input type="date" name="date" id="date" placeholder="Date"/>
                    <input type="text" name="payee" id="payee" placeholder="Payee"/>
                    <input type="text" name="description" id="description" placeholder="Description"/>
                    <input type="text" name="amount" id="amount" placeholder="Amount Spent"/>
                    <button type="submit">Add New Expense</button>
                </form>
            </section>
            <section className="expense-data">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Place</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>McDonald's</td>
                            <td>Bought breakfast cause i was in a rush</td>
                            <td>$8.95</td>
                            <td className="actions">
                                <a href="#"><i className="fa fa-edit" title="Edit"></i></a>
                                <a href="#"><i className="fa fa-trash" title="Delete"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        
    )
}

export default Home;
