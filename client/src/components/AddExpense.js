import React, { Fragment, useState, useContext } from 'react';
import globalContext from '../context/globalContext';

const AddExpense = () => {
    const GlobalContext = useContext(globalContext);
    const [date, setDate ] = useState();
    const [payee, setPayee ] = useState();
    const [description, setDescription ] = useState();
    const [amount, setAmount ] = useState();

    const inputDate = (e) => {
        setDate(e.target.value);
    }

    const inputPayee = (e) => {
        setPayee(e.target.value);
    }

    const inputDescription = (e) => {
        setDescription(e.target.value);
    }

    const inputAmount = (e) => {
        setAmount(e.target.value);
    }

    const submitExpense = (e) => {
        e.preventDefault();

        if (date === "" || payee === "" || description === "" || amount === "")
        {
            alert('Please make an entry to continue.')
        }

        GlobalContext.addExpense(
            {
                user_id: GlobalContext.user.id,
                date: date,
                payee: payee,
                description: description,
                amount: amount
            }
        );
        setDate("");
        setPayee("");
        setDescription("");
        setAmount("");
    }

    return (
        <Fragment>
            <section className="expense-input">
                <form className="expense-input_form" onSubmit={submitExpense}>
                    <input 
                        type="date" 
                        name="date" 
                        id="date" 
                        placeholder="Date" 
                        onChange={inputDate}
                    />
                    <input 
                        type="text" 
                        name="payee" 
                        id="payee" 
                        placeholder="Payee" 
                        onChange={inputPayee}
                    />
                    <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        placeholder="Description" 
                        onChange={inputDescription}
                    />
                    <input 
                        type="text" 
                        name="amount" 
                        id="amount" 
                        placeholder="Amount Spent" 
                        onChange={inputAmount}
                    />
                    <button type="submit">Add New Expense</button>
                </form>
            </section>
            <section className="expense-data">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Payee</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            GlobalContext.expenses.map((value, key) => {
                                return <tr key={key}>
                                        <td>{value.date}</td>
                                        <td>{value.payee}</td>
                                        <td>{value.description}</td>
                                        <td>{value.amount}</td>
                                        <td className="actions">
                                            <button type="button" onClick={() => GlobalContext.editUserExpense(value.id)}><i className="fa fa-edit" title="Edit"></i></button>
                                            <button type="button" onClick={() => GlobalContext.deleteUserExpense(value.id)}><i className="fa fa-trash" title="Delete"></i></button>
                                        </td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>
        </Fragment>
    )
}

export default AddExpense;
