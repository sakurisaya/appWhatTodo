import { useState } from "react";
import Button from "./Button/Button";

export default function EditModal({ todo, onSave, onCancel }) {
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDate, setEditedDate] = useState(todo.dueDate || "");
  const [editedMemo, setEditedMemo] = useState(todo.memo || "");
  const [editedPriority, setEditedPriority] = useState(todo.priority || "");

  const handleSave = () => {
    onSave(editedText, editedDate, editedMemo, editedPriority);
  };

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-slate-800/70 flex justify-center items-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()} // モーダル内でのクリックは無効
        className="bg-gray-50 w-[90%] p-5 rounded"
      >
        <div className="w-fit m-auto grid gap-2">
          <p className="mb-1">タスクを編集</p>
          {/* タスク名 */}
          <div className="text-start flex ">
            <label className="text-sm text-gray-600 mb-1 tracking-widest inline-block min-w-[4.5em] text-center">
              task
            </label>
            <input
              type="text"
              value={editedText}
              // onKeyDown={handleKeyDown}
              onChange={(e) => setEditedText(e.target.value)}
              className="border border-slate-300 rounded bg-white"
            />
          </div>
          {/* 期日 */}
          <div className="text-start flex ">
            <label className="text-sm text-gray-600 mb-1 tracking-widest inline-block min-w-[4.5em] text-center">
              date
            </label>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="border border-slate-300 rounded bg-white"
            />
          </div>
          {/* 優先順位 */}
          <div className="text-start flex ">
            <label className="text-sm text-gray-600 mb-1 tracking-widest inline-block min-w-[4.5em] text-center">
              priority
            </label>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="border border-slate-300 rounded bg-white text-[12px]">
              <option value="">ー</option>
              <option value="low">low</option>
              <option value="medium">medi</option>
              <option value="high">high</option>
            </select>
          </div>
          {/* メモ */}
          <div className="text-start flex mb-3">
            <label className="text-sm text-gray-600 mb-1 inline-block min-w-[4.5em] text-center">
              memo
            </label>
            <textarea
              value={editedMemo}
              onChange={(e) => setEditedMemo(e.target.value)}
              className="border border-slate-300 rounded bg-white"
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button onClick={handleSave}>save</Button>
          <Button onClick={onCancel}>cancel</Button>
        </div>
      </div>
    </div>
  );
}
