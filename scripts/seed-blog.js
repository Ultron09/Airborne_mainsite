const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with a sample blog post...');

  const slug = 'future-of-neuromorphic-hr';
  
  // Check if it already exists
  const existingPost = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (existingPost) {
    console.log('Sample blog post already exists.');
    return;
  }

  const post = await prisma.blogPost.create({
    data: {
      title: 'The Future of Neuromorphic HR Architecture',
      slug,
      summary: 'Explore how deep data networks and artificial consciousness are merging to create the ultimate talent acquisition fabric.',
      content: `
# Architecting the Future

Neuromorphic architecture in HR is not merely about using AI to screen resumes—it's about building a fundamental **fabric of connectivity** between human potential and organizational needs. 

### Why Neuromorphic?

Neuromorphic systems mirror the human brain, allowing for:
- **Instantaneous Pattern Recognition**: Identifying the perfect candidate based on thousands of multidimensional data points.
- **Predictive Attrition Analysis**: Knowing when an employee is likely to seek new opportunities before they do.
- **Surgical Precision Placement**: Placing talent exactly where their unique combination of hard and soft skills will catalyze growth.

> "The true void presses against the edges of information. We map the chaos." - Airborne HRS

### Global Talent Nodes

By utilizing localized GEO-tags, Airborne HRS can target nodes of talent concentration. For instance, creating an engineering hub in **Chicago** requires understanding the exact radius of available talent and activating them asynchronously.

**Join the network** and start visualizing the fabric of humanity.
      `,
      published: true,
      seoTitle: 'Neuromorphic HR Architecture | Airborne HRS',
      seoDescription: 'Explore how deep data networks and artificial consciousness are merging to create the ultimate talent acquisition fabric.',
      keywords: 'Neuromorphic HR, Artificial Consciousness, Talent Network, Chicago Tech',
      targetLocation: 'Chicago, IL',
      targetRegion: 'US-IL',
      latitude: 41.8781,
      longitude: -87.6298,
      radiusKm: 50,
    },
  });

  console.log('Created sample post:', post.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
