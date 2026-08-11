import { prisma } from "@/app/database/db";

export async function getRecentProperties() {
  try {
    const properties = await prisma.property.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    console.error("Failed to fetch latest properties", error);
    return [];
  }
}
