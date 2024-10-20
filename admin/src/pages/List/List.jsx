import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url }) => {

  const [list,setList] = useState([]);

  
  // create fect list funtion
  const fectlist = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
      console.log(response.data.data);
    }else{
      toast.error("Error");
    }
  }

  // remove fod item from list

  const removeFood = async(foodid) => {
    const responce = await axios.post(`${url}/api/food/remove`,{id:foodid});
    await fectlist();
    if(responce.data.success){
      toast.success(responce.data.message);
    }else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fectlist();
  },[])

  return (
    <div className='list add flex-col'> 
      <p>All Food List</p>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
        </div>
      
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image }></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className='cursor'>X</p>
            </div>
          )
        })}
    </div>
  )
}

export default List