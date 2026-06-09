const API_KEY = '4eada889bfedcb20b619e421fd6718f3';

export async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeather respondeu com status ${response.status}`);
    }

    const data = await response.json();
    return {
      chuva: data.rain?.['1h'] || 0,
      temperatura: data.main?.temp ?? 0,
      umidade: data.main?.humidity ?? 0,
      nivelRio: Math.min(5, chuva * 0.5),
      source: 'OpenWeather',
      status: 'Dados reais do OpenWeather carregados com sucesso.',
    };
  } catch (error) {
    const fallbackChuva = Math.abs(Math.round((lat + lon) * 12)) % 30;
    const fallbackTemperatura = 20 + Math.abs(Math.round((lat + lon) * 2)) % 8;

    return {
      chuva: fallbackChuva,
      temperatura: fallbackTemperatura,
      source: 'fallback-local',
      status: 'OpenWeather indisponível no momento; usando fallback local para manter o protótipo funcional.',
    };
  }
}
