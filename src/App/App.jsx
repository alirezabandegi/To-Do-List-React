import React, {useState} from "react";
import style from "./app.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState({todoName: "", isTodoDone: false});

  const newTodoSet = (event) => {
    const maxLength = 32;
    
    if (event.target.value.length > maxLength) {
      setAddTodo({...todos, [event.target.name]: event.target.value.substring(0, maxLength)})
        alert('Maximum limit reached!');
    }
    else{
      setAddTodo({...todos, [event.target.name]: event.target.value})
    }
  }

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
    <div className={style.ToDoListApp}>
      <h1>To-Do-List</h1>
      
      <input type="text" name="todoName" value={addTodo.todoName} onChange={newTodoSet} placeholder="Write To-Do"/>
      <button onClick={addNewTodo}>Add</button>

      <table>
        <tbody>
          {todos.map((todo, index) => 
          <tr key={index}>
              <td>{todo.isTodoDone === true ? <del>{todo.todoName}</del> : todo.todoName}</td>
              <td onClick={() => toggleTodo(index)}>{todo.isTodoDone === true ? "Undone" : "Done"}</td>
              <td onClick={() => deleteTodo(index)}><svg fill="#FFF" width="24px" height="24px" viewBox="0 0 72 72"><g><path d="M53.678,61.824c-2.27,0-4.404-0.885-6.01-2.49L36,47.667L24.332,59.334c-1.604,1.605-3.739,2.49-6.01,2.49s-4.404-0.885-6.01-2.49c-1.605-1.604-2.49-3.739-2.49-6.01c0-2.271,0.885-4.405,2.491-6.011l11.666-11.667l-10.96-10.961c-1.605-1.604-2.49-3.739-2.49-6.01s0.885-4.405,2.49-6.01c1.605-1.605,3.739-2.49,6.011-2.49c2.271,0,4.405,0.885,6.01,2.49L36,23.626l10.96-10.96c1.605-1.605,3.738-2.49,6.01-2.49s4.406,0.885,6.01,2.49c1.605,1.604,2.49,3.739,2.49,6.01s-0.885,4.405-2.49,6.01L48.021,35.646l11.666,11.668c1.605,1.604,2.49,3.738,2.49,6.01c0,2.271-0.885,4.405-2.49,6.01C58.084,60.939,55.949,61.824,53.678,61.824z M36,42.839c0.511,0,1.023,0.195,1.414,0.586l13.082,13.081c0.852,0.851,1.98,1.318,3.182,1.318c1.203,0,2.332-0.468,3.182-1.318c0.852-0.851,1.318-1.98,1.318-3.182c0-1.202-0.467-2.332-1.318-3.181l-13.08-13.083c-0.781-0.781-0.781-2.047,0-2.828l12.373-12.375c0.852-0.851,1.318-1.979,1.318-3.182s-0.467-2.331-1.318-3.182c-0.85-0.851-1.98-1.318-3.182-1.318s-2.332,0.468-3.18,1.318L37.414,27.868c-0.781,0.781-2.046,0.781-2.828,0L22.21,15.494c-0.85-0.851-1.979-1.318-3.181-1.318c-1.202,0-2.332,0.468-3.182,1.318c-0.851,0.851-1.319,1.979-1.319,3.182s0.469,2.331,1.318,3.182l12.374,12.375c0.781,0.781,0.781,2.047,0,2.828L15.14,50.143c-0.85,0.85-1.318,1.979-1.318,3.182c0,1.201,0.469,2.331,1.318,3.182c0.851,0.851,1.98,1.318,3.182,1.318c1.202,0,2.332-0.468,3.182-1.318l13.083-13.081C34.977,43.034,35.489,42.839,36,42.839z"/></g></svg></td>
              <td onClick={() => moveTodoUp(index)}>👆</td>
              <td onClick={() => moveTodoDown(index)}>👇</td>
            </tr>)}
          </tbody>
      </table>
    </div>
  )
}

export default App
