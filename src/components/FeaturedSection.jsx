import React from 'react'

import { MessageSquare, Send, Users, Plus, Upload, Download, LogIn, LogOut, User, PlusCircle, Check, Star, ArrowRight, Play, Smartphone, MessageCircle, BarChart3, Zap, Shield, Clock, Globe, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

function FeaturedSection() {
    return (
        <section className="py-20 ">
            <div className="max-w-full  px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works?</h2>
                    <p className="text-lg text-gray-600">Get started in 4 simple steps to reach your audience effectively</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Smartphone className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Setup Your Phone Number</h3>
                        <p className="text-gray-600">Connect your WhatsApp Business number to get started</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Create a Message Template</h3>
                        <p className="text-gray-600">Design personalized message templates for your campaigns</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Add or Import Your Contacts</h3>
                        <p className="text-gray-600">Upload your contact list or add contacts manually</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Create & Send Notifications</h3>
                        <p className="text-gray-600">Schedule and send bulk messages to your audience</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection