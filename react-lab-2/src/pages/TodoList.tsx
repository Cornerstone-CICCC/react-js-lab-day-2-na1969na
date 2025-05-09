import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "../contexts/useAuth";
interface Todo {
  id: string;
  text: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (newTodo.trim()) {
      setTodos([...todos, { id: uuidv4(), text: newTodo }]);
      setNewTodo("");
      toast.success("Task added");
    } else {
      toast.error("Enter a task");
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Todo List
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Welcome, {user}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleAddTodo} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-700"
                placeholder="Enter a new task"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center group"
              >
                <span className="text-gray-700 font-medium">{todo.text}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                >
                  <RiDeleteBin5Line className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
