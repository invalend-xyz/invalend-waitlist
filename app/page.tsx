import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground antialiased selection:bg-black selection:text-white">
      <Hero />
    </main>
  );
}
