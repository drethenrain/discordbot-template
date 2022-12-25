import { ApplicationCommandOptionData } from 'discord.js';
import Client from './Client';

interface Config {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
}

class Command {
  client: Client;

  name: string;
  description: string;
  options: ApplicationCommandOptionData[];

  constructor(client: Client, data: Config) {
    Object.assign(this, data);

    this.client = client;
  }

  handle(...args: any) {
    return { ...args };
  }
}

export default Command;
