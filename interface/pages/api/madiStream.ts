import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

const API_HOST = process.env.API_HOST || 'localhost'
const API_PORT = process.env.API_PORT || 3030
console.log(API_HOST, API_PORT)
export const MadiStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();


  console.log(`http://${API_HOST}:${API_PORT}/v1/chat/completions`)
  const res = await fetch(`http://${API_HOST}:${API_PORT}/v1/chat/completions`, {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', //OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: `You are a helpful, friendly, assistant.`
        },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.0,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        let decoded = decoder.decode(chunk)
        parser.feed(decoded);
      }
      console.log(parser)
    }
  });

  return stream;
};
