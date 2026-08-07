import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
export const metadata:Metadata={title:{default:"Marcus Journey — Production to Digital Innovation",template:"%s | Marcus Tran"},description:"Marcus Tran — Production, Kaizen and Technology. An interactive journey from the factory floor to digital innovation.",openGraph:{title:"Marcus Journey",description:"Build. Improve. Automate.",type:"website",locale:"en_US"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
