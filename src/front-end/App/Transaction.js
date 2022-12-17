import React from 'react'
import deleteIcon from '../../res/delete-32.png'

export default function Transaction({transaction, deleteListItem}) {
    function handleDelete(e,t) {
        deleteListItem(t);
    }
    
    return (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.amount}€</td>
            <td>{transaction.comment}</td>
            <td className='editTransaction'><img onClick={(e) => handleDelete(e, transaction.id)} className='editButton' src={deleteIcon} alt='img'></img></td>
        </tr>
    )
}
