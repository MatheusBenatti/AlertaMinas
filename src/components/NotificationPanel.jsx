import { useEffect, useState } from 'react';
import { calcularRisco } from '../utils/riskCalculator';
import { loadSavedAlerts } from '../utils/alertStorage';
import {
  PanelCard,
  PanelHeader,
  CountBadge,
  PanelIntro,
  AlertsList,
  severityMap,
  AlertCard,
  EmptyState,
} from '../styles/NotificationPanel.styles';

function NotificationPanel({ cities }) {
  const [savedAlerts, setSavedAlerts] = useState([]);

  useEffect(() => {
    setSavedAlerts(loadSavedAlerts());
  }, []);

  const alertas = [
    ...cities.filter((city) => calcularRisco(city) === 'alto').map(c => ({ ...c, _kind: 'real' })),
    ...savedAlerts.map((alert) => ({ ...alert, simulated: true, _kind: 'simulated' })),
  ];

  return (
    <PanelCard>
      <PanelHeader>
        <h2>🚨 Alertas Críticos</h2>
        <CountBadge $count={alertas.length}>
          {alertas.length > 0 ? `${alertas.length} ativo${alertas.length > 1 ? 's' : ''}` : 'Tudo OK'}
        </CountBadge>
      </PanelHeader>
      <PanelIntro>Riscos elevados e cenários simulados em tempo real.</PanelIntro>

      {alertas.length === 0 ? (
        <EmptyState>
          <span className="empty-icon">✅</span>
          <strong>Nenhum alerta crítico no momento</strong>
          <span>Todos os municípios estão com risco sob controle.</span>
        </EmptyState>
      ) : (
        <AlertsList>
          {alertas.map((item, index) => {
            const kind = item._kind || (item.simulated ? 'simulated' : 'real');
            const chuvaPercent = Math.min(100, item.chuva24h);
            const rioPercent = Math.min(100, (item.nivelRio / 6) * 100);
            return (
              <AlertCard key={item.id || `${item.name}-${index}`} $kind={kind}>
                <div className="alert-header">
                  <h3>{item.name || item.cityName}</h3>
                  <span className="alert-badge">{kind === 'simulated' ? 'Simulado' : 'Crítico'}</span>
                </div>
                <div className="alert-metrics">
                  <div className="metric-row">
                    <span className="metric-label">Chuva 24h</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill" style={{ width: `${chuvaPercent}%` }} />
                    </div>
                    <span className="metric-value">{item.chuva24h}%</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Nível rio</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill" style={{ width: `${rioPercent}%` }} />
                    </div>
                    <span className="metric-value">{item.nivelRio.toFixed(1)} m</span>
                  </div>
                </div>
              </AlertCard>
            );
          })}
        </AlertsList>
      )}
    </PanelCard>
  );
}

export default NotificationPanel;
 