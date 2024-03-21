import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import movies from "./movies.json" assert { type: "json" };

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.plot}\n${movie.genre}`,
          metadata: { source: movie.id, title: movie.title },
        })
    ),
    new OpenAIEmbeddings()
  );

export const search = async (query, count = 1) => {
  const store = await createStore();
  return store.similaritySearch(query, count);
};

console.log(await search("companionship"));
