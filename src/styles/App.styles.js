import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  color: #eff6ff;
  background: linear-gradient(135deg, #07111d 0%, #10253c 45%, #08121d 100%);
  min-height: 100vh;
  padding: 24px;
`;

export const AppContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.header`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.97), rgba(7, 17, 29, 0.99));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42), inset 0 1px 0 rgba(148, 163, 184, 0.06);
  padding: 22px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 18px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const HeaderIcon = styled.div`
  font-size: 2.2rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const HeaderContent = styled.div`
  flex: 1;

  h1 {
    font-size: 1.65rem;
    font-weight: 800;
    margin: 0 0 4px 0;
    line-height: 1.15;
    background: linear-gradient(90deg, #eff6ff 0%, #bae6fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #38bdf8;
    font-size: 0.7rem;
    font-weight: 700;
    margin: 0 0 5px 0;
  }

  .description {
    color: #94a3b8;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
`;

export const HeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.32);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #86efac;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    animation: ${pulseDot} 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
`;

export const StateBadge = styled.span`
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.28);
  color: #7dd3fc;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 4px 12px rgba(8, 15, 24, 0.32);
  padding: 10px 14px;
  align-items: center;

  a {
    color: #94a3b8;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #eff6ff;
      background: rgba(148, 163, 184, 0.08);
      border-color: rgba(148, 163, 184, 0.12);
    }

    &.active {
      color: #eff6ff;
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.28);
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    a { flex: 1; text-align: center; }
  }
`;

export const NavDivider = styled.span`
  width: 1px;
  height: 20px;
  background: rgba(148, 163, 184, 0.15);
  margin: 0 4px;
`;

export const RoutesContainer = styled.div`
  width: 100%;
`;
 