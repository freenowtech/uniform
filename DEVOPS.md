# Dev Ops 🚢

## Summary

Create your PR and new version of the package would be published automatically when your PR is merged.

## Steps of devops automation

- We have CI & CD configured with Travis CI. Every commit triggers the build plan. 
- Default build plan includes a test pipeline: eslint+prettier → flow → unit tests.
- After passing the tests library code would be transpiled via `babel`.
- Every successful build in master branch publishes the new version of the package with updated changelog.
- To modify this build you can look at the `.travis.yml` file.
