import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isValidStream } from "@/lib/stream";

export default async function StreamPublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ stream: string }>;
}) {
  const { stream } = await params;

  if (!isValidStream(stream)) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header stream={stream} />
      <main className="flex-1">{children}</main>
      <Footer stream={stream} />
    </div>
  );
}
