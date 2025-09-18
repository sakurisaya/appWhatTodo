import { Link } from "react-router-dom"

function Button({ to, children }) {
  // `to` が渡されてたら Link として動く
  if (to) {
    return (
      <Link
        to={to}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {children}
      </Link>
    )
  }

  // 通常のボタン
  return (
    <button
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      type="button"
    >
      {children}
    </button>
  )
}

export default Button
