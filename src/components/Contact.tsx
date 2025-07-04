
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Get
            <span className="text-whatsapp-green"> Started?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions or want to see a demo? We're here to help you succeed with WhatsApp marketing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-whatsapp-green" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Send us a message and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First name" />
                  <Input placeholder="Last name" />
                </div>
                <Input placeholder="Email address" type="email" />
                <Input placeholder="Company name" />
                <Textarea 
                  placeholder="Tell us about your WhatsApp marketing needs..." 
                  className="min-h-[120px]"
                />
                <Button className="w-full bg-whatsapp-green hover:bg-whatsapp-dark">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose BulkSender?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-whatsapp-green flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">99.9% Uptime Guarantee</h4>
                    <p className="text-muted-foreground text-sm">
                      Reliable service with enterprise-grade infrastructure
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-whatsapp-green flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">GDPR Compliant</h4>
                    <p className="text-muted-foreground text-sm">
                      Full compliance with data protection regulations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-whatsapp-green flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Expert Support</h4>
                    <p className="text-muted-foreground text-sm">
                      Get help whenever you need it from our dedicated team
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-whatsapp-green flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Easy Integration</h4>
                    <p className="text-muted-foreground text-sm">
                      Connect with your existing tools and workflows seamlessly
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-whatsapp-light rounded-lg p-6">
              <h4 className="font-semibold text-whatsapp-green mb-2">
                🚀 Special Launch Offer
              </h4>
              <p className="text-sm text-gray-700">
                Get 50% off your first 3 months when you sign up today. 
                Plus, free setup and onboarding support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
