🧠 Structura Developer Notes

Internal architecture & development reference for Skyline Bot Studio.

This page explains how Structura works behind the scenes, including command handling, file structure, data storage, and future expansion plans. This helps maintain the bot long-term.

🏗 Project Architecture Overview

Structura is built using Node.js and discord.js v14.

Basic structure:

structura-bot/
├── index.js             → Main bot runtime
├── deploy-commands.js   → Slash command deployment
├── package.json
├── package-lock.json
│
├── docs/                → GitHub Pages website + documentation
│   └── *.html
│   └── *.md
│   └── assets/

🔧 Main Files Breakdown
index.js

Handles bot login

Loads and processes slash commands

Contains main logic for layouts, server building, and utilities

Handles permissions, channel creation, and error handling

deploy-commands.js

Registers slash commands with Discord’s API

Ensures commands update globally or per guild

docs/

Contains the public website and full documentation

Hosted with GitHub Pages

Updates automatically when GitHub commits are made

🧩 Slash Command Workflow

Developer edits deploy-commands.js to add or modify commands

Run the deployment (if self-hosted) or restart the bot

Discord registers the commands

index.js listens for interactions

Structura performs the requested server-building operation

🗄 Data Storage (For Future Premium Features)

Structura currently uses in-memory objects for layouts and operations.

Planned upgrade:

JSON storage

SQLite

Premium layout cloud storage

Sync to Skyline Bot Studio account

🛠 Coding Standards

Use ES6+ syntax

Use async/await for all Discord API calls

Add comments to complex functions

Keep layout logic modular for easier updates

Prefix internal functions with _internalFunctionName

🌱 Planned Future Features
🔹 Premium Layout Packs

Professionally designed server templates

Drag-and-drop structure packs

Auto-role systems

🔹 Ticket & Form System

/ticket-open

/ticket-close

Auto-category creation

🔹 Role Setup Wizard

Auto-generate roles

Color groups

Moderator packs

🔹 Full Web Dashboard

Select layouts visually

One-click server creation

API keys for advanced builders

🧪 Testing Notes (Internal)

When testing layouts:

Check category order

Check if channels appear in correct positions

Verify channel permissions

Verify /sync-permissions behavior

Export JSON for comparison

Check for Discord rate limit warnings

📮 Internal Contact

Skyline Bot Studio
📧 skylinebotstudio@outlook.com
