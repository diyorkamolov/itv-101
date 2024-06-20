import axios from "axios";
import React from "react";
import { useQuery } from "react-query";


function App() {
  const { data, isLoading, error } = useQuery("film", async () => {
    const res = await axios.get("http://localhost:3001/shows");
    console.log("API Response:", res.data);
    return res.data;
  });

  if (isLoading) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading data:", error);
    return <div>Error loading data</div>;
  }

  console.log("Data:", data);

  return (
    <div>
      <h1>List of Shows</h1>
      {data && data && (
        <div>
          {data.map((show) => (
            <li key={data.id}>
              <h2>{show.title}</h2>
              <p>{show.description}</p>
              <p>Rating: {show.rating}</p>
              <p>Type: {show.type}</p>
              {show.media && show.media[0] && (
                <img src={show.media[0]} alt={show.title} style={{ maxWidth: "200px" }} />
              )}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;