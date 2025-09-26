import { useState } from "react";
import { CiSearch } from "react-icons/ci";


export default function SearchInput({todos, onSearchChange }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchToggle  = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm('');
      onSearchChange(''); // 検索入力もクリア
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  }


  return (
    <>
      {/* タスクが11個以上の場合のみ検索UIを表示 */}
      {todos.length > 10 &&
        /* 検索入力フィールドを追加 */
        <div className="flex justify-end mb-2 items-center">
        {/* {showSearch && ( */}
        <input type="text"
        placeholder="タスクを検索..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={`px-1 mr-1 w-full border border-slate-300 rounded transition-all duration-300 ${showSearch ? 'opacity-100 visible' : 'opacity-0 invisible'}`}/>
        {/* )} */}
        <CiSearch  onClick={handleSearchToggle}
        className={`cursor-pointer transition-colors duration-200 hover:text-lime-400 ${showSearch ? 'text-lime-400' : ''}`}/>
        </div>
      }
    </>
  )
}
