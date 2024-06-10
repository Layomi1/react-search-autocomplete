import React from "react";

const Suggestions = ({ data, handleClick }) => {
  return (
    <ul>
      {data && data.length
        ? data.map((user, index) => (
            <li key={index} onClick={handleClick}>
              {user}
            </li>
          ))
        : null}
    </ul>
  );
};

export default Suggestions;
