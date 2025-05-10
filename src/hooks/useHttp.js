import { useEffect, useState } from "react"
import { useCallback } from "react"

async function sendHttpReq(url , config){
    const response = await fetch(url,config )

    const resData = await response.json()
    if(!response.ok){
        throw new Error(resData.message || "something went wrong , failed to send request")
    }

    return resData

}

export default function useHttp(url , config , initialData){
   const [data , setData]=useState(initialData);
   const [isLoading,setIsLoading] = useState(false);
   const [error,setError]=useState();

   const sendRequest= useCallback(async function sendRequest(){
    setIsLoading(true)
    try{
        const resData= await sendHttpReq(url , config)
        setData(resData)
    }catch(error){
        setError(error.message || "something went wrong")
    }
    setIsLoading(false)  
    },[url,config])

    // we need to make sure that sendRequest not getting send all time
    
    useEffect(()=>{
        if(config &&  (config.method === 'GET' || !config.method || !config)){
            sendRequest()
        }
    },[sendRequest,config])

    return{
       data,
       isLoading,
       error,
       sendRequest
    }

}

// We will use this custom hook in Meals and Checkout component 