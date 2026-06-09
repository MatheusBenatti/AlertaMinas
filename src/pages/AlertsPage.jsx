import { useMemo } from "react";
import { calcularRisco } from "../utils/riskCalculator";
import MapView from "../components/MapView";
import NotificationPanel from "../components/NotificationPanel";
import {
  PageSection,
  Card,
  SimulatedSection,
  SectionHeader,
  DataGrid,
  SimulatedDashboardGrid,
  DataCard,
} from "../styles/AlertsPage.styles";

function AlertsPage() {
  // Dados mocados com cada cidade em uma situação diferente
  const allSimulatedData = useMemo(() => {
    return [
      {
        // Alto risco
        id: `city-1-demo`,
        name: "Belo Horizonte",
        coords: [-19.92, -43.94],
        chuva24h: 85,
        nivelRio: 4.2,
        source: "simulado",
        simulated: true,
      },
      {
        // Médio risco
        id: `city-2-demo`,
        name: "Uberlândia",
        coords: [-18.91, -48.27],
        chuva24h: 45,
        nivelRio: 2.1,
        source: "simulado",
        simulated: true,
      },
      {
        // Baixo risco
        id: `city-3-demo`,
        name: "Juiz de Fora",
        coords: [-21.76, -43.35],
        chuva24h: 15,
        nivelRio: 1.8,
        source: "simulado",
        simulated: true,
      },
      {
        // Alto risco
        id: `city-4-demo`,
        name: "Montes Claros",
        coords: [-16.72, -43.86],
        chuva24h: 78,
        nivelRio: 3.8,
        source: "simulado",
        simulated: true,
      },
    ];
  }, []);

  // Apenas alertas ALTOS (para o painel de alertas)
  const simulatedAlerts = useMemo(() => {
    return allSimulatedData.filter((city) => calcularRisco(city) === "alto");
  }, [allSimulatedData]);

  return (
    <PageSection>
      <Card>
        <p className="eyebrow">Demonstração de Alertas</p>
        <h2>Visualização de Diferentes Níveis de Risco</h2>
        <p className="description">
          Abaixo está um exemplo de monitoramento em tempo real com múltiplas
          cidades em diferentes situações. Cada marcador no mapa representa o
          nível de risco atual: <strong>🔴 Alto</strong>,{" "}
          <strong>🟡 Médio</strong> e <strong>🟢 Baixo</strong>.
        </p>
      </Card>

      <Card>
        <SimulatedSection>
          <SectionHeader>
            Mapa de Monitoramento com Dados Simulados
          </SectionHeader>

          <SimulatedDashboardGrid>
            <MapView cities={allSimulatedData} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <NotificationPanel cities={simulatedAlerts} />
            </div>
          </SimulatedDashboardGrid>
        </SimulatedSection>
      </Card>

      <Card>
        <SimulatedSection>
          <SectionHeader>Detalhes de Cada Localidade</SectionHeader>
          <DataGrid>
            {allSimulatedData.map((city) => {
              const risk = calcularRisco(city);
              const riskLabel =
                risk === "alto"
                  ? "🔴 Alto"
                  : risk === "medio"
                    ? "🟡 Médio"
                    : "🟢 Baixo";
              return (
                <DataCard key={city.id} $risk={risk}>
                  <div className="card-top">
                    <div className="city-name">{city.name}</div>
                    <span className="risk-badge">{riskLabel}</span>
                  </div>
                  <div className="data-row">
                    <span className="label">💧 Chuva 24h</span>
                    <span className="value">{city.chuva24h}%</span>
                  </div>
                  <div className="data-row">
                    <span className="label">🌊 Nível do rio</span>
                    <span className="value">{city.nivelRio.toFixed(1)}</span>
                  </div>
                </DataCard>
              );
            })}
          </DataGrid>
        </SimulatedSection>
      </Card>
    </PageSection>
  );
}

export default AlertsPage;
