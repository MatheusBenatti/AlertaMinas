import {
  PageSection,
  HeroCard,
  HeroIcon,
  HeroContent,
  HeroBadge,
  InfoGrid,
  InfoCard,
  FeatureRow,
  FeatureChip,
} from '../styles/HomePage.styles';

function HomePage() {
  return (
    <PageSection>
      <HeroCard>
        <HeroIcon>🌊</HeroIcon>
        <HeroContent>
          <p className="eyebrow">Sistema de Monitoramento Hídrico</p>
          <h2>Monitor de Enchentes — Minas Gerais</h2>
          <p>
            Dashboard responsivo com dados meteorológicos reais, simulação de alertas e visualização
            de risco para apoio à tomada de decisão em situações de enchente.
          </p>
        </HeroContent>
        <HeroBadge>
          <span className="badge-num">4</span>
          <span className="badge-label">Municípios
Monitorados</span>
        </HeroBadge>
      </HeroCard>

      <InfoGrid>
        <InfoCard $kind="problema">
          <p className="eyebrow">⚠ Problema</p>
          <h3>Por que a resposta precisa ser mais rápida?</h3>
          <p>
            Chuvas intensas, rios em elevação e comunicação tardia aumentam o risco para
            comunidades em Minas Gerais. O desafio é transformar dados em visão clara e ágil
            para apoio à decisão.
          </p>
        </InfoCard>

        <InfoCard $kind="proposta">
          <p className="eyebrow">💡 Proposta</p>
          <h3>Uma solução visual e simulada</h3>
          <p>
            Combina clima real, simulação de nível do rio e alertas automáticos para mostrar
            cenários de risco em um mapa interativo com indicadores de severidade padronizados.
          </p>
        </InfoCard>

        <InfoCard $kind="impacto">
          <p className="eyebrow">✅ Impacto</p>
          <h3>Mais tempo para agir</h3>
          <p>
            Com indicadores simples e alertas claros, gestores e equipes de resposta podem
            priorizar áreas e planejar ações preventivas com antecedência.
          </p>
        </InfoCard>
      </InfoGrid>

      <FeatureRow>
        <FeatureChip><span className="chip-icon">🗺️</span> Mapa interativo em tempo real</FeatureChip>
        <FeatureChip><span className="chip-icon">📊</span> KPIs de risco por município</FeatureChip>
        <FeatureChip><span className="chip-icon">🔴</span> Alertas críticos automáticos</FeatureChip>
        <FeatureChip><span className="chip-icon">🌧️</span> Dados de chuva e nível do rio</FeatureChip>
        <FeatureChip><span className="chip-icon">🎨</span> Tema dark com cores semânticas</FeatureChip>
      </FeatureRow>
    </PageSection>
  );
}

export default HomePage;

 