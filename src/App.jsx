import PolaroidLineCarousel from './components/PolaroidLineCarousel.jsx'

const photos = [
  { src: '/photos/foto-01.jpg', wideFrame: true, caption: 'Até nos dias mais comuns, você consegue ser a parte mais bonita deles.' },
  { src: '/photos/foto-02.jpg', wideFrame: true, caption: 'Tem algo no seu jeito que sempre faz meus olhos quererem ficar mais um pouquinho.' },
  { src: '/photos/foto-03.jpg', wideFrame: true, caption: 'Eu gosto de descobrir cada detalhe seu, até aqueles que você nem percebe.' },
  { src: '/photos/foto-04.jpg', rotated: true, reverseRotation: true, caption: 'Seu sorriso tem esse costume bonito de deixar tudo um pouco melhor.' },
  { src: '/photos/foto-05.jpg', wideFrame: true, caption: 'Se eu pudesse guardar um pedacinho desse instante, escolheria guardar você nele.' },
  { src: '/photos/foto-06.jpg', rotated: true, caption: 'Mesmo quando o dia é simples, você continua sendo uma lembrança especial.' },
  { src: '/photos/foto-07.jpg', wideFrame: true, caption: 'Eu poderia olhar essa foto muitas vezes e ainda encontrar algo novo para gostar.' },
  { src: '/photos/foto-08.jpg', rotated: true, caption: 'Gosto de você assim: sendo você, sem precisar fazer mais nada.' },
  { src: '/photos/foto-09.jpg', rotated: true, caption: 'Esse sorriso merece aparecer em todas as minhas lembranças favoritas.' },
  { src: '/photos/foto-10.jpg', rotated: true, caption: 'Há momentos que passam depressa, mas ficam morando na memória.' },
  { src: '/photos/foto-11.jpg', wideFrame: true, caption: 'Entre tantas coisas bonitas que a vida pode mostrar, ainda gosto de voltar para esta imagem.' },
  { src: '/photos/foto-12.jpg', rotated: true, caption: 'E se este álbum tivesse que terminar, eu ainda escolheria continuar colecionando momentos com você.' },
]

export default function App() {
  return <main className="reference-page"><PolaroidLineCarousel slides={photos} /></main>
}
