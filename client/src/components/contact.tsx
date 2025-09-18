import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { AnimatedBackground } from "./animated-background";

// Floating Label Input Component
const FloatingLabelInput = ({ 
  field, 
  placeholder, 
  label, 
  type = "text",
  testId,
  isValid = false,
  hasError = false
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        type={type}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-testid={testId}
        className={`peer pt-6 pb-2 transition-colors duration-150 ${
          hasError ? 'border-red-500' : ''
        } ${
          isFocused ? 'border-primary' : ''
        } ${isValid && field.value ? 'pr-10' : ''}`}
      />
      <label
        className={`absolute left-3 transition-all duration-150 pointer-events-none ${
          field.value || isFocused 
            ? 'top-1 text-xs text-primary' 
            : 'top-4 text-sm text-foreground/70'
        }`}
        style={{
          transform: field.value || isFocused ? 'translateY(-8px) scale(0.9)' : 'none'
        }}
      >
        {label}
      </label>
      
      {/* Success checkmark - simple fade */}
      {isValid && field.value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
        </motion.div>
      )}
    </div>
  );
};

// Floating Label Textarea Component
const FloatingLabelTextarea = ({ field, label, testId, isValid = false, hasError = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Textarea
        {...field}
        placeholder=" "
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-testid={testId}
        className={`peer pt-6 pb-2 transition-colors duration-150 ${
          hasError ? 'border-red-500' : ''
        } ${
          isFocused ? 'border-primary' : ''
        } ${isValid && field.value ? 'pr-10' : ''}`}
      />
      <label
        className={`absolute left-3 transition-all duration-150 pointer-events-none ${
          field.value || isFocused 
            ? 'top-1 text-xs text-primary' 
            : 'top-4 text-sm text-foreground/70'
        }`}
        style={{
          transform: field.value || isFocused ? 'translateY(-8px) scale(0.9)' : 'none'
        }}
      >
        {label}
      </label>
      
      {/* Success checkmark - simple fade */}
      {isValid && field.value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-3 top-6"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
        </motion.div>
      )}
    </div>
  );
};

// Animated Select Component
const AnimatedSelect = ({ field, testId, children, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Select 
        onValueChange={field.onChange} 
        defaultValue={field.value}
        onOpenChange={setIsOpen}
      >
        <FormControl>
          <SelectTrigger 
            data-testid={testId}
            className={`transition-colors duration-150 ${
              isOpen ? 'border-primary' : ''
            } ${field.value ? 'border-green-500' : ''}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </div>
  );
};

// Progress Bar Component
const FormProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/75">Form Completion</span>
        <span className="text-sm font-semibold text-gold-accent">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      revenueGoal: "",
      message: "",
    },
  });

  // Calculate form progress
  useEffect(() => {
    const values = form.watch();
    const fields = Object.keys(values);
    const filledFields = fields.filter(key => values[key as keyof typeof values]);
    const progress = (filledFields.length / fields.length) * 100;
    setFormProgress(progress);
  }, [form.watch()]);

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Thank you for your inquiry!",
        description: data.message || "We'll be in touch within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden noise-texture gpu-accelerated">
      {/* Animated background with contact variant */}
      <AnimatedBackground variant="contact" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-6" data-testid="contact-title">
            Ready to Scale Your Sales?
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Schedule a consultation with our sales experts to discuss your growth goals and how we can help you achieve them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            id="contact-form"
            className="bg-card rounded-2xl p-8 border border-border shadow-lg relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            data-testid="contact-form"
          >
            
            <h3 className="text-2xl font-montserrat font-bold text-foreground mb-6">Get Started Today</h3>
            
            {isSubmitted ? (
              <motion.div 
                className="text-center py-8" 
                data-testid="form-success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h4 className="text-xl font-montserrat font-semibold text-foreground mb-2">Thank You!</h4>
                <p className="text-foreground/80">We've received your inquiry and will be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <FormProgressBar progress={formProgress} />
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput 
                              field={field} 
                              label="First Name" 
                              testId="input-first-name"
                              isValid={!fieldState.error && field.value}
                              hasError={!!fieldState.error}
                            />
                          </FormControl>
                          <AnimatePresence>
                            {fieldState.error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <FormMessage />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput 
                              field={field} 
                              label="Last Name" 
                              testId="input-last-name"
                              isValid={!fieldState.error && field.value}
                              hasError={!!fieldState.error}
                            />
                          </FormControl>
                          <AnimatePresence>
                            {fieldState.error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <FormMessage />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput 
                              field={field} 
                              label="Company Email" 
                              type="email"
                              testId="input-email"
                              isValid={!fieldState.error && field.value}
                              hasError={!!fieldState.error}
                            />
                          </FormControl>
                          <AnimatePresence>
                            {fieldState.error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <FormMessage />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput 
                              field={field} 
                              label="Company Name" 
                              testId="input-company"
                              isValid={!fieldState.error && field.value}
                              hasError={!!fieldState.error}
                            />
                          </FormControl>
                          <AnimatePresence>
                            {fieldState.error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <FormMessage />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="revenueGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Revenue Goal</FormLabel>
                          <AnimatedSelect 
                            field={field} 
                            testId="select-revenue-goal"
                            placeholder="Select range..."
                          >
                            <SelectItem value="1M-5M">$1M - $5M</SelectItem>
                            <SelectItem value="5M-10M">$5M - $10M</SelectItem>
                            <SelectItem value="10M-25M">$10M - $25M</SelectItem>
                            <SelectItem value="25M+">$25M+</SelectItem>
                          </AnimatedSelect>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelTextarea 
                              field={field} 
                              label="How can we help?" 
                              testId="textarea-message"
                              isValid={!fieldState.error && field.value}
                              hasError={!!fieldState.error}
                            />
                          </FormControl>
                          <AnimatePresence>
                            {fieldState.error && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <FormMessage />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-primary/90 transition-all duration-200 relative overflow-hidden group"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={contactMutation.isPending ? { x: '100%' } : {}}
                        transition={{
                          repeat: contactMutation.isPending ? Infinity : 0,
                          duration: 1,
                          ease: "linear"
                        }}
                      />
                      <span className="relative flex items-center justify-center">
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Schedule Consultation"
                        )}
                      </span>
                    </Button>
                  </div>
                  </form>
                </Form>
              </>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-card rounded-2xl p-8 border border-border shadow-lg" 
              data-testid="contact-info"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4" 
                  data-testid="contact-phone"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Phone</h4>
                    <p className="text-foreground/80">+1 (555) 123-4567</p>
                    <p className="text-sm text-foreground/70">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4" 
                  data-testid="contact-email"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Email</h4>
                    <p className="text-foreground/80">info@ironcretsales.com</p>
                    <p className="text-sm text-foreground/70">Response within 24 hours</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4" 
                  data-testid="contact-location"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-yellow-500/10 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Headquarters</h4>
                    <p className="text-foreground/80">New York, NY</p>
                    <p className="text-sm text-foreground/70">Serving clients nationwide</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white relative overflow-hidden" 
              data-testid="why-choose"
              whileHover={{ 
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
              />
              
              <div className="relative">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Why Choose IronCrest?</h3>
                <ul className="space-y-3">
                  {[
                    "Immediate impact on revenue",
                    "Proven scalable systems",
                    "Expert sales professionals",
                    "Strategic partnership approach"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-300 mr-3" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
