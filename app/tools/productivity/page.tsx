import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { categories } from "@/app/data/tools";

export default function ProductivityTools() {
  const productivityTools = categories.find((c) => c.id === "productivity")?.tools || [];

  return (
    <div className="container section-padding">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/tools" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Tools</span>
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Productivity Tools</h1>
        <p className="text-lg text-muted-foreground">
          Boost your productivity with these essential tools
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productivityTools.map((tool) => (
          <Card key={tool.id} className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <tool.icon className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-semibold">{tool.title}</h2>
            </div>
            <p className="text-muted-foreground mb-6">{tool.description}</p>
            <div className="flex items-center justify-center text-muted-foreground">
              <Construction className="h-5 w-5 mr-2" />
              <span>Coming Soon</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}