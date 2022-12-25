import { ActivityType, Client as BaseClient } from 'discord.js';

import Command from './Command';
import Event from './Event';
import { readFolder } from '../utils/readFolder';

type Constructable<T> = new (...args: unknown[]) => T;

class Client extends BaseClient {
  commands: Command[];
  developers: string[];

  constructor() {
    super({
      intents: ['3243773'],
      presence: {
        status: process.env.NODE_ENV === 'development' ? 'dnd' : 'online',
        activities: [{ name: 'Developing', type: ActivityType.Watching }],
      },
    });

    this.developers = process.env.DEVELOPERS;
  }

  private registryEvents() {
    readFolder<Constructable<Event>>('../events')
      .map((Event) => new Event(this))
      .forEach((evt) =>
        this[evt.emitter](evt.name, (...args: unknown[]) => evt.handle(...args))
      );

    return this;
  }

  private registryCommands() {
    this.commands = readFolder<Constructable<Command>>('../commands').map(
      (Command) => new Command(this)
    );

    return this;
  }

  public connect() {
    this.registryEvents();
    this.registryCommands();

    this.login(process.env.TOKEN);
  }
}

export default Client;
