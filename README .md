Certainly! Here's a sample README file with clear instructions on how to run the application locally:

````markdown
# Startup Mongoose Template

## Description

This is a Node.js application using Mongoose and TypeScript.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/xanon-oc/L2-B2-assignment-2.git
   ```
````

2. Navigate to the project directory:

   ```bash
   cd l2_b2_assignment-2
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the necessary environment variables.

## Running the Application

### Development Mode

To run the application in development mode with automatic restarts on file changes, use:

```bash
npm run start:dev
```

### Production Build

To build the application for production, use:

```bash
npm run build
```

This command will transpile TypeScript files into JavaScript in the `dist` directory.

Then, start the application with:

```bash
npm start
```

## Linting and Formatting

- Run ESLint for linting:

  ```bash
  npm run lint
  ```

- Run ESLint with auto-fix for linting:

  ```bash
  npm run lint:fix
  ```

- Run Prettier for code formatting:

  ```bash
  npm run prettier
  ```

- Run Prettier with auto-fix for code formatting:

  ```bash
  npm run prettier:fix
  ```

## Testing

To run tests (if available), use:

```bash
npm test
```
