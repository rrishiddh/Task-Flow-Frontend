import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "todo",
  });

  const apiUrl = "http://localhost:3000/tasks";

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`${apiUrl}?email=${user.email}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.sort((a, b) => a.position - b.position);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user?.email]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      userEmail: user?.email || "anonymous",
      userName: user?.displayName || "Unknown",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTaskFromDb = await response.json();
        setTasks((prev) => [...prev, newTaskFromDb]);
        setNewTask({ title: "", description: "", category: "todo" });
      } else {
        console.error("Failed to post task:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to post task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        console.error("Failed to delete task:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const moveTask = async (task, newCategory) => {
    try {
      const { _id, ...updatedFields } = task;
      const updatedTask = { ...updatedFields, category: newCategory };

      const response = await fetch(`${apiUrl}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to move task");
      }

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, category: newCategory } : t
        )
      );
    } catch (error) {
      console.error("Failed to move task:", error);
    }
  };

  const moveTaskInCategory = async (draggedTask, targetTask) => {
    const draggedIndex = tasks.indexOf(draggedTask);
    const targetIndex = tasks.indexOf(targetTask);

    const updatedTasks = [...tasks];
    updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);
    setTasks(updatedTasks);
    try {
      await updateTaskPositions(updatedTasks);
    } catch (error) {
      console.error("Failed to update task positions:", error);
    }
  };

  const updateTaskPositions = async (updatedTasks) => {
    for (let i = 0; i < updatedTasks.length; i++) {
      const task = updatedTasks[i];
      await fetch(`${apiUrl}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position: i }),
      });
    }
  };

  const Task = ({ task }) => {
    const [, drag] = useDrag(() => ({
      type: "TASK",
      item: task,
    }));

    return (
      <div
        ref={drag}
        className="p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-300 mb-4 dark:text-black  overflow-auto "
      >
        <h3 className="font-semibold text-lg">Title : {task.title}</h3>
        <p className="text-sm text-gray-600">
          Description : {task.description}
        </p>
        <p className="text-sm text-gray-600">
          Timestamp : {formatDate(task.timestamp)}
        </p>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 mt-2 btn-ghost"
        >
          Delete
        </button>
      </div>
    );
  };

  const TaskColumn = ({ category, title }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => {
        if (item.category === category) {
          moveTaskInCategory(item, category);
        } else {
          moveTask(item, category);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        className={`p-4 card shadow-xl ${isOver ? "bg-gray-200" : ""}`}
      >
        <h1 className="font-bold text-lg underline">{title}</h1>
        {tasks
          .filter((task) => task.category === category)
          .map((task) => (
            <Task key={task._id} task={task} />
          ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to TaskFlow
        </h1>
        <p className="text-center mb-6">Manage your tasks here!</p>
        <div className="border gap-4 md:w-[60%] mx-auto ">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control space-y-2">
              <input
                name="title"
                type="text"
                value={newTask.title}
                onChange={handleChange}
                placeholder="Title:"
                className="input input-bordered"
                maxLength={50}
                required
              />
              <input
                name="description"
                type="text"
                value={newTask.description}
                onChange={handleChange}
                placeholder="Description:"
                className="input input-bordered"
                maxLength={200}
              />
              <select
                name="category"
                value={newTask.category}
                onChange={handleChange}
                className="input input-bordered"
              >
                <option value="todo">To-Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-ghost bg-zinc-300">Add Task</button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 ">
          <TaskColumn category="todo" title="To-Do Tasks" />
          <TaskColumn category="inProgress" title="In Progress Tasks" />
          <TaskColumn category="done" title="Finished Tasks" />
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
