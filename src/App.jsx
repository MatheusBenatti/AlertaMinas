import { NavLink, BrowserRouter, Route, Routes } from 'react-router-dom';
import AlertsPage from './pages/AlertsPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import { 
  AppContainer, 
  AppContent, 
  Header, 
  HeaderLeft, 
  HeaderIcon, 
  HeaderContent, 
  HeaderMeta, 
  LiveBadge, 
  StateBadge, 
  Nav, 
  NavDivider, 
  RoutesContainer 
} from './styles/App.styles';

function App() {
  return (
    <AppContainer>
      <AppContent>
        <BrowserRouter>
          <Header>
            <HeaderLeft>
              <HeaderIcon>🌊</HeaderIcon>
              <HeaderContent>
                <p className="eyebrow">Sistema de Monitoramento - Minas Gerais</p>
                <h1>AlertaMinas</h1>
                <p className="description">Monitoramento de risco de enchentes com dados em tempo real e simulação de cenários</p>
              </HeaderContent>
            </HeaderLeft>
            <HeaderMeta>
              <LiveBadge>
                <span className="dot"/>
                Ao vivo
              </LiveBadge>
              <StateBadge>MG · Brasil</StateBadge>
            </HeaderMeta>            
          </Header>

          <Nav>
            <NavLink to="/" end>Início</NavLink>
            <NavDivider />
            <NavLink to="/dashboard">Mapa</NavLink>
            <NavDivider />
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
