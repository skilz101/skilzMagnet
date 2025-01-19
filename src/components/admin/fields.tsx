"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FieldInterface {
  name: boolean | undefined;
  email: boolean | undefined;
  phoneNumber: boolean | undefined;

  onNameChange: (value: boolean) => void;
  onEmailChange: (value: boolean) => void;
  onPhoneNumberChange: (value: boolean) => void;
}

export default function FormFields({
  name,
  email,
  phoneNumber,
  onNameChange,
  onEmailChange,
  onPhoneNumberChange,
}: FieldInterface) {
  const [localName, setLocalName] = useState<boolean>(name || false);
  const [localEmail, setLocalEmail] = useState<boolean>(email || false);
  const [localPhoneNumber, setLocalPhoneNumber] = useState<boolean>(
    phoneNumber || false,
  );

  // Synchronize props with local state when they change
  useEffect(() => {
    setLocalName(name || false);
  }, [name]);

  useEffect(() => {
    setLocalEmail(email || false);
  }, [email]);

  useEffect(() => {
    setLocalPhoneNumber(phoneNumber || false);
  }, [phoneNumber]);

  return (
    <div className="flex flex-col space-y-3">
      {/* Name Checkbox */}
      <div className="flex space-x-3">
        <Checkbox
          id="name"
          onCheckedChange={(checked) => {
            const isChecked = checked === true; // Ignore "indeterminate"
            setLocalName(isChecked);
            onNameChange(isChecked);
          }}
          checked={localName}
        />
        <Label htmlFor="name">Name</Label>
      </div>

      {/* Email Checkbox */}
      <div className="flex space-x-3">
        <Checkbox
          id="email"
          onCheckedChange={(checked) => {
            const isChecked = checked === true; // Ignore "indeterminate"
            setLocalEmail(isChecked);
            onEmailChange(isChecked);
          }}
          checked={localEmail}
        />
        <Label htmlFor="email">Email</Label>
      </div>

      {/* Phone Number Checkbox */}
      <div className="flex space-x-3">
        <Checkbox
          id="phoneNumber"
          onCheckedChange={(checked) => {
            const isChecked = checked === true; // Ignore "indeterminate"
            setLocalPhoneNumber(isChecked);
            onPhoneNumberChange(isChecked);
          }}
          checked={localPhoneNumber}
        />
        <Label htmlFor="phoneNumber">Phone Number</Label>
      </div>
    </div>
  );
}
