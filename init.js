#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const configFileExists = fs.existsSync('./.prettierrc.js');

if (configFileExists) {
    console.warn('WARNING: Prettier config (.prettierrc) already exists. Doing nothing.');
    console.warn('Check https://github.com/werkzeugkiste/prettier-config for more infos.');
    process.exit(0);
}

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
        if (fs.existsSync(path.join(process.cwd(), filename))) {
            return acc.concat(filename);
        }
        return acc;
    }, []);

    return existingConfigs;
};

const doesPackageJsonConfigExist = () => {
    if (fs.existsSync(path.join(process.cwd(), 'package.json')) === false) {
        console.error(
            "ERROR: package.json does not exist. Run this command from within your project's root folder"
        );
        process.exit(1);
    }

    const pkg = require(path.join(process.cwd(), 'package.json'));
    if (pkg && pkg.prettier) {
        return true;
    }
    return false;
};

if (doesPackageJsonConfigExist()) {
    console.warn(
        'WARNING: Prettier config found in package.json. Please remove the "prettier" property to avoid conflicts.'
    );
}

const alternativeConfigs = checkAlternativeConfigFilenames();
const alternativeConfigFileExists = alternativeConfigs.length > 0;

if (alternativeConfigFileExists) {
    console.warn('WARNING: Alternative prettier config file(s) exist:');
    alternativeConfigs.forEach((file) => {
        console.warn(`- ${file}`);
    });
    console.warn('Please delete all config files other than .prettierrc.js to avoid conflicts.');
}

try {
    console.log('');
    console.log('Writing config to', path.join(process.cwd(), '.prettierrc.js'));
    fs.writeFileSync(
        path.join(process.cwd(), '/.prettierrc.js'),
        `module.exports = require('@werkzeugkiste/prettier-config');
`
    );
    console.log('Config written successfully! ✅');
    process.exit(0);
} catch (_error) {
    console.error(
        'ERROR: Failed to write config file. Please try again or create config manually.'
    );
    process.exit(1);
}
