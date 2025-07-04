import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { MessageSquare, Upload, Send, Users, Settings, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface Contact {
  name: string;
  phone: string;
}

interface MessageForm {
  message: string;
  messageId: string;
  token: string;
  templateId: string;
  mediaUrl: string;
}

const BulkSend = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<MessageForm>({
    defaultValues: {
      message: "",
      messageId: "",
      token: "",
      templateId: "",
      mediaUrl: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const parsedContacts: Contact[] = [];
        
        lines.slice(1).forEach((line) => {
          const [name, phone] = line.split(",").map(item => item.trim());
          if (name && phone) {
            parsedContacts.push({ name, phone });
          }
        });
        
        setContacts(parsedContacts);
        toast({
          title: "Success",
          description: `Loaded ${parsedContacts.length} contacts from CSV`,
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid CSV file",
        variant: "destructive",
      });
    }
  };

  const addManualContact = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
  };

  const updateContact = (index: number, field: keyof Contact, value: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: MessageForm) => {
    if (contacts.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one contact",
        variant: "destructive",
      });
      return;
    }

    if (!data.message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (!data.token.trim()) {
      toast({
        title: "Error",
        description: "Please enter your WhatsApp API token",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending messages
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Messages Sent!",
        description: `Successfully sent messages to ${contacts.length} contacts`,
      });
      
      // Reset form
      form.reset();
      setContacts([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bulk Message Sender</h1>
          <p className="text-muted-foreground">Send personalized messages to multiple WhatsApp contacts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Configuration Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your WhatsApp API settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Token *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your WhatsApp API token"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="messageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter message ID (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="templateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Template ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter template ID (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          <Video className="h-4 w-4" />
                          Media URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter image/video URL (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL for image or video to include with messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* Contacts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contacts ({contacts.length})
              </CardTitle>
              <CardDescription>
                Upload a CSV file or add contacts manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV
                  </Button>
                </div>
                <Button onClick={addManualContact} variant="outline">
                  Add Contact
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                CSV format: Name, Phone Number (with country code)
              </div>

              {contacts.length > 0 && (
                <div className="max-h-60 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={contact.name}
                              onChange={(e) => updateContact(index, 'name', e.target.value)}
                              placeholder="Contact name"
                              className="border-0 p-1 h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={contact.phone}
                              onChange={(e) => updateContact(index, 'phone', e.target.value)}
                              placeholder="+1234567890"
                              className="border-0 p-1 h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContact(index)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              ×
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message
              </CardTitle>
              <CardDescription>
                Compose your message to send to all contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message here..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can use {"{name}"} to personalize messages with contact names
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Preview</h3>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      {form.watch("message") || "Your message preview will appear here..."}
                      {form.watch("mediaUrl") && (
                        <div className="mt-2 text-xs text-blue-600">
                          📎 Media: {form.watch("mediaUrl")}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending || contacts.length === 0}
                    className="w-full bg-whatsapp-green hover:bg-whatsapp-dark"
                  >
                    {isSending ? (
                      "Sending Messages..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send to {contacts.length} Contacts
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BulkSend;
