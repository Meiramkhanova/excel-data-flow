import Container from "@/shared/ui/Container";
import Image from "next/image";

function Header() {
  return (
    <header className="header-wrapper border-b border-border bg-card">
      <Container>
        <div className="flex items-center gap-4 justify-between py-8">
          <Image
            alt="narxoz-logo"
            src="/narxoz_logo.webp"
            width={200}
            height={300}
            className="w-40 object-cover"
          />

          <div className="header-info-field hidden md:block text-end">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Автоматизация XLSX-файлов
            </h1>

            <p className="mt-2 text text-muted-foreground">
              Загрузка файла, рассылка писем по данным колонок и создание
              недельного календаря.
            </p>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
