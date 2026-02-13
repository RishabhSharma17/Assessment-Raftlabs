import Link from "next/link";
import type { Technology } from "@/data/technologies";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechnologyCardProps {
    technology: Technology;
}

export default function TechnologyCard({ technology }: TechnologyCardProps) {
    return (
        <Link href={`/technology/${technology.slug}`} className="group block">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl" role="img" aria-label={technology.name}>
                            {technology.logo}
                        </span>
                        <Badge variant="secondary">{technology.category}</Badge>
                    </div>
                    <CardTitle className="text-xl mt-3 group-hover:text-primary transition-colors">
                        {technology.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {technology.language} · Est. {technology.founded}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {technology.description}
                    </p>
                </CardContent>
                <CardFooter>
                    <span className="text-xs text-primary font-medium group-hover:underline">
                        Learn more →
                    </span>
                </CardFooter>
            </Card>
        </Link>
    );
}
