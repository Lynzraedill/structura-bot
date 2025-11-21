🧱 Structura Layouts Guide

Layouts are the core of Structura. A layout is a saved blueprint of your server structure — including categories, channels, and permissions.

Structura can load, save, delete, and export layouts.

📂 What Is a Layout?

A layout is a structured template that contains:

Categories

Channels

Channel types (text, voice, announcements)

Permissions per channel

Ordering

Naming

When you load a layout, Structura recreates this structure automatically.

🟦 Built-In Example Layouts

Structura comes with a few starter templates (more will be added):

Starter Layout
General
├─ welcome
├─ rules
├─ announcements
Community
├─ general-chat
├─ media
Voice Channels
├─ Lounge

Gaming Layout
Lobby
├─ general-chat
├─ clips
Games
├─ game-select
├─ looking-for-group
Voice Channels
├─ VC-1
├─ VC-2

Community Layout
Start Here
├─ welcome
├─ about-us
Community
├─ chat
├─ questions
Support
├─ support-chat
├─ tickets

🛠 Creating Your Own Layouts

You can save your current server structure as a reusable template:

Save your layout
/save-layout my-layout

Load your layout
/load-layout my-layout

List available layouts
/list-layouts

Delete a layout
/delete-layout my-layout

🌍 Global Layouts (Shared Across Servers)

If you have multiple servers, you can save layouts globally:

/save-global-layout event-layout


Then load on any server:

/load-global-layout event-layout


This is useful for:

Event servers

Support servers

Cloned communities

Distribution to testers

📤 Exporting Layouts (JSON)

You can export your structure as JSON:

/export-layout


This gives you:

A backup

A file to share

A template to upload to another server

Example output:

{
  "General": ["welcome", "rules", "announcements"],
  "Community": ["chill-chat", "media", "introductions"],
  "Voice Channels": ["Lounge", "Hangout"]
}

🧪 Tester Instructions

If you're a tester, please do the following:

Load each built-in layout

Report any:

Missing channels

Incorrect permissions

Duplicate channels

Create a custom layout with /save-layout

Export it and send the JSON back to Skyline Bot Studio

Try /fix-duplicate-names and /sync-permissions
