import React, { useState } from 'react';

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <h2>Anecdote of the day</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
);

const MostVotedAnecdote = ({ anecdote, votes }) => (
  <div>
    <h2>Anecdote with most votes</h2>
    {votes !== 0 ? (
      <div>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </div>
    ) : (
      <p>No votes have been found.</p>
    )}
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleRandomAnecdote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    } while (randomIndex === selected);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const highestVotes = Math.max(...votes);
  const highestVotesIndex = votes.indexOf(highestVotes);
  const highestVotesAnecdote = highestVotesIndex !== -1 ? anecdotes[highestVotesIndex] : null;

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleRandomAnecdote} text="next anecdote" />
      <MostVotedAnecdote anecdote={highestVotesAnecdote} votes={highestVotes} />
    </div>
  );
};

export default App;