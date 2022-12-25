import { CommandInteraction } from 'discord.js';

import Client from '../core/Client';
import Command from '../core/Command';

export default class extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'ping',
      description: 'Reply bot ping',
    });
  }

  handle(interaction: CommandInteraction) {
    interaction.reply(`🏓 **${this.client.ws.ping}ms**`);
  }
}
