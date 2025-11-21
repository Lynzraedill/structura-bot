📜 Structura Commands Guide

This page lists every command available in Structura, along with what each command does.

🧱 Layout & Server Building Commands
/load-layout <name>

Loads a server layout template and automatically creates categories, channels, and permissions.

Examples:

/load-layout starter
/load-layout gaming
/load-layout community

/save-layout <name>

Saves your current server structure as a reusable template.

Example:

/save-layout mylayout

/delete-layout <name>

Deletes a layout saved to your server.

/list-layouts

Shows all saved layouts available to load or modify.

/export-layout

Exports your current layout structure in JSON format.

Useful for backups and sharing templates.

/fix-duplicate-names

Automatically resolves channels or categories with the same name.

/group-orphan-channels

Finds channels not inside any category and groups them for cleanup.

/rename-category <old> <new>

Renames a category quickly.

/rename-channel <old> <new>

Renames a channel instantly.

🌍 Global Layout Commands

These commands affect global layouts shared across multiple servers.

/save-global-layout <name>

Saves a layout globally for reuse in other servers.

/delete-global-layout <name>

Deletes a global layout.

/list-global-layouts

Lists all global templates.

/load-global-layout <name>

Loads a global layout into the current server.

🔒 Permission Commands
/sync-permissions

Synchronizes permissions across all channels to fix mismatches.

🧹 Utility & Organization Commands
/list-blocks

Displays the internal structure blocks that make up a layout.

❓ Help & Support
/help

Shows available commands and how to use them.

🧪 Testing Notes

If you're a tester, please focus on:

/load-layout

/save-layout

/export-layout

/fix-duplicate-names

/sync-permissions

Report bugs or layout issues to Skyline Bot Studio.
