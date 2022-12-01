import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/card";
import CustomSelect from "./components/CustomSelect/customSelect";
import { months } from "./config/months";

function App() {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://raw.githubusercontent.com/xsolla/test-task-frontend/master/events.json`,
        {
          method: "GET",
          mode: "cors",
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

  const handleOnSelectCity = (city) => {
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
  };

  const handleOnSelectMonth = (month) => {
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
  };

  return (
    <div className="App">
      <h1 className="title">Event Listing</h1>

      <div className="filter-container">
        <CustomSelect
          labelText={"City: "}
          options={cities}
          handleOnChange={handleOnSelectCity.bind(this)}
        />

        <CustomSelect
          labelText={"Month: "}
          options={months}
          handleOnChange={handleOnSelectMonth.bind(this)}
        />
      </div>

      <div className="grid-layout">
        {filteredEvents.map((v) => (
          <Card key={v.id} eventItem={v} />
        ))}
      </div>
    </div>
  );
}

export default App;
