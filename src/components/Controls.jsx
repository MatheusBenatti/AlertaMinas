import { cities as initialCities } from '../data/mockCities';

function Controls({ setCities }) {
  function reprocessarDados() {
    const simulated = initialCities.map((city, index) => ({
      ...city,
      chuva24h: Math.min(100, 12 + index * 18 + Math.floor(Math.random() * 25)),
      nivelRio: Number((city.nivelRio + Math.random() * 0.8).toFixed(1)),
    }));

    setCities(simulated);
  }

  return (
    <section className="controls-card">
      <button type="button" onClick={reprocessarDados}>
        Simular cenário
      </button>
      <p>Atualize os valores de risco para visualizar mudanças rápidas no mapa e nos alertas.</p>
    </section>
  );
}

export default Controls;
