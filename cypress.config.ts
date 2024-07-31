import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { GenerateCtrfReport } from 'cypress-ctrf-json-reporter';

export default defineConfig({
  watchForFileChanges: false,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'e2e/specs/**/*.spec.ts',
    testIsolation: false, // We can clear cart items within the website, don't want to lose cached login token
    setupNodeEvents(on) {
      on('file:preprocessor', createBundler());
      new GenerateCtrfReport({on, outputDir: 'reports'})
    }
  }
});
