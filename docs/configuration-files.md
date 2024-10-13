# Configuration Files

This file contains general documentation about each file in the repository. Some files may contain detailed documentation in a different file in this directory.

## `.github/workflows/linting.yml`
The `.github/workflows/linting.yml` file is used to ensure the repository linting is correct before committing any files and before making any pull requests.

## `.husky/pre-commit`
The `.husky/pre-commit` file ensures that each file contains the correct linting before committing. If a file does not contain the correct linting, the commit will fail.

## `.husky/_/husky.sh`
The `.husky/_/husky.sh` file initialises Git hooks to enforce code quality, run tests, and perform other actions during Git operations.

## `scripts/hooks/prepare-commit-msg`
The `scripts/hooks/prepare-commit-msg` defines the keywords that every commit message must begin with, ensuring consistency in every commit.

## `.gitignore`
The `.gitignore` file is used to stop files from being added to git, ensuring they remain on the local PC and are not added to git version control and pushed to GitHub.

## `babel.config.js`
The `babel.config.js` file configures Babel to transform modern JavaScript code into an older version of JavaScript, which is compatible with older browsers and environments.

## `eslint.config.js`
The `eslint.config.js` file defines linting and formatting options for the repository. It ensures all code pushed to the repository follows pre-defined rules to keep all files consistent and error-free.

## `LICENSE.md`
The `LICENSE.md` file contains the license used for this repository.

## `nodemon.json`
The `nodemon.json` file restarts the Node server whenever any file changes are detected.

## `practices.md`
The `practices.md` file contains practices to follow when creating this app, which cannot be monitored by any configuration files.

## `tailwind.config.js`
The `tailwind.config.js` file is used to tailor Tailwind to fit my project’s specific design and functionality requirements. It ensures global consistency across the app. It also allows plugins to extend the functionality of Tailwind.

## `eas.json`
The `eas.json` file is a configuration file for Expo Application Services (EAS) CLI. It manages the project's build, submit, and CLI settings.