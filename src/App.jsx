import styled from 'styled-components';
import { NavLink, BrowserRouter, Route, Routes } from 'react-router-dom';
import AlertsPage from './pages/AlertsPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';

const AppContainer = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  color: #eff6ff;
  background: linear-gradient(135deg, #07111d 0%, #10253c 45%, #08121d 100%);
  min-height: 100vh;
  padding: 24px;
`;

const AppContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.header`
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(7, 17, 29, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(8, 15, 24, 0.42);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  flex: 1;

  h1 {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    line-height: 1.1;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #38bdf8;
    font-size: 0.75rem;
    margin: 0 0 6px 0;
  }

  .description {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const Badge = styled.span`
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a {
    background: linear-gradient(135deg, #38bdf8 0%, #22d3ee 100%);
    color: #032136;
    padding: 10px 18px;
    border-radius: 999px;
    border: none;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(56, 189, 248, 0.3);
    }

    &.active {
      box-shadow: 0 10px 24px rgba(56, 189, 248, 0.4);
    }
  }
`;

const RoutesContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <AppContent>
        <BrowserRouter>
          <Header>
            <HeaderContent>
              <p className="eyebrow">Protótipo React + Styled Components</p>
              <h1>🌊 Monitor de Enchentes - Minas Gerais</h1>
              <p className="description">Dashboard responsivo com dados reais e simulação de alertas para monitoramento de risco de enchentes.</p>
            </HeaderContent>
            <Badge>Styled Components</Badge>
          </Header>

          <Nav>
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/dashboard">Mapa</NavLink>
            <NavLink to="/alertas">Alertas</NavLink>
          </Nav>

          <RoutesContainer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/alertas" element={<AlertsPage />} />
            </Routes>
          </RoutesContainer>
        </BrowserRouter>
      </AppContent>
    </AppContainer>
  );
}

export default App;
