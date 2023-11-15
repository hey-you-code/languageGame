import React from "react";

function Table({ tableData }) {
  return (
    <div className=" w-full h-screen justify-center py-4 my-4">
      <div className="w-full flex flex-col items-center ">
        <div className="flex w-1/2  justify-between">
          <div className="text-2xl font-semibold text-blue-600">Username</div>
          <div className="text-2xl font-semibold text-blue-600">Scores</div>
        </div>

        {tableData?.map((item) => (
          <div className="flex w-1/2 px-4 space-y-4  shadow-md justify-between items-center">
            <div className="text-xl font-semibold my-4">
              {item?.email.split("@")[0]}
            </div>
            <div className="text-xl font-semibold">{item?.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
