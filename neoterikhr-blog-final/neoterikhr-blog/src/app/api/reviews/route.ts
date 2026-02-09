import { prisma } from "@/lib/prisma";
import { seedReviews } from "@/lib/data";

export async function GET() {
  await seedReviews();
  const reviews = await prisma.review.findMany();
  return Response.json(reviews);
}