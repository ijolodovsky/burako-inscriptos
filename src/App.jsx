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
    <div className="p-6 max-w-full mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Inscriptos al evento: Burako, Truco y Diversión
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {data[0] &&
                  Object.keys(data[0]).map((key) => {
                    // Mapeo de nombres de columnas más amigables
                    const columnNames = {
                      'Marca temporal': 'Fecha',
                      'Nombre y Apellido': 'Nombre',
                      'Edad': 'Edad',
                      'Numero de contacto (WhatsApp)': 'WhatsApp',
                      'Mail': 'Email',
                      '¿Querés anotarte a Burako, Truco o ambos?': 'Juego',
                      '¿Te anotas con pareja o individual?': 'Modalidad',
                      'Nombre de tu pareja (si tenés)': 'Pareja',
                      '¿Podes colaborar trayendo tu burako?': 'Burako',
                      '¿Querés dejarnos algún comentario, consulta o aclaración?': 'Comentarios',
                      'Modalidad de pago': 'Pago',
                      'Comprobante': 'Comprobante'
                    };
                    
                    const displayName = columnNames[key] || key;
                    
                    return (
                      <th
                        key={key}
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                        title={key} // Tooltip con el nombre completo
                      >
                        {displayName}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {Object.values(row).map((val, j) => (
                    <td
                      key={j}
                      className="px-2 py-2 text-xs text-gray-700 border-r border-gray-200 last:border-r-0 max-w-xs truncate"
                      title={val} // Tooltip para ver contenido completo
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
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Total de inscriptos: {data.length}
        </p>
      </div>
    </div>
  );
}

export default App;