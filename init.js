#! /usr/env node
const fs = require('fs');

const configFileExists = fs.existsSync('./.prettierrc.js');

const alternativeConfigFilenames = [
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.yaml',
    '.prettierrc.yml',
    'prettier.config.js',
    '.prettierrc.toml',
];

const checkAlternativeConfigFilenames = () => {
    const existingConfigs = alternativeConfigFilenames.reduce((acc, filename) => {
        if (fs.existsSync(`./${filename}`)) {
            return acc.concat(filename);
        }
        return acc;
    }, []);

    return existingConfigs;
};

const doesPackageJsonConfigExist = () => {
    if (fs.existsSync('./package.json') === false) {
        console.error(
            "package.json does not exist. Run this command from within your project's root folder"
        );
        process.exit(1);
    }

    const pkg = require('./package.json');
    if (pkg && pkg.prettier) {
        return true;
    }
    return false;
};

if (configFileExists) {
    console.error('Prettier config (.prettierrc) already exists. Doing nothing.');
    console.error('Check https://github.com/werkzeugkiste/prettier-config for more infos.');
    process.exit(1);
}

const alternativeConfigs = checkAlternativeConfigFilenames();
const alternativeConfigFileExists = alternativeConfigs.length > 0;

if (alternativeConfigFileExists) {
    console.warn('Alternative prettier config files exist:');
    console.warn(`${alternativeConfigs.join(', ')}`);
    console.warn('Please delete all config files other than .prettierrc.js to avoid conflicts.');
}

if (doesPackageJsonConfigExist()) {
    console.warn(
        'Prettier config found in package.json. Please remove the "prettier" property to avoid conflicts.'
    );
}

console.log('Writing config to .prettierrc.js');
fs.writeFileSync('/.prettierrc.js', "module.exports = require('@werkzeugkiste/prettier-config');");
console.log('Done! ✅');
