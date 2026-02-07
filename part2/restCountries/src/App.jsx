import React, { useEffect, useState } from "react";
import countryService from "../services/Countries";
import DisplayCounty from "../components/DisplayCounty";
import OneCountry from "../components/OneCountry";
function App() {
  const [country, setCounty] = useState([]);
  const [searchCountry, setSearchCounty] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    countryService.getAll().then((countries) => setCounty(countries));
  }, []);

  const onchangeText = (e) => {
    setSearchCounty(e.target.value);
    // newval =e.target.value
  };

  const toShow = searchCountry
    ? country.filter((count) =>
        count.name.common.toLowerCase().includes(searchCountry.toLowerCase()),
      )
    : country;
  if (country.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <div>
      find countries:
      <input type="text" value={searchCountry} onChange={onchangeText} />
      {selectedCountry ? (
        <OneCountry toShow={selectedCountry} />
      ) : (
        <DisplayCounty
          country={toShow}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  );
}

export default App;
