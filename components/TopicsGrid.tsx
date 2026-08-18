import Link from "next/link";
import { TOPICS } from "@/lib/topics";

export default function TopicsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {TOPICS.map((topic) => {
        const Icon = topic.icon;
        return (
          <Link
            key={topic.slug}
            href={`/tema/${topic.slug}`}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface-muted px-4 py-6 text-center transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-white"
              style={{ background: topic.color }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold leading-snug text-foreground">{topic.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
