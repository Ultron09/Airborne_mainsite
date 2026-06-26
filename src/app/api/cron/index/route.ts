import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Prevent caching
export const maxDuration = 60; // Max allowed for Vercel Hobby tier

export async function GET(request: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://airbornehrs.in";
    const indexNowKey = process.env.INDEXNOW_KEY || "71701e4a179549cd9da1ce73b9cece41";
    const host = siteUrl.replace(/^https?:\/\//, ""); // strip http:// or https://

    // List of static paths we want search engines to crawl frequently
    const staticPaths = [
      "",
      "/blog",
      "/privacy-policy",
      "/terms-and-conditions",
    ];

    const locales = ["en", "hi", "ar", "es", "fr", "nl", "ja", "zh"];
    const urls: string[] = [];

    // Add localized variations for sitemaps/crawlers
    for (const path of staticPaths) {
      for (const locale of locales) {
        urls.push(`${siteUrl}/${locale}${path}`);
      }
      // Also add fallback root path
      urls.push(`${siteUrl}${path || "/"}`);
    }

    // Fetch all published blog posts from the database to ensure all current posts are index-requested
    let publishedPosts: { slug: string }[] = [];
    try {
      publishedPosts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true }
      });
    } catch (dbErr) {
      console.error("Database query failed in index cron:", dbErr);
    }

    for (const post of publishedPosts) {
      for (const locale of locales) {
        urls.push(`${siteUrl}/${locale}/blog/${post.slug}`);
      }
    }

    console.log(`Pinging IndexNow with ${urls.length} URLs...`);

    // Ping the IndexNow API
    const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "charset": "utf-8"
      },
      body: JSON.stringify({
        host: host,
        key: indexNowKey,
        keyLocation: `${siteUrl}/${indexNowKey}.txt`,
        urlList: urls,
      }),
    });

    const responseStatus = indexNowResponse.status;
    const responseText = await indexNowResponse.text();

    console.log(`IndexNow bulk ping finished. Status: ${responseStatus}. Response: ${responseText}`);

    return NextResponse.json({
      success: responseStatus === 200,
      status: responseStatus,
      response: responseText,
      urlsPingedCount: urls.length,
      urls: urls.slice(0, 10), // Return a sample of the URLs sent
    });
  } catch (error: any) {
    console.error("Indexing Cron Job Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
