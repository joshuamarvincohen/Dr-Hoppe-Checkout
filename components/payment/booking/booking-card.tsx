import React from "react";
import { Button } from "@/components/ui/button";
import CardWrapper from "../card-wrapper";

interface BookingCardProps {
  isExistingPatient: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ isExistingPatient }) => {
  console.log("isExistingPatient:", isExistingPatient); // Add this line

  // Dynamically set URLs based on isExistingPatient
  const zoomLink = isExistingPatient
    ? "https://app.elationemr.com/book/drdianahoppe?appointment_types=759220401930345"
    : "https://app.elationemr.com/book/drdianahoppe/new-patient-consultation-zoom";

  const phoneLink = isExistingPatient
    ? "https://app.elationemr.com/book/drdianahoppe?appointment_types=759220521009257"
    : "https://app.elationemr.com/book/drdianahoppe/new-patient-consultation---phone";

  return (
    <CardWrapper
      label="Please select an option"
      title="Schedule your appointment"
      backButtonLabel="Powered by Das Payments"
      backButtonHref="https://daspayusa.com"
    >
      <div className="flex items-center justify-center p-8">
        <Button asChild>
          <a href={zoomLink} target="_blank" rel="noopener noreferrer">
            Book a zoom appointment
          </a>
        </Button>
      </div>
      <div className="flex items-center justify-center p-8">
        <Button asChild>
          <a href={phoneLink} target="_blank" rel="noopener noreferrer">
            Book a phone appointment
          </a>
        </Button>
      </div>
    </CardWrapper>
  );
};

export default BookingCard;