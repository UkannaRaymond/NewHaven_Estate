"use client";

import { useFilterModalStore } from "@/store/useFilterModalstore";
import Modal from "./Modal";
import { useState } from "react";
import { propertyTypes } from "@/constants/PropertyTypes";
import PropertyTypeCard from "../layout/PropertyTypeCard";
import Button from "../ui/button";
import Input from "../ui/Input";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICE: 2,
};

export default function FilterModal() {
  const { isOpen, close } = useFilterModalStore();
  const [step, setStep] = useState(STEPS.TYPE);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");

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

  const applyFilter = () => {};

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
                value={minprice}
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
                value={maxprice}
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
