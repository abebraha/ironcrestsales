import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema,
  insertTestimonialSchema,
  insertCaseStudySchema,
  insertTeamMemberSchema,
  insertBlogPostSchema,
  insertLeadSchema
} from "@shared/schema";
import { z } from "zod";

// Basic auth middleware for admin endpoints
function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth || auth !== 'Bearer admin-token-123') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your inquiry! We'll be in touch within 24 hours.",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      }
      
      console.error("Contact form submission error:", error);
      res.status(500).json({
        success: false,
        message: "We're experiencing technical difficulties. Please try again or contact us directly."
      });
    }
  });

  // Get all contact submissions (for admin use)
  app.get("/api/contact-submissions", requireAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact submissions"
      });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json({ success: true, testimonial });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ success: false, message: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      
      res.json({ success: true, testimonial });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ success: false, message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTestimonial(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      
      res.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
  });

  // Case Studies API
  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getPublishedCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ success: false, message: "Failed to fetch case studies" });
    }
  });

  app.post("/api/case-studies", requireAuth, async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const caseStudy = await storage.createCaseStudy(validatedData);
      res.status(201).json({ success: true, caseStudy });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      }
      console.error("Error creating case study:", error);
      res.status(500).json({ success: false, message: "Failed to create case study" });
    }
  });

  app.put("/api/case-studies/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertCaseStudySchema.partial().parse(req.body);
      const caseStudy = await storage.updateCaseStudy(id, validatedData);
      
      if (!caseStudy) {
        return res.status(404).json({ success: false, message: "Case study not found" });
      }
      
      res.json({ success: true, caseStudy });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors
        });
      }
      console.error("Error updating case study:", error);
      res.status(500).json({ success: false, message: "Failed to update case study" });
    }
  });

  app.delete("/api/case-studies/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCaseStudy(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Case study not found" });
      }
      
      res.json({ success: true, message: "Case study deleted successfully" });
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({ success: false, message: "Failed to delete case study" });
    }
  });

  // Seed data endpoint (for development) - protected
  app.post("/api/seed-data", requireAuth, async (req, res) => {
    try {
      // Seed testimonials
      const testimonialData = [
        {
          clientName: "Sarah Chen",
          clientTitle: "CEO",
          company: "TechStart Solutions",
          content: "IronCrest Sales transformed our approach to growth. Within 6 months, we had a scalable sales system and increased our revenue by 300%. Their team became our strategic partners.",
          rating: 5,
          isActive: true
        },
        {
          clientName: "Michael Rodriguez", 
          clientTitle: "VP of Sales",
          company: "Growth Dynamics",
          content: "The outsourced sales approach exceeded our expectations. We went from struggling to hit targets to consistently exceeding them by 150%.",
          rating: 5,
          isActive: true
        },
        {
          clientName: "Jennifer Walsh",
          clientTitle: "Founder", 
          company: "Scale Ventures",
          content: "Their strategic guidance and execution helped us build a world-class sales organization. Revenue increased 400% in the first year.",
          rating: 5,
          isActive: true
        }
      ];

      for (const testimonial of testimonialData) {
        await storage.createTestimonial(testimonial);
      }

      // Seed case studies
      const caseStudyData = [
        {
          title: "SaaS Startup Revenue Transformation",
          client: "TechFlow Analytics",
          industry: "B2B SaaS",
          challenge: "Early-stage SaaS company struggling to achieve product-market fit with only $50K MRR after 18 months.",
          solution: "Implemented comprehensive sales strategy with lead qualification framework, automated nurturing sequences, and structured sales process.",
          results: "Achieved $500K ARR within 12 months with 85% customer retention rate and 3x improvement in sales cycle efficiency.",
          metrics: JSON.stringify({
            "Revenue Growth": "900%",
            "Sales Cycle": "-65%", 
            "Customer Retention": "85%",
            "Lead Conversion": "12% to 28%"
          }),
          isPublished: true
        },
        {
          title: "Manufacturing Sales Team Scaling",
          client: "Industrial Solutions Corp",
          industry: "Manufacturing", 
          challenge: "Traditional manufacturer needed to scale sales team and modernize processes to compete with digital-first competitors.",
          solution: "Built hybrid inside/outside sales team with CRM implementation, sales training programs, and digital lead generation.",
          results: "Increased sales team from 3 to 15 members while maintaining quality. Grew revenue from $2M to $12M annually.",
          metrics: JSON.stringify({
            "Revenue Growth": "500%",
            "Team Size": "5x increase", 
            "Market Share": "+35%",
            "Customer Acquisition Cost": "-40%"
          }),
          isPublished: true
        }
      ];

      for (const caseStudy of caseStudyData) {
        await storage.createCaseStudy(caseStudy);
      }

      res.json({ success: true, message: "Sample data seeded successfully" });
    } catch (error) {
      console.error("Error seeding data:", error);
      res.status(500).json({ success: false, message: "Failed to seed data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
