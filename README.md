# @werkzeugkiste/prettier-config <img src="https://raw.githubusercontent.com/werkzeugkiste/prettier-config/master/prettier.svg?sanitize=true" height="40" align="right">

This is the shared [Prettier](https://www.prettier.io) config for all things [@werkzeugkiste](https://www.github.com/werkzeugkiste) related.

## Installation

```bash
yarn add --dev @werkzeugkiste/prettier-config
```

```bash
npm install --develop @werkzeugkiste/prettier-config
```

## Usage

To use this config as base in any of your projects, create a `.prettierrc.js` file in your project folder and add the following content:

```js
module.exports = require('@werkzeugkiste/prettier-config');
```

**Important:** filename must be `.prettierrc.js` or `prettier.config.js` or otherwise Prettier will try to parse it as JSON or YML and will fail.

Quick shell command:

```bash
echo "module.exports = require('@werkzeugkiste/prettier-config');" > .prettierrc.js
```

If you feel the urge to override some of the rules, you can do it this way:

```js
module.exports = {
  ...require('@werkzeugkiste/prettier-config'),
  // add your overrides here
};
```

Read the Prettier docs on [sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations) for more info.
