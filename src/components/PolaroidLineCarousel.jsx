import { useState } from 'react'
import { X } from 'lucide-react'

const months = [
  'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro',
  'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro',
]

const dates = [
  '15/11/2025', '15/12/2025', '15/01/2026', '15/02/2026',
  '15/03/2026', '15/04/2026', '15/05/2026', '15/06/2026',
  '15/07/2026', '15/08/2026', '15/09/2026', '15/10/2026',
]

export default function PolaroidLineCarousel({ slides }) {
  const [focused, setFocused] = useState(null)

  function photoFrame(slide, index) {
    const classes = 'memory-photo-frame'
      + (slide.wideFrame ? ' portrait-photo-frame' : '')
      + (slide.rotated ? ' rotated-photo-frame' : '')
      + (slide.reverseRotation ? ' reverse-photo-frame' : '')
    return (
      <div className={classes}>
        <img src={slide.src} alt={'Fotografia de ' + months[index]} draggable="false" />
      </div>
    )
  }

  return (
    <section className="memory-gallery" aria-label="Memórias do nosso relacionamento">
      <header className="memory-heading">
        <div className="memory-title-wrap">
          <span className="memory-rays" aria-hidden="true">⌁</span>
          <h1>Memórias <span aria-hidden="true">♡</span></h1>
          <span className="memory-rays memory-rays-right" aria-hidden="true">⌁</span>
        </div>
        <p>12 meses, 12 capítulos, uma história linda... <span aria-hidden="true">♡</span></p>
      </header>

      <div className="memory-doodle memory-doodle-left" aria-hidden="true">♡</div>
      <div className="memory-doodle memory-doodle-right" aria-hidden="true">♡</div>
      <div className="memory-spark memory-spark-one" aria-hidden="true">✧</div>
      <div className="memory-spark memory-spark-two" aria-hidden="true">✧</div>
      <div className="memory-spark memory-spark-three" aria-hidden="true">✧</div>

      <div className="memory-grid">
        {slides.map((slide, index) => (
          <button
            className="memory-polaroid"
            type="button"
            key={slide.src}
            onClick={() => setFocused(index)}
            aria-label={'Abrir memória de ' + months[index] + ', ' + dates[index]}
          >
            <span className="memory-tape" aria-hidden="true" />
            {photoFrame(slide, index)}
            <span className="memory-date">{dates[index]} <span aria-hidden="true">♡</span></span>
          </button>
        ))}
      </div>

      <div className="memory-bottom-ornament" aria-hidden="true"><span />♡<span /></div>

      {focused !== null && (
        <div className="memory-lightbox" role="dialog" aria-modal="true" aria-label={'Memória de ' + months[focused]}>
          <button className="memory-close" type="button" onClick={() => setFocused(null)} aria-label="Fechar"><X size={21} /></button>
          <button className="memory-lightbox-photo" type="button" onClick={() => setFocused(null)} aria-label="Voltar à galeria">{photoFrame(slides[focused], focused)}</button>
          <div className="memory-lightbox-copy">
            <span>{months[focused]} · {dates[focused]}</span>
            <p key={focused} className="memory-fade-up">{slides[focused].caption}</p>
            <small>toque na fotografia para fechar</small>
          </div>
        </div>
      )}
    </section>
  )
}
