"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { onInvoke } from "../actions";

const formSchema = z.object({
  content: z
    .string()
    .min(1, "Project description is required")
    .max(1000, "Description is too long"),
});

type FormValues = z.infer<typeof formSchema>;

type ProjectTemplate = {
  emoji: string;
  title: string;
  prompt: string;
};

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    emoji: "🎬",
    title: "Build a Netflix clone",
    prompt:
      "Build a Netflix-style homepage with a hero banner (use a nice, dark-mode compatible gradient here), movie sections, responsive cards, and a modal for viewing details using mock data and local state. Use dark mode.",
  },
  {
    emoji: "📦",
    title: "Build an admin dashboard",
    prompt:
      "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state.",
  },
  {
    emoji: "📋",
    title: "Build a kanban board",
    prompt:
      "Build a kanban board with drag-and-drop using react-beautiful-dnd.",
  },
  {
    emoji: "🗂️",
    title: "Build a file manager",
    prompt: "Build a file manager with folder list and file grid.",
  },
  {
    emoji: "📺",
    title: "Build a YouTube clone",
    prompt: "Build a YouTube-style homepage with mock video thumbnails.",
  },
  {
    emoji: "🛍️",
    title: "Build a store page",
    prompt: "Build a store page with category filters and cart logic.",
  },
  {
    emoji: "🏡",
    title: "Build an Airbnb clone",
    prompt: "Build an Airbnb-style listings grid with mock data.",
  },
  {
    emoji: "🎵",
    title: "Build a Spotify clone",
    prompt: "Build a Spotify-style music player with playback controls.",
  },
];

const ProjectForm: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const handleTemplate = (prompt: string) => {
    form.setValue("content", prompt);
  };

  const onInvokeAI = async () => {
    try {
      const res = await onInvoke();
      console.log(res);
      toast.success("Done");
    } catch (error) {
      console.error("error", error);
      toast.error("error invoking AI");
    }
  };

  return (
    <div className="space-y-8">
      <Button onClick={onInvokeAI}>Invoke AI agent</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplate(template.prompt)}
            //disabled={isPending}
            className="group relative p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all"
          >
            <div className="flex flex-col gap-2">
              <span className="text-3xl">{template.emoji}</span>
              <h3 className="text-sm font-medium">{template.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          //onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl",
            isFocused && "shadow-lg",
          )}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <TextAreaAutosize
                {...field}
                //disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={3}
              />
            )}
          />

          {/* <Button type="submit">
            (
            <Loader2Icon className="animate-spin" />
            ) : (
            <ArrowUpIcon />)
          </Button> */}
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
