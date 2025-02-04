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

Considering the project would be approached as a team at an enterprise level, for better scalability, maintainability and readability I would use libraries that are widely used and well maintained in the React ecosystem:
- React Query for async state management and data fetching
- React Table/ MUI Data Grid would be recommended for managing large amounts of data with the purpose to be displayed/filtered/edited 
 -- I went with Material UI table for displaying the data in this case as a lightweight version 
- Material UI components and styled components for styling
- React Testing Library and Cypress for unit and E2E tests
- Webpack/Rspack -- here I went with Vite to keep the project lightweight


Notes/ TO DO

- Using React Query will help with async request race conditions for pagination requests, deduping requests, providing reliable request fetching status and much more.
- Using React Table or MUI Data Grid would be recommended for large scalable enterprise applications, however, in this case I wanted to implement as much of the main functionality required myself and not use already built-in features.
- Fetching and displaying data page by page and using manual pagination to avoid overloading the client with large amounts of data over a short period.
- Since data is fetched and displayed page by page for performance reasons, searching/querying the data by name requires to make an additional request for all pages and aggregate the results for filtering. Normally this entire data collection level filtering/searching is implemented server-side and queried.
- L10n and i18n support would need to be added
- Adding a theme provider for better styling coherence 
- Implement WCAG 2.2 AA keyboard navigation and screen reader support
- Styling/responsiveness would need a bit more effort invested
- Increased Cypress timeout for requests since SWAPI endpoint seems to be really slow and causes E2E tests to timeout
