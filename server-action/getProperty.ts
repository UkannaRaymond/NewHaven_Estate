import { prisma } from "@/app/database/db";

export async function getProperty(propertyId: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!property) {
      return null;
    }
    return property;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
}
