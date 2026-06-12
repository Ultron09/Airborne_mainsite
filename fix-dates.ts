import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: {
      generationStatus: "COMPLETED",
    },
  });

  for (const post of posts) {
    if (post.updatedAt > post.publishAt) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          publishAt: post.updatedAt,
        },
      });
      console.log(`Updated post: ${post.title}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
