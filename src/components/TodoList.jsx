import Todo from "./Todo";


export default function TodoList({filteredTodos, onDelete, toggleTodo, onEdit}) {
  return (
    <>
    {filteredTodos.length > 0 ? (
      <div className="max-md:nax-h-[38svh] overflow-hidden overflow-y-scroll mb-6 p-3 bg-white/70 rounded grid place-items-center">
      <ul className="min-h-30 grid items-center w-full">
        {filteredTodos.map((todo,id) => (
        <Todo key={todo.id} todo={todo}
        onDelete={onDelete}
        toggleTodo={toggleTodo}
        onEdit={onEdit}/>
        ))}
      </ul>
      </div>
    ) : (<p className="min-h-30 grid place-items-center"><span>タスクはありません...</span></p>)
    }
    </>
  );
}
