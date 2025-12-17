"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { DestinationCard } from "@/components/destination-card"
import { Button } from "@/components/ui/button"
import { destinations } from "@/lib/data"

const categories = ["all", "beach", "cultural", "adventure"]

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredDestinations =
    activeCategory === "all" ? destinations : destinations.filter((d) => d.category === activeCategory)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">Explore</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Destinations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From pristine beaches to ancient temples, discover our carefully curated destinations around the world.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No destinations found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
