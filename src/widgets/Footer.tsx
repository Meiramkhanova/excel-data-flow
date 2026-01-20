import Container from "@/shared/ui/Container";

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <Container>
        <div className="mx-auto flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Система обработки данных
          </p>
          <p className="text-xs text-muted-foreground">2026</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
