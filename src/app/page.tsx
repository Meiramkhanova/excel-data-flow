import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";
import MainContent from "@/widgets/MainContent";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <MainContent />

      <Footer />
    </div>
  );
}
