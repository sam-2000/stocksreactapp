import React from "react";
import {useState} from "react";

const Wallet = () => {
    const [amount,setamount] = useState(10000);
    const change = () => {
        setamount(amount)
    }
    return (
        <div>
            <button onClick={}>Sell</button>
            
        </div>
    )
}

export default Wallet