import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },
  async () => {
    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agent that say hello",
      system: "You are a helpful assistant.Always greet with enthusiasm",
      model: gemini({ model: "gemini-2.5-flash" }),
    });

    const { output } = await helloAgent.run("Say hello to user!");

    const message = output[0].type === "text" ? output[0].content : "";

    return {
      message: message,
    };
  },
);
