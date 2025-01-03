import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const data = await request.json();

  // Helper function to format phone number
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-numeric characters
    const numericPhone = phoneNumber.replace(/\D/g, "");
    // Ensure it starts with +1
    return `+1${numericPhone}`;
  };

  const uniqueId = uuidv4().replace(/-/g, "").slice(0, 20); //generate unique transaction ID
  console.log("unique Id", uniqueId);
  console.log("data", data);

  // Format customer mobile number
  const formattedMobileNumber = formatPhoneNumber(data.mydata.phone);

  const dejavoo_data: object = {
    merchantAuthentication: {
      merchantId: process.env.DEJAVOO_TPN,
      transactionReferenceId: uniqueId,
    },
    transactionRequest: {
      transactionType: 1,
      amount: data.amount,
      cardToken: "",
      paymentTokenId: data.data_response.payment_token_id,
      applySteamSettingTipFeeTax: false,
      requestCardToken: true,
    },
    preferences: {
      eReceipt: true,
      customerName: data.mydata.cardholderName,
      customerEmail: data.mydata.email,
      customerMobile: formattedMobileNumber,
    },
    AVS: {
      StreetNo: "",
      zip: data.mydata.billingZip,
    },
  };
  console.log(dejavoo_data);

  //   data.response.paymentTokenId;
  console.log("dejavoo_data:", dejavoo_data);

  const response = await fetch(
    "https://payment.ipospays.com/api/v1/iposTransact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${process.env.DEJAVOO_KEY}`,
      },
      body: JSON.stringify(dejavoo_data),
    }
  );
  const responseData = await response.json();
  console.log("response===>", responseData);

  if (responseData.iposhpresponse.responseCode === "200") {
    return NextResponse.json(responseData, { status: 200 });
  } else {
    return NextResponse.json(responseData, { status: 400 });
  }
  // } catch (error) {
  //   console.log("error", error);
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  //   .then((res) => {
  //     console.log("response===>", res);
  //     res.json().then((data) => console.log("json done", data));
  //     return data;
  //   })
  //   .catch((e) => {
  //     console.log("error", e);
  //     return e;
  //   });

  // {
  // }
  // return new Response();
}
//   return new Response("fetching payment");

// fetch('https://payment.ipospays.tech/api/v1/iposTransact', {
// method: 'POST',
// headers: {
//     'Content-Type': 'application/json',
//     "token": process.env.DEJAVOO_key
// },
// body: JSON.stringify(data)
// return NextResponse.json({ data: "hello"}),

// })}
