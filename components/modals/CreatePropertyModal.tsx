"use client";

import { useCreatePropertModalStore } from "@/store/useCreatePropertyModal";
import Modal from "./Modal";
import { useState } from "react";
import Button from "../ui/button";
import { propertyTypes } from "@/constants/PropertyTypes";
import PropertyTypeCard from "../layout/PropertyTypeCard";
import Input from "../ui/Input";
import Counter from "../properties/Counter";
import ImageUpload from "../properties/ImageUpload";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  IMAGE: 4,
  PRICING: 5,
};

export default function CreatePropertyModal() {
  const [step, setStep] = useState(STEPS.TYPE);
  const { isOpen, close } = useCreatePropertModalStore();

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Where is the property located";
      case STEPS.DETAILS:
        return "Share some basics about your place";
      case STEPS.FEATURES:
        return "Property description";
      case STEPS.IMAGE:
        return "Upload property image";
      case STEPS.PRICING:
        return "Set property price";

      default:
        return "";
    }
  };

  const handleChangeImage = (file: File) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const createListing = async () => {};
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpace, setParkingSpace] = useState(0);
  const [area, setArea] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");

  return (
    <Modal onClose={close} isOpen={isOpen} title="Create a new listing">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() => setPropertyType(item.slug)}
                key={item.slug}
              />
            ))}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="space-y-6 w-full">
            <Input
              name="location"
              label="Location"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              name="address"
              label="Address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms"
              value={bathrooms}
              onChange={setBathrooms}
            />
            <Counter
              title="Parking Space"
              subTitle="How many parking space"
              value={parkingSpace}
              onChange={setParkingSpace}
            />

            <Input
              name="area"
              label="Property Area (sqft)"
              type="number"
              value={area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArea(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.FEATURES && (
          <div className="space-y-6">
            <Input
              name="features"
              label="Property Features"
              value={features}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFeatures(e.target.value)
              }
            />
            <Input
              name="description"
              label="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.IMAGE && (
          <ImageUpload
            previewImage={previewImage}
            onChange={handleChangeImage}
          />
        )}

        {step === STEPS.PRICING && (
          <div className="space-y-6">
            <select
              name="listingType"
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
              className="w-full h-13 border border-black/10 rounded-2xl px-4"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <Input
              name="price"
              label={listingType === "sale" ? "Sale Price" : "Monthly Rent"}
              type="number"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}

        <Button
          fullWidth
          onClick={() =>
            step < STEPS.PRICING ? setStep((prev) => prev + 1) : createListing()
          }
          loading={loading}
        >
          {step === STEPS.PRICING ? "Create listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}
