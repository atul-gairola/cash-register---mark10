import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    amount: "0",
    givenCash: "0",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateChange = (e) => {
    e.preventDefault();
    setError("");
    const { amount, givenCash } = data;

    if (!givenCash || !amount) {
      return setError("Please enter both the values");
    }

    if (givenCash < amount) {
      return setError("The given amount is not enough!");
    }

    console.log(amount, givenCash);
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
                <th>2000</th>
                <th>500</th>
                <th>100</th>
                <th>20</th>
                <th>10</th>
                <th>5</th>
                <th>1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Note Count</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
