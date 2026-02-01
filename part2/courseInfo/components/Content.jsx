import React from "react";
import Part from "./Part";

function Content({ course }) {
  const array = course.parts;
  console.log(array);

  const totalExercises = array.reduce(
    (total, part) => total + part.exercises,
    0,
  );

  return (
    <div>
      {array.map((course) => {
        return (
          <Part
            key={course.id}
            name={course.name}
            exercises={course.exercises}
          />
        );
      })}
      <p>{totalExercises}</p>
    </div>
  );
}

export default Content;
