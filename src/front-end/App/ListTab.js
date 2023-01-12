import React, {useRef} from 'react'
import ItemList from './ItemList';
import uuidv4 from 'uuid/v4'

export default function ListTab({setList,getList, addTransaction, deleteTransaction, getBalance}) { 
    
    const amountRef = useRef();
    const dateRef = useRef();
    const commentRef = useRef();

    function uuidIsTaken(l, id) {
        for(let t of l) {
            if(t.id === id) return true;
        }
        return false;
    }

    function generateId(){
        const l = getList();
        while(true){
            let newId = uuidv4();
            if(!uuidIsTaken(l, newId)) return newId;
        }
    }

    function handleAddListItem(e) {
        e.preventDefault();
        const amount = parseFloat(amountRef.current.value).toFixed(2);
        const date = dateRef.current.value;
        const comment = commentRef.current.value;
        const newListItem = {id: generateId(), date:date, amount:amount, comment:comment}
        const ok = addTransaction(newListItem);
        ok.then(ok => {
            if(!ok) return;
            commentRef.current.value = "";
            setList(prevList => {
                return [...prevList, newListItem]
            });
        })
    }

    function removeItemFromList(l, id){
        for(let i = l.length-1; i>=0; i--){
            if(l[i].id === id){
                l.splice(i,1);
                return true;
            }
        }
        console.log("item with id " + id + " was not found");
        return false;
    }
    
    function handleDeleteListItem(id) {
        if(!window.confirm("Are you sure you want to delete this transaction?")) return;
        const ok = deleteTransaction(id);
        ok.then(ok => {
            //TODO: ERROR MESSAGE FOT NOT REACHING THE API
            if(!ok) return;
            setList(prevList => {
                removeItemFromList(prevList, id);
                return [...prevList];
            })
        });
    }

    function calculateSum(list){
        let sum = 0.0;
        for(let l of list){
            sum += parseFloat(l.amount);
        }
        return sum;
    }

    function returnStyle () {
        return {backgroundImage: getBalance() >= 0 ? 
            "linear-gradient(135deg, var(--highlight-green-dark) 20%, var(--highlight-green-light))" 
            : "linear-gradient(135deg, darkred 40%, firebrick)"};
    }

    return (
        <>
            <form id='itemAddContainer'>
                <input ref={dateRef} id="datePicker" type="date"></input> 
                <input ref={amountRef} id="amountInput" onClick={(e) => e.target.select()} type="number" defaultValue='1.00' placeholder="Amount" min='0' step="0.5"></input> 
                <input ref={commentRef} id="commentInput" type="text" placeholder="Comment"></input> 
                <button onClick={handleAddListItem} className="addTransaction">Add Item</button>
            </form>
            <div id='tableContainer'>
                <table>
                    <tbody>
                        <ItemList items={getList()} deleteListItem={handleDeleteListItem} />
                        <tr>
                            <td>SUM</td>
                            <td>{calculateSum(getList()).toFixed(2)} €</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="balanceContainer" style={returnStyle()}>
                Balance: {getBalance().toFixed(2)} €
            </div>
        </>
  )
}
