import { useState } from 'react'
import axios from 'axios'

export default function useData() {
  const [data, setData] = useState(null)

  const getData = async() => {
    const retVal = axios.get('https://api.airtable.com/v0/appbvh7zXcG8PPC4r/trackBuff?api_key=key4GoC84eNL1g7Ih')
      .then(res => {
        setData(res.data.records)
        console.log(data)
      })
      return retVal
  }

  return { getData, data }
}