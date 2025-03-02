"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { contactConfig } from "@/config/site"
import { Analytics } from "@/lib/analytics"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

// Custom type for analytics events
type ContactFormEvent = {
  eventName: "CONTACT_FORM_SUBMIT" | "CONTACT_FORM_ERROR"
  properties: {
    subject?: string
    errorType?: string
    timeToSubmit?: number
  }
}

const MAX_SUBJECT_LENGTH = 100
const MAX_MESSAGE_LENGTH = 1000
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute in milliseconds

const formSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(MAX_SUBJECT_LENGTH, { message: `Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters` })
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]*$/, {
      message: "Subject contains invalid characters",
    }),
  msg: z
    .string()
    .min(1, { message: "Message is required" })
    .max(MAX_MESSAGE_LENGTH, { message: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters` })
    .transform((str) => str.trim()),
  priority: z.enum(["low", "medium", "high"]).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)
  const startTime = useState(() => Date.now())[0]

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      msg: "",
      priority: "medium",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      // Rate limiting check
      const now = Date.now()
      if (now - lastSubmitTime < RATE_LIMIT_DURATION) {
        toast({
          title: "Please wait",
          description: "You can only submit once per minute",
          variant: "destructive",
        })
        return
      }

      setIsSubmitting(true)

      // Track form submission time
      const timeToSubmit = Date.now() - startTime

      // Log analytics event
      Analytics.track<ContactFormEvent>({
        eventName: "CONTACT_FORM_SUBMIT",
        properties: {
          subject: values.subject,
          timeToSubmit,
        },
      })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Encode email parameters
      const subject = encodeURIComponent(values.subject)
      const body = encodeURIComponent(values.msg)
      const priorityTag = values.priority ? `[${values.priority.toUpperCase()}] ` : ""

      window.location.href = `mailto:${contactConfig.email}?subject=${priorityTag}${subject}&body=${body}`
      
      setLastSubmitTime(now)
      form.reset()
      
      toast({
        title: "Success",
        description: "Email client opened successfully",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      Analytics.track<ContactFormEvent>({
        eventName: "CONTACT_FORM_ERROR",
        properties: {
          errorType: error instanceof Error ? error.message : "Unknown error",
        },
      })
      
      toast({
        title: "Error",
        description: "Failed to open email client",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterCount = form.watch("msg").length

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full space-y-4 py-8 sm:w-[24rem]",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Contact form"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter the subject" 
                  {...field}
                  aria-describedby="subject-description"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription id="subject-description">
                {field.value.length}/{MAX_SUBJECT_LENGTH} characters used
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  disabled={isSubmitting}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="msg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your message" 
                  {...field}
                  aria-describedby="message-description"
                  disabled={isSubmitting}
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormDescription id="message-description">
                Your message will be sent through email ({characterCount}/{MAX_MESSAGE_LENGTH} characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  )
}
