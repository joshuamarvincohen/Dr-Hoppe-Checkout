import React from "react";

interface PaymentCardHeaderProps {
  label: string;
  title: string;
}

const PaymentCardHeader = ({ label, title }: PaymentCardHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl p-4 font-bold text-center max-h-full">{title}</h1>
      <p className="text-center">{label}</p>
    </div>
  );
};

export default PaymentCardHeader;
