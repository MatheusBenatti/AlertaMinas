import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';
import MapView from '../components/MapView';
import NotificationPanel from '../components/NotificationPanel';
import { cities as initialCities } from '../data/mockCities';
import { getWeather } from '../services/weatherService';
import { calcularRisco } from '../utils/riskCalculator';

const PageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.article`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 18px;

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #38bdf8;
    font-size: 0.75rem;
    margin: 0 0 6px 0;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  p {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const KPICard = styled.div`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #38bdf8;
  }

  .value {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
    color: ${props => {
      if (props.$type === 'high' && props.$count > 0) return '#ef4444';
      if (props.$type === 'medium' && props.$count > 0) return '#fbbf24';
      if (props.$type === 'avg') return '#38bdf8';
      return '#9ca3af';
    }};
  }

  .description {
    font-size: 0.85rem;
    color: #cbd5e1;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

function DashboardPage() {
  const [cities, setCities] = useState(initialCities);

  const kpiData = useMemo(() => {
    const totalCities = cities.length;
    const highRiskAlerts = cities.filter(city => calcularRisco(city) === 'alto').length;
    const avgRainfall = cities.length > 0 
      ? Math.round(cities.reduce((sum, city) => sum + (city.chuva24h || 0), 0) / cities.length) 
      : 0;
    const mediumRiskAlerts = cities.filter(city => calcularRisco(city) === 'medio').length;

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
          source: clima.source,
        };
      })
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
        <p>Visualize municípios, risco estimado e alertas críticos em tempo real. Use a página "Alertas" para simular cenários.</p>
      </PageHeader>

      <KPIGrid>
        <KPICard>
          <span className="label">Municípios</span>
          <span className="value">{kpiData.totalCities}</span>
          <span className="description">Monitorados em tempo real</span>
        </KPICard>
        <KPICard $type="high" $count={kpiData.highRiskAlerts}>
          <span className="label">Alertas Críticos</span>
          <span className="value">{kpiData.highRiskAlerts}</span>
          <span className="description">{kpiData.highRiskAlerts > 0 ? 'Risco alto detectado' : 'Sem risco alto'}</span>
        </KPICard>
        <KPICard $type="medium" $count={kpiData.mediumRiskAlerts}>
          <span className="label">Atenção</span>
          <span className="value">{kpiData.mediumRiskAlerts}</span>
          <span className="description">{kpiData.mediumRiskAlerts > 0 ? 'Risco moderado' : 'Sem risco moderado'}</span>
        </KPICard>
        <KPICard $type="avg">
          <span className="label">Chuva Média (24h)</span>
          <span className="value">{kpiData.avgRainfall}%</span>
          <span className="description">Acumulado médio</span>
        </KPICard>
      </KPIGrid>

      <DashboardGrid>
        <MapView cities={cities} />
        <NotificationPanel cities={cities} />
      </DashboardGrid>
    </PageSection>
  );
}

export default DashboardPage;
