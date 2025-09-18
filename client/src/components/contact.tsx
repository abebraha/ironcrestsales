import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, MapPin, CheckCircle, Loader2, CheckIcon, Sparkles } from "lucide-react";
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
  isValid = false 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  return (
    <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
      <Input
        {...field}
        type={type}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleClick}
        data-testid={testId}
        className={`peer pt-6 pb-2 transition-all duration-200 ${
          isFocused ? 'ring-2 ring-primary ring-offset-1 shadow-lg' : ''
        } ${isValid && field.value ? 'pr-10' : ''}`}
      />
      <motion.label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          field.value || isFocused 
            ? 'top-1 text-xs text-primary font-semibold' 
            : 'top-4 text-sm text-foreground/70'
        }`}
        animate={{
          y: field.value || isFocused ? -8 : 0,
          scale: field.value || isFocused ? 0.85 : 1,
          color: field.value || isFocused ? 'var(--primary)' : 'var(--foreground)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {label}
      </motion.label>
      
      {/* Success checkmark animation */}
      <AnimatePresence>
        {isValid && field.value && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect */}
      <AnimatePresence>
        {showRipple && (
          <motion.span
            className="absolute pointer-events-none bg-primary/20 rounded-full"
            style={{
              left: ripplePosition.x,
              top: ripplePosition.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Floating Label Textarea Component
const FloatingLabelTextarea = ({ field, label, testId, isValid = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
      <Textarea
        {...field}
        placeholder=" "
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-testid={testId}
        className={`peer pt-6 pb-2 transition-all duration-200 ${
          isFocused ? 'ring-2 ring-primary ring-offset-1 shadow-lg' : ''
        } ${isValid && field.value ? 'pr-10' : ''}`}
      />
      <motion.label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          field.value || isFocused 
            ? 'top-1 text-xs text-primary font-semibold' 
            : 'top-4 text-sm text-foreground/70'
        }`}
        animate={{
          y: field.value || isFocused ? -8 : 0,
          scale: field.value || isFocused ? 0.85 : 1,
          color: field.value || isFocused ? 'var(--primary)' : 'var(--foreground)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {label}
      </motion.label>
      
      {/* Success checkmark */}
      <AnimatePresence>
        {isValid && field.value && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="absolute right-3 top-6"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Animated Select Component
const AnimatedSelect = ({ field, testId, children, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Select 
        onValueChange={field.onChange} 
        defaultValue={field.value}
        onOpenChange={setIsOpen}
      >
        <FormControl>
          <SelectTrigger 
            data-testid={testId}
            className={`transition-all duration-200 ${
              isOpen ? 'ring-2 ring-primary ring-offset-1 shadow-lg' : ''
            } ${field.value ? 'border-green-500' : ''}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
      {field.value && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3 }}
          className="h-0.5 bg-green-500 mt-1 rounded-full"
        />
      )}
    </motion.div>
  );
};

// Particle Effect Component
const ParticleEffect = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 200}%`,
            y: `${50 + (Math.random() - 0.5) * 200}%`,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 1 + Math.random(),
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Confetti Component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const confettiPieces = Array.from({ length: 30 });
  const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF6347'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={{
            backgroundColor: colors[i % colors.length],
            left: '50%',
            top: '50%',
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0
          }}
          animate={{
            x: (Math.random() - 0.5) * window.innerWidth,
            y: -Math.random() * window.innerHeight,
            rotate: Math.random() * 720,
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.02,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Progress Bar Component
const FormProgressBar = ({ progress }: { progress: number }) => {
  return (
    <motion.div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/75">Form Completion</span>
        <motion.span 
          className="text-sm font-semibold text-gold-accent"
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.div
            className="h-full bg-white/20"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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
      setShowParticles(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowParticles(false);
        setShowConfetti(false);
      }, 3000);
      form.reset();
      toast({
        title: "Thank you for your inquiry!",
        description: data.message || "We'll be in touch within 24 hours.",
      });
    },
    onError: (error: any) => {
      // Shake animation for error
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.classList.add('animate-shake');
        setTimeout(() => formElement.classList.remove('animate-shake'), 500);
      }
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

  // Shake animation for validation errors
  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.classList.add('animate-shake');
        formElement.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5)';
        setTimeout(() => {
          formElement.classList.remove('animate-shake');
          formElement.style.boxShadow = '';
        }, 500);
      }
    }
  }, [form.formState.errors]);

  return (
    <section id="contact" className="py-20 relative overflow-hidden noise-texture gpu-accelerated">
      {/* Animated background with contact variant */}
      <AnimatedBackground variant="contact" />
      <Confetti active={showConfetti} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-gold-accent" />
          </motion.div>
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
            <ParticleEffect active={showParticles} />
            
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
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut"
                  }}
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
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
                  </motion.div>
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
                  <motion.div 
                    className="bg-primary/10 p-3 rounded-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </motion.div>
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
                  <motion.div 
                    className="bg-accent/10 p-3 rounded-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Mail className="w-5 h-5 text-accent" />
                  </motion.div>
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
                  <motion.div 
                    className="bg-yellow-500/10 p-3 rounded-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <MapPin className="w-5 h-5 text-gold-accent" />
                  </motion.div>
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
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <CheckCircle className="w-5 h-5 text-yellow-300 mr-3" />
                      </motion.div>
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
