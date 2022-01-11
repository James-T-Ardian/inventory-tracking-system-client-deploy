import React, {useEffect, useState} from 'react';
import './Item.css'

const axios = require('axios')

const Item = (props) => {
    const [itemName, setItemName] = useState("")
    const [itemCount, setItemCount] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [lastUpdated, setLastUpdated] = useState("")
    const [startEdit, setStartEdit] = useState(false)

    useEffect(() => {
        setItemName(props.specifications[0])
        setItemCount(props.specifications[1])
        setWarehouse(props.specifications[2])
        setLastUpdated(props.specifications[3])
    }, [props.specifications])

    const handleSpecChange = (setStateSpecFunction)=>{
        return function (e) {
            setStateSpecFunction(e.target.value)
        }
    }

    const handleEdit = ()=>{
        setStartEdit(true)
    }

    const handleDelete = ()=>{
        axios.delete(`http://localhost:3000/inventory/${props.itemID}`)
        .then((result)=>{
            props.parentSetServerMessage(result.data.msg)
        }).catch((err)=>{
            props.parentSetServerMessage(err.response.data.msg)
        })
    } 

    const handleSubmitEdit = ()=>{
        axios.put(`http://localhost:3000/inventory/${props.itemID}`, {
            itemCount: itemCount,
            warehouse: warehouse
        }).then((result)=>{
            props.parentSetServerMessage(result.data.msg)
            setStartEdit(false)
        }).catch((err)=>{
            props.parentSetServerMessage(err.response.data.msg)
        })
    }

    return (
        <div className="item-container">
            <div className='specifications-container'>
                <input type="text" className='specification' value={itemName} disabled={true}></input>
                <input type="text" className='specification' value={itemCount} disabled={!startEdit} onChange={handleSpecChange(setItemCount)}></input>
                <input type="text" className='specification' value={warehouse} disabled={!startEdit} onChange={handleSpecChange(setWarehouse)}></input>
                <input type="text" className='specification' value={lastUpdated} disabled={true}></input>
                
                <button style={{visibility: props.buttonVisibility}} disabled={startEdit} onClick={handleEdit}>Edit</button>
                <button style={{visibility: props.buttonVisibility}} disabled={startEdit} onClick={handleDelete}>Delete </button>
                <button style={{visibility: props.buttonVisibility}} disabled={!startEdit} onClick={handleSubmitEdit}>Submit Edit</button>
            </div>
        </div>
        
    );
};

export default Item;