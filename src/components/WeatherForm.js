import { useState } from "react";

const WeatherForm = ({ setCity, setInputCity }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
    setInputCity(true);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setInputCity(false);
  }


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={!input.trim()}>Get Weather</button>
    </form>
  );
};

export default WeatherForm;
