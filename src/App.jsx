import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'

const photos = [
  { src: '/photos/foto-01.jpg', caption: 'Até nos dias mais comuns, você consegue ser a parte mais bonita deles.' },
  { src: '/photos/foto-02.jpg', caption: 'Tem algo no seu jeito que sempre faz meus olhos quererem ficar mais um pouquinho.' },
  { src: '/photos/foto-03.jpg', caption: 'Eu gosto de descobrir cada detalhe seu, até aqueles que você nem percebe.' },
  { src: '/photos/foto-04.jpg', rotated: true, caption: 'Seu sorriso tem esse costume bonito de deixar tudo um pouco melhor.' },
  { src: '/photos/foto-05.jpg', caption: 'Se eu pudesse guardar um pedacinho desse instante, escolheria guardar você nele.' },
  { src: '/photos/foto-06.jpg', rotated: true, caption: 'Mesmo quando o dia é simples, você continua sendo uma lembrança especial.' },
  { src: '/photos/foto-07.jpg', caption: 'Eu poderia olhar essa foto muitas vezes e ainda encontrar algo novo para gostar.' },
  { src: '/photos/foto-08.jpg', rotated: true, caption: 'Gosto de você assim: sendo você, sem precisar fazer mais nada.' },
  { src: '/photos/foto-09.jpg', rotated: true, caption: 'Esse sorriso merece aparecer em todas as minhas lembranças favoritas.' },
  { src: '/photos/foto-10.jpg', rotated: true, caption: 'Há momentos que passam depressa, mas ficam morando na memória.' },
  { src: '/photos/foto-11.jpg', caption: 'Entre tantas coisas bonitas que a vida pode mostrar, ainda gosto de voltar para esta imagem.' },
  { src: '/photos/foto-12.jpg', rotated: true, caption: 'E se este álbum tivesse que terminar, eu ainda escolheria continuar colecionando momentos com você.' },
]

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const current = photos[index]

  function goTo(nextIndex) {
    if (nextIndex < 0 || nextIndex >= photos.length || nextIndex === index) return
    setDirection(nextIndex > index ? 'next' : 'previous')
    setIndex(nextIndex)
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#"><Heart size={17} strokeWidth={1.7} /> memorybook</a>
        <span className="top-note">um ano de recordações</span>
      </header>

      <section className="intro">
        <span className="eyebrow">12 MESES · 12 FOTOGRAFIAS</span>
        <h1>Um ano de <em>você.</em></h1>
        <p>Pequenos instantes que, juntos, contam uma história inteira.</p>
        <div className="ornament"><span /> <Heart size={13} fill="currentColor" /> <span /></div>
      </section>

      <section className="album">
        <div className="album-heading">
          <span className="eyebrow">NOSSA LINHA DO TEMPO</span>
          <span className="counter">{String(index + 1).padStart(2, '0')} <i>/</i> 12</span>
        </div>

        <div className="stage">
          <div className="paper-shadow" />
          <article className={`polaroid ${direction}`} key={index}>
            <div className={`photo-frame${current.rotated ? " rotated" : ""}`}>
              <img src={current.src} alt={`Fotografia ${index + 1}`} />
            </div>
            <div className="polaroid-caption">
              <span className="month-label">RECORDAÇÃO {String(index + 1).padStart(2, '0')}</span>
              <div className="caption-script">{current.caption}</div>
              <span className="date-label">um pedacinho da nossa história</span>
            </div>
            <span className="tape" />
          </article>
          <span className="side-note">feito de momentos</span>
        </div>

        <div className="timeline-dots" aria-label="Selecionar fotografia">
          {photos.map((photo, i) => (
            <button key={photo.src} className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)} aria-label={`Abrir fotografia ${i + 1}`}
              aria-current={i === index ? 'step' : undefined} title={`Fotografia ${i + 1}`}>
              <span />
            </button>
          ))}
        </div>

        <div className="navigation">
          <button className="nav-button" onClick={() => goTo(index - 1)} disabled={index === 0}>
            <ArrowLeft size={17} /> Anterior
          </button>
          <span>{index + 1} de 12 lembranças</span>
          <button className="nav-button" onClick={() => goTo(index + 1)} disabled={index === photos.length - 1}>
            Próxima <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <footer>
        <span>feito para guardar o que importa</span>
        <Heart size={12} />
      </footer>
    </main>
  )
}
