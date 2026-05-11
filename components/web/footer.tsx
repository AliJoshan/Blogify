import Link from "next/link";

const footerLinks = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "Blogs", href: "/blogs" },
      { name: "Create", href: "/create" },
      { name: "About", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:px-6">
        {/* TOP */}
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* BRAND */}
          <div className="max-w-sm">
            <h2 className="text-xl font-bold tracking-tight">Blogify</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A modern blogging platform for sharing ideas, stories, and
              insights with the world.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold">{section.title}</h3>

                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>

          <p>Built with Next.js, Supabase, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
