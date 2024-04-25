import React, { useState } from "react";

export const PromptForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [concept, setConcept] = useState("");

  return (
    <form
      className="max-w-sm mx-auto mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        // Fire callback...
        if (prompt === "") {
          return;
        }
        onSubmit( " use the Feynman technique including these 6 steps (Choose a Topic, Teach it to a Child, Identify Gaps in Understanding, Review and Consolidate, Repeat and Simplify, Reflect and Review) to explain the concept of "+prompt + ", separate between the steps with a new line" ,concept);
        //setPrompt("");
      }}
    >
      <div className="flex flex-col items-center">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setConcept(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-[#340a63] hover:bg-[#D40689] text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
