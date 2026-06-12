import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blogPostId, scrollDepth, timeSpentSec } = body;

    if (!blogPostId) {
      return NextResponse.json({ error: "Missing blogPostId" }, { status: 400 });
    }

    // Extract headers for tracking
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const country = req.headers.get("x-vercel-ip-country") || null;
    const city = req.headers.get("x-vercel-ip-city") || null;
    const region = req.headers.get("x-vercel-ip-region") || null;

    // Anonymize IP via hashing for GDPR compliance and unique tracking
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // See if an analytics record exists for this IP hash and blog post today
    // To keep it simple, we just create a new record if scroll/time was sent, or we can update the existing one.
    // For simplicity, let's just insert a new record for every POST.
    // Wait, the tracker component will send a final beacon.
    
    // Check if the blog post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: blogPostId }
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await prisma.blogAnalytics.create({
      data: {
        blogPostId,
        ipHash,
        userAgent,
        country,
        city,
        region,
        scrollDepth: Number(scrollDepth) || 0,
        timeSpentSec: Number(timeSpentSec) || 0,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in analytics API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
