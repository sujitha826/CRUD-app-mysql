import { useState } from "react";
import Axios from "axios";
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  //sends all inputs from front-end to the backend server(http://localhost:3001) with data on the body object over the route specified.
  const addNewEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  }

  // Get all employees => sending get request to backend server that fetches all details from db and send back to front-end which is then updated to UI table.
  const showEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      console.log(response.data);
      setEmployeeList(response.data);
    });
  };


  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage(Annual):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addNewEmployee}>Add Employee</button>
      </div>
      =========================================================================================================================================================
      <div className="employees-display"><button onClick={showEmployees}>Show Employees</button></div>
      {employeeList.map((val, key) => {
        return (
          <div>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;