import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/extra.css'
import 'katex/dist/katex.css'
import '@fontsource/inter/variable-full.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import ProgressBar from 'react-scroll-progress-bar'
import ScrollTop from '@/components/ScrollTop'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
// import { Provider } from '@lyket/react'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done()
}

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done()
}

const defaultTheme = {
  colors: {
    primary: '#71717a',
    secondary: '#ff00c3',
    text: '#fff',
    highlight: '#ff00c3',
    icon: '#fff',
    background: 'transparent',
  },
  fonts: {
    body: 'inherit',
  },
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // useEffect(() => {
  //   function hasScroll(element) {
  //     var style = window.getComputedStyle(element);
  //     var overflowX = style.overflowX;
  //     var overflowY = style.overflowY;
  //     var hasOverflow = (overflowX === 'auto' || overflowX === 'scroll' || overflowY === 'auto' || overflowY === 'scroll');

  //     console.log(element.scrollWidth, element.clientWidth);

  //     var hasHorizontalScroll = element.scrollWidth > element.clientWidth;

  //     return hasOverflow && hasHorizontalScroll;
  //   }

  //   function setTagPosition() {
  //     var tag = document.querySelector(".katex-display > .katex > .katex-html > .tag");
  //     var math = document.querySelector(".math-display")

  //     if (tag) {
  //       var hasHorizontalScroll = hasScroll(math);

  //       if (hasHorizontalScroll) {
  //         // Có scroll, đặt position là relative
  //         tag.style.cssText = "position: relative !important;";
  //       } else {
  //         // Không có scroll, đặt position là absolute
  //         tag.style.cssText = "position: absolute !important; right: 0 !important;";
  //       }
  //     }
  //   }

  //   // Gọi hàm setTagPosition sau khi trang đã tải hoàn toàn và sau mỗi lần resize màn hình
  //   window.addEventListener("load", setTagPosition);
  //   window.addEventListener("resize", setTagPosition);

  //   window.addEventListener("load", setTagPosition);
  //   window.addEventListener("resize", setTagPosition);

  //   // Kiểm tra khi tài liệu được tải và sau mỗi lần resize màn hình
  //   window.addEventListener("load", setTagPosition);
  //   window.addEventListener("resize", setTagPosition);

  //   // Cleanup khi component unmount
  //   return () => {
  //     window.removeEventListener("load", setTagPosition);
  //     window.removeEventListener("resize", setTagPosition);
  //   };
  // }, []); // Chạy một lần sau khi component đã mount

  return (
    <SessionProvider session={session}>
      {/* <Provider apiKey="pt_7c8b6840f5ba39cd3b2b471cd8efc2" theme={defaultTheme}> */}
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <ProgressBar bgcolor="#AB57E9" />
        <ScrollTop />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
      {/* </Provider> */}
    </SessionProvider>
  )
}
