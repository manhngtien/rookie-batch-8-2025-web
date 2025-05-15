# Tools

- IDE: Visual Studio Code
- Linter: Prettier

See [Environment Setup](#environment-setup) for guides on setting up these tools

# Frontend Stack

- Package manager: npm
- Styling & UI Library: tailwindcss + shadcn/ui
- State Management: Redux Roolkit
- API Client: Axios
- Router: React Router (using v6 styles). Use [v6 docs](https://reactrouter.com/6.30.0) or [v7 Data mode docs](https://reactrouter.com/start/data/installation)

# Environment Setup

- Install this extension: [Prettier - VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). If possible, run the linter for the file before you push with <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>, or use the [recommended VSCode setting](#recommended-vscode-settings).
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). This is going to help with writing Tailwind.

## Recommeneded Extensions

- [SonarQube](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
- [OKLCH Color Preview](https://marketplace.visualstudio.com/items?itemName=nize.oklch-preview)

## Recommended VSCode Settings

- [Format On Save](vscode://settings/editor.formatOnSave)

# Naming Conventions

- **kebab-case**: Components file name

- **camelCase**: Hooks, helper functions

- **PascalCase**: Component name, Page, Types, Interfaces

**Remember to use .tsx extension if you use JSX. Mostly for components**
