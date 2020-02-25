import React, { Fragment } from 'react'

const AddExpense = () => {
    return (
        <Fragment>
            <section className="expense-input">
                <form action="#" className="expense-input_form">
                    <input type="date" name="date" id="date" placeholder="Date" />
                    <input type="text" name="payee" id="payee" placeholder="Payee" />
                    <input type="text" name="description" id="description" placeholder="Description" />
                    <input type="text" name="amount" id="amount" placeholder="Amount Spent" />
                    <button type="submit">Add New Expense</button>
                </form>
            </section>
            <section class="expense-data">
                <table>
                    <thead>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3<sup>rd</sup> Feb, 1987</td>
                            <td>McDonald's</td>
                            <td>Bought breakfast cause i was in a rush</td>
                            <td>$8.95</td>
                            <td class="actions">
                                <a href="#"><i class="fa fa-edit" title="Edit"></i></a>
                                <a href="#"><i class="fa fa-trash" title="Delete"></i></a>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </section>
        </Fragment>
    )
}

export default AddExpense;
