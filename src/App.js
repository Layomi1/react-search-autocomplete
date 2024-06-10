import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Suggestions from "./components/Suggestions";

function App() {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [serchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState("");

  useEffect(() => {
    async function fetchListsOfUsers() {
      setloading(true);
      try {
        const response = await fetch("http://dummyjson.com/users");
        const data = await response.json();

        if (data && data.users && data.users.length) {
          setUsers(data.users.map((user) => user.firstName));
          setloading(false);
          setError(null);
        }
      } catch (error) {
        setUsers();
        setloading(false);
        setError(error);
      }
    }
    fetchListsOfUsers();
  }, []);

  if (error) {
    <div>Error occured! Please, try again later</div>;
  }

  function handleClick(event) {
    setShowDropdown(false);
    setSearchParam(event.target.innerText.toLowerCase());
    setFilteredUsers([]);
  }
  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  return (
    <div className="App">
      {loading ? (
        <h1>Loading data! Please, wait</h1>
      ) : (
        <input
          type="search"
          name="search-users"
          value={serchParam}
          placeholder="Search Users here"
          onChange={handleChange}
        />
      )}

      {showDropdown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}

export default App;
