import { BasePlugin } from 'madi-plg-base-class'

const TOOLNAME = "get_current_time"

export class Plugin extends BasePlugin {

  constructor(options) {
    super({
      ...options,
      description
    })
  }

  async run(runOptions, params) {
    const { data } = runOptions;
    let { location } = data
    if (location.toLowerCase().includes("tokyo")) {
      return JSON.stringify({ location: "Tokyo", time: "10:00 PM", timezone: "JST" });
    } else if (location.toLowerCase().includes("san francisco")) {
      return JSON.stringify({ location: "San Francisco", time: "5:00 AM", timezone: "PDT" });
    } else if (location.toLowerCase().includes("paris")) {
      return JSON.stringify({ location: "Paris", time: "2:00 PM", timezone: "CEST" });
    } else {
      return JSON.stringify({ location, time: "unknown", timezone: "unknown" });
    }
  }
}

export const description = {
  type: "function",
  plugin: "Time API",
  display: "Get Time",
  function: {
    name: TOOLNAME,
    description: "Get the current time in a given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
      },
      required: ["location"],
    },
  },
};