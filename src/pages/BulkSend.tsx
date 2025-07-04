
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { MessageSquare, Upload, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface Contact {
  name: string;
  phone: string;
}

interface MessageForm {
  message: string;
}

const BulkSend = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<MessageForm>({
    defaultValues: {
      message: "",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <div className="max-h-80 overflow-auto">
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
                            className="min-h-40"
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
