import Link from 'next/link'

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Submit a Tip', href: '/submit-tip' },
  { label: 'Submission Guidelines', href: '/guidelines' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Obituaries', href: '/obituaries' },
  { label: 'Public Notices', href: '/notices' },
  { label: 'Directory', href: '/directory' },
]

export function Footer() {
  return (
    <footer className="border-t-4 border-[#1c1a17] bg-[#f4ecdd]">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="text-center font-serif text-2xl font-black text-[#181512]">
          The Independence Sentinel
        </div>
        <div className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500">
          Serving Independence with Local Reporting
        </div>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-stone-600">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#1f1a14]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 text-center text-[11px] uppercase tracking-[0.16em] text-stone-500">
          &copy; {new Date().getFullYear()} The Independence Sentinel. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
