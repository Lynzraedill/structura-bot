🛠️ Structura Support Guide

Skyline Bot Studio
Last Updated: November 2025

Welcome to the official Structura Support Guide.
This document explains how to get help, where to report issues, and how to troubleshoot common problems.

🔹 1. Where to Get Help
📌 Primary Support Email

skylinebotstudio@outlook.com

Use this email for:

Premium support

Bug reports

Testing access

Feature requests

Account/licensing issues

🔹 2. Discord Support Server

A Discord support server will be available for:

Real-time help

Bot announcements

Tester updates

Feature previews

Tutorials

Automated bug reporting

🛠️ This server is currently under construction.
Testers will receive early invites first.

🔹 3. FAQ
Why aren’t my commands showing up?

Make sure your bot token is correct in .env

Run deploy-commands.js

Ensure the bot has the application.commands scope

Make sure the bot is online

How do I update the bot?

Pull the newest version from GitHub and restart your bot.

Does Structura store message content?

No.
Structura logs only the following:

Server ID

User ID (for saving layouts)

Template/layout data

Error logs (non-personal)

No messages or conversations are stored.

Does Structura require admin permissions?

Only when generating channels/roles.
Other features can run with lower permissions.

🔹 4. How to Report Bugs

Please include:

What command you used

What you expected

What actually happened

Screenshot of error (if possible)

Any logs from the console

Send to: skylinebotstudio@outlook.com

Testers can report bugs in the private tester form or Discord ticket panel.

🔹 5. Troubleshooting
Bot not responding?

Restart your bot

Check .env token

Confirm the bot is online

Run deploy script again

Confirm the bot has correct permissions

Layouts failing to load?

Check JSON formatting

Ensure no trailing commas

Make sure categories have unique names

Error: Missing Access

The bot needs:

Manage Channels

Manage Roles

Send Messages

Read Messages

Use Slash Commands

Bot crashed?

Run:

npm install
node index.js


Check console for missing packages or typos.

🔹 6. Tester Support Instructions

Testers should report:

Command failures

UI bugs

Permission errors

Template layout issues

Suggestions

Anything confusing or unclear

They will receive:

Faster support

Feature previews

Lifetime tester badge

🔹 7. Emergency Commands (If Things Break)
Reset all commands:
node deploy-commands.js

Restart bot:
node index.js

Delete all saved layouts:
delete-saves.js (coming soon)

🔹 8. Contact & Credits

Skyline Bot Studio
📧 skylinebotstudio@outlook.com

🌐 https://Lynzraedill.github.io/structura-bot/
