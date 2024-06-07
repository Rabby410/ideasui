import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/lib/interface";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function  getData(slug:string) {
    const query= `
    *[_type =="blog" && slug.current =="${slug}"]{
        "currentSlug": slug.current,
          title,
          smallDescription,
          content,
          titleImage
      }[0]`;
      const data = await client.fetch(query);
      return data;
}

export default async function BlogArticle({params}: {params: {slug: string}}){
    const data: fullBlog = await getData(params.slug)
    return (
        <>
        <div className="container mx-auto my-8">
            <h1 className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Shahadath -Blog</h1>
            <h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</h1>
            <div className="flex justify-center mt-5">
            <Image src={urlFor(data.titleImage).url()} alt="Title image" height={800} width={800} className="rounded-t-lg mt-8 border" priority />
            </div>
            <p className="mt-5 text-justify prose-blue prose-lg dark:prose-invert">{data.smallDescription}</p>
            <div className="mt-16 prose-headings:font-bold text-justify prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
        </>
    )
}