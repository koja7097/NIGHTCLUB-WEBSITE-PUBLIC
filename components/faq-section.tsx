"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book a table at a nightclub?",
    answer:
      "Simply search for your desired club, select your preferred date and time, choose your table package, and complete the booking process. We'll send you confirmation details and any special instructions.",
  },
  {
    question: "What is included in VIP packages?",
    answer:
      "VIP packages typically include reserved seating, bottle service, dedicated server, priority entry, and sometimes complimentary appetizers. Specific inclusions vary by venue and package level.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 24 hours before your reservation. Some venues may have different policies, which will be clearly stated during booking.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "We offer special rates for groups of 8 or more people. Contact our team for custom packages and group pricing options tailored to your event.",
  },
  {
    question: "What cities do you operate in?",
    answer:
      "We currently operate in over 100 cities worldwide, including major nightlife destinations like New York, Miami, Las Vegas, Los Angeles, London, Dubai, and many more.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Dress codes vary by venue. We provide specific dress code information for each club in the booking details. Generally, upscale casual to formal attire is recommended.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about booking with TheNightCrew
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
