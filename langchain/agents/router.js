
import { Debug } from '../logger.js'
import { AgentExecutor } from "langchain/agents";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import * as dotenv from 'dotenv'
import { establishMemory } from "../memory/memory.js";
import { ZeroShotAgentOutputParser } from "langchain/agents";
import { routerInvIsNotSetTools, routerCommonTools, routerInvIsSetTools } from "./router.tools.js";
import { RouterActionAgent } from "./router.agent.js";



dotenv.config()
const debug = Debug(import.meta.url)


/**
 * @typedef {import("../types.js").Metadata} Metadata 
 * @typedef {import("../types.js").ServerResponse} ServerResponse
 */



/**
 * 
 * @param {string} message 
 * @param {Metadata} metadata 
 * @returns {Promise<Array<string, Metadata>>}
 */
export const router = async (message, metadata) => {
  const investigation = metadata?.context?.investigation || null

  // only include the tools relevant to the contet state
  const tools = routerCommonTools.concat(!!investigation ?  routerInvIsSetTools : routerInvIsNotSetTools )

  const llmChain = new LLMChain({
    // @ts-ignore
    prompt: new CustomPromptTemplate({
      tools,
      inputVariables: ["input", "agent_scratchpad", "chat_history","context"],
    }),
    // outputParser: new RouterChainParser(),
    llm: new OpenAI({ temperature: 0 })
  });

  const agent = new RouterActionAgent({
    llmChain,
    useObjectKeys: ["investigation"],
    outputParser: new ZeroShotAgentOutputParser(),
    stop: ["\nObservation"]
  });

  const executor = new AgentExecutor({
    agent,
    // @ts-ignore
    tools,
    memory: establishMemory(metadata.clientMemory),
    verbose:true
  });


  const {output} = await executor.call({ message, metadata });
  return output
};



