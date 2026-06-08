import styled from 'styled-components';

export const PanelCard = styled.aside`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 520px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;

  h2 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    color: #eff6ff;
  }
`;

export const CountBadge = styled.span`
  background: ${props => props.$count > 0 ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.12)'};
  border: 1px solid ${props => props.$count > 0 ? 'rgba(239,68,68,0.38)' : 'rgba(34,197,94,0.28)'};
  color: ${props => props.$count > 0 ? '#fca5a5' : '#86efac'};
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const PanelIntro = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  margin: 0 0 14px 0;
`;

export const AlertsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 6px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: rgba(148,163,184,0.06); border-radius: 2px; }
  &::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.28); border-radius: 2px; }
  &::-webkit-scrollbar-thumb:hover { background: rgba(56,189,248,0.48); }
`;

export const severityMap = {
  real:      { accent: '#ef4444', bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.32)',   labelBg: '#ef4444',  labelColor: '#fff' },
  simulated: { accent: '#fbbf24', bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.32)',  labelBg: '#fbbf24',  labelColor: '#0f172a' },
};

export const AlertCard = styled.div`
  background: ${props => severityMap[props.$kind].bg};
  border: 1px solid ${props => severityMap[props.$kind].border};
  border-left: 3px solid ${props => severityMap[props.$kind].accent};
  border-radius: 12px;
  padding: 12px 14px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateX(3px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  }

  .alert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    gap: 8px;

    h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0;
      color: #eff6ff;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .alert-badge {
    background: ${props => severityMap[props.$kind].labelBg};
    color: ${props => severityMap[props.$kind].labelColor};
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .alert-metrics {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .metric-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    color: #94a3b8;
    gap: 8px;

    .metric-label {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }

    .metric-value {
      font-weight: 700;
      color: #eff6ff;
    }

    .mini-bar-track {
      flex: 1;
      height: 3px;
      background: rgba(148,163,184,0.10);
      border-radius: 999px;
      overflow: hidden;
    }

    .mini-bar-fill {
      height: 100%;
      border-radius: 999px;
      background: ${props => severityMap[props.$kind]?.accent};
      opacity: 0.75;
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
  color: #64748b;
  font-size: 0.9rem;
  text-align: center;
  padding: 20px;

  .empty-icon {
    font-size: 2rem;
    opacity: 0.6;
  }

  strong {
    color: #86efac;
    font-size: 0.85rem;
  }
`;
 