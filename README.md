# Discord Bot Template

This template provides a starting point for building a Discord bot using Discord.js. It includes examples for setting up client events, commands, and event handling, along with a recommended project structure.

## Features

-   **TypeScript** with strict configuration
-   **Discord.js v14** integration
-   Built-in commands (e.g., a ping command)
-   Event handling for interactions, command registrations, and client ready events
-   ESLint configuration for code consistency

## Setup

1. **Clone the Repository**  
   Download or clone the template into your workspace.

2. **Install Dependencies**  
   Run the following command to install the required packages:

```bash
npm i
```

or

```bash
bun i
```

3. **Configure the Bot**

-   add bot token inside your .env as BOT_TOKEN.

## Running the Bot

Use the following command to start your bot:

```bash
npm run start
```

or

```bash
bun start
```

Ensure that your environment variable `BOT_TOKEN` is set or update the token in the configuration file.

## Customization

-   **Commands**: Add new commands in the `src/commands` directory and import them in the command initializer.
-   **Events**: Extend support or customize event handlers in the `src/events` directory.
-   **Client**: Modify the custom client (`EagleClient` in `src/client.ts`) to suit your application needs.

Happy Coding!
