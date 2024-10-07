import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" });

export async function askGPT(prompt: string) {

    const res = await groq.chat.completions.create(
        {
            messages: [{
                role: "user",
                content: prompt,
            }],
            model: "llama3-70b-8192"
        })

    return res.choices[0]?.message?.content;
}
