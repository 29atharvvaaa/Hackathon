"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { packages } from "@/lib/data"

export default function PackagesPage() {
  const [showAll, setShowAll] = useState(false)

  const displayedPackages = showAll ? packages : packages.filter((p) => p.featured)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">Curated</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All-inclusive packages designed for the ultimate travel experience. Everything from flights to tours,
            handled by our experts.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center gap-3 mb-12">
            <Button variant={!showAll ? "default" : "outline"} onClick={() => setShowAll(false)}>
              Featured
            </Button>
            <Button variant={showAll ? "default" : "outline"} onClick={() => setShowAll(true)}>
              All Packages
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
