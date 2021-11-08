import { useState } from "react";

function App() {

  const initialState = { id: '', text: ''}

  const [item, setItem] = useState(initialState)
  const [list, setList] = useState([])

  const handleOnChange = (event) => {

    if (item.id) {
      setItem({
        id: item.id,
        text: event.target.value
      })
    } else {
      setItem({
        id: `${event.target.value} - ${Math.random() * 100}`,
        text: event.target.value
      })
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (item.id) {
      const newList = list.filter(listItem => listItem.id !== item.id)

      setList([...newList, item])
    } else {
      setList([...list, item])
    }

    setItem(initialState)
  }

  const handleDelete = (id) => {
    const newList = list.filter(item =>  item.id !== id)
    setList(newList)
  }

  const handleEdit = (id) => {
    const editItem = list.find(item => item.id === id)
    setItem(editItem)
  }

  return (
    <div>
      <ul data-testid="todo-list">
        {
          list?.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <span>{item.text}</span> -
              <button onClick={() => handleDelete(item.id)}>Excluir</button>
              <button onClick={() => handleEdit(item.id)}>Editar</button>
            </li>
          ))
        }
      </ul>

      <form>
        <input
          type="text"
          name="item"
          value={item.text}
          data-testid="input-text"
          onChange={(e) => handleOnChange(e)}
        />
        <button
          onClick={handleSubmit}
          data-testid="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
