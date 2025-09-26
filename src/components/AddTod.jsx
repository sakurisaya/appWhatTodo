import { useState } from "react";
import Button from "./Button/Button";

export default function AddTod({ onAdd }) {

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [memo, setMemo] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!text) {
      alert('タスクを入力してください');
      return;
    }
    onAdd({text, dueDate, memo, completed:false, priority});
    setText('');
    setDueDate('');
    setMemo('');
    setPriority('');
  };


  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="md:flex gap-3 mb-2 flex-wrap grid grid-cols-2 grid-rows-2">
        <input type="text"
        placeholder="タスクを入力"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-2 bg-white row-start-1 row-end-2 col-start-1 col-end-3"/>
        <input type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 bg-white row-start-2 row-end-2"/>
        <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="text-[12px] border border-gray-300 rounded bg-white p-1">
          <option value="">ー</option>
          <option value="low">LOW</option>
          <option value="medium">MEDI</option>
          <option value="high">HIGH</option>
        </select>
      </div>
      <textarea
        placeholder="memo"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        className="border border-gray-300 px-2 block w-full mb-3 bg-white"></textarea>
      <Button type="submit" className="mb-3">タスクを追加</Button>
    </form>
  )
}
