import { useState } from "react";
import Button from "./Button";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
import Count from "./Count";
import Statistics from "./Statistics";

const App = () => {
  //states for the first task
  const [bad, setBad] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);

  //states for the second task
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

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

  const handleClick = () => {
    const currentAnecdotes = Math.floor(Math.random() * anecdotes.length);
    setSelected(currentAnecdotes);
  };

  const mostVotedIndex = vote.indexOf(Math.max(...vote));

  const handleVote = () => {
    const voteCopy = [...vote];
    voteCopy[selected] += 1;

    setVote(voteCopy);
  };

  return (
    <div>
      <b>give feedback</b>
      <div>
        <Button onClick={handleBad} title="Bad" />
        <Button onClick={handleNeutral} title="Neutral" />
        <Button onClick={handleGood} title="Good" />
      </div>

      {/* STATISTICS SECTION */}
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
      {/* ANECDOTES */}
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={handleClick}>next anecdotes</button>
      <button onClick={handleVote}>vote</button>
      <p>highestVote {anecdotes[mostVotedIndex]} votes</p>
    </div>
  );
};

export default App;
