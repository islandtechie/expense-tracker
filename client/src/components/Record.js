import React from 'react';

const Record = ({record, deleteRecord, editRecord}) => {

    const deleteRow = () => {
        deleteRecord(record.id);
    }

    const editRow = () => {
        editRecord(record.id);
    }

    return (
        <tr>
            <td>{record.date}</td>
            <td>{record.payee}</td>
            <td>{record.description}</td>
            <td>{record.amount}</td>
            <td className="actions">
                <button onClick={editRow}><i className="fa fa-edit" title="Edit"></i></button>
                <button onClick={deleteRow}><i className="fa fa-trash" title="Delete"></i></button>
            </td>
        </tr>
    )
}

export default Record;