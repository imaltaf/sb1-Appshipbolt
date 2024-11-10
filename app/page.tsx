'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Brain,
  Rocket,
  Code,
  Zap,
  MessageSquare,
  Image,
  FileText,
  PenTool,
  ArrowRight,
} from 'lucide-react';
import { useEffect } from 'react';
import { SubscribeForm } from '@/components/subscribe-form';
import { HeroAnimation } from '@/components/hero-animation';

const tools = [
  {
    title: 'AI Chat Assistant',
    description: 'Powerful AI chatbot for instant answers and assistance',
    icon: MessageSquare,
    category: 'ai',
    id: 'chatgpt-alternative',
  },
  {
    title: 'Image Generator',
    description: 'Create stunning images with AI-powered generation',
    icon: Image,
    category: 'ai',
    id: 'midjourney-alternative',
  },
  {
    title: 'Code Generator',
    description: 'Generate code snippets and boilerplates instantly',
    icon: Code,
    category: 'development',
    id: 'code-generator',
  },
  {
    title: 'Content Writer',
    description: 'AI-powered content creation and optimization',
    icon: FileText,
    category: 'productivity',
    id: 'content-writer',
  },
  {
    title: 'Design Tools',
    description: 'Create beautiful designs with our suite of tools',
    icon: PenTool,
    category: 'productivity',
    id: 'design-tools',
  },
  {
    title: 'Quick Actions',
    description: 'Automate your workflow with powerful shortcuts',
    icon: Zap,
    category: 'productivity',
    id: 'quick-actions',
  },
];

export default function Home() {
  useEffect(() => {
    const cards = document.getElementsByClassName('glass-card');

    const handleMouseMove = (e: MouseEvent) => {
      for (const card of cards) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-b from-primary/5 via-background to-background">
        <HeroAnimation />
        <div className="container section-padding relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              Your Ultimate Web Tools Platform
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover a comprehensive suite of AI-powered tools, productivity
              enhancers, and development utilities. Streamline your workflow
              with Appship.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg">
                <Link href="/tools">Explore Tools</Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card p-6 group">
            <Brain className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 text-xl font-semibold">AI-Powered</h3>
            <p className="mt-2 text-muted-foreground">
              Leverage cutting-edge AI technology to enhance your productivity
            </p>
          </div>
          <div className="glass-card p-6 group">
            <Rocket className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 text-xl font-semibold">Lightning Fast</h3>
            <p className="mt-2 text-muted-foreground">
              Experience blazing-fast performance with our optimized tools
            </p>
          </div>
          <div className="glass-card p-6 group">
            <Code className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 text-xl font-semibold">Developer Friendly</h3>
            <p className="mt-2 text-muted-foreground">
              Built by developers, for developers, with modern tech stack
            </p>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Popular Tools</h2>
          <Button variant="ghost" asChild>
            <Link href="/tools" className="group">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.id}`}
              className="block group"
            >
              <Card className="glass-card tool-card h-full">
                <div className="p-6">
                  <tool.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="mt-4 text-xl font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates about new
            tools and features. Join thousands of users who trust Appship for
            their daily workflow.
          </p>
          <div className="mt-8">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}