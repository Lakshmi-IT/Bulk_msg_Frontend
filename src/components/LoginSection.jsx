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

function LoginSection({formData,handleChange,handleLogin,handleCancelLogin}) {
    return (
        <div className="max-w-md mx-auto mt-20">
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
                <CardHeader className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-lg w-fit mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Welcome to BulkMessenger Pro</CardTitle>
                    <CardDescription>Please log in to access your messaging dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <div className='flex flex-row  gap-2'>

                        <Button
                            onClick={handleCancelLogin}
                            className="w-[40%] bg-red-500 text-[#fff] hover:bg-red-700"
                        >

                            Cancel
                        </Button>
                        <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginSection