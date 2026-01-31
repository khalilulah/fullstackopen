import { useState } from "react";
import Button from "./Button";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
import Count from "./Count";
import Statistics from "./Statistics";

const App = () => {
  const [bad, setBad] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);

  const handleBad = () => {
    const updatedBad = bad + 1;
    setTotal(updatedBad + good + neutral);
    setBad(bad + 1);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setTotal(updatedNeutral + good + bad);
    setNeutral(neutral + 1);
  };

  const handleGood = () => {
    const updatedGood = good + 1;
    setTotal(updatedGood + neutral + bad);
    setGood(good + 1);
  };

  let average = 0;
  let feedbackSum = 0;
  feedbackSum = good - bad;
  let percentage = 0;
  let realPercentage = 0;

  if (total > 0) {
    average = feedbackSum / total;
    percentage = good / total;
    realPercentage = percentage * 100;
  }

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <b>give feedback</b>
      <div>
        <Button onClick={handleBad} title="Bad" />
        <Button onClick={handleNeutral} title="Neutral" />
        <Button onClick={handleGood} title="Good" />
      </div>
      <p>statistics</p>
      {total > 0 ? (
        <Statistics
          average={average}
          total={total}
          realPercentage={realPercentage}
          good={good}
          bad={bad}
          neutral={neutral}
        />
      ) : (
        <p>no feedback yet</p>
      )}
    </div>
  );
};

export default App;
