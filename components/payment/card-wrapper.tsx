"use client";

import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import BackButton from "./back-button";
import PaymentCardHeader from "./payment-card-header";

interface CardWrapperProps {
  label: string;
  title: string;
  backButton: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  label,
  title,
  backButtonLabel,
  backButtonHref,
  children,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <PaymentCardHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
