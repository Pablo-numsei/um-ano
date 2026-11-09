import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

const months = ['Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Novembro']

export default function PolaroidLineCarousel({ slides }) {
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(null)
  const stageRef = useRef(null)

  function handleScroll(event) {
    const element = event.currentTarget
    const center = element.scrollTop + element.clientHeight / 2
    let nearest = 0
    let distance = Number.POSITIVE_INFINITY
    Array.from(element.children).forEach((child, index) => {
      const childCenter = child.offsetTop + child.offsetHeight / 2
      const currentDistance = Math.abs(center - childCenter)
      if (currentDistance < distance) {
        nearest = index
        distance = currentDistance
      }
    })
    setActive(nearest)
  }

  function moveTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    stageRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(next)
  }

  function photoFrame(slide, index) {
    return (
      <div className={\`reference-photo-frame \${slide.wideFrame ? 'portrait-photo-frame' : ''} \${slide.rotated ? 'rotated-photo-frame' : ''} \${slide.reverseRotation ? 'reverse-photo-frame' : ''}\`}>
        <img src={slide.src} alt={\`Fotografia de \${months[index]}\`} draggable="false" />
      </div>
    )
  }

  return (
    <section className="reference-gallery" aria-label="Linha do tempo de recordações">
      <div className="reference-stage" ref={stageRef} onScroll={handleScroll}>
        {slides.map((slide, index) => (
          <article className={\`reference-slide reference-tilt-\${index % 3}\`} key={slide.src}>
            <button type="button" className="reference-photo-button" onClick={() => setFocused(index)} aria-label={\`Ampliar fotografia de \${months[index]}\`}>
              {photoFrame(slide, index)}
              <span className="reference-photo-index">{String(index + 1).padStart(2, '0')}</span>
            </button>
          </article>
        ))}
      </div>

      <aside className="reference-year-panel" aria-live="polite">
        <span className="reference-year-line" />
        <span className="reference-month">{months[active] || 'Novembro'}</span>
        <span className="reference-month-count">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <span className="reference-year-line" />
      </aside>

      <div className="reference-scroll-controls" aria-label="Navegar pelas fotografias">
        <button type="button" onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label="Fotografia anterior"><ChevronUp size={17} /></button>
        <button type="button" onClick={() => moveTo(active + 1)} disabled={active === slides.length - 1} aria-label="Próxima fotografia"><ChevronDown size={17} /></button>
      </div>

      {focused !== null && (
        <div className="reference-focus" role="dialog" aria-modal="true" aria-label={\`Recordação de \${months[focused]}\`}>
          <div className="reference-focus-copy">
            <span className="reference-focus-kicker">UMA LEMBRANÇA · {String(focused + 1).padStart(2, '0')}</span>
            <h2>{months[focused]}</h2>
            <span className="reference-focus-rule" />
            <p key={focused} className="reference-fade-up">{slides[focused].caption}</p>
            <small>toque na fotografia para voltar</small>
          </div>
          <button type="button" className={\`reference-focus-photo reference-tilt-\${focused % 3}\`} onClick={() => setFocused(null)} aria-label="Voltar à galeria">
            {photoFrame(slides[focused], focused)}
          </button>
          <button type="button" className="reference-focus-close" onClick={() => setFocused(null)} aria-label="Fechar"><X size={18} /></button>
        </div>
      )}
    </section>
  )
}
