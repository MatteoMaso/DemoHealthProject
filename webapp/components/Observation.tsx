'use client'

import { useState } from "react";
import { ObservationList } from "./ObservationList";

export default function ObservationsPanel() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetching from the server-side API route
      const response = await fetch('/api/observation');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('There was an error!', error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-7">
        <div className="my-2 text-2xl font-bold">
            Observation Panel
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 rounded-lg p-3 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300  font-bold text-white shadow-lg  " onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>
      { results.length > 0 && <ObservationList results={results} />}
    </div>
  );
}
