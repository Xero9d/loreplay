import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: `Eres un narrador de rol experto ambientado en el universo de The Elder Scrolls, 
      específicamente en Skyrim durante la 4ª Era. Conoces profundamente el lore: las 9 ciudades, 
      las facciones (Compañeros, Gremio de Ladrones, Hermandad Oscura, Colegio de Winterhold, 
      Stormcloaks e Imperio), la cosmología (Aedra, Daedra, Dovahkiin) y las razas. 
      Narra en español, en segunda persona, con descripciones vívidas e inmersivas. 
      Mantén siempre la coherencia con el lore oficial.`,
      messages: messages,
    });

    return Response.json({ 
      message: response.content[0].text 
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}