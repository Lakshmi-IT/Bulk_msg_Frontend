import React, { useEffect, useState } from 'react';
import { MessageSquare, Save, Eye, Sparkles, EyeClosed, EyeClosedIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { url } from '../utils';

const MessageComposer = () => {
  const [messageType, setMessageType] = useState('WhatsApp');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [templates, settemplates] = useState([])

  const [updatetemplate, setUpdateTemplate] = useState(false)

  const [selectedId, setSelectedId] = useState("")

  const handlePreview = () => {
    if (!message) {
      toast({
        title: "Error",
        description: "Please enter a message to preview.",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(!showPreview); // toggle preview
  };



  const fetchTemplates = async () => {
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

      const response = await axios.get(`${url}/api/templates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data, "response")

      if (response.status === 200 && Array.isArray(response.data)) {
        const templateList = response.data.map(item => ({
          subject: item?.subject,
          content: item?.content,
          type: item?.type,
          _id: item?._id,
        }));

        settemplates([...templateList]);


      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch contacts error:", error);
      toast({
        title: "Error Fetching Contacts",
        description:
          error.response?.data?.message ||
          "Failed to load contacts. Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTemplates()

  }, []);


  const updateTemplatefunction = async (id, type, subject, content) => {
    console.log(id, type, subject, content, "data")
    try {
      const response = await axios.put(
        `${url}/api/templates/${id}`,
        { type, subject, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast({
        title: "Template updated",
        description: `Template has been updated.`,
      });
      setSelectedTemplate("")
      setMessage("")
      setSubject("")
    } catch (error) {
      console.error("Error updating template:", error);
      toast({
        title: "Error",
        description: "Failed to update template.",
        variant: "destructive",
      });
    }
  };




  const variables = ['{{name}}', '{{phone}}', '{{company}}', '{{date}}', '{{time}}'];



  const handleTemplateSelect = (templateId) => {


    const template = templates?.find(t => t?._id === templateId);

    if (template) {
      setMessage(template?.content);
      setSelectedTemplate(templateId);
      setSubject(template?.subject)
      setMessageType(template?.type)
      setUpdateTemplate(true)
      setSelectedId(templateId)
    }
  };

  const insertVariable = (variable) => {
    setMessage(prev => prev + ' ' + variable);
  };


  const handleSaveTemplate = async () => {
    if (!message || !messageType) {
      toast({
        title: "Error",
        description: "Message content and type are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const payload = {
        type: messageType,
        subject: subject || '',
        content: message,
        templateId: selectedTemplate || '',
      };

      console.log(payload, "payload")

      const response = await axios.post(
        `${url}/api/templates/templates`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response")

      toast({
        title: "Success",
        description: "Template sent to backend successfully.",
      });
      setSelectedTemplate("")
      setMessage("")
      setSubject("")
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to send message to backend.",
        variant: "destructive",
      });
    }
  };


  // const [selectedTemplate, setSelectedTemplate] = useState("");

  // const handleTemplateSelect = (value) => {
  //   setSelectedTemplate(value);
  //   console.log("Selected Template ID:", value);
  // };


  // const handlePreview = () => {
  //   if (!message) {
  //     toast({
  //       title: "Error",
  //       description: "Please enter a message to preview.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   toast({
  //     title: "Preview",
  //     description: "Message preview would be displayed here in a modal.",
  //   });
  // };

  const getPlainTextLength = () => {
    const temp = document.createElement("div");
    temp.innerHTML = message;
    return temp.textContent?.length || 0;
  };

  const characterCount = getPlainTextLength();
  const smsSegments = Math.ceil(characterCount / 160);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'link', 'image', 'video'
  ];

  console.log(templates, "templates")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Composer
          </CardTitle>
          <CardDescription>
            Create and customize your messages with templates and rich content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Message Type Selection */}
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#fff]">
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label>Choose Template (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger className="bg-white border text-black">
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent className="bg-[#fff] text-black">
                {templates.map((template) => (
                  <SelectItem key={template._id} value={template._id}>
                    {template.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
            />
          </div>


          {/* Rich Text Message Editor */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Message Content</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {characterCount} characters
                </span>
                {messageType === 'sms' && (
                  <Badge variant={smsSegments > 1 ? "destructive" : "secondary"}>
                    {smsSegments} SMS segment{smsSegments > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
            <ReactQuill
              theme="snow"
              value={message}
              onChange={setMessage}
              modules={modules}
              formats={formats}
              placeholder="Write your message here..."
              className="bg-white rounded-md"
            />
          </div>

          {/* Variables */}
          <div className="space-y-2">
            <Label>Insert Variables</Label>
            <div className="flex flex-wrap gap-2">
              {variables.map(variable => (
                <Button
                  key={variable}
                  variant="outline"
                  size="sm"
                  onClick={() => insertVariable(variable)}
                  className="text-xs"
                >
                  {variable}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Variables will be replaced with actual contact data when sending
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handlePreview}>

              {showPreview ? (
                <EyeClosedIcon className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              Preview
            </Button>

            {updatetemplate ? (
              <Button onClick={() => updateTemplatefunction(selectedId, messageType, subject, message)}>
                <Save className="h-4 w-4 mr-2" />
                Update Template
              </Button>

            ) : (
              <Button variant="outline" onClick={handleSaveTemplate}>
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            )
            }

            <Button>
              <Sparkles className="h-4 w-4 mr-2" />
              Use Message
            </Button>
          </div>

          {/* Message Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Message Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• SMS messages over 160 characters will be sent as multiple segments</li>
              <li>• WhatsApp messages support rich formatting and media</li>
              <li>• Use variables to personalize messages for each recipient</li>
              <li>• Always include opt-out instructions for marketing messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      {showPreview && (
        <div className="fixed top-20 right-4 w-80 h-[80%] pb-5 shadow-xl rounded-lg border border-gray-300 bg-[#ece5dd] z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#075e54] text-white flex items-center px-4 py-2">
            <div className="bg-white rounded-full w-8 h-8 mr-3"></div>
            <div>
              <div className="font-medium">LakshmiIT</div>
              <div className="text-xs text-gray-200">Business Account</div>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-2 p-3 overflow-y-auto h-[calc(100%-100px)]">
            {/* <div className="bg-white px-3 py-2 rounded-lg max-w-[75%] self-start shadow-sm text-sm">
              Put here your text
              <div className="text-[10px] text-gray-500 text-right mt-1">00:00</div>
            </div> */}

            {/* Actual Rich Message Preview (Styled like WhatsApp green) */}
            <div
              className="bg-[#dcf8c6] px-3 py-2 rounded-lg max-w-[75%] self-end shadow-sm text-sm"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </div>

          {/* Input Area (fake) */}
          <div className="p-3 bg-[#f0f0f0] border-t flex items-center gap-2">
            <div className="flex-1 bg-white text-gray-400 px-4 py-2 rounded-full text-sm">
              Write a message
            </div>
            <div className="text-gray-400">
              <svg width="24" height="24" fill="currentColor">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              </svg>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MessageComposer;
