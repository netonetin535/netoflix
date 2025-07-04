async function carregarJogos() {
  const res = await fetch('http://localhost:3000/api/jogos-hoje');
  const data = await res.json();

  const container = document.getElementById('jogos-container');
  const jogos = data.data || [];

  if (jogos.length === 0) {
    container.innerHTML = '<p>Nenhum jogo encontrado para hoje.</p>';
    return;
  }

  jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'card';

    const time1 = jogo.home.name;
    const time2 = jogo.away.name;
    const escudo1 = jogo.home.logo || '';
    const escudo2 = jogo.away.logo || '';
    const hora = jogo.time.starting_at.time;
    const dataJogo = new Date(jogo.time.starting_at.timestamp * 1000);
    const agora = new Date();
    const diffMs = dataJogo - agora;
    const diffMin = Math.floor(diffMs / 60000);

    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;
    const countdown = diffMin > 0 
      ? `${horas > 0 ? `${horas} hora${horas > 1 ? 's' : ''}, ` : ''}${minutos} minuto${minutos !== 1 ? 's' : ''}`
      : 'Em andamento ou encerrado';

    card.innerHTML = `
      <div class="teams">
        <img src="${escudo1}" alt="${time1}">
        <span class="vs">x</span>
        <img src="${escudo2}" alt="${time2}">
      </div>
      <h3>${time1} x ${time2}</h3>
      <p class="info">Assistir ${time1} x ${time2} AO VIVO Online<br>${jogo.time.starting_at.date}</p>
      <p class="info"><strong>${jogo.time.starting_at.date} • ${hora}</strong></p>
      <button class="btn">HOJE AINDA</button>
      <div class="countdown">${countdown}</div>
    `;

    container.appendChild(card);
  });
}

carregarJogos();
