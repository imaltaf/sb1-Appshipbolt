import Link from "next/link";
import { Card } from "@/components/ui/card";
import { categories } from "../data/tools";

export default function ToolsPage() {
  return (
    <div className="container section-padding">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">All Tools</h1>
        <p className="text-lg text-muted-foreground">
          Explore our comprehensive collection of tools designed to enhance your
          productivity and streamline your workflow.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {category.description}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {category.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${category.id}/${tool.id}`}
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
        ))}
      </div>
    </div>
  );
}