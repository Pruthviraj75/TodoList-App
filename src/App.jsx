import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
     let  todoString = localStorage.getItem("todos");
     if(todoString) {
    let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
     }
  }, [])
  

  const  saveToLS = (params) => {
   localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
     let t = todos.filter(item=>item.id === id)
     setTodo(t[0].todo);
     let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS();
  };

  const handleDelete = (e, id) => {
     let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted : false}])
    setTodo("")
    saveToLS();
  };

   const handleChange = (e) => {
    setTodo(e.target.value);
  };

   const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
   }
   
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
       <h1 className="font-bold text-center text-3xl">iTask - Manage your Tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2  className="font-bold text-2xl ">
            Add Tasks
          </h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="rounded-b-xl w-full border-[0.5px]  px-5 py-1" />
          <button onClick={handleAdd} disabled={todo.length<=1} className="mx-2 bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 text-white text-sm font-bold rounded-b-xl py-2 p-4">
            Save
          </button> </div>
        </div>
         
        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} />
         <label className="mx-2 text-lg " htmlFor="show">Completed Tasks</label>
         <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="font-bold text-2xl">Your Tasks</h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No Todos Added Yet</div>}
          {todos.map(item => { 

           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
            <div className="flex items-center gap-5">
            <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />
            <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full ">
              <button
                onClick={(e)=>{handleEdit(e, item.id)}}
                className="bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold rounded-md py-1 p-3 mx-1"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e)=>{handleDelete(e, item.id)}}
                className="bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold rounded-md py-1 p-3 mx-1"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
