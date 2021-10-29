import { useState } from "react";

function App() {

  const initialState = { id: '', text: ''}

  const [item, setItem] = useState(initialState)
  const [list, setList] = useState([])

  const handleOnChange = (event) => {
    setItem({
      id: `${event.target.value} - ${Math.random() * 100}`,
      text: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setList([...list, item])
    setItem(initialState)
  }

  const handleDelete = (id) => {
    const newList = list.filter(item =>  item.id !== id)
    setList(newList)
  }

  return (
    <div>
      <ul>
        {
          list?.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <span>{item.text}</span> -
              <button onClick={() => handleDelete(item.id)}>Excluir</button>
            </li>
          ))
        }
      </ul>

      <form>
        <input
          type="text"
          name="item"
          value={item.text}
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
