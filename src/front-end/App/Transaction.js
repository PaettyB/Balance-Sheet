import React from 'react'
import deleteIcon from '../../res/delete-32.png'

export default function Transaction({transaction, deleteListItem}) {
    function handleDelete(e,t) {
        deleteListItem(t);
    }

    function formateDateGerman(date){
        let tokens = date.split("-");
        return tokens[2] + "." + tokens[1] + "." + tokens[0];
    }
    
    return (
        <tr>
            <td>{formateDateGerman(transaction.date)}</td>
            <td>{transaction.amount}€</td>
            <td>{transaction.comment}</td>
            <td className='editTransaction'><img onClick={(e) => handleDelete(e, transaction.id)} className='editButton' src={deleteIcon} alt='img'></img></td>
        </tr>
    )
}
