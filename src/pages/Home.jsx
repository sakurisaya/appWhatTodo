import { useEffect, useState } from "react";
import AddTod from "../components/AddTod"
import Button from "../components/Button/Button"
import TodoList from "../components/TodoList";
import StatusDisplay from "../components/StatusDisplay";
import SearchInput from "../components/SearchInput";
import { RiResetLeftFill } from "react-icons/ri";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  // sort関数を定義
  const sortTodosByDate = (todosArray) => {
     // 優先度を数値にマッピング
    const priorityMap = {
      'high': 3,
      'medium': 2,
      'low': 1,
      '': 0,
    };

    return [...todosArray].sort((a,b) => {
      if (a.completed!== b.completed) {
        return a.completed ? 1 : -1;
      }
      if (a.dueDate && b.dueDate) {
        const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
        if (dateComparison !== 0) {
          return dateComparison;
        }
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }

      const aPriority = priorityMap[a.priority] || 0;
      const bPriority = priorityMap[b.priority] || 0;

      if (aPriority !== bPriority) {
        // 優先度が異なる場合は、優先度の高い方を先に表示
        return bPriority - aPriority; // 降順 (high > medium > low)
      }

      if (!a.completed && b.completed) {
        return -1;
      }

    })
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:5000/todos');
      const data = await res.json();

      // setTodos(data);
      const sortData = sortTodosByDate(data);
      setTodos(sortData);
    };
    fetchTodos();
  }, []);



  // チェックボタン
  const toggleTodo = async(id) => {
    // 1. 既存のタスクのコピーを作成し、更新対象のタスクを見つける
    const todo = todos.find((todo) => todo.id === id);
     // ② 完了状態をトグル（反転）する
    const updatedTodo= { ...todo, completed : !todo.completed};

      // ③ サーバーにPUTリクエストを送信してデータを更新
    await fetch(`http://localhost:5000/todos/${id}` , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo),
    });
     // 4. ローカルの状態を更新する
    //   更新後のtodos配列を新しく作成
    const newTodos = todos.map((t) =>(t.id === id ? updatedTodo : t));

    const sortData = sortTodosByDate(newTodos);
    setTodos(sortData);
  };

  // タスクを削除
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`,{
      method:'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !==id));
  };

  const handleClear = async() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    for (const todo of completedTodos) {
      await fetch(`http://localhost:5000/todos/${todo.id}`,{method:'DELETE',});
    }

    const remainingTodos = todos.filter((todo) => !todo.completed);
    setTodos(remainingTodos);
  };

  const handleReset = async() => {
    // 1. todos配列の各要素を順番に取り出して、ひとつずつ処理する
    for (const todo of todos) {
    // 2. 取り出したタスクのidを使って、サーバーに削除リクエストを送る
    //    DELETEメソッドを使うことで、サーバーのデータを永続的に削除できる
      await fetch(`http://localhost:5000/todos/${todo.id}`,{method:'DELETE',});
    }

    // 3. すべてのタスクがサーバーから削除されたら、ローカルの状態を空の配列にする
    //    これにより、UIからすべてのタスクが消える
    setTodos([]);
  };

  // タスクを追加
  const addTodo = async (todo) => {
    const res = await fetch(`http://localhost:5000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await res.json();

    // setTodos([...todos, newTodo]);

    // 新しいタスクを追加した後、リストを再ソートする
    const updatedTodos = [...todos, newTodo];
    const sortData = sortTodosByDate(updatedTodos);
    setTodos(sortData);

  };

  // onEdit用の関数
  const updateTodo = async (id, newText, newDate, newMemo, newPriority) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    const updatedTodo = { ...todoToUpdate, text: newText, dueDate:newDate , memo: newMemo, priority: newPriority, };
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });
    // setTodos(
    //   todos.map((t) => (t.id === id ? updatedTodo : t))
    // );


        // タスクを編集した後、リストを再ソートする
         // todos配列を更新
        const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
        // 更新後にソートする
        const sortData = sortTodosByDate(updatedTodos);
        setTodos(sortData);
  };

    // 検索キーワードでフィルタリングされたタスクリストを作成
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      (todo.memo && todo.memo.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    );


  return (
    <div className="mb-5">
      <h1 className="mb-4 text-3xl text-slate-500"><span className="text-lime-400">W</span>ha<span className="text-lime-400">t</span> T<span className="text-lime-400">o</span> <span className="text-lime-400 animate-fuwafuwa inline-block">Do</span> <span className="text-lime-400"></span> ?</h1>

      <SearchInput
      todos={todos}
      onSearchChange={setSearchTerm}
      />

      <StatusDisplay
      todos={todos}
      />


      <TodoList
        filteredTodos={filteredTodos}
        onDelete={deleteTodo}
        toggleTodo={toggleTodo}
        onEdit={updateTodo}
        />

      <AddTod onAdd={addTodo}/>

      <Button onClick={handleClear}>完了タスクをすべて削除</Button>

      <div onClick={handleReset} className="fixed bottom-5 right-5 cursor-pointer flex items-center text-gray-500 hover:text-lime-400 duration-200 transition-colors">
      <span className="text-[12px] mr-0.5 tracking-widest">reset</span><RiResetLeftFill className="cursor-pointer"/>
      </div>
    </div>
  )
}
