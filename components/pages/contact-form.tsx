"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { contactConfig } from "@/config/site"
import { Analytics } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

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

// Global variable for tracking submissions
let globalSubmissionCount = 0

const MAX_SUBJECT_LENGTH = 100
const MAX_MESSAGE_LENGTH = 1000
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute in milliseconds

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),  // Hardcoded message
  msg: z.string().min(1, { message: "Message is required" }),      // Hardcoded message
  priority: z.enum(["low", "medium", "high"]).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const t = useTranslations('ContactForm')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)
  const startTime = useState(() => Date.now())[0]

  // Using inline styles instead of Tailwind
  const formStyle = {
    width: '100%',
    maxWidth: '24rem',
    padding: '2rem 0',
  }

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
      const now = Date.now()
      if (now - lastSubmitTime < RATE_LIMIT_DURATION) {
        toast({
          title: t('errors.wait'),
          description: "You can only submit once per minute", 
          variant: "destructive",
        })
        return
      }

      setIsSubmitting(true)
      globalSubmissionCount++

      const timeToSubmit = Date.now() - startTime

      Analytics.track({
        eventName: "form_submit",
        properties: {
          count: globalSubmissionCount,
          timeToSubmit,
        }
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const emailUrl = `mailto:${contactConfig.email}?subject=${values.subject}&body=${values.msg}`
      
      window.location.href = emailUrl
      form.reset()
      
      setLastSubmitTime(now)
      toast({
        title: "Success",
        description: t('success.emailOpened'),
        variant: "default",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      Analytics.track({
        eventName: "form_error",
        properties: {
          errorType: error instanceof Error ? error.message : "Unknown error",
        }
      })
      
      toast({
        title: "Error", // Hardcoded string
        description: t('errors.emailFailed'),
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
        style={formStyle}
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.subject.label')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter the subject"  // Hardcoded string
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
        <div style={{ height: '1rem' }} />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.priority.label')}</FormLabel>
              <FormControl>
                <select
                  {...field}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
                  disabled={isSubmitting}
                >
                  <option value="low">{t('fields.priority.options.low')}</option>
                  <option value="medium">{t('fields.priority.options.medium')}</option>
                  <option value="high">{t('fields.priority.options.high')}</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ height: '1rem' }} />
        <FormField
          control={form.control}
          name="msg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your message"  // Hardcoded string
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
        <div style={{ height: '1rem' }} />
        <Button 
          type="submit"
          style={{ width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              {t('buttons.sending')}
            </>
          ) : (
            t('buttons.submit')
          )}
        </Button>
      </form>
    </Form>
  )
}
