import React from 'react'
import Transaction from './Transaction'

export default function ItemList({items}) {
    return (
        items.map(transaction => {
            return <Transaction key={transaction.id} transaction={transaction}></Transaction>
        })
    )
}
