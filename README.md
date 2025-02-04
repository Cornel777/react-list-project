# Star wars character list
## React + Typescript + React Query

## Running the project

Install packages

```js
yarn
```

- For the most optimized build start the app in production mode. The main benefits are code minification and avoiding React.StrictMode double rendering.
[more on React double rendering](https://chanduthedev.medium.com/why-react-app-rendering-twice-e31339ed9461#:~:text=StrictMode%20in%20the%20application%2C%20react,environment%2C%20it%20only%20renders%20once.&text=If%20you%20want%20to%20avoid,the%20development%20environment%2C%20remove%20React.)

```js
yarn build
yarn preview
```

- Start the app in dev mode. The main benefits are having the Dev Tools Sources mapped with project files.

```js
yarn dev
```

- Run all unit/integration tests

```js
yarn test 
```

- Run cypress UI for e2e tests
```js
yarn cy:open
```

## Design and architecture considerations

Considering the project would be approached as a team at an enterprise level, for better scalability, maintainability and readability I would/decided to use libraries that are widely used and well maintained in the React ecosystem
- React Query for async state management and data fetching
- Material UI table for displaying the data
- Material UI components and styled components for styling
- React Testing Library and Cypress for unit and E2E tests
- Webpack/Rspack -- here I went with Vite to keep the project lightweight

Why

- Using React Query will help with async request race conditions for pagination requests, deduping requests, providing reliable request fetching status and much more.
- Using React Table with Material UI will ensure aesthetic consistency and responsiveness of the application
- Fetching data by page and using manual pagination with react table to avoid overloading the client with large amounts of data over a short period
- However this way column filtering works just for the fetched and displayed data only. Whole data collection level filtering/searching has to be implemented server-side or store the whole dataset on the client and do it there.
- l10n and i18n 
- Theming
- WCAG 2.2 AA keyboard navigation and screen reader support
