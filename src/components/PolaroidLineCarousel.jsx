import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, CalendarDays, Camera } from 'lucide-react'

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
  const [activeMonth, setActiveMonth] = useState(0)
  const railRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

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

  function updateActiveMonth() {
    const rail = railRef.current
    if (!rail) return
    const cards = rail.querySelectorAll('.memory-polaroid')
    const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2
    let closest = 0
    let distance = Infinity

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const nextDistance = Math.abs(railCenter - center)
      if (nextDistance < distance) {
        closest = index
        distance = nextDistance
      }
    })

    setActiveMonth(closest)
  }

  function handlePointerDown(event) {
    // Touch uses the browser's native horizontal scrolling; mouse gets click-and-drag.
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const rail = railRef.current
    if (!rail) return
    drag.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
      moved: false,
    }
    rail.classList.add('is-dragging')
  }

  function handlePointerMove(event) {
    const state = drag.current
    const rail = railRef.current
    if (!state.active || !rail) return
    const delta = event.clientX - state.startX
    if (Math.abs(delta) > 5) state.moved = true
    if (state.moved) {
      rail.scrollLeft = state.scrollLeft - delta
    }
  }

  function handlePointerUp() {
    drag.current.active = false
    railRef.current?.classList.remove('is-dragging')
    window.setTimeout(() => { drag.current.moved = false }, 0)
  }

  function openPhoto(index) {
    if (drag.current.moved) return
    setFocused(index)
  }

  function moveToMonth(index) {
    const next = (index + slides.length) % slides.length
    setFocused(next)
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener('scroll', updateActiveMonth, { passive: true })
    updateActiveMonth()
    return () => rail.removeEventListener('scroll', updateActiveMonth)
  }, [slides.length])

  useEffect(() => {
    if (focused === null) return
    function onKeyDown(event) {
      if (event.key === 'Escape') setFocused(null)
      if (event.key === 'ArrowRight') setFocused((current) => (current + 1) % slides.length)
      if (event.key === 'ArrowLeft') setFocused((current) => (current + slides.length - 1) % slides.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [focused, slides.length])

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

      <div className="memory-rail-heading">
        <span className="memory-rail-rule" />
        <span className="memory-current-month">{months[activeMonth]} <i>·</i> {dates[activeMonth]}</span>
        <span className="memory-rail-rule" />
      </div>

      <div
        className="memory-rail-viewport"
        ref={railRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="memory-rail-track">
          <span className="memory-rail-wire" aria-hidden="true" />
          {slides.map((slide, index) => (
            <button
              className="memory-polaroid"
              type="button"
              key={slide.src}
              onClick={() => openPhoto(index)}
              aria-label={'Abrir memória de ' + months[index] + ', ' + dates[index]}
            >
              <span className="memory-hanging-thread" aria-hidden="true" />
              <span className="memory-tape" aria-hidden="true" />
              <span className="memory-polaroid-paper">
                {photoFrame(slide, index)}
                <span className="memory-date">{dates[index]} <span aria-hidden="true">♡</span></span>
              </span>
              <span className="memory-card-month">{months[index]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="memory-rail-footer">
        <span>{String(activeMonth + 1).padStart(2, '0')} <i>/</i> {String(slides.length).padStart(2, '0')}</span>
        <span className="memory-drag-hint">arraste para os lados <b>↔</b></span>
        <span className="memory-rail-progress"><i style={{ width: (((activeMonth + 1) / slides.length) * 100) + '%' }} /></span>
      </div>

      <div className="memory-bottom-ornament" aria-hidden="true"><span />♡<span /></div>

      {focused !== null && (
        <div className="memory-lightbox" role="dialog" aria-modal="true" aria-label={'Memória de ' + months[focused]}>
          <div className="memory-lightbox-panel">
            <button className="memory-close" type="button" onClick={() => setFocused(null)} aria-label="Fechar"><X size={21} /></button>
            <button className="memory-lightbox-nav memory-lightbox-prev" type="button" onClick={() => moveToMonth(focused - 1)} aria-label="Memória anterior"><ChevronLeft size={22} /></button>
            <button className="memory-lightbox-photo" type="button" onClick={() => setFocused(null)} aria-label="Voltar ao varal">
              <span className="memory-lightbox-tape" aria-hidden="true" />
              {photoFrame(slides[focused], focused)}
              <span className="memory-photo-corner" aria-hidden="true">♡</span>
            </button>
            <div className="memory-lightbox-copy">
              <span className="memory-lightbox-date"><CalendarDays size={15} /> {months[focused]} <i>·</i> {dates[focused]}</span>
              <span className="memory-lightbox-divider" />
              <p key={focused} className="memory-fade-up">{slides[focused].caption}</p>
              <span className="memory-lightbox-heart" aria-hidden="true">♡</span>
              <small><Camera size={14} /> toque na fotografia para voltar ao varal</small>
              <div className="memory-lightbox-progress" aria-label={'Memória ' + (focused + 1) + ' de ' + slides.length}>
                <span>{String(focused + 1).padStart(2, '0')}</span>
                <i><b style={{ width: ((focused + 1) / slides.length * 100) + '%' }} /></i>
                <span>{String(slides.length).padStart(2, '0')}</span>
              </div>
            </div>
            <button className="memory-lightbox-nav memory-lightbox-next" type="button" onClick={() => moveToMonth(focused + 1)} aria-label="Próxima memória"><ChevronRight size={22} /></button>
          </div>
        </div>
      )}
    </section>
  )
}
