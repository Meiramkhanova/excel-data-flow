import FileUpload from "@/components/FileUpload";
import Container from "@/shared/ui/Container";

function MainContent() {
  return (
    <main className="flex flex-1">
      <Container>
        <div className="flex w-full flex-1 flex-col py-8">
          <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5">
            {/* Card Header */}
            <div className="border-b border-border bg-secondary/40 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-6 w-6 text-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h2" />
                    <path d="M8 17h2" />
                    <path d="M14 13h2" />
                    <path d="M14 17h2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Загрузка файла
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Загрузите Excel файл для автоматической обработки
                  </p>
                </div>
              </div>
            </div>

            <div className="card-content flex flex-1 flex-col p-8">
              <FileUpload />

              <div className="instructions mt-auto pt-8">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-primary">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Инструкция по загрузке
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                        1
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Перетащите файл или нажмите на область загрузки
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                        2
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Проверьте выбранный файл формата .xlsx или .xls
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                        3
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Нажмите кнопку отправки для обработки данных
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default MainContent;
