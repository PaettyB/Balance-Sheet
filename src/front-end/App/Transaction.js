import React from 'react'

export default function Transaction({transaction}) {
    return (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.amount}€</td>
            <td>{transaction.comment}</td>
        </tr>
    )
}
