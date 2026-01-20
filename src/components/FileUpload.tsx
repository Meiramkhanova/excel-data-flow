"use client";

import { cn } from "@/utils/cn";
import { AlertCircle, CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface FileUploadProps {
  onUpload?: (file: File) => Promise<void>;
  apiEndpoint?: string;
}

function FileUpload({
  onUpload,
  apiEndpoint = "/api/upload",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      setErrorMessage("Пожалуйста, выберите файл Excel (.xlsx или .xls)");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Размер файла не должен превышать 10 MB");
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMessage("");

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setStatus("idle");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setStatus("idle");
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("idle");
    setErrorMessage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setStatus("uploading");
    setErrorMessage("");

    try {
      if (onUpload) {
        await onUpload(file);
      } else {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Ошибка при загрузке файла");
        }
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Произошла ошибка при отправке файла. Попробуйте снова.");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="file-upload flex flex-1 flex-col gap-6">
      <div
        className={cn(
          "drop-zone relative flex flex-1 min-h-50 cursor-pointer flex-col items-center justify-center",
          "rounded-xl border-2 border-dashed p-8 transition-all duration-300",
        )}>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 text-primary-foreground">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">
                Перетащите файл сюда
              </p>
              <p className="mt-2 text-muted-foreground">
                или нажмите для выбора файла
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-5 py-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5 text-primary">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h2" />
                <path d="M8 17h2" />
                <path d="M14 13h2" />
                <path d="M14 17h2" />
              </svg>
              <span className="text-sm text-muted-foreground">
                Формат: .xlsx, .xls | Максимум: 10 MB
              </span>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-md flex-col items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-4 ring-primary/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-10 w-10 text-primary">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h2" />
                  <path d="M8 17h2" />
                  <path d="M14 13h2" />
                  <path d="M14 17h2" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg">
                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {file.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-secondary hover:text-foreground">
              <X className="h-4 w-4" />
              Удалить файл
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Файл успешно отправлен на обработку
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || status === "uploading"}
        className="h-14 text-base flex items-center justify-center bg-primary/70 rounded-md text-white font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:cursor-pointer">
        {status === "uploading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Отправка файла...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Успешно отправлено
          </>
        ) : (
          <>
            <Upload className="mr-2 h-5 w-5" />
            Отправить на обработку
          </>
        )}
      </button>
    </div>
  );
}

export default FileUpload;
