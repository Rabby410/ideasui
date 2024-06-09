import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/lib/interface";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Head from "next/head";

export const revalidate = 30;

async function getData(slug: string) {
    const query = `
    *[_type =="blog" && slug.current == "${slug}"]{
        "currentSlug": slug.current,
          title,
          smallDescription,
          content,
          titleImage
      }[0]`;
    const data = await client.fetch(query);
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const data: fullBlog = await getData(params.slug);
    const pageTitle = `${data.title} - Shahadath Blog`;
    const pageDescription = data.smallDescription;
    const pageImageUrl = urlFor(data.titleImage).url();
    const pageUrl = `https://ideasui.com/blog/${data.currentSlug}`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: "Blog, Shahadath, IdeasUi, Technology, Articles",
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: pageUrl,
            type: 'article',
            images: [
                {
                    url: pageImageUrl,
                    width: 800,
                    height: 600,
                    alt: data.title
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            image: pageImageUrl,
        }
    };
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
    const data: fullBlog = await getData(params.slug);
    const pageTitle = `${data.title} - Shahadath Blog`;
    const pageDescription = data.smallDescription;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="Blog, Shahadath, IdeasUi, Technology, Articles" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={urlFor(data.titleImage).url()} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://ideasui.com/blog/${data.currentSlug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={urlFor(data.titleImage).url()} />
            </Head>
            <div className="container mx-auto my-8">
                <header>
                    <h1 className="block text-base text-center text-primary font-semibold tracking-wide uppercase flex justify-center items-center">
                        <img src="/logo-owl-removebg.png" alt="IdeasUi Logo" className="h-[60px] w-[80px]" /> Shahadath - Blog
                    </h1>
                    <h2 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</h2>
                </header>
                <div className="flex justify-center mt-5">
                    <Image src={urlFor(data.titleImage).url()} alt={`${data.title} image`} height={800} width={800} className="rounded-t-lg mt-8 border" priority />
                </div>
                <section>
                    <p className="mt-5 text-justify prose-blue prose-lg dark:prose-invert">{data.smallDescription}</p>
                    <article className="mt-16 prose-headings:font-bold text-justify prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                        <PortableText value={data.content} />
                    </article>
                </section>
            </div>
        </>
    );
}
