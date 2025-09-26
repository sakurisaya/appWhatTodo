import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdAutoAwesomeMotion } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import MemoModal from "./MemoModal";
import EditModal from "./EditModal";
import PriorityIcons from "./PriorityIcons";




const fixDueDate = (dateString) => {
  if (!dateString) return "";
  const [, month, day] = dateString.split("-");
  return `${Number(month)}/${Number(day)}`;
};

export default function Todo({ todo, onDelete, toggleTodo, onEdit }) {
  const [showMemo, setShowMemo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleToClick = () => {
    toggleTodo(todo.id);
  };

    // メモアイコンをクリックしたときにメモ確認モーダルを表示
  const handleShowClick = () => {
    if (todo.memo) {
      setShowMemo(true);
    }
  };

    // 編集アイコンをクリックしたときの処理
  const handleEditClick = () => {
    setIsEditing(true);
};

const handleSave = (editedText, editedDate, editedMemo, editedPriority) =>{
  onEdit(todo.id, editedText, editedDate, editedMemo, editedPriority);
  setIsEditing(false);
};

const handleCancel = () =>{
  setIsEditing(false);
};

  return (
    <li className="flex justify-between gap-0.5 mb-2 items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        onChange={handleToClick}
        className="accent-lime-600 bg-transparent hover:accent-slate-500 w-3.5 h-3.5"
      />

      <p onClick={handleShowClick} className={`flex items-center flex-1 text-start cursor-pointer duration-300 transition-colors ${todo.memo ? 'hover:text-lime-600' : '' }`
      }>

        <PriorityIcons priority={todo.priority} />

        {todo.text}
        {todo.memo &&  <MdAutoAwesomeMotion className="inline text-lime-400 mx-1"/>}
      </p>

      <p className="text-sm">{fixDueDate(todo.dueDate)}</p>

      <MdOutlineEdit onClick={handleEditClick} className="inline text-slate-400 cursor-pointer transition-colors duration-200 hover:text-lime-400"/>

      <MdDelete
        onClick={() => onDelete(todo.id)}
        className="text-slate-500/70 cursor-pointer transition-colors duration-200 hover:text-lime-400"
      />

      {/* メモ確認モーダル */}
      {showMemo && (
        <MemoModal
        memo={todo.memo}
        onClose={() => {setShowMemo(false)}}/>
      )}


      {/* 編集モーダル */}
      {isEditing && (
        <EditModal
        todo={todo}
        onSave={handleSave}
        onCancel={handleCancel}/>
      )}
    </li>
  );
}
