import { defineConfig } from 'cypress';
import react from '@vitejs/plugin-react';

const config = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1000,
  viewportHeight: 600,
  
  component: {
    viewportWidth: 1500,
    viewportHeight: 1500,
    devServer: {
      bundler: 'vite',
      framework: 'react',
      viteConfig: {
        plugins: [react()]
      }
    }
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    defaultCommandTimeout: 25000,
    requestTimeout: 60000,              
    responseTimeout: 60000,            
    pageLoadTimeout: 60000,          
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
});

export default config;