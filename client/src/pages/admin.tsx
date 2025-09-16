import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema, insertCaseStudySchema } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Testimonial, CaseStudy, InsertTestimonial, InsertCaseStudy } from "@shared/schema";
import { z } from "zod";

// Set auth token in localStorage for API requests
const AUTH_TOKEN = "admin-token-123";

// Enhanced schemas with proper validation
const testimonialFormSchema = insertTestimonialSchema.extend({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientTitle: z.string().min(2, "Client title must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  content: z.string().min(20, "Testimonial content must be at least 20 characters"),
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5").default(5)
});

const caseStudyFormSchema = insertCaseStudySchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  client: z.string().min(2, "Client name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  challenge: z.string().min(20, "Challenge description must be at least 20 characters"),
  solution: z.string().min(20, "Solution description must be at least 20 characters"),
  results: z.string().min(20, "Results description must be at least 20 characters"),
  metrics: z.string().optional()
});

type TestimonialForm = z.infer<typeof testimonialFormSchema>;
type CaseStudyForm = z.infer<typeof caseStudyFormSchema>;

interface AdminDialogProps {
  type: "testimonial" | "case-study";
  item?: Testimonial | CaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AdminDialog({ type, item, open, onOpenChange }: AdminDialogProps) {
  const { toast } = useToast();
  const isEditing = !!item;

  // Set up forms
  const testimonialForm = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: isEditing && type === "testimonial" ? {
      clientName: (item as Testimonial).clientName,
      clientTitle: (item as Testimonial).clientTitle,
      company: (item as Testimonial).company,
      content: (item as Testimonial).content,
      rating: (item as Testimonial).rating,
      isActive: (item as Testimonial).isActive
    } : {
      clientName: "",
      clientTitle: "",
      company: "",
      content: "",
      rating: 5,
      isActive: true
    }
  });

  const caseStudyForm = useForm<CaseStudyForm>({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: isEditing && type === "case-study" ? {
      title: (item as CaseStudy).title,
      client: (item as CaseStudy).client,
      industry: (item as CaseStudy).industry,
      challenge: (item as CaseStudy).challenge,
      solution: (item as CaseStudy).solution,
      results: (item as CaseStudy).results,
      metrics: (item as CaseStudy).metrics || "",
      imageUrl: (item as CaseStudy).imageUrl || "",
      isPublished: (item as CaseStudy).isPublished
    } : {
      title: "",
      client: "",
      industry: "",
      challenge: "",
      solution: "",
      results: "",
      metrics: "",
      imageUrl: "",
      isPublished: true
    }
  });

  // Mutations
  const testimonialMutation = useMutation({
    mutationFn: async (data: TestimonialForm) => {
      const endpoint = isEditing ? `/api/testimonials/${item!.id}` : "/api/testimonials";
      const method = isEditing ? "PUT" : "POST";
      return apiRequest(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: `Testimonial ${isEditing ? "updated" : "created"} successfully`
      });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      onOpenChange(false);
      testimonialForm.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} testimonial`,
        variant: "destructive"
      });
    }
  });

  const caseStudyMutation = useMutation({
    mutationFn: async (data: CaseStudyForm) => {
      const endpoint = isEditing ? `/api/case-studies/${item!.id}` : "/api/case-studies";
      const method = isEditing ? "PUT" : "POST";
      return apiRequest(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: `Case study ${isEditing ? "updated" : "created"} successfully`
      });
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      onOpenChange(false);
      caseStudyForm.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} case study`,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: TestimonialForm | CaseStudyForm) => {
    if (type === "testimonial") {
      testimonialMutation.mutate(data as TestimonialForm);
    } else {
      caseStudyMutation.mutate(data as CaseStudyForm);
    }
  };

  const currentForm = type === "testimonial" ? testimonialForm : caseStudyForm;
  const isPending = type === "testimonial" ? testimonialMutation.isPending : caseStudyMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit" : "Create"} {type === "testimonial" ? "Testimonial" : "Case Study"}
          </DialogTitle>
        </DialogHeader>

        <Form {...currentForm}>
          <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-4" data-testid={`form-${type}`}>
            {type === "testimonial" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={testimonialForm.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-client-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={testimonialForm.control}
                    name="clientTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Title</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO" {...field} data-testid="input-client-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={testimonialForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} data-testid="input-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testimonialForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your experience working with us..." 
                          rows={4} 
                          {...field} 
                          data-testid="textarea-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={testimonialForm.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="5" {...field} data-testid="input-rating" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={testimonialForm.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            data-testid="switch-active"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <>
                <FormField
                  control={caseStudyForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Success Story Title" {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={caseStudyForm.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <Input placeholder="Client Name" {...field} data-testid="input-client" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={caseStudyForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Technology" {...field} data-testid="input-industry" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={caseStudyForm.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the challenge..." 
                          rows={3} 
                          {...field} 
                          data-testid="textarea-challenge"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={caseStudyForm.control}
                  name="solution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solution</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the solution..." 
                          rows={3} 
                          {...field} 
                          data-testid="textarea-solution"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={caseStudyForm.control}
                  name="results"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Results</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the results achieved..." 
                          rows={3} 
                          {...field} 
                          data-testid="textarea-results"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={caseStudyForm.control}
                  name="metrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metrics (JSON format)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder='{"Revenue Growth": "150%", "Cost Reduction": "25%"}' 
                          rows={2} 
                          {...field} 
                          data-testid="textarea-metrics"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={caseStudyForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} data-testid="input-image-url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={caseStudyForm.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Published</FormLabel>
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            data-testid="switch-published"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                data-testid="button-submit"
              >
                {isPending ? "Saving..." : (isEditing ? "Update" : "Create")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPage() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"testimonial" | "case-study">("testimonial");
  const [editingItem, setEditingItem] = useState<Testimonial | CaseStudy | undefined>(undefined);

  // Fetch data
  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: caseStudies = [], isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  // Delete mutations
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${AUTH_TOKEN}`,
        }
      });
    },
    onSuccess: () => {
      toast({ title: "Success!", description: "Testimonial deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    }
  });

  const deleteCaseStudyMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/case-studies/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${AUTH_TOKEN}`,
        }
      });
    },
    onSuccess: () => {
      toast({ title: "Success!", description: "Case study deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete case study", variant: "destructive" });
    }
  });

  const openDialog = (type: "testimonial" | "case-study", item?: Testimonial | CaseStudy) => {
    setDialogType(type);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingItem(undefined);
  };

  return (
    <div className="min-h-screen bg-background p-6" data-testid="admin-page">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage testimonials and case studies</p>
        </motion.div>

        <Tabs defaultValue="testimonials" className="w-full" data-testid="admin-tabs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">
              Testimonials ({testimonials.length})
            </TabsTrigger>
            <TabsTrigger value="case-studies" data-testid="tab-case-studies">
              Case Studies ({caseStudies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Testimonials</h2>
              <Button 
                onClick={() => openDialog("testimonial")}
                data-testid="button-add-testimonial"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            {testimonialsLoading ? (
              <div className="text-center py-8" data-testid="loading-testimonials">Loading testimonials...</div>
            ) : (
              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="p-4" data-testid={`testimonial-card-${testimonial.id}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{testimonial.clientName}</h3>
                          <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                            {testimonial.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                            {testimonial.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {testimonial.clientTitle} at {testimonial.company}
                        </p>
                        <p className="text-sm line-clamp-2 mb-2">{testimonial.content}</p>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: testimonial.rating }, (_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">({testimonial.rating}/5)</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog("testimonial", testimonial)}
                          data-testid={`button-edit-testimonial-${testimonial.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                          disabled={deleteTestimonialMutation.isPending}
                          data-testid={`button-delete-testimonial-${testimonial.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {testimonials.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="no-testimonials">
                    No testimonials found. Create your first one!
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="case-studies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Case Studies</h2>
              <Button 
                onClick={() => openDialog("case-study")}
                data-testid="button-add-case-study"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Case Study
              </Button>
            </div>

            {caseStudiesLoading ? (
              <div className="text-center py-8" data-testid="loading-case-studies">Loading case studies...</div>
            ) : (
              <div className="grid gap-4">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="p-4" data-testid={`case-study-card-${caseStudy.id}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{caseStudy.title}</h3>
                          <Badge variant={caseStudy.isPublished ? "default" : "secondary"}>
                            {caseStudy.isPublished ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                            {caseStudy.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {caseStudy.client} • {caseStudy.industry}
                        </p>
                        <p className="text-sm line-clamp-2 mb-2">{caseStudy.challenge}</p>
                        {caseStudy.metrics && (
                          <div className="text-xs text-muted-foreground">
                            Metrics: {Object.keys(JSON.parse(caseStudy.metrics)).length} data points
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog("case-study", caseStudy)}
                          data-testid={`button-edit-case-study-${caseStudy.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCaseStudyMutation.mutate(caseStudy.id)}
                          disabled={deleteCaseStudyMutation.isPending}
                          data-testid={`button-delete-case-study-${caseStudy.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {caseStudies.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="no-case-studies">
                    No case studies found. Create your first one!
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <AdminDialog
          type={dialogType}
          item={editingItem}
          open={dialogOpen}
          onOpenChange={closeDialog}
        />
      </div>
    </div>
  );
}