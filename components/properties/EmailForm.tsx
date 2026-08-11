"use client";

import Image from "next/image";
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/button";
import { LuSend } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

interface EmailFormProps {
  name: string;
  image: string;
  email: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: number;
  propertyUrl: string;
}

export default function EmailForm({
  name,
  image,
  email,
  propertyTitle,
  propertyLocation,
  propertyPrice,
  propertyUrl,
}: EmailFormProps) {
  const [values, setValues] = useState<InputValues>({
    email: "",
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email || !values.message || !values.name || !values.phone) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/send-email", {
        ownerEmail: email,
        ownerName: name,
        propertyTitle,
        propertyLocation,
        propertyPrice,
        propertyUrl,
        senderEmail: values.email,
        senderName: values.name,
        message: values.message,
        senderPhone: values.phone,
      });

      toast.success("Message sent successfully");

      setValues({
        email: "",
        name: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={sendEmail}
        className="sticky top-28 rounded-3xl border border-black/5 bg-card p-8 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="User"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />

          <div>
            <h3 className="text-xl font-bold text-text">{name}</h3>
            <p className="text-text/60">Property Agent</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Input
            onChange={handleChange}
            id="contact-name"
            label="Your Name"
            name="name"
            value={values.name}
          />

          <Input
            onChange={handleChange}
            id="contact-email"
            label="Your Email"
            name="email"
            value={values.email}
          />

          <Input
            onChange={handleChange}
            id="contact-phone"
            label="Your Phone"
            name="phone"
            value={values.phone}
          />

          <Input
            onChange={handleChange}
            id="contact-message"
            label="Your Message"
            name="message"
            value={values.message}
            as="textarea"
          />
        </div>

        <Button loading={loading} fullWidth className="mt-3" icon={<LuSend />}>
          Send mail
        </Button>
      </form>
    </div>
  );
}
