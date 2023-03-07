import React from 'react'
import Transaction from './Transaction'

export default function ItemList({items, deleteListItem, getPage}) {
    
    const {itemsPerPage} = require("../../res/config")
    
    let lastItem = items.length - 1 - ((getPage() - 1) * itemsPerPage);
    let firstItem = lastItem - itemsPerPage + 1;

    let pageItems = []
    for(let i = lastItem; i >= firstItem; i--){
        let transaction = items[i];
        if(!transaction) continue;
        pageItems.push(<Transaction key={transaction.id} transaction={transaction} deleteListItem={deleteListItem}></Transaction>);
    }
    return (pageItems)
}
