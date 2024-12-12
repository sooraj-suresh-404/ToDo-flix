import { useState, useEffect } from "react";

function TodoList() {
  const [showIntro, setShowIntro] = useState(true);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Hide intro after 3.5 seconds
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showIntro ? (
        <div className="flex items-center justify-center h-screen animate-zoom">
          <h1 className="text-5xl font-extrabold text-red-600 animate-pulse">
            TODOFLIX
          </h1>
        </div>
      ) : (
        <div className="max-w-lg mx-auto py-10 px-4">
          <header className="text-3xl font-bold text-center mb-8 text-red-600">
            ToDoFlix
          </header>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex mb-4">
              <input
                type="text"
                className="flex-1 p-2 border-none rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={addTask}
                className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Add
              </button>
            </div>
            {tasks.length === 0 ? (
              <div className="text-center text-gray-500 mt-4 animate-pulse">
                <p className="text-lg">Your list is empty!</p>
                <p>Add tasks to begin.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-3 rounded shadow animate-fade-in"
                  >
                    <span
                      className={`flex-1 cursor-pointer ${
                          task.completed ? "line-through text-gray-400" : "text-white"
                        }`}
                      onClick={() => toggleTaskCompletion(index)}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(index)}
                      className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;


