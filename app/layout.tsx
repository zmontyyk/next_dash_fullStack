import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SocketProvider } from "@/components/SocketContext";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <SocketProvider>
                <html lang="en">
                    <body className={`${inter.className} antialiased`}>
                        {children}
                    </body>
                </html>
            </SocketProvider>
        </SessionProvider>
    );
}
