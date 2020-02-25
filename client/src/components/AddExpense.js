import React from 'react'

const AddExpense = () => {
    return (
        <section class="expense-input">
            <form action="#" class="expense-input_form">
                <input type="date" name="date" id="date" placeholder="Date" />
                <input type="text" name="payee" id="payee" placeholder="Payee" />
                <input type="text" name="description" id="description" placeholder="Description" />
                <input type="text" name="amount" id="amount" placeholder="Amount Spent" />
                <button type="submit">Add New Expense</button>
            </form>
        </section>
    )
}

export default AddExpense;
