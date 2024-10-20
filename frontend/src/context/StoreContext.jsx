import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("")
    const [food_list,setFoodlist] = useState([]);

    // create function for get foodlis
    const fectFoodlist = async ()=>{
        const response = await axios.get(url+'/api/food/list');
        if(response.data.data){
            setFoodlist(response.data.data);
        }
    } 

    const loadCartData = async (token) => {
        const response = await axios.post(url+'/api/cart/get',{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    console.log("token data",token);
    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}});
        }
    }   

    const removeFromCart = async (itemId) => {
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
            if(token){
                await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}});
            }
    }

    const getTotalCartAmount = () =>{
        let totalamount = 0;
        for (const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo =  food_list.find((prodcut)=>prodcut._id === item)
                totalamount += itemInfo.price * cartItems[item]
            }
        }
        return totalamount;
    }
    useEffect(()=>{
        async function loadData() {
            await fectFoodlist();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    },[])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart ,
        getTotalCartAmount ,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;