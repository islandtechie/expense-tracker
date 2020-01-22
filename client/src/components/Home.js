import React, { useState, useEffect } from 'react';
import '../assets/css/all.min.css';
import RecordTable from './RecordTable';

const Home = props =>  {

    const [date, setDate] = useState("2018-07-22");
    const [payee, setPayee] = useState('McDonalds');
    const [description, setDescription] = useState('In a Rush');
    const [amount, setAmount] = useState('5.76');
    const [expense, setExpense] = useState({});
    const [records, setRecords] = useState([
        {id: 1, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 2, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 3, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 4, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 5, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 6, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 7, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 8, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"},
        {id: 9, date: "2018-07-22", payee: "McDonalds", description: "In a Rush", amount: "5.76"}
    ]);

    useEffect(() => {
        setTimeout(() => {
            console.log(records);
        }, 2000)
    },[records]);

    const addRecord = (e) => {
        e.preventDefault();
            setRecords([
                ...records,
                {
                    id: records.length + 1,
                    date,
                    payee,
                    description,
                    amount
                }
            ])
            console.log('recored added');
            console.log(records);
    }

    const deleteRecord = (id) => {
        let temp;
        setRecords((records) => {
            temp = records.filter(record => record.id !== id);
        });
        console.log(temp);
    }

    const editRecord = (id) => {
        console.log(id +' has been edited');
    }
    

    return (
        
            <div className="home-content">
            <section className="expense-input">
                <form onSubmit={addRecord} className="expense-input_form">
                    <input 
                        type="date" 
                        name="date" 
                        id="date" 
                        value={date}
                        min="2018-01-01"
                        onChange={setDate}
                    />
                    <input 
                        type="text" 
                        name="payee" 
                        id="payee" 
                        placeholder="Payee" 
                        value={payee}
                        onChange={setPayee} 
                    />
                    <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        placeholder="Description" 
                        value={description}
                        onChange={setDescription}    
                    />
                    <input 
                        type="text" 
                        name="amount" 
                        id="amount" 
                        placeholder="Amount Spent"
                        value={amount}
                        onChange={setAmount}    
                    />
                    <button type="submit">Add New Expense</button>
                </form>
            </section>
            <section className="expense-data">
                <RecordTable 
                    records={records} 
                    deleteRecord={deleteRecord} 
                    editRecord={editRecord} 
                />
            </section>
        </div>
        
    )
}

export default Home;
