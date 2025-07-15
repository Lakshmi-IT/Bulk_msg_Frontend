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

function HeroSection() {
    return (
        <section className="pb-20 ">
            <div className="max-w-full mx-auto px-4 sm:px-0 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            All-in-One WhatsApp
                            <span className="text-green-300"> Marketing Software</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Send bulk WhatsApp messages, manage contacts, and track performance with our powerful automation platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:bg-teal-700 text-white">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-green-3000 text-teal-600 hover:bg-teal-50">
                                <Play className="mr-2 h-5 w-5" />
                                Watch Demo
                            </Button>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Check className="h-4 w-4 text-green-300 mr-1" />
                                No Credit Card Required
                            </div>
                            <div className="flex items-center">
                                <Check className="h-4 w-4 text-green-300 mr-1" />
                                14-Day Free Trial
                            </div>
                        </div>
                    </div>
                    <img src="/heroSectionImage.png" alt="hero Image" className='md:w-[600px] md:h-[400px] w-full h-[300px]'/>
                    
                </div>
            </div>
        </section>
    )
}

export default HeroSection