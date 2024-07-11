import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)
  useEffect(() => {
    let todoString = localStorage.getItem("Todos")
    if (todoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)
    }
  }, [])


  const savetool = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  const handleadd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo("")
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
    console.log(setTodo)
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetool()
  }
  const handledelete = (e, id) => {
    let newTodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetool()
  }
  const handledit = (e, id) => {
    let t = Todos.filter(item => item.id === id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetool()

  }
  const togglefinshed = (e) => {
    setshowfinished(!showfinished)
  }
  

  return (
    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto md:w-[60vw] h-[90vh] md:h-[80vh] bg-green-100 rounded-lg overflow-x-clip overflow-y-auto relative'>
      <h1 className='font-bold text-center sticky top-[0.1px] text-3xl'>E-Task - Manage your ToDos at one place</h1>
        <div className="addtodo p-8 sticky bg-green-100 top-[0.1px]">

          <h2 className='font-bold my-2'>Add a To-Do </h2>
          <div className="inputsection flex justify-evenly">
            <input onChange={handlechange} value={Todo} className='w-[50%] rounded-full px-5 py-1 ' type="text" />
            <button onClick={handleadd} disabled={Todo.length<3} className='bg-green-900 hover:bg-green-800 hover:text-black text-sm px-2 py-1 font-bold text-white rounded-md'>Add</button></div>
            <div><input onChange={togglefinshed} type="checkbox" className='my-5' checked={showfinished} /> Show finished
            <div className='h-[1px] bg-black opacity-25'></div>
        </div>
        
        </div>
        <div className="yourtodo  md:px-8">
          <h2 className='font-bold my-2'>Your To-Dos</h2>
          {Todos.length === 0 && <div className='m-10 w-full'>No To-Dos to display</div>}
          {Todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="px-1 todos gap-3 flex justify-between my-2">
              <input type="checkbox" onChange={handlecheckbox} checked={item.isCompleted} name={item.id} id="" />
              < div className={`${item.isCompleted ? "line-through" : ""} w-[60%] break-words`}  > {item.Todo}</div>
              <div className="buttons  md:mx-10 ">
                <button onClick={(e) => { handledit(e, item.id) }} className='bg-green-900 font-bold mx-2 text-sm px-3 py-2 hover:bg-green-800 hover:text-black  text-white rounded-md'><FaRegEdit />
                </button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-green-900 font-bold mx-[2px] md:mx-2 lg:mx-2 text-sm px-3 py-2 hover:bg-green-800 hover:text-black  text-white rounded-md'><MdDeleteForever /></button>
              </div>
            </div>
          })}

        </div >
      </div >
    </>
  )
}

export default App
