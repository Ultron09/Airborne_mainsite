"use server";

import prisma from "@/lib/prisma";

export async function submitDemoRequest(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    await prisma.demoRequest.create({
      data: {
        email
      }
    });

    // Send NTFY Notification for new inquiry
    try {
      const topic = process.env.NTFY_TOPIC || "airborne_blogs_live";
      await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body: `New Lead Captured: ${email}\n\nCheck the database to contact them.`,
        headers: {
          "Title": "New Airborne Inquiry",
          "Tags": "incoming_envelope,briefcase",
          "Priority": "high"
        }
      });
    } catch (notifyErr) {
      console.error("Failed to trigger NTFY for demo request:", notifyErr);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit demo request:", error);
    return { success: false, error: "Internal server error" };
  }
}
