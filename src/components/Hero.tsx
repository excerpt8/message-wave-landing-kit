
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full bg-whatsapp-light px-3 py-1 text-sm leading-6 text-whatsapp-green ring-1 ring-whatsapp-green/20">
              Trusted by 10,000+ businesses worldwide
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Send WhatsApp Messages 
            <span className="text-whatsapp-green"> at Scale</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground mb-10">
            Reach thousands of customers instantly with our powerful WhatsApp bulk messaging platform. 
            Boost your sales, improve customer engagement, and grow your business with personalized messages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-whatsapp-green hover:bg-whatsapp-dark text-white px-8 py-3 text-lg">
              <Send className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <MessageSquare className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16">
            <div className="relative mx-auto max-w-4xl">
              <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="px-6 py-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-6 w-6 text-whatsapp-green" />
                      <span className="font-semibold">WhatsApp Business</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Connected</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <div className="text-sm font-medium mb-2">Campaign: Summer Sale 2024</div>
                    <div className="text-sm text-muted-foreground mb-3">Recipients: 5,247</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-whatsapp-green h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">78% delivered • 4,093 messages sent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
