"use server";

import prisma from "@/lib/prisma";

export async function submitDemoRequest(data: { email: string; name?: string; company?: string; phone?: string; message?: string }) {
  const { email, name, company, phone, message } = data;
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    await prisma.demoRequest.create({
      data: {
        email,
        name,
        company,
        phone,
        message
      }
    });

    // Send NTFY Notification for new inquiry
    try {
      const topic = process.env.NTFY_TOPIC || "airborne_blogs_live";
      
      const payload = `New Lead Captured: ${email}
Name: ${name || 'N/A'}
Company: ${company || 'N/A'}
Phone: ${phone || 'N/A'}
Message: ${message || 'N/A'}

Check the database to contact them.`;

      await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body: payload,
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
