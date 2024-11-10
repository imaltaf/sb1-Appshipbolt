import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "../../../data/tools";

export async function generateStaticParams() {
  const params = [];
  
  for (const category of categories) {
    for (const tool of category.tools) {
      params.push({
        category: category.id,
        tool: tool.id,
      });
    }
  }
  
  return params;
}

export default function ToolPage({
  params,
}: {
  params: { category: string; tool: string };
}) {
  const category = categories.find((c) => c.id === params.category);
  const tool = category?.tools.find((t) => t.id === params.tool);

  if (!category || !tool) {
    notFound();
  }

  return (
    <div className="container section-padding">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/tools" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Tools</span>
        </Link>
      </Button>

      <Card className="glass-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <tool.icon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{tool.title}</h1>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          {tool.description}
        </p>
        <p className="text-muted-foreground">
          This tool will be implemented soon. Check back later!
        </p>
      </Card>
    </div>
  );
}