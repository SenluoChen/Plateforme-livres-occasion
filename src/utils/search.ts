import OpenAI from "openai";
import { livres, Livre } from "../data/livres";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function searchBooks(userQuery: string): Promise<Livre[]> {
  const systemPrompt = `
  Tu es un moteur de recherche de livres d'occasion.
  Voici la liste des livres disponibles :
  ${livres
    .map(
      (b) =>
        `ID: ${b.id}, Titre: ${b.titre}, Catégorie: ${b.categorie}, Langue: ${b.langue}, Prix: ${b.prix}€, Condition: ${b.condition}, Description: ${b.description}`
    )
    .join("\n")}
  
  L'utilisateur va te donner une description ou envie. 
  Retourne uniquement **3 livres les plus pertinents** en format JSON strict :
  [{"id":1,"titre":"Nom"}]
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuery },
    ],
  });

  try {
    const text = response.output_text;
    const minimalResults: { id: number; titre: string }[] = JSON.parse(text);

    // 用 AI 回傳的 id 去本地 livres 找完整資料
    return minimalResults
      .map((r) => livres.find((l) => l.id === r.id))
      .filter((b): b is Livre => Boolean(b));
  } catch (e) {
    console.error("Erreur de parsing:", e);
    return [];
  }
}
