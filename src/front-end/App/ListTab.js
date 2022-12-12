import React, {useRef} from 'react'
import ItemList from './ItemList';

export default function ListTab({name, setList,getList, setTransaction}) { 
    
    const amountRef = useRef();
    const dateRef = useRef();
    const commentRef = useRef()

    function handleAddListItem(e) {
        e.preventDefault();
        const amount = amountRef.current.value;
        const date = dateRef.current.value;
        const comment = commentRef.current.value;
        const newListItem = {id: getList().length, date:date, amount:amount, comment:comment}
        setList(prevList => {
            return [...prevList, newListItem]
        });
        setTransaction(newListItem);
    }

    function calculateSum(list){
        let sum = 0.0;
        for(let l of list){
            sum += parseFloat(l.amount);
        }
        return sum;
    }

    return (
        <>
            <div id='itemAddContainer'>
                <form>
                <input ref={dateRef} type="date" defaultValue='2022-12-09'></input> 
                <input ref={amountRef} type="number" defaultValue='1.00' placeholder="Amount" min='0' step="0.5"></input> 
                <input ref={commentRef} type="text" placeholder="Comment"></input> 
                <button onClick={handleAddListItem}>Add Item</button>
                </form>
            </div>
            <div id='tableContainer'>
                <table>
                    <tbody>
                        <ItemList items={getList()} />
                        <tr>
                            <td>SUM</td>
                            <td>{calculateSum(getList())} €</td>
                        </tr>
                    </tbody>
                </table>
            {/* <div className="sum">Sum: {calculateSum(getList())} €</div> */}
            </div>
        </>
  )
}
