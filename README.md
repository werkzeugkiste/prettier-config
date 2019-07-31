# @werkzeugkiste/prettier-config

This is the shared [Prettier](https://www.prettier.io) config for all things [@werkzeugkiste](https://www.github.com/werkzeugkiste) related.

## Installation

```bash
yarn add --dev @werkzeugkiste/prettier-config
```

```bash
npm install --develop @werkzeugkiste/prettier-config
```

## Usage

To use this config as base in any of your projects, create a .prettierrc.js file in your project folder and add the following content:

```js
module.exports = require('@werkzeugkiste/prettier-config');
```

If you feel the urge to override some of the rules, you can do it this way:

```js
module.exports = {
    ...require('@werkzeugkiste/prettier-config'),
    // add your overrides here
};
```

Read the Prettier docs on [sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations) for more info.
