export type Property = {
  id: string;

  title: string;
  description: string;

  propertyType: string;
  listingType: string;

  price: number;

  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  area: number | null;

  location: string;
  address: string;

  image: string;

  createdAt: Date;
  updatedAt: Date;

  ownerId: string;
};
