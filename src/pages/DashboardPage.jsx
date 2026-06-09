import { useEffect, useState, useMemo } from "react";
import MapView from "../components/MapView";
import NotificationPanel from "../components/NotificationPanel";
import { cities as initialCities } from "../data/mockCities";
import { getWeather } from "../services/weatherService";
import { calcularRisco } from "../utils/riskCalculator";
import {
  PageSection,
  PageHeader,
  KPIGrid,
  KPICard,
  DashboardGrid,
} from "../styles/DashboardPage.styles";

import {
  DataGrid,
  DataCard,
  SimulatedSection,
  SectionHeader,
  Card,
} from "../styles/AlertsPage.styles";

function DashboardPage() {
  const [cities, setCities] = useState(initialCities);

  const kpiData = useMemo(() => {
    const totalCities = cities.length;
    const highRiskAlerts = cities.filter(
      (city) => calcularRisco(city) === "alto",
    ).length;
    const avgRainfall =
      cities.length > 0
        ? Math.round(
            cities.reduce((sum, city) => sum + (city.chuva24h || 0), 0) /
              cities.length,
          )
        : 0;
    const mediumRiskAlerts = cities.filter(
      (city) => calcularRisco(city) === "medio",
    ).length;

    return {
      totalCities,
      highRiskAlerts,
      mediumRiskAlerts,
      avgRainfall,
    };
  }, [cities]);

  async function carregarDados() {
    const updated = await Promise.all(
      initialCities.map(async (city) => {
        const clima = await getWeather(city.coords[0], city.coords[1]);
        return {
          ...city,
          chuva24h: Math.min(100, Math.round((clima.chuva || 0) * 10)),
          temperatura: clima.temperatura,
          nivelRio: Math.min(5, (clima.chuva || 0) * 0.3),
          source: clima.source,
        };
      }),
    );

    setCities(updated);
  }

  useEffect(() => {
    carregarDados();
    const interval = setInterval(() => carregarDados(), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageSection>
      <PageHeader>
        <p className="eyebrow">Painel de Monitoramento</p>
        <h2>Mapa e Alertas</h2>
        <p>
          Visualize municípios, risco estimado e alertas críticos em tempo real.
          Use a página "Alertas" para simular cenários.
        </p>
      </PageHeader>

      <KPIGrid>
        <KPICard $type="total">
          <div className="kpi-top">
            <span className="label">Municípios</span>
            <span className="kpi-icon">🏙️</span>
          </div>
          <span className="value">{kpiData.totalCities}</span>
          <span className="description">Monitorados em tempo real</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: "100%" }} />
          </div>
        </KPICard>

        <KPICard $type="high" $count={kpiData.highRiskAlerts}>
          <div className="kpi-top">
            <span className="label">Alertas Críticos</span>
            <span className="kpi-icon">🔴</span>
          </div>
          <span className="value">{kpiData.highRiskAlerts}</span>
          <span className="description">
            {kpiData.highRiskAlerts > 0
              ? "Risco alto detectado"
              : "Situação normal"}
          </span>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(kpiData.highRiskAlerts / kpiData.totalCities) * 100}%`,
              }}
            />
          </div>
        </KPICard>

        <KPICard $type="medium" $count={kpiData.mediumRiskAlerts}>
          <div className="kpi-top">
            <span className="label">Atenção</span>
            <span className="kpi-icon">🟡</span>
          </div>
          <span className="value">{kpiData.mediumRiskAlerts}</span>
          <span className="description">
            {kpiData.mediumRiskAlerts > 0
              ? "Risco moderado"
              : "Sem risco moderado"}
          </span>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(kpiData.mediumRiskAlerts / kpiData.totalCities) * 100}%`,
              }}
            />
          </div>
        </KPICard>

        <KPICard $type="avg">
          <div className="kpi-top">
            <span className="label">Chuva Média 24h</span>
            <span className="kpi-icon">💧</span>
          </div>
          <span className="value">{kpiData.avgRainfall}%</span>
          <span className="description">Acumulado médio nas cidades</span>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${kpiData.avgRainfall}%` }}
            />
          </div>
        </KPICard>
      </KPIGrid>

      <DashboardGrid>
        <MapView cities={cities} />
        <NotificationPanel cities={cities} />
      </DashboardGrid>
      <Card>
        <SimulatedSection>
          <SectionHeader>Detalhes de Cada Localidade</SectionHeader>

          <DataGrid>
            {cities.map((city) => {
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
                    <span className="value">{city.chuva24h ?? 0}%</span>
                  </div>

                  <div className="data-row">
                    <span className="label">🌊 Nível do rio</span>
                    <span className="value">{city.nivelRio ?? 0}</span>
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

export default DashboardPage;
