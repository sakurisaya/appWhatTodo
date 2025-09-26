export default function MemoModal({memo, onClose}) {
  return (
    <div onClick={onClose}
    className="fixed inset-0 bg-slate-800/70 flex justify-center items-center z-10">
      <div onClick={(e) => e.stopPropagation()} // モーダル内でのクリックは無効
        className="bg-gray-50 w-[90%] p-5 rounded">
        <p className="mb-1 text-lime-700/80">memo</p>
        <pre className="text-slate-500">{memo}</pre>
      </div>
    </div>
  )
}
