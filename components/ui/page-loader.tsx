import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

export function PageLoader({ className, text = "Loading...", ...props }: PageLoaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-300",
                className
            )}
            {...props}
        >
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                <Spinner className="h-12 w-12 text-primary relative z-10" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
                {text}
            </p>
        </div>
    );
}
