import React, { Fragment, useState, useContext, useRef } from 'react';
import globalContext from '../context/globalContext';

const AddExpense = () => {
    const GlobalContext = useContext(globalContext);
    const [date, setDate ] = useState();
    const [payee, setPayee ] = useState();
    const [description, setDescription ] = useState();
    const [amount, setAmount ] = useState();
    const expenseInputForm = useRef(null);

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
    }

    const editUserExpense = (id) => {

        console.log(id);

        console.log(GlobalContext.expenses.find((expense) => expense.id === id));

        const record = GlobalContext.expenses.find((expense) => expense.id === id);

        expenseInputForm.current.elements.namedItem("date").value = record.date;
        expenseInputForm.current.elements.namedItem("payee").value = record.payee;
        expenseInputForm.current.elements.namedItem("description").value = record.description;
        expenseInputForm.current.elements.namedItem("amount").value = record.amount;
    }

    return (
        <Fragment>
            <section className="expense-input">
                <form className="expense-input_form" onSubmit={submitExpense}  ref={expenseInputForm}>
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
                                            <button type="button" onClick={() => editUserExpense(value.id)}><i className="fa fa-edit" title="Edit"></i></button>
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
