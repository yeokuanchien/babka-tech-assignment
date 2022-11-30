import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/card";
import CustomSelect from "./components/CustomSelect/customSelect";

function App() {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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
      const availableCities = [...new Set(data.map((v) => v.city))];
      const events = data.map((v) => {
        const [day, month, year] = v.date.split(".");

        return {
          ...v,
          date: new Date(year, month - 1, day),
        };
      });
      setCities(availableCities);
      setEvents(events);
      setFilteredEvents(events);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Event Listing</h1>

      <div className="filter-container">
        <CustomSelect
          labelText={"City: "}
          options={cities}
          handleOnChange={(city) => {
            setSelectedCity(city);
            setFilteredEvents(
              events.filter((v) => {
                if (selectedMonth)
                  return (
                    v.city === city &&
                    v.date.getMonth() === months.indexOf(selectedMonth)
                  );

                return v.city === city;
              })
            );
          }}
        />

        <CustomSelect
          labelText={"Month: "}
          options={months}
          handleOnChange={(month) => {
            setSelectedMonth(month);
            setFilteredEvents(
              events.filter((v) => {
                if (selectedCity)
                  return (
                    v.date.getMonth() === months.indexOf(month) &&
                    v.city === selectedCity
                  );

                return v.date.getMonth() === months.indexOf(month);
              })
            );
          }}
        />
      </div>

      <div className="card-container">
        {filteredEvents.map((v) => {
          return <Card eventItem={v} />;
        })}
      </div>
    </div>
  );
}

export default App;
