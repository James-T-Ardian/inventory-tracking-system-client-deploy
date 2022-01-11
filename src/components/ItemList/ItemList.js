import React, {useEffect, useState} from 'react';
import Item from '../Item/Item';
import ItemCreator from '../ItemCreator/ItemCreator';
import './ItemList.css'

const axios = require("axios")



const ItemList = () => {
    const [items, setItems] = useState([])
    const [serverMessage, setServerMessage] = useState("Welcome to the inventory-tracking-system website")
    
    useEffect(()=>{
        axios.get('http://localhost:3000/inventory')
        .then((result)=>{
            setItems(result.data.items)
        }).catch((err)=>{
            setServerMessage(err.response.data.msg)
        })
    },[serverMessage])

    const handleGetCSV = ()=>{
        axios({
            url: 'http://localhost:3000/inventory/csv',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            setServerMessage("Obtained CSV file")
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory.csv');
            document.body.appendChild(link);
            link.click();
        }).catch((err)=>{
            setServerMessage("Server has encountered an internal error. Please contact administrator at jamesardian01@gmail.com and inform them.")
        })
  
    }

    return (
        <div id ='item-list-container'>
            <button onClick={handleGetCSV}>Get list as CSV</button>
            <ItemCreator parentSetServerMessage = {setServerMessage}></ItemCreator>
            <div id="server-message">Server Message: <b>{serverMessage}</b></div>
            <Item buttonVisibility = "hidden" specifications={["item_name", "item_count", "warehouse", "last_updated"]}></Item>
            {items.map((item)=>{
                const specs = [item["item_name"], item["item_count"], item["warehouse"], item["last_updated"]]
                return <Item parentSetServerMessage = {setServerMessage} key = {item["item_id"]} itemID = {item["item_id"]} specifications={specs}></Item>
            })}
        </div>
    );
};

export default ItemList;