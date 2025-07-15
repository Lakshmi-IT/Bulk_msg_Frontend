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

function WhatyougetSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-full  px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Here's What You Get</h2>
                    <p className="text-lg text-gray-600">All the tools you need to run successful WhatsApp marketing campaigns</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center">
                            <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">WhatsApp API for Markup</h3>
                            <p className="text-gray-600">Send rich media messages with images, documents, and interactive buttons</p>
                        </div>
                    </Card>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center">
                            <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Send Marketing Messages</h3>
                            <p className="text-gray-600">Create and send targeted marketing campaigns to boost your business</p>
                        </div>
                    </Card>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center">
                            <div className="bg-green-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Transaction Notifications</h3>
                            <p className="text-gray-600">Send automated transaction alerts and order confirmations</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default WhatyougetSection