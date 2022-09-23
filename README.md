<p align="center">
  <a href="https://qwik.builder.io/" target="_blank">
    <img src="https://camo.githubusercontent.com/3518364b161ab1351455c0f3774d01973e25602a4b63a3e9129c21deddb2f223/68747470733a2f2f63646e2e6275696c6465722e696f2f6170692f76312f696d6167652f617373657473253246594a494762346930316a7677305352644c3542742532463636376162366332323833643463346438373866623930383361616363313066" alt="Qwik" width="350" height="auto">
  </a>
</p>

<p align="center">
  The HTML-first framework
</p>

------
## Qwik Community

- [Qwik Docs](https://qwik.builder.io/)
- [Qwik Github](https://github.com/BuilderIO/qwik)
- [Vite](https://vitejs.dev/)
- [Builder.io](https://www.builder.io/)

---

## Project Structure

Inside of you project, you'll see the following directories and files:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and `index.tsx` files as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations

Use the `npm run qwik add` command to add other integrations. Some examples of integrations include as a Cloudflare, Netlify or Vercel server, and the Static Site Generator (SSG).

```
npm run qwik add
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). For Qwik during development, the `dev` command will also server-side render (SSR) the output. The client-side development modules loaded by the browser.

```
npm run dev
```

> Note: during dev mode, Vite will request many JS files, which does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, production build of `src/entry.preview.tsx`, and create a local server. The preview server is only for convenience to locally preview a production build, but it should not be used as a production server.

```
npm run preview
```

## Production

The production build should generate the client and server modules by running both client and server build commands. Additionally, the build command will use Typescript run a type check on the source.

```
npm run build
```

<br/>

<p align="center">
  <a href="https://tailwindcss.com/#gh-light-mode-only" target="_blank">
    <img src="https://github.com/tailwindlabs/tailwindcss/raw/master/.github/logo-light.svg" alt="Tailwind CSS" width="350" height="70">
  </a>
  <a href="https://tailwindcss.com/#gh-dark-mode-only" target="_blank">
    <img src="https://github.com/tailwindlabs/tailwindcss/raw/master/.github/logo-dark.svg" alt="Tailwind CSS" width="350" height="70">
  </a>
</p>

<p align="center">
  A utility-first CSS framework for rapidly building custom user interfaces.
</p>

------

## Tailwind Documentation

For full documentation, visit [tailwindcss.com](https://tailwindcss.com/).
