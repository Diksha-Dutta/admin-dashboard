import React, { useState } from 'react';
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

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskInputs, setNewTaskInputs] = useState({
    todo: '',
    inProgress: '',
    done: '',
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceClone = Array.from(tasks[source.droppableId]);
    const destClone = Array.from(tasks[destination.droppableId]);
    const [movedItem] = sourceClone.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceClone.splice(destination.index, 0, movedItem);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceClone,
      });
    } else {
      destClone.splice(destination.index, 0, movedItem);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceClone,
        [destination.droppableId]: destClone,
      });
    }
  };

  const handleAddTask = (col) => {
    const newContent = newTaskInputs[col].trim();
    if (!newContent) return;

    const newTask = {
      id: taskIdCounter.toString(),
      content: newContent,
    };
    taskIdCounter++;

    setTasks({
      ...tasks,
      [col]: [...tasks[col], newTask],
    });

    setNewTaskInputs({
      ...newTaskInputs,
      [col]: '',
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['todo', 'inProgress', 'done'].map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow min-h-[300px]"
                >
                  <h3 className="font-bold capitalize mb-2 text-lg">{col}</h3>

                  {tasks[col].map((task, idx) => (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-2 rounded shadow"
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  <input
                    type="text"
                    value={newTaskInputs[col]}
                    onChange={(e) =>
                      setNewTaskInputs({ ...newTaskInputs, [col]: e.target.value })
                    }
                    placeholder={`Add to ${col}`}
                    className="w-full px-2 py-1 mt-3 rounded text-sm text-black"
                  />
                  <button
                    onClick={() => handleAddTask(col)}
                    className="w-full mt-2 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                  >
                    Add Task
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
