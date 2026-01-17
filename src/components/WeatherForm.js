import { useState } from "react";

const WeatherForm = ({ setCity }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input.trim());
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
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
      <button type="submit" title="Type city to get weater details" disabled={!input.trim()}>Get Weather</button>
    </form>
  );
};

export default WeatherForm;
