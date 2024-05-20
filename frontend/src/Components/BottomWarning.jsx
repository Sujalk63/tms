import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="mt-6 text-sm flex justify-center">
      <div className="text-white" >
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer text-customSideColor" to={to}>
        {buttonText}
      </Link>
    </div>
}
  




