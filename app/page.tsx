import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  * [_type == 'blog'] | order(_createdAt desc){
    category,
    title,
    smallDescription,
    "currentSlug" : slug.current,
    titleImage
  }
  `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 30;

export async function generateMetadata() {
  const data: simpleBlogCard[] = await getData();
  const title = "Ideas UI";
  const description = "Innovating Tomorrow, Today. Discover the latest blog posts on various topics. Stay updated with fresh content and insightful articles.";
  const imageUrl = "https://ideasui.com/ideasui.png";
  const keywords = "Blog, Articles, News, Updates, Technology, Lifestyle";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      keywords,
      url: 'https://ideasui.com',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      keywords,
      image: imageUrl,
    },
  };
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <>
      <div className="container mx-auto pb-20">
        {data.length > 0 && (
          <>
            <div className="flex flex-wrap lg:flex-nowrap common-box mt-[33px] mb-[48px] mx-4 md:mx-0">
              <Image
                src={urlFor(data[0].titleImage).url()}
                alt="News"
                className="w-full md:w-auto md:flex-none rounded-l-2xl"
                width={700}
                height={400}
              />
              <div className="pl-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-[20px] md:text-[32px] font-bold leading-tight md:leading-[40px]">{data[0].title}</h2>
                  <p className="my-5">{data[0].smallDescription}</p>
                  <Button asChild className="mt-4 ">
                    <Link href={`/blog/${data[0].currentSlug}`} legacyBehavior>
                      <a href="#" className="flex items-center text-primary">
                        <span className="inline-block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-md mt-4 transition duration-200 ease-in-out">Read More</span>
                      </a>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mx-4 lg:mx-0">
          {data.slice(1).map((post, idx) => (
            <article key={idx} className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={`${post.title} image`}
                  width={500}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold mb-3">{post.title}</h3>
                <p className="flex-grow text-gray-600 text-sm line-clamp-3">{post.smallDescription}</p>
                <Button asChild className="mt-auto">
                  <Link href={`/blog/${post.currentSlug}`} passHref legacyBehavior>
                    <a className="inline-block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-md mt-4 transition duration-200 ease-in-out">
                      Read More
                    </a>
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
