🚀 Structura — Quick Start & Usage Guide

Skyline Bot Studio
Last Updated: November 2025

Structura is a Discord server-builder bot that automatically creates channels, roles, and full server layouts using simple slash commands.

This guide will help you install, set up, and start using Structura within minutes.

🔹 1. Install the Bot to Your Server

Use this official installer link:

👉 https://discord.com/oauth2/authorize?client_id=1439305412649287710&permissions=36775741456&integration_type=0&scope=bot+applications.commands

Choose your server → click Authorize → done.

Structura will immediately register slash commands.

🔹 2. How to Run Structura Yourself (Self-Hosted)
1. Clone the repository
git clone https://github.com/Lynzraedill/structura-bot.git

2. Install dependencies
npm install

3. Create a .env file

Add:

DISCORD_BOT_TOKEN=your_token_here
CLIENT_ID=1439305412649287710
GUILD_ID=your_server_id (optional)

4. Deploy commands
node deploy-commands.js

5. Start the bot
node index.js

🔹 3. Slash Commands Overview

Structura includes these main commands:

/setup

Creates a full server layout (categories, channels, roles).

/addcategory name:

Creates a new category.

/addchannel name: type:

Creates a text or voice channel.

/addrole name: color: permissions:

Creates a role automatically.

/template-save

Saves your current server layout.

/template-load

Loads a saved layout instantly.

/template-delete

Deletes a saved layout.

/ticket-panel

Creates a support ticket panel for your server.

🔹 4. What Structura Can Do
✅ One-click server creation

Instantly build full server structures.

✅ Save & restore layouts

Keep backups of server structures and restore them anywhere.

✅ Auto-generate onboarding

Welcome channels, rules, verification, starter roles.

✅ Ticket system

Open/close support tickets right inside Discord.

✅ Premium support (optional)

Advanced templates + role automations.

🔹 5. Permissions Required

Structura needs:

Manage Channels

Manage Roles

Manage Server

Send Messages

Use Slash Commands

It does not read or store message content.

🔹 6. Best Practices
🟦 Use a test server

Before generating large layouts.

🟩 Always save your layout

/template-save prevents loss if you restart or change things.

🟨 Don’t rename generated channels manually

Future updates may rely on expected names.

🟥 Don’t delete your .env

This contains your bot token.

🔹 7. Uninstalling Structura

Remove the bot from your server.

Delete its roles (if any).

Remove old templates (optional).

🔹 8. Need Help?

📧 Email: skylinebotstudio@outlook.com

🌐 Website: Coming Soon
💬 Discord Server: In development (testers first)
