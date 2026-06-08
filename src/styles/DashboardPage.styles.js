import styled from 'styled-components';
export { PageSection } from './shared.styles';

export const PageHeader = styled.article`
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

export const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const kpiAccent = {
  total:   { color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',   border: 'rgba(56,189,248,0.3)' },
  high:    { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.35)' },
  medium:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',   border: 'rgba(251,191,36,0.35)' },
  avg:     { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.3)' },
};

export const KPICard = styled.div`
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.97), rgba(7, 17, 29, 0.99));
  border: 1px solid ${props => kpiAccent[props.$type]?.border || 'rgba(148,163,184,0.18)'};
  border-top: 3px solid ${props => kpiAccent[props.$type]?.color || '#38bdf8'};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(8, 15, 24, 0.38);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(8, 15, 24, 0.48);
  }

  .kpi-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .kpi-icon {
    font-size: 1.4rem;
    line-height: 1;
    opacity: 0.85;
  }

  .label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${props => kpiAccent[props.$type]?.color || '#38bdf8'};
    margin-bottom: 2px;
  }

  .value {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1;
    color: ${props => {
      const base = kpiAccent[props.$type]?.color || '#eff6ff';
      if (props.$type === 'high' && props.$count === 0) return '#9ca3af';
      if (props.$type === 'medium' && props.$count === 0) return '#9ca3af';
      return base;
    }};
    letter-spacing: -0.02em;
  }

  .description {
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 2px;
  }

  .progress-bar-track {
    width: 100%;
    height: 4px;
    background: rgba(148,163,184,0.10);
    border-radius: 999px;
    overflow: hidden;
    margin-top: 8px;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 999px;
    background: ${props => kpiAccent[props.$type]?.color || '#38bdf8'};
    transition: width 0.8s ease;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
 