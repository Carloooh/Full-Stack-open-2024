import { useState } from 'react'

const Statistics = ({ stats }) => {
  if (stats.all === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine stat="good" value={stats.good}/>
          <StatisticsLine stat="neutral" value={stats.neutral}/>
          <StatisticsLine stat="bad" value={stats.bad}/>
          <StatisticsLine stat="all" value={stats.all}/>
          <StatisticsLine stat="average" value={stats.average}/>
          <StatisticsLine stat="positive" value={stats.positive}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({stat, value}) => {
  return(
    <tr>
      <td>{stat}</td>
      <td>{stat === 'positive' ? `${value} %` : value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGoodButton = () => {
    const updatedGood = good + 1;
    const updatedAll = updatedGood + neutral + bad;
    setGood(updatedGood);
    setAll(updatedAll);
    setAverage((updatedGood - bad) / updatedAll);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleNeutralButton = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = good + updatedNeutral + bad;
    setNeutral(updatedNeutral);
    setAll(updatedAll);
    setAverage((good - bad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  const handleBadButton = () => {
    const updatedBad = bad + 1;
    const updatedAll = good + neutral + updatedBad;
    setBad(updatedBad);
    setAll(updatedAll);
    setAverage((good - updatedBad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodButton} text="good" />
      <Button handleClick={handleNeutralButton} text="neutral" />
      <Button handleClick={handleBadButton} text="bad" />
      <Statistics stats={{good, neutral, bad, all, average, positive}} />
    </div>
  )
}

export default App