import * as z from "zod";

const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

export const CheckoutSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  ccnumber: z
    .string()
    .min(15, {
      message: "Please enter a valid card number",
    })
    .max(16, {
      message: "Please enter a valid card number",
    }),
  ccexpiry: z.string().regex(expiryDateRegex, {
    message: "Expiration date format must be mm/yy",
  }),
  cccvv: z
    .string()
    .max(4, {
      message: "CVV cannot exceed 4 characters",
    })
    .min(3, {
      message: "CVV must be at least 3 characters",
    }),
  cardholderName: z.string().min(1, {
    message: "Please enter full name",
  }),
  billingAddress: z.string().min(1, {
    message: "Please enter your billing address",
  }),
  billingCity: z.string().min(1, {
    message: "Please enter your billing city",
  }),
  billingState: z.string().length(2, {
    message: "Use 2 letter state format like CA",
  }),
  billingZip: z.string().length(5, {
    message: "Zip code must be 5 numbers long",
  }),
});
