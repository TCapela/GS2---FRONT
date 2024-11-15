export default function SimulationHistory() {
    const simulations = [
      { id: 1, date: "12/11/2024", type: "Solar", savings: "R$300,00" },
      { id: 2, date: "10/11/2024", type: "Eólica", savings: "R$150,00" },
    ];
  
    return (
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-4">Histórico de Simulações</h3>
        <ul className="space-y-2">
          {simulations.map((simulation) => (
            <li key={simulation.id} className="border p-2 rounded-lg bg-green-50">
              <p>Data: {simulation.date}</p>
              <p>Tipo de Energia: {simulation.type}</p>
              <p>Economia Estimada: {simulation.savings}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  