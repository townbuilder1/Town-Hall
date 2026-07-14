import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function myCustomTranslator(text, direction = "to_feni") {
    if (direction === "to_feni") {
        return text;
    }
    return text;
}

export async function POST(request) {
    try {
        const { message, sessionId } = await request.json();
        
        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
        }

        const memoryKey = `memory:${sessionId}`;
        let userMemory = await redis.get(memoryKey) || "No critical information known about this user yet.";

        const extractResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { 
                        role: "system", 
                        content: `You are a memory processor. Analyze the user's current message and the existing knowledge about them. If the user mentions any important long-term facts about themselves (like name, location, occupation, critical preference, or core problem), update the knowledge base. Respond ONLY with the updated bullet points. If no new important facts are shared, respond exactly with the existing knowledge.` 
                    },
                    { role: "user", content: `Existing Knowledge:\n${userMemory}\n\nUser Message: ${message}` }
                ]
            })
        });

        const extractData = await extractResponse.json();
        const updatedMemory = extractData.choices[0].message.content.trim();
        
        if (updatedMemory && updatedMemory !== userMemory) {
            await redis.set(memoryKey, updatedMemory);
            userMemory = updatedMemory;
        }

        const chatResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { 
                        role: "system", 
                        content: `Your name is Jarvis. You are the AI assistant for the Town Hall website. Here is the permanent core memory you recall about this user: ${userMemory}` 
                    },
                    { role: "user", content: message }
                ]
            })
        });

        const chatData = await chatResponse.json();
        const aiOutput = chatData.choices[0].message.content;
        const finalResponse = myCustomTranslator(aiOutput, "to_feni");

        return NextResponse.json({ reply: finalResponse });
    } catch (error) {
        return NextResponse.json({ error: "Service Temporary Unavailable." }, { status: 500 });
    }
}