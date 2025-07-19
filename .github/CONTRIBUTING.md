# Contributing Guidelines

This document outlines the process for contributing to the Admin Portal project. Following these guidelines helps maintain quality and consistency.

## Development Workflow

### 1. JIRA Ticket and Branch Creation

1. All work should be associated with a JIRA ticket
2. Create a branch from the `main` branch using the following naming convention:
   ```
   JIRA_TICKET-descriptive-name
   ```
   - Example: `PORTAL-123-implement-login-page`
   - Remove any prefixes like "[dashboard]" from the descriptive part
   - Use lowercase letters and hyphens

### 2. Making Changes

1. Follow the project's coding standards and style guidelines
2. Write meaningful commit messages:
   ```
   JIRA_TICKET: Short description of the change
   
   Longer explanation if needed, explaining the context or why the change is necessary
   ```
3. Keep commits focused on specific changes to make review easier
4. Update the CHANGELOG.md in the [Unreleased] section with your changes

### 3. Pull Request Process

1. **Before creating a PR:**
   - Ensure all tests pass
   - Check that your code meets the style guidelines
   - Verify your changes work as expected

2. **Creating the PR:**
   - Create a PR against the `main` branch
   - Fill out all sections in the PR template completely
   - Include screenshots or videos showing the before and after states
   - Reference the JIRA ticket in the PR title and description

3. **PR Review:**
   - Request reviews from appropriate team members
   - Address all comments and feedback
   - Update the PR as needed
   - Obtain approvals from at least one team member

4. **Merging:**
   - **ONLY the PR author should merge their own PR**
   - DO NOT merge PRs created by other team members
   - Ensure all CI checks pass before merging
   - Use "Squash and merge" strategy to keep the commit history clean

### 4. After Merge

1. Delete the feature branch after successful merge
2. Update the JIRA ticket status
3. Verify that your changes work correctly in the target environment

## Code Quality Guidelines

1. **Testing:**
   - Write tests for new features and bug fixes
   - Maintain or improve test coverage

2. **Documentation:**
   - Document new features or changes to existing functionality
   - Update README or other documentation as needed

3. **Performance:**
   - Consider the performance implications of your changes
   - Optimize code where necessary

## Versioning

This project follows [Semantic Versioning](https://semver.org/). When creating a PR that would require a version bump:

- Bug fixes: Patch version (e.g., 1.0.0 → 1.0.1)
- New features (backwards compatible): Minor version (e.g., 1.0.0 → 1.1.0)
- Breaking changes: Major version (e.g., 1.0.0 → 2.0.0)

Use the version scripts provided in package.json when preparing a release:
```
pnpm version:patch  # For bug fixes
pnpm version:minor  # For new features
pnpm version:major  # For breaking changes
```
