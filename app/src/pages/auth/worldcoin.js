// import {useExternalAuth} from "@dynamic-labs/sdk-react-core";
// import {useEffect} from "react";
// import {useRouter} from "next/router";
//
// export default function Worldcoin() {
//   const {signInWithExternalJwt} = useExternalAuth();
//   const router = useRouter();
//
//   useEffect(() => {
//     console.log(router?.query?.id_token?.toString());
//   }, [router]);
//   // try {
//   //   // `externalUserId`: User ID in the external auth system
//   //   // `externalJwt`: Raw encoded JWT issued by external auth system
//   //   const userProfile = await signInWithExternalJwt({
//   //     externalUserId,
//   //     externalJwt
//   //   });
//   //
//   //   if (userProfile) {
//   //     // You should be logged in at this point
//   //   }
//   // } catch (e: any) {
//   //   console.error('Dynamic login failed:', e);
//   // }
// }
