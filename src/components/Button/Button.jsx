import { Link } from "react-router-dom"

function Button({ to, children, onClick, type }) {
  // `to` が渡されてたら Link として動く
  if (to) {
    return (
      <Link
        to={to}
        className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-blue-600"
      >
        {children}
      </Link>
    )
  }

  // 通常のボタン
  return (
    <button
      className="text-sm px-5 py-2 text-white border border-transparent bg-slate-500 rounded duration-300 transition-color  hover:bg-lime-400"
      type={type} onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
