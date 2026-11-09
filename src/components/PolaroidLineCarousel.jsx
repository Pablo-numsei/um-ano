import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

const months = [
  'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro',
  'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Novembro',
]

export default function PolaroidLineCarousel({ slides }) {
  const [active, setActive] = useState(0)
  const [focused, setFocused] = useState(null)
  const wheelRef = useRef(null)
  const touchStart = useRef(null)

  function moveTo(index) {
    const next = (index + slides.length) % slides.length
    setActive(next)
  }

  useEffect(() => {
    const wheel = wheelRef.current
    if (!wheel) return
    wheel.style.setProperty('--wheel-angle', `${-active * (360 / slides.length)}deg`)
  }, [active, slides.length])

  function handleWheel(event) {
    event.preventDefault()
    if (Math.abs(event.deltaY) < 8) return
    moveTo(active + (event.deltaY > 0 ? 1 : -1))
  }

  function handleTouchStart(event) {
    touchStart.current = event.touches[0].clientY
  }

  function handleTouchEnd(event) {
    if (touchStart.current === null) return
    const delta = touchStart.current - event.changedTouches[0].clientY
    if (Math.abs(delta) > 28) moveTo(active + (delta > 0 ? 1 : -1))
    touchStart.current = null
  }

  function photoFrame(slide, index) {
    const classes = 'wheel-photo-frame'
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
    <section className="reference-gallery wheel-gallery" aria-label="Roleta de fotografias">
      <div
        className="wheel-viewport"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="wheel-orbit" ref={wheelRef}>
          {slides.map((slide, index) => {
            const angle = (360 / slides.length) * index
            const distance = Math.min(Math.abs(index - active), slides.length - Math.abs(index - active))
            return (
              <button
                type="button"
                key={slide.src}
                className={'wheel-segment' + (index === active ? ' is-active' : '')}
                style={{ '--segment-angle': `${angle}deg`, '--segment-distance': distance }}
                onClick={() => index === active ? setFocused(index) : moveTo(index)}
                aria-label={index === active ? 'Abrir fotografia de ' + months[index] : 'Ir para ' + months[index]}
              >
                {photoFrame(slide, index)}
              </button>
            )
          })}
        </div>
        <div className="wheel-center" aria-hidden="true">
          <span className="wheel-center-line" />
          <span className="wheel-center-month">{months[active]}</span>
          <span className="wheel-center-count">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <span className="wheel-center-line" />
        </div>
      </div>

      <div className="wheel-controls">
        <button type="button" onClick={() => moveTo(active - 1)} aria-label="Fotografia anterior"><ChevronUp size={18} /></button>
        <span>ROLE PARA GIRAR</span>
        <button type="button" onClick={() => moveTo(active + 1)} aria-label="Próxima fotografia"><ChevronDown size={18} /></button>
      </div>

      {focused !== null && (
        <div className="reference-focus wheel-focus" role="dialog" aria-modal="true" aria-label={'Recordação de ' + months[focused]}>
          <div className="reference-focus-copy">
            <span className="reference-focus-kicker">UMA LEMBRANÇA · {String(focused + 1).padStart(2, '0')}</span>
            <h2>{months[focused]}</h2>
            <span className="reference-focus-rule" />
            <p key={focused} className="reference-fade-up">{slides[focused].caption}</p>
            <small>toque na fotografia para voltar à roleta</small>
          </div>
          <button type="button" className="reference-focus-photo" onClick={() => setFocused(null)} aria-label="Voltar à roleta">
            {photoFrame(slides[focused], focused)}
          </button>
          <button type="button" className="reference-focus-close" onClick={() => setFocused(null)} aria-label="Fechar"><X size={18} /></button>
        </div>
      )}
    </section>
  )
}
