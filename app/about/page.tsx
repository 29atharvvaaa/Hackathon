import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Globe, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { teamMembers } from "@/lib/data"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Wanderly</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crafting transformative travel experiences since 2015. We believe every journey should be as unique as the
            traveler.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=500" alt="Wanderly team" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Wanderly was born from a simple belief: travel should transform you. Founded in 2015 by Alexandra
                Rivers, a seasoned traveler with a passion for authentic experiences, we set out to redefine luxury
                travel.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Today, we're a team of passionate travelers, each bringing unique expertise and insider knowledge to
                craft journeys that go beyond typical tourism. We've helped over 10,000 travelers explore 50+
                destinations across six continents.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our approach is simple: we listen to your dreams, understand your travel style, and create personalized
                itineraries that exceed expectations. Every detail matters, from boutique hotels to private experiences
                that money can't usually buy.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">10K+</p>
                  <p className="text-sm text-muted-foreground">Happy Travelers</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">50+</p>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">10</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from planning your trip to ensuring every moment exceeds
              expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Passion</h3>
              <p className="text-sm text-muted-foreground">
                We love what we do and it shows in every itinerary we create.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Authenticity</h3>
              <p className="text-sm text-muted-foreground">
                We prioritize genuine local experiences over tourist traps.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Every detail is carefully considered to ensure the highest quality.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Personalization</h3>
              <p className="text-sm text-muted-foreground">No cookie-cutter trips—every journey is uniquely yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate travelers dedicated to making your dreams come true.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Let's create your perfect trip together. Our team is ready to turn your travel dreams into reality.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
