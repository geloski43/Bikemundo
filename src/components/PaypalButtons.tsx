// import React, { useState } from "react";
// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   usePayPalScriptReducer,
//   FUNDING
// } from "@paypal/react-paypal-js";
// import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
// import { PayPalButtonsComponentProps } from "@paypal/paypal-js/types/components/buttons";

// const paypalScriptOptions: PayPalScriptOptions = {
//   "client-id":
//     "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
//   currency: "PHP",
//   components: "buttons,hosted-fields",
//   "data-client-token":
//     "eyJicmFpbnRyZWUiOnsiYXV0aG9yaXphdGlvbkZpbmdlcnByaW50IjoiZTRjOWNlMzRkMTEzNDU4YTIxYmYyODllZjg2OGE5NDc0MzliY2E3YWE4NGY5NWExNzQ5ZDJmMjcwZTAzNWQyZHxtZXJjaGFudF9pZD1yd3dua3FnMnhnNTZobTJuJnB1YmxpY19rZXk9NjNrdm4zN3Z0MjlxYjRkZiZjcmVhdGVkX2F0PTIwMjEtMDItMDVUMDk6Mjk6NDMuNTYzWiIsInZlcnNpb24iOiIzLXBheXBhbCJ9LCJwYXlwYWwiOnsiaWRUb2tlbiI6bnVsbCwiYWNjZXNzVG9rZW4iOiJBMjFBQUwyUlFGTmtxbHhTR0tnUURjWnJTNk9uV01yU0Jzei1UR1hlNl9rWVlHQnZXYlZxajlOTHptZnk4dHUzVFlLNHJ2M195Ti1fQW9HSkZGUm56SUY1R3ZwY1RwcWtBIn19"
// };
// function Button() {
//   const [orderID, setOrderID] = useState("");
//   /**
//    * usePayPalScriptReducer use within PayPalScriptProvider
//    * isPending: not finished loading(default state)
//    * isResolved: successfully loaded
//    * isRejected: failed to load
//    */
//   const [{ isPending }] = usePayPalScriptReducer();
//   const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
//     style: { layout: "vertical" },
//     fundingSource: FUNDING.PAYPAL,
//     createOrder(data, actions) {
//       return actions.order
//         .create({
//           purchase_units: [
//             {
//               amount: {
//                 value: "0.01"
//               }
//             }
//           ]
//         })
//         .then((orderID) => {
//           setOrderID(orderID);
//           return orderID;
//         });
//     },
//     onApprove(data, actions) {
//       /**
//        * data: {
//        *   orderID: string;
//        *   payerID: string;
//        *   paymentID: string | null;
//        *   billingToken: string | null;
//        *   facilitatorAccesstoken: string;
//        * }
//        */
//       return actions.order.capture({}).then((details) => {
//         alert(
//           "Transaction completed by" +
//           (details?.payer.name.given_name ?? "No details")
//         );

//         alert("Data details: " + JSON.stringify(data, null, 2));
//       });
//     },
//     onShippingChange(data: Record<string, unknown>, actions: object): void {
//       /**
//        * data: {
//        *   amount: {value: string; currency_code: string; breakdown: object}
//        *   orderID: string;
//        *   paymentToken: string;
//        *   shipping_address: {
//        *     city: string;
//        *     country_code: string;
//        *     postal_code: string;
//        *     state: string;
//        *   }
//        * }
//        */
//       console.log("ShippingChange Data:", data);
//       console.log("ShippingChange Actions: ", actions);
//     },
//     onCancel(data, actions): void {
//       console.log("You Cancel the payment with: " + data.orderID);
//     },
//     onClick(data, actions): Promise<void> { },
//     onInit(data, actions): void {
//       actions.disable();
//       setTimeout(() => {
//         actions.enable();
//       }, 1000);
//     },
//     onError(error) {
//       alert("Payment Error: " + error);
//     }
//   };
//   return (
//     <>
//       {isPending ? <h2>Load Smart Payment Button...</h2> : null}
//       <PayPalButtons {...paypalbuttonTransactionProps} />
//       <h4>orderID: {orderID}</h4>
//     </>
//   );
// }
// export default function App() {
//   return (
//     <div className="App">
//       <link
//         rel="stylesheet"
//         type="text/css"
//         href="https://www.paypalobjects.com/webstatic/en_US/developer/docs/css/cardfields.css"
//       />
//       <h1>Hello PayPal</h1>
//       <PayPalScriptProvider options={paypalScriptOptions}>
//         <Button />
//         <h2>advanced credit and debit card payments</h2>
//         <table
//           style={{
//             width: "39%"
//           }}
//         >
//           <tr>
//             <td colSpan={2}>
//               <div id="paypal-button-container"></div>
//             </td>
//           </tr>
//           <tr>
//             <td colSpan={2}>&nbsp;</td>
//           </tr>
//         </table>
//         <div> or </div>
//         <div className="card_container">
//           <form id="card-form">
//             <label htmlFor="card-number">Card Number</label>
//             <input id="card-number" className="card_field" />
//             <div>
//               <label htmlFor="expiration-date">Expiration Date</label>
//               <input id="expiration-date" className="card_field" />
//             </div>
//             <div>
//               <label htmlFor="cvv">CVV</label>
//               <input id="cvv" className="card_field" />
//             </div>
//             <label htmlFor="card-holder-name">Name on Card</label>
//             <input
//               type="text"
//               id="card-holder-name"
//               name="card-holder-name"
//               autoComplete="off"
//               placeholder="card holder name"
//             />
//             <div>
//               <label htmlFor="card-billing-address-street">
//                 Billing Address
//               </label>
//               <input
//                 type="text"
//                 id="card-billing-address-street"
//                 name="card-billing-address-street"
//                 autoComplete="off"
//                 placeholder="street address"
//               />
//             </div>
//             <div>
//               <label htmlFor="card-billing-address-unit">&nbsp;</label>
//               <input
//                 type="text"
//                 id="card-billing-address-unit"
//                 name="card-billing-address-unit"
//                 autoComplete="off"
//                 placeholder="unit"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="card-billing-address-city"
//                 name="card-billing-address-city"
//                 autoComplete="off"
//                 placeholder="city"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="card-billing-address-state"
//                 name="card-billing-address-state"
//                 autoComplete="off"
//                 placeholder="state"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="card-billing-address-zip"
//                 name="card-billing-address-zip"
//                 autoComplete="off"
//                 placeholder="zip / postal code"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="card-billing-address-country"
//                 name="card-billing-address-country"
//                 autoComplete="off"
//                 placeholder="country code"
//               />
//             </div>
//             <br />
//             <button value="submit" id="submit" className="btn">
//               Pay
//             </button>
//           </form>
//         </div>
//       </PayPalScriptProvider>
//     </div>
//   );
// }
