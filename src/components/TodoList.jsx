import Todo from "./Todo";


export default function TodoList({filteredTodos, deleteTodo, toggleTodo, updateTodo}) {
  return (
    <>
    {filteredTodos.length > 0 ? (
      <div className="max-md:h-[38svh] overflow-hidden overflow-y-scroll mb-6 p-3 bg-white/70 rounded">
      <ul className="min-h-30 grid items-center">
        {filteredTodos.map((todo,id) => (
        <Todo key={todo.id} todo={todo}
        onDelete={deleteTodo}
        toggleTodo={toggleTodo}
        onEdit={updateTodo}/>
        ))}
      </ul>
      </div>
    ) : (<p className="min-h-30 grid place-items-center"><span>タスクはありません...</span></p>)
    }
    </>
  );
}
