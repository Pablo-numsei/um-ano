import { useRef, useState } from 'react'
import { ArrowDown, ArrowUp, X } from 'lucide-react'

const months = [
  'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro',
  'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro',
]

export default function PolaroidLineCarousel({ slides }) {
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(null)
  const stageRef = useRef(null)

  function handleScroll(event) {
    const element = event.currentTarget
    const next = Math.round(element.scrollTop / element.clientHeight)
    setActive(Math.max(0, Math.min(slides.length - 1, next)))
  }

  function moveTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    stageRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(next)
  }

  function photoFrame(slide, index, extra = '') {
    return (
      <div className={`editorial-photo-frame ${slide.wideFrame ? 'portrait-photo-frame' : ''} ${slide.rotated ? 'rotated-photo-frame' : ''} ${slide.reverseRotation ? 'reverse-photo-frame' : ''} ${extra}`}>
        <img src={slide.src} alt={`Fotografia de ${months[index]}`} draggable="false" />
      </div>
    )
  }

  return (
    <section className="line-carousel editorial-gallery" aria-label="Galeria de recordações">
      <div className="editorial-stage" ref={stageRef} onScroll={handleScroll}>
        {slides.map((slide, index) => (
          <article className={`editorial-slide ${active === index ? 'is-current' : ''}`} key={slide.src}>
            <div className="editorial-month">
              <span className="editorial-rule" />
              <span className="editorial-month-name">{months[index] || `Mês ${index + 1}`}</span>
              <span className="editorial-month-number">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              <span className="editorial-rule" />
            </div>
            <button
              type="button"
              className={`editorial-photo-button photo-tilt-${index % 3}`}
              onClick={() => setFocused(index)}
              aria-label={`Destacar fotografia de ${months[index]}`}
            >
              {photoFrame(slide, index)}
              <span className="editorial-photo-hint">toque para revelar</span>
            </button>
          </article>
        ))}
      </div>

      <div className="editorial-scroll-controls" aria-label="Navegar pelas fotografias">
        <button type="button" onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label="Mês anterior"><ArrowUp size={16} /></button>
        <span>{months[active] || `Mês ${active + 1}`}</span>
        <button type="button" onClick={() => moveTo(active + 1)} disabled={active === slides.length - 1} aria-label="Próximo mês"><ArrowDown size={16} /></button>
      </div>

      {focused !== null && (
        <div className="editorial-focus" role="dialog" aria-modal="true" aria-label={`Recordação de ${months[focused]}`}>
          <div className="editorial-focus-copy">
            <span className="editorial-focus-kicker">UMA LEMBRANÇA · {String(focused + 1).padStart(2, '0')}</span>
            <h2>{months[focused]}</h2>
            <span className="editorial-focus-rule" />
            <p className="editorial-fade-up">{slides[focused].caption}</p>
            <small className="editorial-focus-hint">toque na fotografia para voltar</small>
          </div>
          <button
            type="button"
            className={`editorial-focus-photo photo-tilt-${focused % 3}`}
            onClick={() => setFocused(null)}
            aria-label="Fechar destaque e voltar à galeria"
          >
            {photoFrame(slides[focused], focused)}
          </button>
          <button type="button" className="editorial-focus-close" onClick={() => setFocused(null)} aria-label="Fechar destaque"><X size={18} /></button>
        </div>
      )}
    </section>
  )
}
