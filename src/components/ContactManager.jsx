
import React, { useEffect, useState } from 'react';
import { Plus, Upload, Download, Search, Edit, Trash2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import Papa from 'papaparse';
import { url } from '../utils';


const ContactManager = ({ contacts, setContacts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    whatsapp: '',
    group: ''
  });


  const [editingContactId, setEditingContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({
    name: '',
    whatsapp: '',
    group: '',
  });


  const handleEditClick = (contact) => {
    setEditingContactId(contact._id);
    setEditedContact({
      name: contact.name,
      whatsapp: contact.whatsapp,
      group: contact.group,
    });
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
    setEditedContact({ name: '', whatsapp: '', group: '' });
  };



  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.whatsapp.includes(searchTerm) ||
    contact.group.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSaveEdit = async (id) => {
   
    try {
      const response = await axios.put(
        `${url}/api/users/contacts/${id}`,
        editedContact,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const updatedContact = response?.data?.updatedContact;

      setContacts(prev =>
        prev.map(contact =>
          contact._id === id ? updatedContact : contact
        )
      );

      toast({
        title: "Contact updated",
        description: `${updatedContact?.name} has been updated.`,
      });

      setEditingContactId(null);
    } catch (error) {
      console.error("Error updating contact:", error);
      toast({
        title: "Error",
        description: "Failed to update contact.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${url}/api/users/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setContacts(prev => prev.filter(contact => contact._id !== id));

        toast({
          title: "Contact deleted",
          description: "Contact has been removed successfully.",
        });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete contact.",
        variant: "destructive",
      });
    }
  };



  const handleAddContact = async () => {
    const { name, whatsapp, group } = newContact;

 

    if (!whatsapp || whatsapp.trim() === '') {
      return toast({
        title: 'Validation Error',
        description: 'Phone number is required.',
        variant: 'destructive',
      });
    }

    const cleanedPhone = whatsapp.trim();
    if (!/^\d{10}$/.test(cleanedPhone)) {
      return toast({
        title: 'Validation Error',
        description: 'Phone number must be exactly 10 digits.',
        variant: 'destructive',
      });
    }

    try {
      const response = await axios.post(
        `${url}/api/users/contacts`,
        {
          name: name.trim(),
          phone: cleanedPhone,
          whatsapp: cleanedPhone,
          group: group?.trim() || 'Customer',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      

      // Response success validation
      if (response) {
        const createdContact = response.data.contact;

        setContacts(prev => [...prev, createdContact]);
        setNewContact({ name: '', whatsapp: '', group: '' });
        setIsAddingContact(false);

        toast({
          title: 'Success',
          description: `${createdContact.name} has been added to your contacts.`,
        });
      } else {
        throw new Error('Unexpected response structure.');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong while adding the contact.';

      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      console.error('Add contact error:', error);
    }
  };


  const fetchContacts = async (setContacts, toast) => {
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

      const response = await axios.get(`${url}/api/users/get-contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

  

      // Directly use response.data if it's already an array
      if (response.status === 200 && Array.isArray(response.data)) {
        setContacts(response.data);
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
    fetchContacts(setContacts, toast);
  }, []);




const handleImportCSV = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv';

  console.log(fileInput,"fileInput")

  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
     console.log(file,"file")

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rawContacts = results.data;
           console.log(rawContacts,"rawContacts")

          // Normalize keys to lowercase
          const normalizeKeys = (obj) =>
            Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
            );
     

          const validContacts = rawContacts
            .map(normalizeKeys)
            .filter((contact, index) => {
              const name = contact.name?.trim() || "User";
              const phone = contact.whatsapp?.trim();
              const nameValid = !!name;
              const phoneValid = /^\d{10}$/.test(phone);
              return nameValid && phoneValid;
            })
            .map(contact => ({
              name: contact.name.trim() || "User",
              whatsapp: contact.whatsapp.trim(),
              phone: contact.whatsapp.trim(),
              group: contact.group || 'customers',
            }));

            console.log(validContacts,"validContacts")

          if (validContacts.length === 0) {
            toast({
              title: "No valid contacts",
              description: "The uploaded file doesn't contain valid contact data.",
              variant: "destructive",
            });
            return;
          }

          // Send to backend
          await axios.post(
            `${url}/api/users/contacts/bulk`,
            { contacts: validContacts },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          toast({
            title: "Import Complete",
            description: `${validContacts.length} contacts imported successfully.`,
          });

          fetchContacts(setContacts, toast); // refresh list
        } catch (error) {
          console.error("Import Error:", error);
          toast({
            title: "Import Failed",
            description: "An error occurred while importing contacts.",
            variant: "destructive",
          });
        }
      },
    });
  };

  fileInput.click();
};



  const handleExportCSV = () => {
    try {
      const headers = ['Name', 'Whatsapp', 'Group', 'Created Date'];
      const keys = ['name', 'whatsapp', 'group', 'createdAt']; // actual object keys

      // Convert to CSV string
      const csv = [
        headers.join(','), // header row
        ...contacts.map(contact =>
          keys.map(key => {
            let value = contact[key] || '';
            if (key === 'createdAt') {
              const date = new Date(value);
              value = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', {
                month: 'long',
              })} ${date.getFullYear()} at ${date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}`;
            }
            return `"${value.toString().replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');

      // Trigger download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contacts.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: "Contacts exported to CSV.",
      });
    } catch (error) {
      console.error("Export CSV error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export contacts as CSV.",
        variant: "destructive",
      });
    }
  };



  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} at ${formattedTime}`;
  };




  const uniqueGroups = [...new Set(contacts.map(contact => contact.group))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contact Management
              </CardTitle>
              <CardDescription>
                Manage your contacts and organize them into groups
              </CardDescription>
            </div>
            <div className="flex lg:flex-row flex-col  gap-2">
              <div className='flex gap-2 my-2'>
                <Button variant="outline" onClick={handleImportCSV}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <div className='text-center'>
                <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-gradient-to-r from-blue-600 to-green-600 p-2 lg:mt-2 rounded-lg text-[#fff]">
                      <Plus className="h-4 w-4 " />
                      Add Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Contact</DialogTitle>
                      <DialogDescription>
                        Enter the contact details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                          placeholder="Enter contact name"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input
                          id="whatsapp"
                          value={newContact.whatsapp}
                          onChange={(e) => setNewContact({ ...newContact, whatsapp: e.target.value })}
                          placeholder="+91 1234567890"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="group">Group</Label>
                        <Input
                          id="group"
                          value={newContact.group}
                          onChange={(e) => setNewContact({ ...newContact, group: e.target.value })}
                          placeholder="e.g., Customers, Prospects"
                          className="mt-2"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddContact}>
                          Add Contact
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {/* <div className="flex gap-2">
                {uniqueGroups.map(group => (
                  <Badge key={group} variant="outline" className="cursor-pointer">
                    {group}
                  </Badge>
                ))}
              </div> */}
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>

                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact, index) => (
                    <TableRow key={index}>
                      {editingContactId === contact._id ? (
                        <>
                          <TableCell>
                            <Input
                              value={editedContact.name}
                              onChange={(e) =>
                                setEditedContact({ ...editedContact, name: e.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editedContact.whatsapp}
                              onChange={(e) =>
                                setEditedContact({ ...editedContact, whatsapp: e.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editedContact.group}
                              onChange={(e) =>
                                setEditedContact({ ...editedContact, group: e.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSaveEdit(contact._id)}
                              >
                                Save
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.whatsapp}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{contact.group}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{formatDateTime(contact.createdAt)}</Badge>

                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClick(contact)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteContact(contact._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </div>

            {filteredContacts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet. Add your first contact!'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;
