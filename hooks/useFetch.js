import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () =>{
        setIsLoading(true)
        try {
            const response = await axios.get('http://192.168.141.62:3000/api/products/')
            setData(response.data.products)
            setIsLoading(false)
        } catch (error) {
            setError(error.message)
        } finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    },[])

    const refetch = () =>{
        setIsLoading(true)
        fetchData()

    }


  return {isLoading, data, error, refetch}
  
}

export default useFetch