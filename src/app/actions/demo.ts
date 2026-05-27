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
    return { success: true };
  } catch (error) {
    console.error("Failed to submit demo request:", error);
    return { success: false, error: "Internal server error" };
  }
}
