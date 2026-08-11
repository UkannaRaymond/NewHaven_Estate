import { prisma } from "../app/database/db";
import { getCurrentUser } from "./getCurrentUser";

export async function getUserProperties() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return [];
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return properties;
  } catch (error) {
    console.error("Error fetching user properties:", error);
    return [];
  }
}
