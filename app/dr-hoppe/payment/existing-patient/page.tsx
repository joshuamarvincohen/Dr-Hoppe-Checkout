import PaymentForm from "@/components/payment/payment-form";
import Image from "next/image";

const PaymentPage = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 max-h-full max-w-full p-8">
      <div>
        <div className="grid col-span-1 max-w-lg max-h-full">
          <h1 className="col-span-1 text-2xl p-4 font-bold text-center max-h-full">
            Existing Patient Appointment - 25 min.
          </h1>
          <p className="col-span-1 text-center p-4 max-h-full">
            Following your purchase, you will be provided with two
            options to schedule your consultation via Zoom or Phone. I look
            forward to personally guiding you on your health journey.
          </p>
          <p className="col-span-1 text-center p-4 max-h-full">
            - Dr. Diana Hoppe
          </p>
          <div className="flex justify-center p-4 max-h-full">
            <Image
              src="/images/2022DoctorDiana13.jpg"
              alt="Dr Hoppe image"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="w-full min-w-md max-w-lg col-span-1 p-4">
        <PaymentForm patientType="existing-patient"amount={18000}/>
      </div>
    </div>
  );
};

export default PaymentPage;

