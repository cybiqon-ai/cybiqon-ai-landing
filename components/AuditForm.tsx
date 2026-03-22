"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const auditSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\d{10,}$/, "Phone must be at least 10 digits"),
  website_url: z.string().url("Please enter a valid URL (include https://)"),
});

type AuditFormValues = z.infer<typeof auditSchema>;

export default function AuditForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: { name: "", email: "", phone: "", website_url: "" },
  });

  const onSubmit = async (values: AuditFormValues) => {
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { success?: boolean; error?: string } = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true);
      toast.success("Audit request submitted!");
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-6 md:p-8 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-secondary mx-auto" />
        <h3 className="text-base font-bold">Thank you</h3>
        <p className="text-xs text-muted-foreground">
          We&apos;ll review your website and get back within 48 hours with a detailed audit report.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 md:p-6">
      <h3 className="text-sm font-bold mb-4">Get your free audit</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Rajesh Kumar" className="text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Email address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="rajesh@yourbusiness.com" className="text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Phone number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="9876543210" className="text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Website URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://yourbusiness.com" className="text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs px-5 py-4"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get my free audit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
