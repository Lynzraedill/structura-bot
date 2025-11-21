🛠️ Structura — Development & Contributing Guide

Skyline Bot Studio
Last Updated: November 2025

This document explains how to work on Structura’s codebase, how to run it locally, and the standards for contributing.

🔹 1. Project Structure
structura-bot/
│
├── index.js               # Main bot runtime
├── deploy-commands.js     # Registers slash commands
├── package.json           # Dependencies & metadata
├── config.json            # Bot settings (optional)
├── .env                   # Environment variables (never commit)
│
├── commands/              # Slash command handlers (optional)
├── utils/                 # Helpers & shared functions (optional)
│
└── docs/                  # Documentation
    ├── README.md
    ├── usage.md
    └── development.md

🔹 2. Development Requirements

You will need:

Node.js 18+

npm or yarn

A Discord Bot Token

The repository cloned locally

🔹 3. Setting Up the Project
1. Clone the repo
git clone https://github.com/Lynzraedill/structura-bot.git
cd structura-bot

2. Install dependencies
npm install

3. Create your .env file
DISCORD_BOT_TOKEN=your_token
CLIENT_ID=your_bot_client_id
GUILD_ID=optional_testing_server

4. Register slash commands
node deploy-commands.js

5. Run the bot
node index.js

🔹 4. Coding Standards
✔️ Use CommonJS

All files should follow:

const fs = require('fs');
module.exports = {};

✔️ Use Prettier-style formatting

2-space tabs

Semicolons

Single quotes

Descriptive variable names

✔️ Keep commands modular

Each command should be a self-contained function with:

name
description
options
execution handler

✔️ Avoid hardcoding

Everything configurable should go into:

config.json

environment variables (.env)

or provide a slash command to update it

🔹 5. Adding a New Command

Recommended steps:

Duplicate an existing command file or add a new one in /commands.

Export a handler function.

Add the command to deploy-commands.js.

Re-run:

node deploy-commands.js


Restart the bot.

🔹 6. Versioning & Git Workflow
✔️ You (Lindsey) can commit on main

You're the project owner.

Contributors should:

Fork the repo

Create a new branch:

git checkout -b feature/new-command


Commit with clean messages:

Add /ticket-close command
Fix template loader crash
Improve slash command registration


Open a pull request

Write a clear description of changes

🔹 7. Testing Environment

Structura should always be tested in:

1. A private test Discord server

Before pushing updates to production.

2. Local bot runtime

Where logs appear in your console.

3. Using Discord’s “Enable Dev Mode”

So you can copy channel IDs, role IDs, etc.

🔹 8. Deployment

If hosted on your machine:

node index.js


If hosted on cloud platforms:

Host on a VPS (DigitalOcean, Linode, etc.)

Or Railway / Render

Or use PM2 to keep the bot alive

Example:

npm install -g pm2
pm2 start index.js --name structura

🔹 9. Contribution Rules

Anyone contributing must:

Follow the coding standards

Test code before submitting

Avoid committing .env or private data

Never include bot tokens

Document all new commands in the /docs folder

Add comments explaining complex logic

🔹 10. Security Notes

Structura:

Does NOT store message content

Only reads slash commands

Only stores server layout data (categories, roles, channels)

Never uploads data to third parties

Keeps all user data inside your own server

For privacy details, see privacy-policy.html.

🔹 11. Maintainer Contact

For development questions:

📧 skylinebotstudio@outlook.com

GitHub Issues: enable issues tab in repo
