import React from 'react'
import Transaction from './Transaction'

export default function ItemList({items, deleteListItem}) {
    return (
        items.map(transaction => {
            return <Transaction key={transaction.id} transaction={transaction} deleteListItem={deleteListItem}></Transaction>
        })
    )
}
