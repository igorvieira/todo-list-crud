import { useState } from "react";
import './App.css'

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

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <div>
      <div className="content">
        <div>
          <div data-testid="todo-list">
            {
              list?.map((item, index) => (
                <div
                  className="content-list-item"
                  key={`${item.id}-${index}`}>
                  <span>{item.text}</span>
                  <span> - </span>
                  <span
                    className="content-form-delete"
                    onClick={() => handleDelete(item.id)}
                    data-testid={`remove-button-${index}`}
                  >
                    Excluir
                  </span>
                  {' / '}
                  <span
                    className="content-form-edit"
                    onClick={() => handleEdit(item.id)}
                    data-testid={`edit-button-${index}`}
                  >
                    Editar
                  </span>
                </div>
              ))
            }
          </div>
        </div>

        <form className="content-form">
          <input
            type="text"
            name="item"
            value={item.text}
            data-testid="input-text"
            className="content-form-input"
            onChange={(e) => handleOnChange(e)}
          />
          <button
            className="content-form-button"
            onClick={handleSubmit}
            data-testid="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="footer">
        <a className="footer-link" href="https://github.com/igorvieira/">@igorvieira</a> - <span className="footer-year">{getCurrentYear()}</span>
      </div>
    </div>
  );
}

export default App;
