import { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/respuestas.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center">
    Inscriptos al evento: Burako, Truco y Diversión
  </h1>

  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          {data[0] &&
            Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-4 py-3 border text-sm font-semibold text-gray-700"
              >
                {key}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {Object.values(row).map((val, j) => (
              <td
                key={j}
                className="px-4 py-2 border text-sm text-gray-800 whitespace-pre-line"
              >
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default App;
