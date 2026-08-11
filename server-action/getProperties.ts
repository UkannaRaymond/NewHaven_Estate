import axios from "axios";

export interface GetPropertiesParam {
  search?: string;
  propertyType?: string;
  location?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
}

export async function getProperties(params?: GetPropertiesParam) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`,
      {
        params: {
          search: params?.search,
          propertyType: params?.propertyType,
          address: params?.address,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          location: params?.location,
        },
      },
    );

    return data;
  } catch {
    throw new Error("Failed to fetch properties");
  }
}
