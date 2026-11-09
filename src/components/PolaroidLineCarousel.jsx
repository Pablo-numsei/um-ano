import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PolaroidLineCarousel({ slides }) {
  const [position, setPosition] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [flippingIndex, setFlippingIndex] = useState(null)
  const [flipVersion, setFlipVersion] = useState(0)
  const drag = useRef(null)
  const active = Math.round(position)
  const spacing = 205

  function goTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    if (next === active) return
    setPosition(next)
    setFlippingIndex(next)
    setFlipVersion((version) => version + 1)
  }

  function onPointerDown(event) {
    if (event.target.closest('button')) return
    drag.current = { x: event.clientX, start: position, startIndex: active, moved: false }
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event) {
    if (!drag.current) return
    const delta = event.clientX - drag.current.x
    if (Math.abs(delta) > 4) drag.current.moved = true
    if (drag.current.moved) {
      const next = drag.current.start - delta / spacing
      setPosition(Math.max(-0.22, Math.min(slides.length - 0.78, next)))
    }
  }

  function onPointerUp() {
    if (!drag.current) return
    const moved = drag.current.moved
    const startIndex = drag.current.startIndex
    drag.current = null
    setDragging(false)
    if (moved) {
      const next = Math.max(0, Math.min(slides.length - 1, Math.round(position)))
      if (next !== startIndex) {
        setFlippingIndex(next)
        setFlipVersion((version) => version + 1)
      }
      setPosition(next)
    }
  }

  return (
    <section className="line-carousel" aria-label="Linha do tempo de fotografias">
      <div
        className={`line-stage ${dragging ? "is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg className="hanging-line" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 76 Q500 160 1000 76" />
        </svg>
        {slides.map((slide, index) => {
          const distance = index - position
          const x = `calc(50% + ${distance * spacing}px)`
          const y = 76 + 42 * Math.max(0, 1 - Math.pow(distance * spacing / 500, 2))
          const rotation = Math.max(-9, Math.min(9, distance * 3.2))
          const isActive = index === active
          const isFlipping = index === flippingIndex
          return (
            <article
              key={slide.src}
              className={`hanging-polaroid ${slide.wideFrame ? 'portrait-print' : ''} ${slide.rotated ? 'sideways-print' : ''} ${isActive ? 'is-active' : ''}`}
              style={{
                left: x,
                top: y + 4,
                zIndex: 100 - Math.round(Math.abs(distance) * 3),
                transform: `translateX(-50%) rotate(${rotation}deg) scale(${isActive ? 1 : 0.88})`,
                opacity: Math.abs(distance) > 2.5 ? 0 : 1,
                pointerEvents: Math.abs(distance) > 2.5 ? 'none' : 'auto',
              }}
              onClick={() => goTo(index)}
              aria-label={`Mostrar recordação ${index + 1}`}
            >
              <span className="hanging-peg" />
              <div
                key={isFlipping ? flipVersion : 'static'}
                className={`hanging-print ${isFlipping ? 'is-flipping' : ''}`}
                onAnimationEnd={() => {
                  if (isFlipping) setFlippingIndex(null)
                }}
              >
                <div className={`hanging-photo ${slide.wideFrame ? 'portrait-photo-frame' : ''} ${slide.rotated ? 'rotated-photo-frame' : ''} ${slide.reverseRotation ? 'reverse-photo-frame' : ''}`}>
                  <img src={slide.src} alt={`Fotografia ${index + 1}`} draggable="false" />
                </div>
                <div className="hanging-caption">
                  <span className="hanging-label">RECORDAÇÃO {String(index + 1).padStart(2, '0')}</span>
                  <p>{slide.caption}</p>
                  <small>um pedacinho da nossa história</small>
                </div>
              </div>
            </article>
          )
        })}
        <div className="line-controls">
          <span className="line-count">{String(active + 1).padStart(2, '0')} <i>/</i> {String(slides.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Fotografia anterior" onClick={() => goTo(active - 1)} disabled={active === 0}><ArrowLeft size={17} /></button>
          <button type="button" aria-label="Próxima fotografia" onClick={() => goTo(active + 1)} disabled={active === slides.length - 1}><ArrowRight size={17} /></button>
        </div>
      </div>
      <div className="line-dots" aria-label="Selecionar recordação">
        {slides.map((slide, index) => (
          <button key={slide.src} type="button" className={index === active ? 'active' : ''} onClick={() => goTo(index)} aria-label={`Abrir recordação ${index + 1}`} />
        ))}
      </div>
      <p className="line-hint">arraste a linha ou use as setas para passear pelas lembranças</p>
    </section>
  )
}
