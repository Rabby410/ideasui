import { simpleBlogCard } from "@/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client, urlFor } from "../lib/sanity";

async function getData() {
  const query = `
  * [_type == 'blog'&& category._ref == "b543d278-6b98-4ead-baf0-62b615224fae"] | order(_createdAt desc){
  category,
  title,
  smallDescription,
  "currentSlug" : slug.current,
  titleImage
}
  `

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 30;

export default async function BdNewsBlogs() {
  const data: simpleBlogCard[] = await getData()

  return (
    <>

      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {data.map((post, idx) =>
            <Card key={idx}>
              <Image src={urlFor(post.titleImage).url()} alt="image" height={500} width={500} className="rounded-t-lg h-[200px] object-cover" />
              <CardContent className="mt-5">
                <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
                <p className="line-clamp-3 text-sm mt-3 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
                <Button asChild className="w-full mt-7">
                  <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
