
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content: "BulkSender transformed our customer communication. We increased our sales by 40% in just 3 months!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp"
  },
  {
    content: "The ease of use and powerful features make this the best WhatsApp marketing tool we've ever used.",
    author: "Michael Chen",
    role: "CEO",
    company: "GrowthLab"
  },
  {
    content: "Customer support is exceptional, and the delivery rates are consistently above 95%. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Digital Marketing Manager",
    company: "RetailPlus"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our
            <span className="text-whatsapp-green"> Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied businesses using BulkSender to grow their customer relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <blockquote className="text-lg mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-whatsapp-light flex items-center justify-center mr-4">
                    <span className="text-whatsapp-green font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
