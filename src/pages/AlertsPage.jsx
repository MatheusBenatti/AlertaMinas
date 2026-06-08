import styled from 'styled-components';
import { useMemo } from 'react';
import { calcularRisco } from '../utils/riskCalculator';
import MapView from '../components/MapView';
import NotificationPanel from '../components/NotificationPanel';

const PageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.article`
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

  .description {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #38bdf8;
  }

  select {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: #eff6ff;
    padding: 12px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-family: 'Inter', Arial, sans-serif;

    option {
      background: #0f172a;
      color: #eff6ff;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border: none;
  color: #1f2937;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(251, 191, 36, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScenarioChips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 12px 0;
`;

const Chip = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'rgba(30, 41, 59, 0.8)'};
  border: 1px solid ${props => props.$active ? 'rgba(251, 191, 36, 0.5)' : 'rgba(148, 163, 184, 0.16)'};
  color: ${props => props.$active ? '#1f2937' : '#dbeafe'};
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(251, 191, 36, 0.35);
  }
`;

const AlertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
  margin-top: 12px;
`;

const AlertCard = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(15, 23, 42, 0.92));
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 14px;
  padding: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.15);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;

    h3 {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      color: #eff6ff;
    }

    span {
      background: #ef4444;
      color: #fff;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .data {
    display: flex;
    gap: 10px;
    font-size: 0.9rem;
    color: #dbeafe;

    span {
      font-weight: 500;

      strong {
        color: #eff6ff;
        font-weight: 700;
      }
    }
  }
`;

const MessageBox = styled.div`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.02));
  border: 1px solid rgba(34, 197, 94, 0.35);
  border-radius: 12px;
  padding: 12px;
  color: #86efac;
  font-size: 0.9rem;
  margin-top: 12px;
`;

const EmptyState = styled.div`
  color: #cbd5e1;
  padding: 24px;
  text-align: center;
  font-size: 0.95rem;
`;

const SimulatedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #eff6ff;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fbbf24;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 12px;
`;

const SimulatedDashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const DataCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.92));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  padding: 14px;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(148, 163, 184, 0.35);
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.98));
  }

  .city-name {
    font-weight: 700;
    color: #eff6ff;
    margin-bottom: 8px;
    font-size: 1rem;
  }

  .data-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 0.9rem;
    color: #dbeafe;

    .label {
      color: #cbd5e1;
      font-weight: 500;
    }

    .value {
      color: #eff6ff;
      font-weight: 700;
    }
  }

  .risk-badge {
    display: inline-block;
    margin-top: 10px;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .risk-badge.alto {
    background: #ef4444;
    color: #fff;
  }

  .risk-badge.medio {
    background: #fbbf24;
    color: #0f172a;
  }

  .risk-badge.baixo {
    background: #22c55e;
    color: #0f172a;
  }
`;

const scenarios = [
  { id: 'normal', label: 'Normal', description: 'Chuva leve e nível do rio estável.', chuva: 18, rio: 1.8 },
  { id: 'chuva', label: 'Chuva Intensa', description: 'Acúmulo de chuva acima da média.', chuva: 68, rio: 2.9 },
  { id: 'enchente', label: 'Risco de Enchente', description: 'Chuvas fortes com rios em elevação.', chuva: 82, rio: 4.4 },
  { id: 'tempestade', label: 'Tempestade', description: 'Fenômeno extremo com alerta máximo.', chuva: 95, rio: 5.1 },
  { id: 'calamidade', label: 'Calamidade', description: 'Estado crítico em múltiplas regiões.', chuva: 98, rio: 5.8 },
];

function AlertsPage() {
  // Dados mocados com cada cidade em uma situação diferente
  const allSimulatedData = useMemo(() => {
    return [
      { // Alto risco
        id: `city-1-demo`,
        name: 'Belo Horizonte',
        coords: [-19.92, -43.94],
        chuva24h: 85,
        nivelRio: 4.2,
        source: 'simulado',
        simulated: true,
      },
      { // Médio risco
        id: `city-2-demo`,
        name: 'Uberlândia',
        coords: [-18.91, -48.27],
        chuva24h: 45,
        nivelRio: 2.1,
        source: 'simulado',
        simulated: true,
      },
      { // Baixo risco
        id: `city-3-demo`,
        name: 'Juiz de Fora',
        coords: [-21.76, -43.35],
        chuva24h: 15,
        nivelRio: 1.8,
        source: 'simulado',
        simulated: true,
      },
      { // Alto risco
        id: `city-4-demo`,
        name: 'Montes Claros',
        coords: [-16.72, -43.86],
        chuva24h: 78,
        nivelRio: 3.8,
        source: 'simulado',
        simulated: true,
      },
    ];
  }, []);

  // Apenas alertas ALTOS (para o painel de alertas)
  const simulatedAlerts = useMemo(() => {
    return allSimulatedData.filter((city) => calcularRisco(city) === 'alto');
  }, [allSimulatedData]);

  return (
    <PageSection>
      <Card>
        <p className="eyebrow">Demonstração de Alertas</p>
        <h2>Visualização de Diferentes Níveis de Risco</h2>
        <p className="description">
          Abaixo está um exemplo de monitoramento em tempo real com múltiplas cidades em diferentes situações. 
          Cada marcador no mapa representa o nível de risco atual: <strong>🔴 Alto</strong>, <strong>🟡 Médio</strong> e <strong>🟢 Baixo</strong>.
        </p>
      </Card>

      <Card>
        <SimulatedSection>
          <SectionHeader>📊 Mapa de Monitoramento com Dados Simulados</SectionHeader>
          
          <SimulatedDashboardGrid>
            <MapView cities={allSimulatedData} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <NotificationPanel cities={simulatedAlerts} />
            </div>
          </SimulatedDashboardGrid>
        </SimulatedSection>
      </Card>

      <Card>
        <SimulatedSection>
          <SectionHeader>📋 Detalhes de Cada Localidade</SectionHeader>
          <DataGrid>
            {allSimulatedData.map((city) => {
              const risk = calcularRisco(city);
              return (
                <DataCard key={city.id}>
                  <div className="city-name">{city.name}</div>
                  <div className="data-row">
                    <span className="label">💧 Chuva 24h:</span>
                    <span className="value">{city.chuva24h}%</span>
                  </div>
                  <div className="data-row">
                    <span className="label">🌊 Nível do rio:</span>
                    <span className="value">{city.nivelRio.toFixed(1)} m</span>
                  </div>
                  <div>
                    <span className={`risk-badge ${risk}`}>
                      {risk === 'alto' ? '🔴 Alto' : risk === 'medio' ? '🟡 Médio' : '🟢 Baixo'}
                    </span>
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
