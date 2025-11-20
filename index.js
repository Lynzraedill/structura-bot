// index.js - Structura: Server Builder Bot
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ChannelType
} = require("discord.js");
const {
  getCreated,
  clearCreated,
  removeIds
} = require("./layoutStore");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Store commands here
client.commands = new Collection();

// Load all commands from ./commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARN] Command at ${filePath} is missing "data" or "execute".`
    );
  }
}

client.once('clientReady', () => {
  console.log(`✨ Structura is online as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  // Slash commands
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error executing this command.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "There was an error executing this command.",
          ephemeral: true
        });
      }
    }
    return;
  }

  // 🧩 Structura Assistant menu handler
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId !== "structura_assistant_menu") {
      // Not our menu, ignore it
      return;
    }

    const choice = interaction.values[0];

    try {
      if (choice === "build_server") {
        await interaction.update({
          content:
            "🧩 **Let’s build your server!**\n\n1. First, run `/check-permissions` in your server and make sure Structura has:\n- Manage Channels\n- Manage Roles\n- View Channels\n- Send Messages\n- Embed Links\n\n2. Next, preview a layout:\n```/preview-layout```\n\n3. When you’re ready, build your server:\n```/create-structure layout:Community```\nYou can change `Community` to any layout you like.\n\nIf anything breaks or looks weird, ask in **#structura-support**.",
          components: []
        });
      } else if (choice === "channels") {
        await interaction.update({
          content:
            "📁 **Channel & Category Help**\n\nTo add a new category:\n```/add-category name:\"Events\" channels:\"announcements,sign-ups,info\"```\n\nTo add channels to an existing category:\n```/add-channels category:\"Community\" channels:\"memes,media,promos\"```\n\nTip: Always double-check spelling of the category name.\nIf you want layout advice, ask in **#structura-support**.",
          components: []
        });
      } else if (choice === "permissions") {
        await interaction.update({
          content:
            "🔐 **Permission Help**\n\n1. Run:\n```/check-permissions```\nStructura will tell you if it is missing any access.\n\n2. Make sure the bot role is **above** member roles in the role list.\n3. Give it at least:\n- Manage Channels\n- Manage Roles\n- View Channels\n- Send Messages\n- Embed Links\n\nIf you’re still stuck, send a screenshot of your role list in **#structura-support** and we’ll help fix it.",
          components: []
        });
      } else if (choice === "commands") {
        await interaction.update({
          content:
            "📜 **Main Structura Commands**\n\n• `/create-structure` – Build your whole server layout\n• `/preview-layout` – See templates before building\n• `/add-category` – Add a new category (optionally with channels)\n• `/add-channels` – Add channels under an existing category\n• `/create-roles` – Create a full role hierarchy\n• `/check-permissions` – Diagnose permission issues\n• `/lock-category` / `/unlock-category` – Control access\n• `/rollback` – Undo the last build action\n\nFor a full list, check **#structura-commands**.",
          components: []
        });
      } else if (choice === "other") {
        await interaction.update({
          content:
            "❓ **Other Questions**\n\nNo problem! Please head over to **#structura-support** and describe what you’re trying to do.\n\nInclude:\n- What you want the server to look like\n- Commands you’ve tried\n- Screenshots if possible\n\nWe’ll help you figure out the next best step. 💙",
          components: []
        });
      }
    } catch (error) {
      console.error("Error in assistant menu handler:", error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "❌ Something went wrong while handling that selection.",
          ephemeral: true
        });
      }
    }

    return;
  }

  // Button interactions (for confirmations / cleanup)
  if (interaction.isButton()) {
    const customId = interaction.customId;

    // 1) Confirm delete CATEGORY
    if (customId.startsWith("confirm_del_cat:")) {
      const categoryId = customId.split(":")[1];
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const category = guild.channels.cache.get(categoryId);
      if (!category) {
        return interaction.update({
          content: "❌ Category no longer exists.",
          components: []
        });
      }

      const childChannels = guild.channels.cache.filter(
        ch => ch.parentId === category.id
      );

      const childIds = Array.from(childChannels.keys());

      // Delete channels first
      for (const ch of childChannels.values()) {
        await ch.delete().catch(() => {});
      }

      // Then delete category
      await category.delete().catch(() => {});

      // Remove from tracking if present
      removeIds(guild.id, {
        categories: [categoryId],
        channels: childIds
      });

      return interaction.update({
        content: `🗑️ Deleted category **${category.name}** and its channels.`,
        components: []
      });
    }

    if (customId === "cancel_del_cat") {
      return interaction.update({
        content: "❎ Category deletion cancelled.",
        components: []
      });
    }

    // 2) Confirm delete LAYOUT
    if (customId === "confirm_del_layout") {
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const created = getCreated(guild.id);
      if (!created.categories.length && !created.channels.length) {
        return interaction.update({
          content: "ℹ️ I don't have any tracked layout to delete.",
          components: []
        });
      }

      // Delete channels first
      for (const chId of created.channels) {
        const ch = guild.channels.cache.get(chId);
        if (ch) {
          await ch.delete().catch(() => {});
        }
      }

      // Then delete categories
      for (const catId of created.categories) {
        const cat = guild.channels.cache.get(catId);
        if (cat) {
          await cat.delete().catch(() => {});
        }
      }

      clearCreated(guild.id);

      return interaction.update({
        content: "✅ Deleted all tracked Structura layout elements.",
        components: []
      });
    }

    if (customId === "cancel_del_layout") {
      return interaction.update({
        content: "❎ Layout deletion cancelled.",
        components: []
      });
    }

    // 3) Confirm clean EMPTY CATEGORIES
    if (customId === "confirm_clean_empty") {
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const allChannels = guild.channels.cache;
      const categories = allChannels.filter(
        ch => ch.type === ChannelType.GuildCategory
      );

      const emptyCategories = categories.filter(
        cat => !allChannels.some(ch => ch.parentId === cat.id)
      );

      if (!emptyCategories.size) {
        return interaction.update({
          content:
            "✅ No empty categories found to clean (maybe someone just used them!).",
          components: []
        });
      }

      const catIds = Array.from(emptyCategories.keys());

      // Delete each empty category
      for (const cat of emptyCategories.values()) {
        await cat.delete().catch(() => {});
      }

      // Update Structura tracking (if any of these were tracked)
      removeIds(guild.id, { categories: catIds, channels: [] });

      return interaction.update({
        content: `🗑️ Deleted **${catIds.length}** empty categor${
          catIds.length === 1 ? "y" : "ies"
        }.`,
        components: []
      });
    }

    if (customId === "cancel_clean_empty") {
      return interaction.update({
        content: "❎ Clean empty categories cancelled.",
        components: []
      });
    }

    // 4) Confirm GROUP ORPHAN CHANNELS
    if (customId === "confirm_group_orphans") {
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const allChannels = guild.channels.cache;

      const orphanText = allChannels.filter(
        ch => ch.type === ChannelType.GuildText && !ch.parentId
      );
      const orphanVoice = allChannels.filter(
        ch => ch.type === ChannelType.GuildVoice && !ch.parentId
      );

      const totalOrphans = orphanText.size + orphanVoice.size;

      if (!totalOrphans) {
        return interaction.update({
          content:
            "✅ No orphan channels found to move (maybe someone just organized them!).",
          components: []
        });
      }

      const targetName = "🧺 Uncategorized";

      // Find or create the target category
      let targetCategory = allChannels.find(
        ch => ch.type === ChannelType.GuildCategory && ch.name === targetName
      );

      if (!targetCategory) {
        targetCategory = await guild.channels.create({
          name: targetName,
          type: ChannelType.GuildCategory
        });
      }

      // Move orphan channels under the target category
      for (const ch of orphanText.values()) {
        await ch.setParent(targetCategory.id).catch(() => {});
      }
      for (const ch of orphanVoice.values()) {
        await ch.setParent(targetCategory.id).catch(() => {});
      }

      return interaction.update({
        content: `✅ Moved **${totalOrphans}** orphan channel${
          totalOrphans === 1 ? "" : "s"
        } into **${targetCategory.name}**.`,
        components: []
      });
    }

    if (customId === "cancel_group_orphans") {
      return interaction.update({
        content: "❎ Group orphan channels cancelled.",
        components: []
      });
    }

    // 5) Confirm FIX DUPLICATE NAMES
    if (customId === "confirm_fix_dupes") {
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const allChannels = guild.channels.cache;

      // Recompute duplicates at confirm time
      const nameMap = new Map();

      for (const ch of allChannels.values()) {
        if (
          ch.type !== ChannelType.GuildCategory &&
          ch.type !== ChannelType.GuildText &&
          ch.type !== ChannelType.GuildVoice
        )
          continue;

        const key = ch.name.toLowerCase();
        if (!nameMap.has(key)) nameMap.set(key, []);
        nameMap.get(key).push(ch);
      }

      const duplicates = [];
      for (const list of nameMap.values()) {
        if (list.length > 1) duplicates.push(list);
      }

      if (!duplicates.length) {
        return interaction.update({
          content:
            "✅ No duplicate names found to fix (they may have changed since you ran the command).",
          components: []
        });
      }

      let renameCount = 0;

      for (const group of duplicates) {
        // Sort for consistency (by position or id)
        const sorted = [...group].sort((a, b) => {
          if (a.rawPosition !== b.rawPosition) {
            return a.rawPosition - b.rawPosition;
          }
          return a.id.localeCompare(b.id);
        });

        const baseName = sorted[0].name;
        let suffix = 2;

        // Keep first as-is, rename rest
        for (let i = 1; i < sorted.length; i++) {
          const ch = sorted[i];
          const newName = `${baseName}-${suffix}`;
          suffix++;

          if (ch.name === newName) continue;

          await ch.setName(newName).catch(() => {});
          renameCount++;
        }
      }

      return interaction.update({
        content: `🔁 Finished renaming duplicates. Updated **${renameCount}** channel/category name${
          renameCount === 1 ? "" : "s"
        }.`,
        components: []
      });
    }

    if (customId === "cancel_fix_dupes") {
      return interaction.update({
        content: "❎ Fix duplicate names cancelled.",
        components: []
      });
    }

    // 6) Confirm SYNC PERMISSIONS
    if (customId.startsWith("confirm_sync_perms:")) {
      const categoryId = customId.split(":")[1];
      const guild = interaction.guild;
      if (!guild) {
        return interaction.update({
          content: "❌ Guild not found.",
          components: []
        });
      }

      const allChannels = guild.channels.cache;
      const category = allChannels.get(categoryId);

      if (!category || category.type !== ChannelType.GuildCategory) {
        return interaction.update({
          content: "❌ Category no longer exists.",
          components: []
        });
      }

      const children = allChannels.filter(
        ch =>
          ch.parentId === category.id &&
          (ch.type === ChannelType.GuildText ||
            ch.type === ChannelType.GuildVoice)
      );

      if (!children.size) {
        return interaction.update({
          content: `ℹ️ Category **${category.name}** has no text or voice channels to sync.`,
          components: []
        });
      }

      let synced = 0;
      for (const ch of children.values()) {
        await ch.lockPermissions().catch(() => {});
        synced++;
      }

      return interaction.update({
        content: `🔐 Synced permissions for **${synced}** channel${
          synced === 1 ? "" : "s"
        } under **${category.name}**.`,
        components: []
      });
    }

    if (customId === "cancel_sync_perms") {
      return interaction.update({
        content: "❎ Sync permissions cancelled.",
        components: []
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
