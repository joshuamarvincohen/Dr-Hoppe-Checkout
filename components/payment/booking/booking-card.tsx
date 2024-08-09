import React, { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CardWrapper from "../card-wrapper";
import { Loader2 } from "lucide-react";

const BookingCard = () => {
  const [loadingState, setLoadingState] = useState({
    button1: false,
    button2: false,
  });

  const handleClick = (buttonKey: "button1" | "button2", url: string) => {
    setLoadingState((prevState) => ({ ...prevState, [buttonKey]: true }));
    // Simulate a network request or delay
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <CardWrapper
      label="Please select an option"
      title="Schedule your first appointment"
      backButtonLabel="Powered by Das Payments"
      backButtonHref="https://daspayusa.com"
    >
      <div className="flex items-center justify-center p-8">
        <Button
          onClick={() =>
            handleClick(
              "button1",
              "https://app.elationemr.com/book/drdianahoppe/new-patient-consultation-zoom"
            )
          }
          disabled={loadingState.button1}
        >
          {loadingState.button1 ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading zoom booking page
            </>
          ) : (
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Book a zoom appointment
            </Link>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-center p-8">
        <Button
          onClick={() =>
            handleClick(
              "button2",
              "https://app.elationemr.com/book/drdianahoppe/new-patient-consultation---phone"
            )
          }
          disabled={loadingState.button2}
        >
          {loadingState.button2 ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading phone booking page
            </>
          ) : (
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Book a phone appointment
            </Link>
          )}
        </Button>
      </div>
    </CardWrapper>
  );
};

export default BookingCard;
