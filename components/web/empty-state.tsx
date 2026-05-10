import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
};

export function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

      <p className="mt-3 text-sm text-muted-foreground">{description}</p>

      {buttonText && href && (
        <Link
          href={href}
          className="mt-6 inline-flex items-center text-sm font-medium text-primary underline underline-offset-4"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
