import styled from 'styled-components';
export { PageSection } from './shared.styles';


export const HeroCard = styled.article`
  background: linear-gradient(150deg, rgba(15,23,42,0.97) 0%, rgba(7,17,29,0.99) 100%);
  border: 1px solid rgba(148,163,184,0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8,15,24,0.42), inset 0 1px 0 rgba(148,163,184,0.06);
  padding: 32px 36px;
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px;
    text-align: center;
  }
`;

export const HeroIcon = styled.div`
  font-size: 3.5rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const HeroContent = styled.div`
  flex: 1;

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #38bdf8;
    font-size: 0.7rem;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0 0 10px 0;
    line-height: 1.2;
    background: linear-gradient(90deg, #eff6ff 0%, #bae6fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    max-width: 560px;
  }
`;

export const HeroBadge = styled.div`
  background: rgba(56,189,248,0.10);
  border: 1px solid rgba(56,189,248,0.25);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  .badge-num {
    font-size: 2rem;
    font-weight: 800;
    color: #38bdf8;
    line-height: 1;
  }

  .badge-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
    text-align: center;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const infoAccents = {
  problema: { color: '#ef4444', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.3)', left: '#ef4444' },
  proposta: { color: '#38bdf8', bg: 'rgba(56,189,248,0.07)', border: 'rgba(56,189,248,0.28)', left: '#38bdf8' },
  impacto:  { color: '#22c55e', bg: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.28)', left: '#22c55e' },
};

export const InfoCard = styled.article`
  background: ${props => infoAccents[props.$kind]?.bg || 'rgba(15,23,42,0.96)'};
  border: 1px solid ${props => infoAccents[props.$kind]?.border || 'rgba(148,163,184,0.18)'};
  border-left: 3px solid ${props => infoAccents[props.$kind]?.left || '#38bdf8'};
  border-radius: 18px;
  padding: 22px 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(8,15,24,0.4);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${props => infoAccents[props.$kind]?.color || '#38bdf8'};
    font-size: 0.68rem;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #eff6ff;
    line-height: 1.3;
  }

  p {
    color: #94a3b8;
    font-size: 0.875rem;
    line-height: 1.65;
    margin: 0;
  }
`;

export const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`;

export const FeatureChip = styled.div`
  background: rgba(15,23,42,0.8);
  border: 1px solid rgba(148,163,184,0.14);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #cbd5e1;
  font-weight: 500;

  .chip-icon { font-size: 1.2rem; }
`;
 