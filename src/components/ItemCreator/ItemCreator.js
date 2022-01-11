import React, {useState} from 'react';
import './ItemCreator.css'
const axios = require('axios')


const ItemCreator = (props) => {
    const [itemName, setItemName] = useState("")
    const [itemCount, setItemCount] = useState("")
    const [warehouse, setWarehouse] = useState("")

    const handleSpecChange = (setStateSpecFunction)=>{
        return function (e) {
            setStateSpecFunction(e.target.value)
        }
    }

    const handleCreateItemClick = ()=>{
        axios.post('http://localhost:3000/inventory', {
            itemName: itemName,
            itemCount: itemCount,
            warehouse: warehouse
        }).then((result)=>{
            setItemName("")
            setItemCount("")
            setWarehouse("")
            props.parentSetServerMessage(result.data.msg)
        }).catch((err)=>{
            props.parentSetServerMessage(err.response.data.msg)
        })
    }

    return (
        <div id="item-creator-container">
            <input type="text" className='specification' value={itemName} onChange={handleSpecChange(setItemName)} placeholder='item_name'></input>
            <input type="text" className='specification' value={itemCount} onChange={handleSpecChange(setItemCount)} placeholder='item_count'></input>
            <input type="text" className='specification' value={warehouse} onChange={handleSpecChange(setWarehouse)} placeholder='warehouse'></input>
            <button onClick={handleCreateItemClick}>Create Item</button>
        </div>
    );
};

export default ItemCreator;