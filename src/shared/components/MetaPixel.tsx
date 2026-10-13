import Script from "next/script";
import MetaPixelContactTracker from "./MetaPixelContactTracker";

interface Props {
  pixelId: string;
}

/**
 * Script base del Meta Pixel (Facebook/Instagram Ads). Solo se monta si hay un pixelId configurado.
 *
 * - autoConfig en false apaga los eventos que Meta detecta solo (SubscribedButtonClick):
 *   duplican a los nuestros con nombres que ventas y marketing no entienden.
 * - No lleva el <noscript> del fragmento oficial: Next precarga esa imagen aunque haya
 *   JavaScript y cada visita contaba dos PageView.
 */
export default function MetaPixel({ pixelId }: Props) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('set', 'autoConfig', false, '${pixelId}');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <MetaPixelContactTracker />
    </>
  );
}