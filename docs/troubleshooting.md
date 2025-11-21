🛠 Structura Troubleshooting Guide
If Structura isn’t working as expected, this guide will help you diagnose and fix the most common issues.

❗ Common Issues & Fixes
🔒 1. Bot is online but commands don’t appear
This is usually caused by:
Fix A: Commands not deployed
Run the deployment process again or restart the bot if self-hosted.
Commands should register within up to 1 hour, but usually instantly.
Fix B: Missing application.commands scope
Make sure the invite link includes:
scope=bot+applications.commands
This is required for slash commands.
Fix C: Bot missing permissions

Structura must have:
Manage Channels
Manage Roles
Manage Permissions
Send Messages
Embed Links
Read Message History
Right-click the bot → Roles → give it an admin or manager role.

📂 2. Layout doesn’t load or only partially builds
Likely causes:
A: Bot lacks Manage Channels
Structura can’t create categories or channels without this permission.
B: Server reached channel/cat limits
Discord limits:
500 total channels
50 categories
C: Another bot is interfering
Some bots auto-delete or reorganize channels.
Try temporarily disabling structure-modifying bots.
🔁 3. Layout loads but permissions are wrong
Try:
/sync-permissions
This forces Discord to repair mismatched permission overwrites.
♻️ 4. Duplicate Channels or Categories
Use:
/fix-duplicate-names
Structura will scan the server and fix anything with the same name.

📤 5. Exported layout fails
If /export-layout returns errors:
Reasons:
A category contains no channels
A channel has unusual internal metadata
Your server has legacy channels from old Discord formats
Fix:
Try renaming categories and channels to standard names before exporting.

🧱 6. Saving a layout doesn’t work
Make sure:
You spelled the layout name correctly
The bot has permission to Read History
Your server has fewer than 200 channels
If issues persist, try:
/list-layouts

📡 7. Global layouts not appearing
Cause: Server is not authenticated for global features.
Fix:
Make sure /save-global-layout or /list-global-layouts is used in a server where the bot has admin rights.

🧪 Tester Reporting Format
When reporting issues, please submit the following:
Server ID
Layout used
Commands executed
What happened
What you expected
Screenshots if possible

Email bugs to:
📧 skylinebotstudio@outlook.com
