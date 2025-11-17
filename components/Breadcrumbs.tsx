import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2" aria-hidden="true">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-ink" : ""}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

