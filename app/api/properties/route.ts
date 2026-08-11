import { prisma } from "@/app/database/db";
import { getCurrentUser } from "@/server-action/getCurrentUser";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const propertyType = formData.get("propertyType") as string;
    const listingType = formData.get("listingType") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const parkingSpaces = formData.get("parkingSpaces") as string;
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const area = formData.get("area") as string;
    const image = formData.get("image") as File;

    if (
      !title ||
      !description ||
      !price ||
      !propertyType ||
      !listingType ||
      !bedrooms ||
      !bathrooms ||
      !parkingSpaces ||
      !location ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        {
          error: "All required fields must be provided",
        },
        {
          status: 400,
        },
      );
    }

    // Image Upload to cloud using cloudinary
    const imageDate: CloudinaryUploadResult = await uploadToCloudinary(image);
    await prisma.property.create({
      data: {
        title,
        price: Number(price),
        description,
        propertyType,
        listingType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        parkingSpaces: Number(parkingSpaces),
        location,
        address,
        area: area ? Number(area) : null,
        image: imageDate.secure_url,
        ownerId: currentUser.id,
      },
    });
    return NextResponse.json(
      {
        message: "Property created successfully",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    {
      error: "Something went wrong",
    },
    {
      status: 500,
    },
  );
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search");
    const propertyType = searchParams.get("propertyType");
    const location = searchParams.get("location");
    const address = searchParams.get("address");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const properties = await prisma.property.findMany({
      where: {
        ...(propertyType && {
          propertyType,
        }),
        ...(location && {
          location: {
            contains: location,
            mode: "insensitive",
          },
        }),
        ...(address && {
          address: {
            contains: address,
            mode: "insensitive",
          },
        }),

        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice && {
                  gte: Number(minPrice),
                }),
                ...(maxPrice && {
                  lte: Number(maxPrice),
                }),
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    {
      error: "Something went wrong",
    },
    {
      status: 500,
    },
  );
}
