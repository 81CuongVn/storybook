import type { StorybookConfig } from '@storybook/react-webpack5/types';

const path = require('path');

const mainConfig: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-essentials',
      options: {
        viewport: false,
      },
    },
  ],
  logLevel: 'debug',
  webpackFinal: async (config) => {
    // add monorepo root as a valid directory to import modules from
    config.resolve?.plugins?.forEach((p: any) => {
      if (Array.isArray(p.appSrcs)) {
        p.appSrcs.push(path.join(__dirname, '..', '..', '..'));
      }
    });
    return config;
  },
  core: {
    builder: '@storybook/builder-webpack5',
    channelOptions: { allowFunction: false, maxDepth: 10 },
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  features: {
    buildStoriesJson: true,
  },
  framework: '@storybook/react-webpack5',
};
module.exports = mainConfig;
