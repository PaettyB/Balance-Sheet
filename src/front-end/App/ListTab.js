import React, {useRef} from 'react'
import ItemList from './ItemList';
import uuidv4 from 'uuid/v4'

export default function ListTab({setList,getList, addTransaction, deleteTransaction}) { 
    
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
        const amount = amountRef.current.value;
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
        console.log(l);
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
        console.log("delete" + id);
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

    function getTodaysDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <div id='itemAddContainer'>
                <form>
                <input ref={dateRef} type="date" defaultValue={getTodaysDate()}></input> 
                <input ref={amountRef} onClick={(e) => e.target.select()} type="number" defaultValue='1.00' placeholder="Amount" min='0' step="0.5"></input> 
                <input ref={commentRef} type="text" placeholder="Comment"></input> 
                <button onClick={handleAddListItem}>Add Item</button>
                </form>
            </div>
            <div id='tableContainer'>
                <table>
                    <tbody>
                        <ItemList items={getList()} deleteListItem={handleDeleteListItem} />
                        <tr>
                            <td>SUM</td>
                            <td>{calculateSum(getList())} €</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            {/* <div className="sum">Sum: {calculateSum(getList())} €</div> */}
            </div>
        </>
  )
}
