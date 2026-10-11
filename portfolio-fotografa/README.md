# RAIO — Portfólio de Fotografia (Rap/Trap/Pop)

Portfólio "Dark Editorial & Raw Underground" construído em React + Vite + Tailwind,
com Framer Motion, Lenis (smooth scroll) e Radix UI (acessibilidade do lightbox).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura de pastas

```
src/
  components/
    layout/     -> Navbar, Footer, Marquee, CustomCursor (usados em toda página)
    sections/   -> Hero, Gallery, ArtistArchive, About, Contact (blocos da home)
    ui/         -> FilterTabs, PhotoCard, Lightbox (peças reutilizáveis da galeria)
  data/         -> photos.js, artists.js (mock — mesma forma do schema do CMS)
  lib/
    cms.js      -> camada de abstração: troque por Sanity/Supabase aqui
    useLenis.js -> hook do smooth scroll
```

## Design tokens

| Papel | Valor |
|---|---|
| Fundo principal | `#0A0A0A` (`bg-void`) |
| Fundo secundário | `#121212` (`bg-asphalt`) |
| Texto principal | `#EDEDED` (`text-bone`) |
| Texto secundário | `#888888` (`text-smoke`) |
| Acento — vermelho | `#E50914` (`text-blood`) |
| Acento — verde ácido | `#CCFF00` (`text-acid`) |
| Display | Syne (`font-display`) |
| Corpo | Space Grotesk (`font-body`) |
| Metadata / legendas | Space Mono (`font-mono`) |

O elemento de assinatura visual é a numeração de frame estilo folha de contato
35mm (`F.001`, `FRAME 01/05`) usada no hero e no hover dos cards da galeria —
referência direta ao processo analógico de seleção de fotos.

## Área reservada da fotógrafa (sem código, só ela acessa)

Diferente da versão anterior, **não existe mais nenhum botão de adicionar
foto visível para os visitantes do site**. O cadastro fica numa página
separada, protegida por senha:

1. Acesse `seusite.com/#admin` (tem um link discreto "Área da fotógrafa" no
   rodapé do site, ou basta digitar `#admin` no final do endereço).
2. Digite a senha (definida em `VITE_ADMIN_PASSWORD` no `.env` — veja
   `.env.example`; se não configurar, a senha padrão é `raio2026`, **troque
   antes de publicar o site**).
3. Formulário simples: escolher a foto, escrever o nome do artista,
   escolher a categoria e, se quiser, marcar "destacar na home" — esse
   destaque decide quais fotos aparecem no carrossel do topo do site.
4. Logo abaixo do formulário, uma lista mostra as fotos já adicionadas,
   cada uma com um botão para remover.

**Importante — limitação atual, dita de forma honesta:** duas coisas a
saber sobre essa área reservada:
- As fotos ficam salvas no `localStorage` *deste navegador*. Funcionam bem
  para testar e usar sempre do mesmo computador/celular, mas não aparecem
  para quem visita de outro aparelho, nem sobrevivem a limpar os dados do
  navegador.
- A senha fica dentro do código que roda no navegador (não há servidor
  verificando login). Isso barra visitantes casuais, mas não é segurança
  de verdade — alguém muito insistente, olhando o código-fonte da página,
  conseguiria descobrir a senha.

O próximo degrau — que resolve as duas coisas de uma vez — é ligar um CMS
de verdade (abaixo). Com o Sanity conectado, o cadastro de fotos passa a
ser feito direto no Studio dele, que tem login de verdade e salva num
servidor visível para todo mundo, em qualquer dispositivo.

## Conectando o CMS (sem código para a fotógrafa)

Toda a leitura de fotos passa por `src/lib/cms.js`. Ele já vem com o cliente
do Sanity pronto e configurado — assim que você preencher o `.env`, o site
troca sozinho do mock para os dados reais. Nenhum componente visual precisa
mudar.

### Opção A — Sanity.io Studio (recomendado, já pronto neste projeto)

**Passo 1 — Criar a conta e o projeto**
Acesse [sanity.io](https://www.sanity.io) e crie uma conta gratuita (dá pra
entrar com Google/GitHub). No painel, clique em "Create new project" e dê um
nome, por exemplo "Raio Fotografia".

**Passo 2 — Criar o Studio (o painel visual)**
Em qualquer pasta no seu computador, rode:
```bash
npm create sanity@latest -- --project-plan free --output-path raio-studio
```
Durante o assistente, escolha o projeto que você acabou de criar no passo 1,
o dataset padrão `production`, e o template "Clean project with no
predefined schemas".

**Passo 3 — Adicionar o schema de fotos**
Copie o arquivo `sanity-schema/photo.js` (incluso neste pacote) para dentro
de `raio-studio/schemaTypes/photo.js`. Depois edite
`raio-studio/schemaTypes/index.js` para incluir:
```js
import photo from './photo';
export const schemaTypes = [photo];
```

**Passo 4 — Rodar o Studio e cadastrar as primeiras fotos**
```bash
cd raio-studio
npm run dev
```
Abre em `http://localhost:3333`. Aqui a fotógrafa já consegue cadastrar,
editar e apagar fotos por uma interface visual — sem tocar em código.

**Passo 5 — Pegar as credenciais**
Em [sanity.io/manage](https://www.sanity.io/manage), abra o projeto e copie
o **Project ID** (o dataset é `production`, a menos que tenha escolhido
outro nome no passo 2).

**Passo 6 — Conectar no site**
Neste projeto (o do site, não o do Studio), copie `.env.example` para `.env`
e preencha:
```
VITE_SANITY_PROJECT_ID=cole_o_project_id_aqui
VITE_SANITY_DATASET=production
```
Reinicie `npm run dev` — a galeria e o Archive passam a mostrar as fotos
cadastradas no Studio automaticamente.

**Passo 7 — Deixar o Studio acessível de qualquer lugar**
Por padrão o Studio só roda no seu computador (`localhost:3333`). Para a
fotógrafa cadastrar fotos do celular ou de outro computador, publique-o:
```bash
cd raio-studio
npx sanity deploy
```
Isso gera um link tipo `https://raio-fotografia.sanity.studio` — é esse
link que ela salva nos favoritos e usa sempre que quiser adicionar fotos.

**Passo 8 — Publicar o site**
Suba o projeto do site (este pacote) para o GitHub e conecte na Vercel ou
Netlify (ambas têm plano gratuito). Nas configurações do projeto, adicione
as mesmas variáveis de ambiente do passo 6 (`VITE_SANITY_PROJECT_ID` e
`VITE_SANITY_DATASET`). A cada foto nova cadastrada no Studio, ela aparece
no site publicado sem precisar de novo deploy.

> A área reservada da fotógrafa (`/#admin`, salva no navegador) pode
> continuar existindo como forma rápida de testar o layout, mas depois de
> ligar o Sanity o cadastro "de verdade", visível pra todo mundo, passa a
> ser sempre pelo Studio — que tem login de verdade em vez de senha fixa.

### Opção B — Supabase + Cloudinary
1. Tabela `photos` no Supabase com as mesmas colunas do schema em `sanity-schema/photo.js`.
2. Upload de imagem direto para Cloudinary (com preset de compressão automática para WebP) a partir de um painel simples (ex.: Supabase Table Editor, ou um formulário admin protegido por login).
3. `image` na tabela guarda a URL já otimizada do Cloudinary.
4. Em `cms.js`, troque a implementação de `getPhotos()` para usar `supabase.from('photos').select('*')` no lugar do cliente Sanity.


## Acessibilidade
- Lightbox usa Radix `Dialog` — focus trap, ESC para fechar, ARIA automático.
- Filtros usam `role="tablist"`/`role="tab"` com estado `aria-selected`.
- `prefers-reduced-motion` respeitado (Lenis, grain e transições reduzidas).
- Contraste de texto (`#EDEDED`/`#888888` sobre `#0A0A0A`) validado para AA.

## Performance
- `loading="lazy"` + `decoding="async"` em todas as imagens da galeria.
- Hero carrega apenas 5 imagens do reel; galeria completa só renderiza ao entrar em viewport (`whileInView`).
- Trocar as imagens do Unsplash (placeholders) pelas URLs do CMS/Cloudinary já otimizadas em WebP.
