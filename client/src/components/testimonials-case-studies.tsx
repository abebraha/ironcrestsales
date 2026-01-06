import { motion } from "framer-motion";
import { Quote, Star, Users, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Testimonial, CaseStudy } from "@shared/schema";

export function TestimonialsAndCaseStudies() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: caseStudies = [], isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  // Default testimonials if none in database
  const defaultTestimonials: Testimonial[] = [
    {
      id: "default-1",
      clientName: "Sarah Chen",
      clientTitle: "CEO",
      company: "TechStart Solutions", 
      content: "IronCrest Sales transformed our approach to growth. Within 6 months, we had a scalable sales system and increased our revenue by 300%. Their team became our strategic partners.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "default-2",
      clientName: "Michael Rodriguez",
      clientTitle: "VP of Sales",
      company: "Growth Dynamics",
      content: "The outsourced sales approach exceeded our expectations. We went from struggling to hit targets to consistently exceeding them by 150%.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "default-3",
      clientName: "Jennifer Walsh",
      clientTitle: "Founder",
      company: "Scale Ventures",
      content: "Their strategic guidance and execution helped us build a world-class sales organization. Revenue increased 400% in the first year.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    }
  ];

  // Default case studies if none in database
  const defaultCaseStudies: CaseStudy[] = [
    {
      id: "case-1",
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
      imageUrl: null,
      isPublished: true,
      createdAt: new Date()
    },
    {
      id: "case-2", 
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
      imageUrl: null,
      isPublished: true,
      createdAt: new Date()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % displayCaseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + displayCaseStudies.length) % displayCaseStudies.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        strokeWidth={2.5}
      />
    ));
  };

  return (
    <section className="py-24 bg-[#F2F4F7] reveal-on-scroll" data-testid="testimonials-case-studies-section">
      <div className="container mx-auto px-4">
        {/* Testimonials Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-montserrat font-bold text-foreground mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped businesses achieve remarkable growth through strategic sales partnerships
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-md border border-border rounded-md" data-testid="testimonials-carousel">
            <CardContent className="p-8">
              {testimonialsLoading ? (
                <div className="space-y-4" data-testid="testimonial-loading">
                  <div className="flex justify-center">
                    <Skeleton className="w-12 h-12 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                  <div className="flex justify-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                  </div>
                </div>
              ) : displayTestimonials.length > 0 ? (
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevTestimonial}
                      className="p-2"
                      data-testid="testimonial-prev"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    
                    <div className="flex space-x-2">
                      {displayTestimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                          }`}
                          data-testid={`testimonial-dot-${index}`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextTestimonial}
                      className="p-2"
                      data-testid="testimonial-next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Quote className="w-12 h-12 text-primary/30" strokeWidth={2.5} />
                    </div>
                    
                    <blockquote className="text-xl italic text-muted-foreground mb-6 leading-relaxed">
                      "{displayTestimonials[currentTestimonial]?.content}"
                    </blockquote>
                    
                    <div className="flex justify-center mb-3">
                      {renderStars(displayTestimonials[currentTestimonial]?.rating || 5)}
                    </div>
                    
                    <div className="text-center">
                      <div className="font-montserrat font-semibold text-lg text-foreground">
                        {displayTestimonials[currentTestimonial]?.clientName}
                      </div>
                      <div className="text-muted-foreground">
                        {displayTestimonials[currentTestimonial]?.clientTitle}, {displayTestimonials[currentTestimonial]?.company}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground" data-testid="no-testimonials-fallback">
                  No testimonials available at the moment.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Case Studies Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-montserrat font-bold text-foreground mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real transformations from companies that trusted us to scale their sales operations
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 reveal-on-scroll" data-testid="case-studies-grid" style={{ transitionDelay: '300ms' }}>
          {caseStudiesLoading ? (
            // Loading skeleton for case studies
            [...Array(2)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white shadow-lg border-0" data-testid={`case-study-loading-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <Skeleton className="w-8 h-8 rounded" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="text-center">
                          <Skeleton className="h-8 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : displayCaseStudies.length > 0 ? (
            displayCaseStudies.map((caseStudy, index) => {
            const metrics = caseStudy.metrics ? JSON.parse(caseStudy.metrics) : {};
            
            return (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-premium h-full bg-white shadow-md border border-border hover:shadow-lg transition-shadow duration-300 rounded-md" data-testid={`case-study-${caseStudy.id}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="w-8 h-8 text-primary" strokeWidth={2.5} />
                      <div>
                        <h3 className="text-xl font-montserrat font-bold text-foreground">
                          {caseStudy.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {caseStudy.industry}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-orange-500" strokeWidth={2.5} />
                          Challenge
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {caseStudy.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-blue-500" strokeWidth={2.5} />
                          Solution
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {caseStudy.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-green-500" strokeWidth={2.5} />
                          Results
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {caseStudy.results}
                        </p>
                        
                        {Object.keys(metrics).length > 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(metrics).map(([key, value]) => (
                              <div key={key} className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-md p-3 text-center">
                                <div className="text-lg font-bold text-primary">{value as string}</div>
                                <div className="text-xs text-muted-foreground">{key}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-8 text-muted-foreground" data-testid="no-case-studies-fallback">
            No case studies available at the moment.
          </div>
        )}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-white">
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how we can scale your sales department without the risk
            </p>
            <Button 
              size="lg" 
              className="btn-premium bg-white text-primary hover:bg-gray-100 font-semibold px-8"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="cta-contact-button"
            >
              Start Your Transformation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}