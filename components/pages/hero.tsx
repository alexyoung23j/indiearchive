import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { heroHeader } from "@/config/contents"

export default function HeroHeader() {
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Your landing page, preserved forever. Stop paying to host old
            projects.
          </div>
          <h2 className="max-w-[80%] text-sm font-light text-muted-foreground lg:text-2xl">
            Our archiver turns your side project into an immortal portfolio
            highlight
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Your landing page, preserved forever. Stop paying for old domains.
          </div>
          <h2 className="max-w-[80%] text-sm font-light text-muted-foreground lg:text-2xl">
            Our archiver turns your side project into an immortal portfolio
            highlight
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Give your passion project the memorial it deserves.
          </div>
          <h2 className="max-w-[70%] text-sm font-light text-muted-foreground lg:text-2xl">
            Stop paying monthly fees to host old projects. We archive your
            landing page so you can share your work for the rest of Internet
            history.
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Your landing page, preserved forever.
          </div>
          <h2 className="max-w-[60%] text-sm font-light text-muted-foreground lg:text-2xl">
            Stop paying monthly fees to host old projects. Our archiver turns
            your side project into an immortal portfolio highlight
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[70%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Archive your landing page forever with a shareable link.
          </div>
          <h2 className="max-w-[60%] text-sm font-light text-muted-foreground lg:text-2xl">
            Stop paying monthly fees to host old projects. We turn your side
            project into an immortal portfolio highlight
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Pay once, keep any landing page forever.
          </div>
          <h2 className="max-w-[80%] text-sm font-light text-muted-foreground lg:text-2xl">
            Stop paying monthly fees to host old projects. We turn your side
            project into an immortal portfolio highlight
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-y-4 space-y-4">
          <div className="max-w-[80%] text-4xl font-bold lg:text-5xl lg:leading-snug">
            Your landing page, preserved forever. Stop paying to host old
            projects.
          </div>
          <h2 className="max-w-[70%] text-sm font-light text-muted-foreground lg:text-2xl">
            We archive your landing page so you can share your work for the rest
            of Internet history. Pay once, share forever.
          </h2>
        </div>
        <Link
          href="https://github.com/redpangilinan/next-shadcn-landing"
          target="_blank"
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Join Waitlist
        </Link>
      </div>
      {heroHeader.image !== "" ? (
        <div className="flex flex-1 justify-center lg:justify-end">
          <Image
            src={heroHeader.image}
            width={500}
            height={500}
            alt="Header image"
          />
        </div>
      ) : (
        <></>
      )}
    </section>
  )
}
