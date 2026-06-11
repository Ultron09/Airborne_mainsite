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

    try {
      const topic = process.env.NTFY_TOPIC || "airborne_new_enquiries";
      await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body: `New Demo Request: ${email}`,
        headers: {
          "Title": "New Enquiry Received!",
          "Tags": "tada,email"
        }
      });
    } catch (notifyError) {
      console.error("Failed to send ntfy notification:", notifyError);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit demo request:", error);
    return { success: false, error: "Internal server error" };
  }
}
