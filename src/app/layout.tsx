import Navbar from "@/components/Navbar";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "./providers";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata = {
  title: "Mentipad – Find Trusted Mentors for Competitive Exams & Careers",
  description:
    "Mentipad connects students and professionals with top mentors for competitive exams, academic success, and career growth. Book 1:1 sessions and unlock your potential.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "mentorship",
    "online mentors",
    "competitive exams",
    "career guidance",
    "NEET mentors",
    "UPSC mentors",
    "medical coaching",
    "student support",
    "academic success",
    "exam preparation",
    "interview mentoring",
    "mentors India",
    "find mentors online",
    "mentorship platform",
  ],
  metadataBase: new URL("https://mentipad.com"),
  authors: [{ name: "Mentipad Team", url: "https://mentipad.com" }],
  creator: "Mentipad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="google-site-verification: googlef0435c4567fbff5a.html"
        />
      </Head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
