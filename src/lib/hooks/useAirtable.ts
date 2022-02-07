import { useState } from 'react'
import axios from 'axios'

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID
const TABLE = process.env.REACT_APP_AIRTABLE_TABLE
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY

export default function useData() {
  const [data, setData] = useState(null)

  const airtableUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}?api_key=${API_KEY}`

  const getData = async() => {
    const retVal = axios.get(airtableUrl)
      .then(res => setData(res.data.records))
    return retVal
  }

  return { getData, data }
}