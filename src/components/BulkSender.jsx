
import React, { useEffect, useState } from 'react';
import { Send, Users, Clock, CheckCircle, AlertCircle, Play, Pause, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const BulkSender = ({ contacts }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [messageType, setMessageType] = useState('sms');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sendingStats, setSendingStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0
  });


  const [qr, setQr] = useState("")
  const [botstatus, setBotStatus] = useState(false)
  const { toast } = useToast();

  const groups = [...new Set(contacts.map(contact => contact.group))];

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    if (group === 'all') {
      setSelectedContacts(contacts.map(c => c._id));
    } else {
      const groupContacts = contacts.filter(contact => contact.group === group);
      setSelectedContacts(groupContacts.map(c => c._id));
    }
  };

  const handleContactToggle = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c._id));
    }
  };


  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const fetchQr = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/get-qr/${userId}`);
        setQr(res?.data?.qr || "");
        setBotStatus(res?.data?.ready)
      } catch (err) {
        console.error("Failed to load QR", err);
      }
    };

    fetchQr();
  }, []);


  console.log(botstatus, "botstatus")




  const handleSendMessages = async () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contacts selected",
        description: "Please select at least one contact to send messages.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "No message content",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    setSendProgress(0);

    try {


      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "User token not found. Please login again.",
          variant: "destructive",
        });
        return;
      }
      const payload = {
        contactIds: selectedContacts, // array of selected contact _id's
        message,
        messageType, // whatsapp / sms
      };



      console.log(payload, "payload")

      const response = await axios.post('http://localhost:5000/api/bulk/bulk-message', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "response")

      if (response.status === 200) {
        toast({
          title: "Messages sent successfully",
          description: `Server processed ${selectedContacts.length} contacts.`,
        });
      } else {
        toast({
          title: "Unexpected response",
          description: "Something went wrong. Try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sending failed",
        description: error?.response?.data?.message || "There was an error sending messages.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };


  const selectedContactsData = contacts.filter(contact => selectedContacts.includes(contact._id));



  return (
    <div className="space-y-6">
      <Card>
        <div className='flex md:flex-row flex-col justify-between items-center'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Bulk Message Sender
            </CardTitle>
            <CardDescription>
              Send messages to multiple contacts at once
            </CardDescription>
          </CardHeader>
          <div className='lg:mr-2'>
            {!botstatus ? (
              qr ? (
                <>
                  <img src={qr} alt="Scan the QR" className="w-[150px] h-[150px]" />
                  <p>Scan this QR code</p>
                </>
              ) : (
                <p className="text-gray-600">Loading QR code...</p>
              )
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <CheckCircle className="w-12 h-12 text-green-600" />
                <h2 className="mt-4 text-xl font-semibold text-green-700">Bot Connected!</h2>
                <p className="mt-2 text-green-600">You can now send your messages.</p>
              </div>
            )}
          </div>
        </div>
        <CardContent className="space-y-6">
          {/* Message Type Selection */}
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#fff]">

                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Group Selection */}
          <div className="space-y-2">
            <Label>Select Recipients</Label>
            <Select value={selectedGroup} onValueChange={handleGroupSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a group..." />
              </SelectTrigger>
              <SelectContent className="bg-[#fff]">
                <SelectItem value="all">All Contacts ({contacts?.length})</SelectItem>

                {groups?.filter(Boolean).map(group => {
                  const count = contacts?.filter(c => c?.group === group)?.length;
                  return (
                    <SelectItem key={group} value={group}>
                      {group} ({count})
                    </SelectItem>
                  );
                })}
              </SelectContent>

            </Select>
          </div>

          {/* Contact Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Individual Contacts</Label>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>



            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {selectedContactsData.map(contact => (
                  <div key={contact._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`contact-${contact._id}`}
                      checked={selectedContacts.includes(contact._id)}
                      onCheckedChange={() => handleContactToggle(contact._id)}
                    />
                    <label
                      htmlFor={`contact-${contact._id}`}
                      className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {contact.name} - {contact.phone}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {contact.group}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className="text-sm text-gray-600">
              {selectedContacts.length} of {contacts.length} contacts selected
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <Label htmlFor="bulk-message">Message Content</Label>
            <Textarea
              id="bulk-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="min-h-[120px]"
            />
            <div className="text-sm text-gray-500">
              {message.length} characters
            </div>
          </div>

          {/* Sending Progress */}
          {isSending && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sending Progress</span>
                  <span>{Math.round(sendProgress)}%</span>
                </div>
                <Progress value={sendProgress} className="w-full" />
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-600">{sendingStats.total}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{sendingStats.sent}</div>
                  <div className="text-xs text-gray-500">Sent</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-red-600">{sendingStats.failed}</div>
                  <div className="text-xs text-gray-500">Failed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-yellow-600">{sendingStats.pending}</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Ready to send to {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''}
              </span>
            </div>

            <Button
              onClick={handleSendMessages}
              disabled={isSending
                || selectedContacts.length === 0
                || botstatus === false
              }
              className={`bg-green-600 hover:bg-green-700`}
            >
              {isSending ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Messages
                </>
              )}
            </Button>
          </div>

          {/* Sending Guidelines */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Important Guidelines
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Ensure you have consent to send messages to all recipients</li>
              <li>• Bulk sending may take several minutes depending on the number of contacts</li>
              <li>• Messages will be sent with a small delay between each to avoid rate limiting</li>
              <li>• Failed messages can be retried individually from the results</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkSender;
