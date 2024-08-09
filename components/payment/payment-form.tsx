"use client";
import { Input } from "../ui/input";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckoutSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      ccnumber: "",
      ccexpiry: "",
      cccvv: "",
      cardholderName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      paymentTokenId: "",
    },
  });
  //@ts-ignore
  const stripSensitiveData = (data) => {
    const { ccnumber, ccexpiry, cccvv, ...strippedData } = data;
    return strippedData;
  };

  // const { pending } = useFormStatus();

  const onSubmit = async (mydata: z.infer<typeof CheckoutSchema>) => {
    setLoading(true);
    setErrorMessage("");
    // @ts-ignore
    const data_response = await postData();
    const dataToSend = stripSensitiveData(mydata);

    fetch("/api/make-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mydata: dataToSend, data_response }),
    })
      .then((res) => {
        console.log("Response from gateway", res);
        if (res.ok) {
          return res;
        } else {
          return res.json().then((errorData) => {
            throw new Error(
              errorData.message ||
                "Payment failed. Please refresh the page and try again."
            );
          });
        }
      })
      .then(() => {
        router.push("/dr-hoppe/thankyou");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CardWrapper
      label="Complete your purchase"
      title="Checkout"
      backButtonLabel="Powered by Das Payments"
      backButtonHref="https://dasconsultantsusa.com/"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {errorMessage && (
              <div className="text-red-600 text-center">{errorMessage}</div>
            )}
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Contact Info</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className=" col-span-4">
                <FormField
                  control={form.control}
                  name="ccnumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">
                        Credit Card Information
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0000 0000 0000 0000"
                          id="ccnumber"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="cccvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="cvv" id="cccvv" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="ccexpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="mm/yy" id="ccexpiry" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-span-4 space-y-3">
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">
                      Billing Information
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="City" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingState"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="State" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingZip"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Zip" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              id="payButton"
              className="col-span-4 w-full text-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="col-span-4 w-full text-xl">
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-full text-xl animate-spin" />
                    Processing
                  </Button>
                </span>
              ) : (
                "Purchase for $360"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default PaymentForm;
