import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import Topbar from "~/components/topbar";

export const metadata: Metadata = {
	title: "Agents Canvas",
	description:
		"Agents Canvas is a platform for creating and managing agents for your business.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body>
				<TRPCReactProvider>
					<Topbar />
					{children}
				</TRPCReactProvider>
				<Toaster richColors />
			</body>
		</html>
	);
}
