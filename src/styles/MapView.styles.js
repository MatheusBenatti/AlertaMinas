import styled from 'styled-components';

export const MapCard = styled.section`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 0;
  position: relative;
  overflow: hidden;
  height: 520px;
`;

export const MapHeaderOverlay = styled.div`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(7, 17, 29, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 999px;
  padding: 5px 16px;
  z-index: 1000;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #94a3b8;
  white-space: nowrap;

  span.count {
    color: #38bdf8;
    font-weight: 700;
  }
`;

export const LegendOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(7, 17, 29, 0.90);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  padding: 14px 16px;
  z-index: 1000;
  min-width: 180px;
  backdrop-filter: blur(10px);

  h3 {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #38bdf8;
    margin: 0 0 10px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.82rem;
    color: #cbd5e1;

    .dot {
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dot.low    { width: 10px; height: 10px; background: #22c55e; box-shadow: 0 0 5px rgba(34,197,94,0.5); }
    .dot.medium { width: 12px; height: 12px; background: #fbbf24; box-shadow: 0 0 5px rgba(251,191,36,0.5); }
    .dot.high   { width: 14px; height: 14px; background: #ef4444; box-shadow: 0 0 7px rgba(239,68,68,0.6); }
  }

  .legend-threshold {
    font-size: 0.7rem;
    color: #475569;
    margin-left: auto;
  }

  .legend-divider {
    height: 1px;
    background: rgba(148,163,184,0.10);
    margin: 8px 0 6px;
  }

  .legend-note {
    font-size: 0.68rem;
    color: #475569;
    line-height: 1.4;
  }
`;

export const PlaceholderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #cbd5e1;
  font-size: 1rem;
  text-align: center;
  flex-direction: column;
  gap: 10px;
`;

export const riskMeta = {
  alto:  { color: '#ef4444', label: 'ALTO',   emoji: '🔴', textColor: '#fff' },
  medio: { color: '#fbbf24', label: 'MÉDIO',  emoji: '🟡', textColor: '#0f172a' },
  baixo: { color: '#22c55e', label: 'BAIXO',  emoji: '🟢', textColor: '#0f172a' },
};
 