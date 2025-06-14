import React, { useState, useRef } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

const initialTasks = {
  todo: [{ id: '1', content: 'Design wireframes' }],
  inProgress: [{ id: '2', content: 'Develop login page' }],
  done: [{ id: '3', content: 'Setup Tailwind' }],
};

let taskIdCounter = 4;

const columnTitles = {
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
};

const columnColors = {
  todo: 'bg-blue-100 dark:bg-blue-900',
  inProgress: 'bg-yellow-100 dark:bg-yellow-900',
  done: 'bg-green-100 dark:bg-green-900',
};

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskInputs, setNewTaskInputs] = useState({
    todo: '',
    inProgress: '',
    done: '',
  });
  const [editTask, setEditTask] = useState(null);

  const inputRefs = {
    todo: useRef(null),
    inProgress: useRef(null),
    done: useRef(null),
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceClone = Array.from(tasks[source.droppableId]);
    const destClone = Array.from(tasks[destination.droppableId]);
    const [movedItem] = sourceClone.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceClone.splice(destination.index, 0, movedItem);
      setTasks(prev => ({ ...prev, [source.droppableId]: sourceClone }));
    } else {
      destClone.splice(destination.index, 0, movedItem);
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: sourceClone,
        [destination.droppableId]: destClone,
      }));
    }
  };

  const handleAddTask = (col) => {
    const content = newTaskInputs[col].trim();
    if (!content) return;

    const newTask = {
      id: taskIdCounter.toString(),
      content,
    };
    taskIdCounter++;

    setTasks(prev => ({
      ...prev,
      [col]: [...prev[col], newTask],
    }));

    setNewTaskInputs(prev => ({ ...prev, [col]: '' }));
    inputRefs[col].current?.focus();
  };

  const handleDeleteTask = (col, id) => {
    setTasks(prev => ({
      ...prev,
      [col]: prev[col].filter(task => task.id !== id),
    }));
  };

  const handleStartEdit = (task, col) => {
    setEditTask({ ...task, col });
  };

  const handleEditChange = (e) => {
    setEditTask(prev => ({ ...prev, content: e.target.value }));
  };

  const handleSaveEdit = () => {
    const { col, id, content } = editTask;
    setTasks(prev => ({
      ...prev,
      [col]: prev[col].map(task => task.id === id ? { ...task, content } : task),
    }));
    setEditTask(null);
  };

  const handleKeyPress = (e, col) => {
    if (e.key === 'Enter') handleAddTask(col);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🗂️ Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(tasks).map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-lg shadow p-4 min-h-[350px] flex flex-col ${columnColors[col]}`}
                >
                  <h3 className="text-xl font-semibold mb-3">{columnTitles[col]}</h3>

                  <div className="flex-1">
                    {tasks[col].length === 0 && (
                      <p className="text-sm text-gray-500 italic">No tasks yet 💤</p>
                    )}
                    {tasks[col].map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-2 rounded shadow hover:shadow-md transition duration-200 flex justify-between items-center"
                          >
                            {editTask && editTask.id === task.id ? (
                              <input
                                className="flex-1 mr-2 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded"
                                value={editTask.content}
                                onChange={handleEditChange}
                                onBlur={handleSaveEdit}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                                autoFocus
                              />
                            ) : (
                              <span onDoubleClick={() => handleStartEdit(task, col)}>{task.content}</span>
                            )}
                            <button onClick={() => handleDeleteTask(col, task.id)} className="text-red-500 text-sm ml-2">✖</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>

                  <input
                    type="text"
                    ref={inputRefs[col]}
                    value={newTaskInputs[col]}
                    onChange={(e) =>
                      setNewTaskInputs({ ...newTaskInputs, [col]: e.target.value })
                    }
                    onKeyDown={(e) => handleKeyPress(e, col)}
                    placeholder={`Add new task...`}
                    className="mt-3 px-3 py-2 text-sm rounded w-full bg-white dark:bg-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                  <button
                    onClick={() => handleAddTask(col)}
                    className="mt-2 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition"
                  >
                    ➕ Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
