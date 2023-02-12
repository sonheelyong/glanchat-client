import axios from "axios"
import { useEffect, useState } from "react"
import { authheader } from "../service/ApiService"

export default function useAxios(url){
    const [result, setResult] = useState([]);
    
    authheader()
    useEffect(()=> {
      axios.get(url)
    .then(result => {
        setResult(result)
    })
    
    }, [url])

  
  return result
  
}