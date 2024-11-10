"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ArrowLeft, Download, Link2, Mail, Phone, Wifi } from "lucide-react";
import QRCode from "qrcode";
import { Label } from "@/components/ui/label";

type QRType = "url" | "email" | "phone" | "wifi";

interface QRData {
  url?: string;
  email?: string;
  subject?: string;
  phone?: string;
  wifiName?: string;
  wifiPassword?: string;
  wifiEncryption?: "WPA" | "WEP" | "nopass";
}

export default function QRGenerator() {
  const [qrData, setQRData] = useState<QRData>({});
  const [qrType, setQRType] = useState<QRType>("url");
  const [qrImage, setQRImage] = useState<string>("");
  const { toast } = useToast();

  const generateQRCode = async () => {
    let content = "";

    switch (qrType) {
      case "url":
        content = qrData.url || "";
        break;
      case "email":
        content = `mailto:${qrData.email}${
          qrData.subject ? `?subject=${encodeURIComponent(qrData.subject)}` : ""
        }`;
        break;
      case "phone":
        content = `tel:${qrData.phone}`;
        break;
      case "wifi":
        content = `WIFI:T:${qrData.wifiEncryption};S:${qrData.wifiName};P:${
          qrData.wifiPassword
        };;`;
        break;
    }

    if (!content) {
      toast({
        title: "Error",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const qr = await QRCode.toDataURL(content, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQRImage(qr);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrImage;
    link.click();
  };

  return (
    <div className="container section-padding">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/tools/utilities" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Utilities</span>
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Tabs
                defaultValue="url"
                value={qrType}
                onValueChange={(value) => setQRType(value as QRType)}
              >
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    <span className="hidden sm:inline">URL</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">Phone</span>
                  </TabsTrigger>
                  <TabsTrigger value="wifi" className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span className="hidden sm:inline">WiFi</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 space-y-4">
                  <TabsContent value="url">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="url">Website URL</Label>
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com"
                          value={qrData.url || ""}
                          onChange={(e) =>
                            setQRData({ ...qrData, url: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="email">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={qrData.email || ""}
                          onChange={(e) =>
                            setQRData({ ...qrData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Input
                          id="subject"
                          placeholder="Email subject"
                          value={qrData.subject || ""}
                          onChange={(e) =>
                            setQRData({ ...qrData, subject: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="phone">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={qrData.phone || ""}
                        onChange={(e) =>
                          setQRData({ ...qrData, phone: e.target.value })
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="wifi">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="wifi-name">Network Name (SSID)</Label>
                        <Input
                          id="wifi-name"
                          placeholder="WiFi network name"
                          value={qrData.wifiName || ""}
                          onChange={(e) =>
                            setQRData({ ...qrData, wifiName: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="wifi-password">Password</Label>
                        <Input
                          id="wifi-password"
                          type="password"
                          placeholder="WiFi password"
                          value={qrData.wifiPassword || ""}
                          onChange={(e) =>
                            setQRData({ ...qrData, wifiPassword: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="wifi-encryption">Encryption</Label>
                        <select
                          id="wifi-encryption"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={qrData.wifiEncryption || "WPA"}
                          onChange={(e) =>
                            setQRData({
                              ...qrData,
                              wifiEncryption: e.target
                                .value as QRData["wifiEncryption"],
                            })
                          }
                        >
                          <option value="WPA">WPA/WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">No Encryption</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>

              <Button className="w-full mt-6" onClick={generateQRCode}>
                Generate QR Code
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg">
              {qrImage ? (
                <>
                  <div className="relative w-[400px] h-[400px]">
                    <Image
                      src={qrImage}
                      alt="Generated QR Code"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <Button variant="outline" className="mt-4" onClick={downloadQR}>
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Your QR code will appear here</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}