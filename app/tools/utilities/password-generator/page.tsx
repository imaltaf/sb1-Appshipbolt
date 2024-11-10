'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { ArrowLeft, Copy, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const { toast } = useToast();

  const generatePassword = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let chars = '';
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;

    if (!chars) {
      toast({
        title: 'Error',
        description: 'Please select at least one character type',
        variant: 'destructive',
      });
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast({
      title: 'Copied!',
      description: 'Password copied to clipboard',
    });
  };

  const handleSliderChange = (newValue: number[]) => {
    setLength(newValue);
  };

  const handleSwitchChange = (
    checked: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(checked);
  };

  return (
    <div
      className="container section-padding"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        asChild
        className="mb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href="/tools/utilities" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Utilities</span>
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Password Generator</h1>

        <div className="space-y-8" onClick={(e) => e.stopPropagation()}>
          {/* Password Output */}
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="pr-24 font-mono text-lg h-12"
              placeholder="Generated password"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={generatePassword}
                className="h-8 w-8"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={copyToClipboard}
                disabled={!password}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Password Length */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Password Length</Label>
              <span className="font-mono">{length[0]}</span>
            </div>
            <Slider
              value={length}
              onValueChange={handleSliderChange}
              min={8}
              max={32}
              step={1}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Password Options */}
          <div className="space-y-4">
            <div
              className="flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <Label htmlFor="numbers">Include Numbers</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, setIncludeNumbers)
                }
              />
            </div>

            <div
              className="flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <Label htmlFor="symbols">Include Symbols</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, setIncludeSymbols)
                }
              />
            </div>

            <div
              className="flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <Label htmlFor="lowercase">Include Lowercase Letters</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, setIncludeLowercase)
                }
              />
            </div>

            <div
              className="flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <Label htmlFor="uppercase">Include Uppercase Letters</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, setIncludeUppercase)
                }
              />
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full">
            Generate Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
