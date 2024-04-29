import React, {useState} from "react"

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState({todoName: "", isTodoDone: false});

  const addNewTodo = () => {
    const removeSpace = addTodo.todoName.trim().replaceAll(/\s+/g, ' ');

    if(removeSpace !== ""){
      setTodos(t => [...t, addTodo]);
      setAddTodo({todoName: "", isTodoDone: false});
    }
  }

  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isTodoDone: !todo.isTodoDone };
      }
      return todo;
    }));
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  const moveTodoUp = (index) => {
    if(index > 0){
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index - 1]] = 
      [updatedTasks[index - 1], updatedTasks[index]];
      setTodos(updatedTasks);
    }
  }

  const moveTodoDown = (index) => {
    if(index < todos.length - 1){
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1], updatedTasks[index]];
      setTodos(updatedTasks);
    }
  }

  return (
    <div>
      <h1>To-Do-List</h1>
      
      <input type="text" name="todoName" value={addTodo.todoName} onChange={(event) => setAddTodo({...todos, [event.target.name]: event.target.value})} placeholder="Write To-Do"/>
      <button onClick={addNewTodo}>Add</button>

      <table>
        {todos.map((todo, index) => 
        <tr key={index}>
            <td>{todo.isTodoDone === true ? <del>{todo.todoName}</del> : todo.todoName}</td>
            <td onClick={() => toggleTodo(index)}>{todo.isTodoDone === true ? "Undone" : "Done"}</td>
            <td onClick={() => deleteTodo(index)}>❌</td>
            <td onClick={() => moveTodoUp(index)}>👆</td>
            <td onClick={() => moveTodoDown(index)}>👇</td>
          </tr>)}
      </table>
    </div>
  )
}

export default App
