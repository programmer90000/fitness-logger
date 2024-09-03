# Documentation

This file contains general documentation about each file in the repository. Some files may contain detailed documentation in a different file in this directory.

## `.github/workflows/linting.yml`
The `.github/workflows/linting.yml` file is used to ensure the repository linting is correct before committing any files and before making any pull requests.

## `.husky/pre-commit`
The `.husky/pre-commit` file ensures that each file contains the correct linting before committing. If a file does not contain the correct linting, the commit will fail.

## `.husky/_/husky.sh`
The `.husky/_/husky.sh` file initialises Git hooks to enforce code quality, run tests, and perform other actions during Git operations.

## `scripts/hooks/prepare-commit-msg`
The `scripts/hooks/prepare-commit-msg` defines the keywords that every commit message must begin with, ensuring consistency in every commit

## `.gitignore`
The `.gitignore` file is used to stop files from being added to git, ensuring they remain on the local PC and are not added to git version control and pushed to GitHub
