import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `
Rules:
{rules}
---
Surrounding Hex Information:
(ignore undefined hexes)
{adjHexes}
---
Current Hex Information:
{currentHex}
---
Current conversation:
{chat_history}
---
User: {input}
AI:`;

type HexChatBody = {
    currentHex: string,
    adjHexes: string
    messages: VercelChatMessage[]
}

export async function POST(req: NextRequest) {
    const body = await req.json() as HexChatBody;
    const currentHex = body.currentHex
    const adjHexes = body.adjHexes

    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
        modelName: "gpt-4",
        temperature: 0.3,
        maxTokens: 1000,
        topP: 1,
        frequencyPenalty: 0.5,
        presencePenalty: 0.5,
    });

    const outputParser = new BytesOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    let ruleSet = "You are a dungeon master's assistant. Each hex should be unique and have an encounter within them. You can use the surrounding hexes for context. respond with terse bullet points"

    const stream = await chain.stream({
        rules: ruleSet,
        adjHexes: adjHexes,
        currentHex: currentHex,
        chat_history: formattedPreviousMessages.join('\n'),
        input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
}