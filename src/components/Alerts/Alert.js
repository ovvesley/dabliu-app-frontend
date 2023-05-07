import React, { useState } from "react";
import { FaCheck, FaRegFrown } from "react-icons/fa";

function Alert({ type = "success", message = "This is a alert" }) {
  const [showAlert, setShowAlert] = useState(true);

  const classNameColor = type === "success" ? "bg-emerald-500" : "bg-red-500";

  const icon = type === "success" ? <FaCheck /> : <FaRegFrown />;

  return (
    showAlert && (
      <div
        className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${classNameColor}`}
      >
        <span className="text-xl inline-block mr-5 align-middle">{icon}</span>
        <span className="inline-block align-middle mr-8" dangerouslySetInnerHTML={{__html: message}}></span>
        <button
          onClick={() => setShowAlert(false)}
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        >
          <span>×</span>
        </button>
      </div>
    )
  );
}

export default Alert;
