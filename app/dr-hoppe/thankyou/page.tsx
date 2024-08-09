"use client";

import Image from "next/image";
import BookingCard from "@/components/payment/booking/booking-card";

const ThankYouPage: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 max-h-full max-w-full p-8">
      <div className="grid col-span-1 max-w-lg max-h-full">
        <h1 className="col-span-1 text-3xl p-4 font-bold text-center max-h-full">
          Thank you for your purchase!
        </h1>

        <div className="flex justify-center p-4 max-h-full">
          <Image
            src="/images/2022DoctorDiana13.jpg"
            alt="Dr Hoppe image"
            width={300}
            height={300}
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full min-w-md max-w-lg col-span-1 p-4">
        <BookingCard />
      </div>
    </div>
  );
};

export default ThankYouPage;
