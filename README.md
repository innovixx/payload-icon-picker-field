# Payload Plugin Boilerplate

[![NPM](https://img.shields.io/npm/v/{{@innovixx/payload-plugin-boilerplate}})](https://www.npmjs.com/package/{{@innovixx/payload-plugin-boilerplate}})

A plugin for [Payload](https://github.com/payloadcms/payload) {{DESCRIPTION}}.

Core features:

  - {{core features list}}

## Installation

```bash
  yarn add {{@innovixx/payload-plugin-boilerplate}}
  # OR
  npm i {{@innovixx/payload-plugin-boilerplate}}
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```js
import { buildConfig } from 'payload/config';
import plugin from '{{@innovixx/payload-plugin-boilerplate}}';

const config = buildConfig({
  collections: [
    {
      slug: 'pages',
      fields: []
    },
    {
      slug: 'media',
      upload: {
        staticDir: // path to your static directory,
      },
      fields: []
    }
  ],
  plugins: [
    {{plugin()}}
  ]
});

export default config;
```

### Options

- `overwrites` : [key: string]: any | optional

  An object of overwrites to apply to the plugin. This is useful for when you want to customize the plugin's behaviour without having to fork it. The object keys are the names of the properties you want to overwrite, and the values are the functions you want to use instead.

  ```js

  ```

## TypeScript

All types can be directly imported:

```js
import {
  PluginConfig,
} from '{{@innovixx/payload-plugin-boilerplate}}/types';
```

## Development

To actively develop or debug this plugin you can either work directly within the demo directory of this repo, or link your own project.

1. #### Internal Demo

   This repo includes a fully working, self-seeding instance of Payload that installs the plugin directly from the source code. This is the easiest way to get started. To spin up this demo, follow these steps:

   1. First clone the repo
   1. Then, `cd YOUR_PLUGIN_REPO && yarn && cd demo && yarn && yarn cleanDev`
   1. Now open `http://localhost:3000/admin` in your browser
   1. Enter username `admin@innovixx.co.uk` and password `Pa$$w0rd!`

   That's it! Changes made in `./src` will be reflected in your demo. Keep in mind that the demo database is automatically seeded on every startup, any changes you make to the data get destroyed each time you reboot the app.

1. #### Linked Project

   You can alternatively link your own project to the source code:

   1. First clone the repo
   1. Then, `cd YOUR_PLUGIN_REPO && yarn && cd demo && cp env.example .env && yarn && yarn dev`
   1. Now `cd` back into your own project and run, `yarn link {{@innovixx/payload-plugin-boilerplate}}`
   1. If this plugin using React in any way, continue to the next step. Otherwise skip to step 7.
   1. From your own project, `cd node_modules/react && yarn link && cd ../react-dom && yarn link && cd ../../`
   1. Then, `cd YOUR_PLUGIN_REPO && yarn link react react-dom`

   All set! You can now boot up your own project as normal, and your local copy of the plugin source code will be used. Keep in mind that changes to the source code require a rebuild, `yarn build`.

   You might also need to alias these modules in your Webpack config. To do this, open your project's Payload config and add the following:

   ```js
   import { buildConfig } from "payload/config";

   export default buildConfig({
     admin: {
       webpack: (config) => ({
         ...config,
         resolve: {
           ...config.resolve,
           alias: {
             ...config.resolve.alias,
             react: path.join(__dirname, "../node_modules/react"),
             "react-dom": path.join(__dirname, "../node_modules/react-dom"),
             payload: path.join(__dirname, "../node_modules/payload"),
             "{{@innovixx/payload-plugin-boilerplate}}": path.join(
               __dirname,
               "../../payload/payload-plugin-boilerplate/src"
             ),
           },
         },
       }),
     },
   });
   ```