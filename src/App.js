import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    amount: "0",
    givenCash: "0",
  });
  const [error, setError] = useState("");
  const [notes, setNotes] = useState({
    2000: 0,
    500: 0,
    100: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetTable = () => {
    setNotes({
      2000: 0,
      500: 0,
      100: 0,
      20: 0,
      10: 0,
      5: 0,
      1: 0,
    });
  };

  const calculateChange = (e) => {
    e.preventDefault();
    setError("");
    resetTable();

    let { amount, givenCash } = data;

    if (!givenCash || !amount) {
      return setError("Please enter both the values");
    }

    if (givenCash < amount) {
      return setError("The given amount is not enough!");
    }

    amount = Number(amount);
    givenCash = Number(givenCash);

    let balance = givenCash - amount;

    Object.keys(notes)
      .sort((a, b) => b - a)
      .forEach((note) => {
        const numOfNotes = Math.trunc(balance / note);

        if (numOfNotes > 0) {
          setNotes((prev) => ({
            ...prev,
            [note]: numOfNotes,
          }));

          balance %= note;
        } else {
          setNotes((prev) => ({
            ...prev,
            [note]: 0,
          }));
        }
      });

  };

  return (
    <div className="App">
      <header>
        <h1>Cash Register</h1>
      </header>
      <main>
        <form>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              value={data.amount}
              placeholder="Amount"
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          {data.amount && data.amount !== "0" && (
            <div>
              <label htmlFor="givenCash">Given Cash</label>
              <input
                type="number"
                name="givenCash"
                value={data.givenCash}
                placeholder="Cash given"
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          )}
          <button onClick={calculateChange}>Calculate Change</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="tableContainer">
          <p>Return Change</p>
          <table>
            <thead>
              <tr>
                <th>Note Amount</th>
                {Object.keys(notes).map((note) => (
                  <th>{note}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Note Count</th>
                {Object.values(notes).map((num) => (
                  <td>{num}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        Create with love by{" "}
        <a href="https://www.atulgairola.tech/">Atul Gairola</a>
      </footer>
    </div>
  );
}

export default App;
