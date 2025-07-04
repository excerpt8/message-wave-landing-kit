
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Whatsapp } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Bulk Messaging",
    description: "Send personalized messages to thousands of contacts simultaneously with our advanced bulk messaging system."
  },
  {
    icon: Send,
    title: "Smart Delivery",
    description: "Intelligent message scheduling and delivery optimization to ensure maximum reach and engagement rates."
  },
  {
    icon: Whatsapp,
    title: "WhatsApp Integration",
    description: "Seamless integration with WhatsApp Business API for reliable and professional message delivery."
  },
  {
    icon: MessageSquare,
    title: "Template Management",
    description: "Create, save, and manage message templates for different campaigns and customer segments."
  },
  {
    icon: Send,
    title: "Analytics & Reports",
    description: "Detailed analytics on message delivery, open rates, and customer engagement to optimize your campaigns."
  },
  {
    icon: Whatsapp,
    title: "Contact Management",
    description: "Organize your contacts into groups, import from CSV, and manage your customer database efficiently."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful Features for
            <span className="text-whatsapp-green"> Modern Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to run successful WhatsApp marketing campaigns and connect with your customers effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-whatsapp-light flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-whatsapp-green" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
