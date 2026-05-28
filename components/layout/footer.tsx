import Image from "next/image"
import { FooterLinks } from "./footer-links"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src="/tolia-full.png"
              alt="TOLIA footer logo"
              className="mb-3 h-10 w-auto"
              height={1000}
              width={1000}
            />
            <p className="text-sm text-muted-foreground">
              Tolentino Life Insurance Agency (TOLIA)
              <br />A Pru Life UK Branch. Empowering agents to succeed.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
            <FooterLinks />
          </div>

          <div className="lg:ml-6">
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>(Contact Number)</li>
              <li>(Contact/Support Email)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TOLIA &mdash; Pru Life UK. All
          rights reserved.
        </div>
      </div>
    </footer>
  )
}
