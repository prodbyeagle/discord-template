# 🦅 Discord.js Bot Template

A modern, modular Discord bot starter built with **TypeScript** and **Discord.js v14+**, designed for performance, scalability, and ease of development. Includes autocomplete, command handling, typed client extensions, and recommended project structure.

---

## ⚙️ Features

* ✅ Slash command registration with autocomplete support
* ✅ Typed `EagleClient` extension for scalable architecture
* ✅ Centralized command and event management
* ✅ Environment-based config with graceful error handling

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/prodbyeagle/discord-template.git
cd eaglebot-template
```

### 2. **Install Dependencies**

Choose your preferred package manager:

```bash
npm install
# or
bun install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory and add your bot token:

```env
BOT_TOKEN=your-bot-token-here
```

Alternatively, you can edit the default config file at `src/lib/config.ts` if you prefer inline configuration.

---

## 🧪 Running the Bot

To start the bot:

```bash
npm run start
# or
bun start
```

Make sure `BOT_TOKEN` is correctly defined in your `.env`.

---

## 🧩 Customization

### 🔹 Commands

Add new slash commands inside `src/commands/` and register them in `initializeCommands.ts`.

Each command follows a modular structure and supports optional `autocomplete`.

### 🔹 Events

Create and manage Discord event listeners in `src/events/`. Events are automatically triggered based on Discord.js lifecycle hooks.

### 🔹 Custom Client (`EagleClient`)

The bot extends `Client` with custom properties (like `commands`, `audio`, etc.). Modify `src/client.ts` to define your own properties or behaviors.

---

## 📁 Project Structure

```bash
src/
├── client.ts              # Custom client (EagleClient)
├── commands/              # Slash commands
├── events/                # Discord events (ready, interaction, etc.)
├── lib/                   # Shared utilities, config, logging
├── modules/               # Functional features like recording/audio
└── types/                 # Global type declarations (e.g., ICommand)
```

---

## 🤝 Contributing

Pull requests are welcome. If you encounter bugs or have ideas for improvements, feel free to open an issue.

---

## 📜 License

MIT — Feel free to use, modify, and distribute.
