"use client";

import { useFilterModalStore } from "@/store/useFilterModalstore";
import Modal from "./Modal";
import { Suspense, useEffect, useState } from "react";
import { propertyTypes } from "@/constants/PropertyTypes";
import PropertyTypeCard from "../layout/PropertyTypeCard";
import Button from "../ui/button";
import Input from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICE: 2,
};

function FilterModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, close } = useFilterModalStore();
  const [step, setStep] = useState(STEPS.TYPE);
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "",
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [address, setAddress] = useState(searchParams.get("address") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    if (isOpen) {
      setPropertyType(searchParams.get("propertyType") || "");
      setLocation(searchParams.get("location") || "");
      setAddress(searchParams.get("address") || "");
      setMinPrice(searchParams.get("minPrice") || "");
      setMaxPrice(searchParams.get("maxPrice") || "");
      setStep(STEPS.TYPE);
    }
  }, [isOpen, searchParams]);

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Select property location";
      case STEPS.PRICE:
        return "Select property price range";

      default:
        return "";
    }
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (location) params.set("location", location);
    else params.delete("location");

    if (address) params.set("address", address);
    else params.delete("address");

    if (propertyType) params.set("propertyType", propertyType);
    else params.delete("propertyType");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    router.replace(`/marketplace?${params.toString()}`);

    setStep(STEPS.TYPE);
    close();
  };

  return (
    <Modal onClose={close} isOpen={isOpen} title="Filter Properties">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 3</span>
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

        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="Min price"
                label="Minimum Price"
                type="number"
                value={minPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(e.target.value)
                }
              />
            </div>
            <div>
              <Input
                name="Max price"
                label="Maximum Price"
                type="number"
                value={maxPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(e.target.value)
                }
              />
            </div>
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
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilter()
          }
        >
          {step === STEPS.PRICE ? "Apply Filter" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}

export default function FilterModal() {
  return (
    <Suspense fallback={null}>
      <FilterModalContent />
    </Suspense>
  );
}
