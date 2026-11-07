# MemoryBook

Álbum estático com 12 fotografias em Polaroid, na ordem enviada, uma por vez.

## Executar
1. Abra esta pasta no VS Code.
2. No terminal, execute `npm install`.
3. Execute `npm run dev`.
4. Abra o endereço local indicado pelo Vite.

## Personalizar
As imagens ficam em `public/photos/` e as frases correspondentes ficam no array `photos`, no início de `src/App.jsx`.

A ordem é fixa: `foto-01.jpg` até `foto-12.jpg`. Para trocar uma imagem, mantenha o mesmo nome. Para alterar uma frase, edite o campo `caption` correspondente.

O projeto não usa banco de dados nem backend. As imagens são arquivos estáticos incluídos no próprio projeto e serão publicadas junto com o site.

As transições mudam de direção conforme você avança ou volta. A preferência do navegador por movimento reduzido é respeitada.
