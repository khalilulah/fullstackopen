import React from "react";
import Part from "./Part";

function Content(props) {
  return (
    <div>
      {/* {console.log(props.parts[0])} */}
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
}

export default Content;
