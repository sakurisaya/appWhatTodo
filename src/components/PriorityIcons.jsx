import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegArrowAltCircleRight } from "react-icons/fa";


export default function PriorityIcons({ priority }) {
  return (
    <span className="inline-block min-w-5 h-3.5">
      {priority === 'high' ? (
      <FaRegArrowAltCircleUp className="w-3.5 mx-0.5 text-pink-400"/>
      ) : priority ==='medium' ? (
      <FaRegArrowAltCircleRight  className="w-3.5 mx-0.5 text-lime-400"/>
      ) : priority ==='low' ? (<FaRegArrowAltCircleDown className="w-3.5 mx-0.5 text-sky-400"/>
      ) : null }
    </span>
  );
}
