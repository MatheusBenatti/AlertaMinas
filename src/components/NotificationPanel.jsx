import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { calcularRisco } from '../utils/riskCalculator';
import { loadSavedAlerts } from '../utils/alertStorage';

const PanelCard = styled.aside`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 18px;
  display: flex;
  flex-direction: column;
  height: 520px;

  h2 {
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: #eff6ff;
  }

  .panel-intro {
    font-size: 0.85rem;
    color: #cbd5e1;
    margin-bottom: 14px;
  }
`;

const AlertsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.08);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(56, 189, 248, 0.35);
    border-radius: 3px;

    &:hover {
      background: rgba(56, 189, 248, 0.55);
    }
  }
`;

const AlertCard = styled.div`
  background: linear-gradient(135deg, ${props => {
    if (props.$simulated) return 'rgba(251, 191, 36, 0.08)';
    return 'rgba(248, 113, 113, 0.08)';
  }}, rgba(15, 23, 42, 0.92));
  border: 1px solid ${props => {
    if (props.$simulated) return 'rgba(251, 191, 36, 0.35)';
    return 'rgba(248, 113, 113, 0.35)';
  }};
  border-radius: 14px;
  padding: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 16px ${props => {
      if (props.$simulated) return 'rgba(251, 191, 36, 0.15)';
      return 'rgba(248, 113, 113, 0.15)';
    }};
  }

  .alert-header {
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
  }

  .alert-badge {
    background: ${props => (props.$simulated ? '#fbbf24' : '#ef4444')};
    color: ${props => (props.$simulated ? '#1f2937' : '#fff')};
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .alert-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 0.9rem;
    color: #dbeafe;

    span {
      display: flex;
      align-items: center;
      gap: 4px;

      strong {
        color: #eff6ff;
        font-weight: 700;
      }
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #cbd5e1;
  font-size: 0.95rem;
  text-align: center;
  padding: 20px;
`;

function NotificationPanel({ cities }) {
  const [savedAlerts, setSavedAlerts] = useState([]);

  useEffect(() => {
    setSavedAlerts(loadSavedAlerts());
  }, []);

  const alertas = [
    ...cities.filter((city) => calcularRisco(city) === 'alto'),
    ...savedAlerts.map((alert) => ({ ...alert, simulated: true })),
  ];

  return (
    <PanelCard>
      <h2>Alertas Críticos</h2>
      <p className="panel-intro">Monitore riscos elevados e cenários simulados em tempo real.</p>

      {alertas.length === 0 ? (
        <EmptyState>
          <span>✓ Nenhum alerta crítico no momento</span>
        </EmptyState>
      ) : (
        <AlertsList>
          {alertas.map((item, index) => (
            <AlertCard key={item.id || `${item.name}-${index}`} $simulated={item.simulated}>
              <div className="alert-header">
                <h3>{item.name || item.cityName}</h3>
                <span className="alert-badge">{item.simulated ? 'Simulado' : 'Alto'}</span>
              </div>
              <div className="alert-data">
                <span>💧 <strong>{item.chuva24h}%</strong></span>
                <span>🌊 <strong>{item.nivelRio.toFixed(1)} m</strong></span>
              </div>
            </AlertCard>
          ))}
        </AlertsList>
      )}
    </PanelCard>
  );
}

export default NotificationPanel;
