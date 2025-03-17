import React, { useState, useEffect } from "react";

export default function Pagination(props) {
  const [currentNum, setCurrentNum] = useState(1)

  let endPage = Math.ceil(props.totalObjects / props.objectsPerPage)
  let classCurrentPage = "page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-400 shadow-md focus:shadow-md"
  let classPage = "w-10 h-10 text-blue-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-blue-100"

  let lastNumber = () => {
    if (currentNum - 1 >= 1) {
      setCurrentNum(currentNum - 1)
      props.paginate(currentNum - 1)
    }
  }

  let nextNumber = () => {
    if (currentNum + 1 <= endPage) {
      setCurrentNum(currentNum + 1)
      props.paginate(currentNum + 1)
    }
  }

  useEffect(() => {
    props.paginate(currentNum);
  }, [currentNum, props]);

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-full flex items-center justify-center">
        <nav aria-label="Page navigation">
          <ul className="inline-flex space-x-2">
            <li><button
              className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-blue-100"
              onClick={lastNumber}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
            </li>
            <li>
              <button disabled={true}
                className={classCurrentPage}
                onClick={() => {
                  props.paginate(currentNum);
                  setCurrentNum(currentNum)
                }}>{currentNum}</button>
            </li>

            <li>
              <button disabled={true}
                className={classPage}
              >/</button>
            </li>

            <li>
              <button disabled={true}
                className={classPage}
              >{endPage}</button>
            </li>

            <li> <button
              className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-blue-100"
              onClick={nextNumber}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}