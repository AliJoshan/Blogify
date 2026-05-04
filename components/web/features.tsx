import { PenLine, Sparkles, Globe } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Write Easily",
    description: "A clean editor to focus only on your ideas.",
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description: "Built with Next.js and a modern UI system.",
  },
  {
    icon: Globe,
    title: "Share Globally",
    description: "Publish your thoughts to the world instantly.",
  },
];

export default function Features() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-2xl font-bold md:text-3xl">Why this platform?</h2>

        <p className="mt-2 text-muted-foreground">
          Built for writers, developers, and thinkers.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-background p-6"
            >
              <feature.icon className="h-6 w-6 text-primary" />

              <h3 className="mt-4 font-semibold">{feature.title}</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
