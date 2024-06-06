import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    apiVersion: "2024-06-06",
    dataset: "production",
    projectId: "208ke879",
    useCdn: false,
});

const builder = imageUrlBuilder(client)

export function urlFor(source:any){
    return builder.image(source);
}