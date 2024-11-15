"use client";

import { useState } from "react";

export default function SimulationForm() {
  const [formData, setFormData] = useState({
    address: "",
    currentEnergy: "",
    consumption: "",
    expenses: "",
    energyType: "",
    installationCost: "",
    monthlySavings: "",
    incentives: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados: ", formData);
  };

  return (
    <form className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Simulação de Energia Renovável</h2>
      <div>
        <label htmlFor="address" className="block font-medium">Endereço</label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Digite o endereço"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="currentEnergy" className="block font-medium">Energia Atual</label>
        <input
          type="text"
          id="currentEnergy"
          name="currentEnergy"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Fonte atual de energia"
          value={formData.currentEnergy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="consumption" className="block font-medium">Consumo Energético (kWh)</label>
        <input
          type="number"
          id="consumption"
          name="consumption"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Consumo nos últimos 3 meses"
          value={formData.consumption}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="expenses" className="block font-medium">Gastos Energéticos (R$)</label>
        <input
          type="number"
          id="expenses"
          name="expenses"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Gastos nos últimos 3 meses"
          value={formData.expenses}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="energyType" className="block font-medium">Tipo de Energia</label>
        <select
          id="energyType"
          name="energyType"
          className="w-full border px-4 py-2 rounded-lg"
          value={formData.energyType}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="Solar">Solar</option>
          <option value="Eólica">Eólica</option>
        </select>
      </div>
      <div>
        <label htmlFor="installationCost" className="block font-medium">Custo de Instalação (R$)</label>
        <input
          type="number"
          id="installationCost"
          name="installationCost"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Custo estimado de instalação"
          value={formData.installationCost}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="monthlySavings" className="block font-medium">Economia Mensal (R$)</label>
        <input
          type="number"
          id="monthlySavings"
          name="monthlySavings"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Economia mensal estimada"
          value={formData.monthlySavings}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="incentives" className="block font-medium">Incentivos Fiscais (R$)</label>
        <input
          type="number"
          id="incentives"
          name="incentives"
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Valor dos incentivos fiscais"
          value={formData.incentives}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Calcular ROI
      </button>
    </form>
  );
}
