import React from 'react';
import Record from '../components/Record';

const RecordTable = props => {

    const confirmDelete = (id) => {

        if ( window.confirm('Are you you sure you wnat to delete this record ?') ) 
        {
            props.deleteRecord(id);
        }

    }

    const editRecord = (id) => {
        props.editRecord(id);
    }

    if (props.records)
    {
        return (
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
                    {props.records.map((record, index) => (
                        <Record 
                            key={index} 
                            record={record} 
                            deleteRecord={confirmDelete} 
                            editRecord={editRecord} 
                        />
                    ))}
                </tbody>
            </table>
        )
    }else {
        return (
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
                        <td></td>
                        <td>No Records Yet</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default RecordTable;