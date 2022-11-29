import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cities, setCities] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/xsolla/test-task-frontend/master/events.json`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      const availableCities = data.map((v) => v.city);
      const availableDates = data.map((v) => {
        const [day, month, year] = v.date.split(".");

        return new Date(year, month - 1, day);
      });
      setCities(availableCities);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Event Listing</h1>

      <label for="city">City </label>
      <select
        name="city"
        id="city"
        onChange={(event) => {
          console.log("hello", event.target.value);
        }}
      >
        {cities.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>

      <label for="month">Month</label>
      <select
        name="month"
        id="month"
        onChange={(event) => {
          console.log("hello", event.target.value);
        }}
      >
        {months.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>

      <div></div>
    </div>
  );
}

export default App;
