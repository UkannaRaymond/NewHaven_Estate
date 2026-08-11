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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  IMAGE: 4,
  PRICING: 5,
};

export default function CreatePropertyModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(STEPS.TYPE);
  const { isOpen, close } = useCreatePropertModalStore();

  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpace, setParkingSpace] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");

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

  const handleClose = () => {
    setPrice("");
    setBathrooms(1);
    setBedrooms(1);
    setParkingSpace(0);
    setPropertyType("");
    setLocation("");
    setAddress("");
    setArea("");
    setTitle("");
    setFeatures("");
    setDescription("");
    setImage(null);
    setPreviewImage(null);
    setStep(STEPS.TYPE);
    close();
  };

  const createListing = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("bedrooms", bedrooms.toString());
      formData.append("bathrooms", bathrooms.toString());
      formData.append("parkingSpaces", parkingSpace.toString());
      formData.append("location", location);
      formData.append("address", address);
      formData.append("area", area);
      formData.append("features", features);

      if (image) {
        formData.append("image", image);
      }

      await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property created successfully");
      router.replace("/properties");
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            "An error occurred while creating the listing",
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={close} isOpen={isOpen} title="Create a new listing">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 rounded-xl border border-dashed border-gray-300 p-6 text-gray-400">
        {step === STEPS.TYPE && (
          <div className="grid max-h-[50vh] w-full grid-cols-2 gap-4 overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                key={item.slug}
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() => setPropertyType(item.slug)}
              />
            ))}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="w-full space-y-6">
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
              subTitle="How many parking spaces"
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
              name="title"
              label="Property Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />

            <Input
              name="features"
              label="Property Features"
              value={features}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFeatures(e.target.value)
              }
            />

            <Input
              as="textarea"
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
              className="h-13 w-full rounded-2xl border border-black/10 px-4"
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
