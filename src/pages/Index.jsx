
import React, { useEffect, useState } from 'react';
import { MessageSquare, Send, Users, Plus, Upload, Download, LogIn, LogOut, User, PlusCircle, LogInIcon, ArrowDown, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ContactManager from '../components/ContactManager';
import MessageComposer from '../components/MessageComposer';
import BulkSender from '../components/BulkSender';
import axios from "axios";
import UserDetails from '../components/AllUsers';
import { url } from '../utils';
import HeroSection from '../components/HeroSection';
import FeaturedSection from '../components/FeaturedSection';
import WhatyougetSection from '../components/WhatyougetSection';
import FeatureSection from '../components/SmallFeatures';
import SmallFeatures from '../components/SmallFeatures';
import Testmonials from '../components/Testmonials';
import LoginSection from '../components/LoginSection';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Pricing from '../components/Pricing';

const Index = () => {
  const [contacts, setContacts] = useState([
    { name: '', phone: '', whatsapp: '', group: '' },

  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [register, setRegister] = useState(false)
  const [menuLogin, setMenuLogin] = useState(false)






  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    SubscritionType: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };


  const handleRegister = async () => {
    try {
      const res = await axios.post(`${url}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res, "res")

      setRegister(false)
      setFormData({
        username: "",
        phone: "",
        email: "",
        password: "",
        role: "",
        SubscritionType: ""
      });

      toast({
        title: "Registered successful",
        description: "Welcome back to BulkMessenger Pro!",
      });

    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast({
          title: "Register failed",
          description: error.response.data.message || "Something went wrong on the server.",
        });
      } else {
        // Network error or something else
        console.error("Register error:", error);
        toast({
          title: "Register failed",
          description: "Something went wrong please try again",
        });
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${url}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res, "res")

      const { token, message, user } = res.data;


      console.log(user, "user")
      setUser({ name: user.username, email: user.email });

      localStorage.setItem("name", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.userId)



      // Store JWT token in localStorage
      localStorage.setItem("token", token);

      toast({
        title: "Login successful",
        description: "Welcome back to BulkMessenger Pro!",
      });
      setIsLoggedIn(true);
      setFormData({
        username: "",
        phone: "",
        email: "",
        password: "",
        role: "",
        SubscritionType: ""
      });


    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast({
          title: "Register failed",
          description: error.response.data.message || "Something went wrong on the server.",
        });
      } else {
        // Network error or something else
        console.error("Login error:", error);
        toast({
          title: "Login failed",
          description: "Something went wrong please try again",
        });
      }
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setFormData({
      username: "",
      phone: "",
      email: "",
      password: "",
      role: "",
      SubscritionType: ""
    });


    setIsLoggedIn(false);
    // setRegister(false);
    setUser(null);



    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });




  };


  const handleCancelRegister = () => {
    setRegister(false);

  }




  const handleHomeLogin = () => {
    setMenuLogin(true)


  }

  const handleCancelLogin = () => {
    setMenuLogin(false)

  }


  const stats = {
    totalContacts: contacts.length,
    messagesSent: 1247,
    deliveryRate: 98.5,
    groups: [...new Set(contacts.map(c => c.group))].length
  };

  const name = localStorage.getItem('name')
  const email = localStorage.getItem('email')
  const role = localStorage.getItem('role')




  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsLoggedIn(false);

    } else {
      setIsLoggedIn(true);
    }

  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleCancelLogin}>
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 lg:block hidden">LakshmiIT BulkMessenger</h1>
                <p className="text-sm text-gray-500 lg:block hidden">SMS & WhatsApp Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">

              {isLoggedIn && role === "Admin" &&
                <Button
                  onClick={() => setRegister(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="h-4 w-4 text-[#fff]" />
                  <span className='text-[#fff]'>Add Users</span>
                </Button>
              }

              {/* Authentication Section */}

              {isLoggedIn ? (
                <div className="flex items-center space-x-3">

                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-9 ">
                  <div className='lg:flex items-center space-x-9 hidden'>

                    <div className="flex justify-between items-center space-x-2">
                      <p>Features</p>
                      <ChevronDown className="w-5 h-5" />




                    </div>
                    <div className="flex justify-between items-center space-x-2">
                      <p>Use Cases</p>
                      <ChevronDown className="w-5 h-5" />




                    </div>
                    <div className="flex justify-between items-center space-x-2">
                      <p>Resorces</p>
                      <ChevronDown className="w-5 h-5" />




                    </div>
                    <div className="flex justify-between items-center space-x-2">
                      <p>Pricing</p>
                      {/* <ChevronDown className="w-5 h-5" /> */}




                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleHomeLogin}
                    className="flex items-center space-x-2"
                  >
                    <LogInIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">LogIn</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className='md:p-10 p-5 '>

        {!register ? (
          !isLoggedIn ? (
            !menuLogin ? (
              <div className="max-w-full  px-4 sm:px-6 lg:px-8 py-8">

                <HeroSection />
                <SmallFeatures />
                <FeaturedSection />
                <WhatyougetSection />
                <Testmonials />
                <Pricing/>
                <Contact/>
                <Footer/>

              </div>
            ) : (
              <LoginSection handleCancelLogin={handleCancelLogin} handleLogin={handleLogin} handleChange={handleChange} formData={formData} />

            )
          ) : (

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 w-full overflow-x-scroll">
              {/* Navigation */}
              <TabsList className="flex w-full  mx-auto bg-white/50 backdrop-blur-sm gap-2 overflow-x-scroll px-2 py-1 rounded-lg scrollbar-thin scrollbar-thumb-blue-300">
                <TabsTrigger
                  value="dashboard"
                  className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  📊 Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  👥 Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="compose"
                  className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  📝 Compose
                </TabsTrigger>
                <TabsTrigger
                  value="send"
                  className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  📤 Send Bulk
                </TabsTrigger>


                {role === "Admin" && (
                  <TabsTrigger
                    value="users"
                    className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    👨‍💼 All Users
                  </TabsTrigger>
                )}
              </TabsList>


              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {name}!</h2>
                  <p className="text-lg text-gray-600">Send SMS and WhatsApp messages at scale with ease</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Total Contacts</p>
                          <p className="text-2xl font-bold text-blue-900">{stats.totalContacts}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Messages Sent</p>
                          <p className="text-2xl font-bold text-green-900">{stats.messagesSent.toLocaleString()}</p>
                        </div>
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 text-sm font-medium">Delivery Rate</p>
                          <p className="text-2xl font-bold text-purple-900">{stats.deliveryRate}%</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-600 text-sm font-medium">Groups</p>
                          <p className="text-2xl font-bold text-orange-900">{stats.groups}</p>
                        </div>
                        <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">#</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
                    <CardDescription>Get started with common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => setActiveTab('contacts')}
                      className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center space-y-2"
                    >
                      <Plus className="h-6 w-6" />
                      <span>Add Contacts</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab('compose')}
                      className="h-20 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center space-y-2"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>Compose Message</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab('send')}
                      className="h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center space-y-2"
                    >
                      <Send className="h-6 w-6" />
                      <span>Send Bulk</span>
                    </Button>


                    {role === "Admin" && (
                      <Button
                        onClick={() => setActiveTab('users')}
                        className="h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center space-y-2"
                      >
                        <Send className="h-6 w-6" />
                        <span>All Users</span>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts">
                <ContactManager contacts={contacts} setContacts={setContacts} />
              </TabsContent>

              {/* Compose Tab */}
              <TabsContent value="compose">
                <MessageComposer />
              </TabsContent>

              {/* Send Bulk Tab */}
              <TabsContent value="send">
                <BulkSender contacts={contacts} />
              </TabsContent>


              <TabsContent value="users">
                <UserDetails />
              </TabsContent>
            </Tabs>
          )


        ) : (
          /* Main Application */
          <div className="max-w-md mx-auto mt-20">
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-lg w-fit mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Register new User</CardTitle>
                <CardDescription>
                  Please register user to access messaging dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">User Name</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* 🌟 Role Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="SubscritionType">Subscrition Type</Label>
                  <select
                    id="SubscritionType"
                    name="SubscritionType"
                    value={formData.SubscritionType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ><option value="">Select Subscription Type</option>
                    <option value="Starter">Starter (Daily limit: 1000 messages)</option>
                    <option value="Pro">Pro (Daily limit: 5000 messages)</option>
                    <option value="Business">Business (Daily limit: 10,000 messages)</option>

                  </select>
                </div>

                <div className='flex flex-row  gap-2'>

                  <Button
                    onClick={handleCancelRegister}
                    className="w-[40%] bg-red-500 text-[#fff] hover:bg-red-700"
                  >

                    Cancel
                  </Button>

                  <Button
                    onClick={handleRegister}
                    className="w-[50%] bg-blue-600 text-[#fff] hover:bg-blue-700"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        )}







      </div>


    </div >
  );
};

export default Index;
