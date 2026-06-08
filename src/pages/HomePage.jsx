import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

function HomePage() {
  return (
    <Stack spacing={3}>
      <Card sx={{ borderRadius: 4, backgroundColor: 'rgba(7,17,29,0.92)', border: '1px solid rgba(148,163,184,0.18)' }}>
        <CardContent>
          <Chip label="Protótipo React" color="info" sx={{ mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Monitor de Enchentes - Minas Gerais</Typography>
          <Typography color="text.secondary">Apresentação do projeto, problema, proposta e impacto em uma interface responsiva com tema dark.</Typography>
        </CardContent>
      </Card>

      <section className="page-grid">
        <article className="page-card wide-card">
          <p className="eyebrow">Problema</p>
          <h2>Por que a resposta precisa ser mais rápida?</h2>
          <p>Chuvas intensas, rios em elevação e comunicação tardia aumentam o risco para comunidades em Minas Gerais. O desafio é transformar dados em uma visão clara e ágil para apoio à decisão.</p>
        </article>

        <article className="page-card">
          <p className="eyebrow">Proposta</p>
          <h3>Uma solução visual e simulada</h3>
          <p>Combina clima real, simulação de nível do rio e alertas automáticos para mostrar cenários de risco em um mapa interativo.</p>
        </article>

        <article className="page-card">
          <p className="eyebrow">Impacto</p>
          <h3>Mais tempo para agir</h3>
          <p>Com indicadores simples e alertas claros, gestores e equipes de resposta podem priorizar áreas e planejar ações preventivas.</p>
        </article>
      </section>
    </Stack>
  );
}

export default HomePage;
