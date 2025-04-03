import React, { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { sanitizeInput } from "./utilities";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track the selected suggestion index
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const sanitizedQuery = sanitizeInput(debouncedQuery);

    // if (debouncedQuery.length === 0) {
    if (debouncedQuery.length <= 2) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/words?query=${debouncedQuery}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
        setSelectedIndex(0); // Set the selection index to the first item initially
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (suggestion) => {
    console.log("Selected:", suggestion);
  };

  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setSelectedIndex(-1); // Reset the selected index
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelect(suggestions[selectedIndex]);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Autocomplete Fun</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type something to search"
          />
          {query && (
            <button onClick={handleClear} className="clear-button">
              Clear
            </button>
          )}
        </div>
        {isLoading && <div className="loading">Loading...</div>}
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${
                index === selectedIndex ? "selected" : ""
              }`}
              onClick={() => handleSelect(suggestion)}
            >
              {getHighlightedText(suggestion, query)}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
