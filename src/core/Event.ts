import Client from './Client';

interface EventOptions {
  name: string;
  emitter: 'on' | 'once';
}

class Event {
  client: Client;

  name: string;
  emitter: string;

  constructor(client: Client, data: EventOptions) {
    this.client = client;

    this.name = data.name;
    this.emitter = data.emitter;
  }

  handle(...args: any) {
    return { ...args };
  }
}

export default Event;
