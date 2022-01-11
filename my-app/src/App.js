import axios from 'axios'
import { useEffect, useState, useMemo } from 'react'
import Checkbox from './Checkbox'

const items = [1, 2, 3]

function App() {
  const [data, setData] = useState([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set())
  const [filteredData, setFilteredData] = useState([])
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    async function f() {
      const response = await axios.get('http://localhost:3000/posts/')
      setData(response.data)
      console.log(response.data)
    }
    f()
  }, [])

  const memoData = useMemo(() => {
    console.log('memo')
    const filters = data.filter((user) => {
      return selectedCheckboxes.has(user.filters)
    })
    setFilteredData(filters)
  }, [flag])

  const toggleCheckbox = (label) => {
    setFlag(false)
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label)
    } else {
      selectedCheckboxes.add(label)
    }
  }

  const handleFormSubmit = () => {
    setFlag(true)
  }

  const createCheckbox = (label) => (
    <Checkbox label={label} handleCheckboxChange={toggleCheckbox} key={label} />
  )

  const createCheckboxes = () => items.map(createCheckbox)

  return (
    <>
      <div style={{ margin: 100 }}>
        {createCheckboxes()}
        <button type="button" onClick={handleFormSubmit}>
          Save
        </button>
        <div>
          {filteredData.map((e) => (
            <h1 key={e.id}>{e.name}</h1>
          ))}
        </div>
      </div>
    </>
  )
}

export default App

// const loadApartments = useMemo(() => {
//   let prevFilters;
//   console.log('prevFilters: ', prevFilters);
//   return (filters) => {
//     if(JSON.stringify(filters) === JSON.stringify(prevFilters)) {
//       return null;
//     }
//     prevFilters = filters;
//     const data = users.filter((user) => {
//       return filters.find((item) => user.filter === item.id);
//     });
//     setApartments(data);
//   }
// }, [])
