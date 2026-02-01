import React from "react";
import Content from "./Content";
import Header from "./Header";

function Course({ courses }) {
  console.log(courses);

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header heading={course.name} />
          <Content course={course} />
        </div>
      ))}
    </div>
  );
}

export default Course;
