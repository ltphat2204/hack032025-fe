import Focus from "@/components/Focus";
import Script from "next/script";

export default async function FocusPage ({
    params,
}: {
    params: Promise<{ event: string }>
}) {
  const { event } = await params;

  return (
    <>
        <Focus event={decodeURIComponent(event)} />
        <Script src="https://chatbox-embed-sdk.botbanhang.vn/dist/sdk.min.js" />
        <Script id="chatbox-embed-sdk" strategy="lazyOnload">
          {`BBH.init({ 'page_id': '724337073631786' })`}
        </Script>
    </>
  );
};