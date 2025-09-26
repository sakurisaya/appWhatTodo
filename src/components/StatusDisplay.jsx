export default function StatusDisplay({todos}) {
  return (
    <>
    {todos.length > 0 &&
      <p className="mb-3 text-sm text-right">残りのタスク {todos.filter((todo) => !todo.completed).length} </p>}
    </>
  )
}
