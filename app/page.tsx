import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Users, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { DestinationCard } from "@/components/destination-card"
import { PackageCard } from "@/components/package-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { destinations, packages, testimonials } from "@/lib/data"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/stunning-aerial-view-tropical-island-turquoise-wat.jpg" alt="Tropical paradise" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80">Premium Travel Experiences</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Explore the World
            <br />
            with Wanderly
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 leading-relaxed">
            Discover extraordinary destinations, curated experiences, and unforgettable journeys tailored for the modern
            explorer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/destinations">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/packages">View Packages</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Discover</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From sun-soaked beaches to ancient wonders, explore our handpicked destinations that promise unforgettable
              experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/destinations">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Curated</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All-inclusive packages designed to give you the ultimate travel experience without the hassle.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages
              .filter((p) => p.featured)
              .map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/packages">
                Explore All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Wanderly */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm uppercase tracking-widest mb-2">Why Wanderly</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Travel with Confidence</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Since 2015, we've been crafting extraordinary travel experiences for thousands of satisfied travelers.
                Our commitment to excellence ensures every journey is seamless, memorable, and tailored to your desires.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">50+ Destinations</h4>
                    <p className="text-sm text-muted-foreground">Handpicked locations worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">10,000+ Travelers</h4>
                    <p className="text-sm text-muted-foreground">Happy explorers served</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure Booking</h4>
                    <p className="text-sm text-muted-foreground">100% payment protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">We're always here for you</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image src="/happy-couple-traveling-looking-at-map-scenic-view.jpg" alt="Happy travelers" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real adventurers who explored the world with Wanderly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let us help you plan the trip of a lifetime. Contact our travel specialists today and turn your dream
            vacation into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-base px-8">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/packages">Browse Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
