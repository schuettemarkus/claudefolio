'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Project } from '@/data/types';
import { applyProjectTheme, isLightFlash } from '@/lib/theme';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BrowserFrame } from './BrowserFrame';
import { PhoneFrame } from './PhoneFrame';
import { DevicePlaceholder } from './DevicePlaceholder';
import { FeatureList } from './FeatureList';
import { StackTags } from './StackTags';
import { StatusPill } from './StatusPill';
import { MagneticButton } from './MagneticButton';

type Props = {
  project: Project;
  index: number;
};

function useImageExists(src: string): boolean {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
    img.src = src;
  }, [src]);
  return exists;
}

export function ProjectScene({ project, index }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const desktopExists = useImageExists(project.screenshots.desktop);
  const mobileExists = useImageExists(project.screenshots.mobile);

  const light = isLightFlash(project);

  const browserUrl = project.url
    ? project.url.replace(/^https?:\/\//, '')
    : project.repo
      ? project.repo.replace(/^https?:\/\//, '')
      : `/${project.slug}`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: just apply theme on scroll enter, no animations
    if (reducedMotion) {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => applyProjectTheme(project),
        onEnterBack: () => applyProjectTheme(project),
      });
      return () => trigger.kill();
    }

    // Only pin on desktop
    const mm = gsap.matchMedia();
    const triggers: ScrollTrigger[] = [];

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          onEnter: () => applyProjectTheme(project),
          onEnterBack: () => applyProjectTheme(project),
        },
      });

      // Phase 0-1: Title takeover (0-30%)
      // Per-letter mask: split title into spans
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        tl.fromTo(
          titleChars,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.15,
            stagger: 0.01,
            ease: 'power2.out',
          },
          0
        );
      }

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1, ease: 'power2.out' },
        0.12
      );

      // Status pill
      tl.fromTo(
        statusRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.18
      );

      // Phase 2: Device reveal (30-55%)
      tl.fromTo(
        desktopRef.current,
        { x: 200, rotateY: 6, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          x: 0,
          rotateY: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.25,
          ease: 'power2.out',
        },
        0.3
      );

      tl.fromTo(
        mobileRef.current,
        { y: 100, x: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0,
          x: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.2,
          ease: 'power2.out',
        },
        0.35
      );

      // Phase 3: Feature list + CTA (55-80%)
      const features = contentRef.current?.querySelectorAll('.feature-item');
      if (features) {
        tl.fromTo(
          features,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.05,
            stagger: 0.02,
            ease: 'power2.out',
          },
          0.55
        );
      }

      const featureLines = contentRef.current?.querySelectorAll('.feature-line');
      if (featureLines) {
        tl.fromTo(
          featureLines,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.08,
            stagger: 0.02,
            ease: 'power2.out',
          },
          0.58
        );
      }

      const stackSection = contentRef.current?.querySelector('.stack-tags');
      if (stackSection) {
        tl.fromTo(
          stackSection,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.05 },
          0.72
        );
      }

      const ctaSection = contentRef.current?.querySelector('.cta-area');
      if (ctaSection) {
        tl.fromTo(
          ctaSection,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.05 },
          0.75
        );
      }

      // Phase 4: Exit (80-100%)
      tl.to(
        devicesRef.current,
        { y: -60, opacity: 0, duration: 0.15, ease: 'power2.in' },
        0.82
      );
      tl.to(
        contentRef.current,
        { opacity: 0, duration: 0.1 },
        0.85
      );
      if (titleChars) {
        tl.to(
          titleChars,
          { y: -30, opacity: 0, duration: 0.1, stagger: 0.005 },
          0.85
        );
      }

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      // Divider bar animation
      if (dividerRef.current) {
        const divTl = gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: section,
              start: 'bottom-=10% top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
        if (divTl.scrollTrigger) triggers.push(divTl.scrollTrigger);
      }
    });

    // Mobile: simple reveal, no pinning
    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          once: true,
          onEnter: () => applyProjectTheme(project),
        },
      });

      tl.fromTo(
        section,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, [project, reducedMotion]);

  // When reduced motion, don't hide elements initially
  const hidden = reducedMotion ? '' : 'opacity-0';

  // Split title into chars for animation
  const titleChars = project.name.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex min-h-screen items-center overflow-hidden"
        aria-labelledby={`project-${project.slug}`}
        style={{
          perspective: '1200px',
        }}
      >
        {/* Accent glow behind devices */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ backgroundColor: project.theme.accent }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: text content */}
            <div ref={contentRef} className="order-2 lg:order-1">
              {/* Title */}
              <h2
                ref={titleRef}
                id={`project-${project.slug}`}
                className="font-display font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(40px, 8vw, 100px)',
                  lineHeight: 1.05,
                  color: light ? project.theme.text : project.theme.accent,
                }}
              >
                {titleChars}
              </h2>

              {/* Tagline */}
              <p
                ref={taglineRef}
                className={`mt-3 font-display italic ${hidden}`}
                style={{
                  fontSize: 'clamp(16px, 2vw, 24px)',
                  color: 'var(--foreground)',
                  opacity: 0.7,
                }}
              >
                {project.tagline}
              </p>

              {/* Status */}
              <div ref={statusRef} className={`mt-4 ${hidden}`}>
                <StatusPill status={project.status} />
              </div>

              {/* Features */}
              <div className="mt-8">
                <FeatureList features={project.features} />
              </div>

              {/* Stack tags */}
              <div className={`stack-tags mt-6 ${hidden}`}>
                <StackTags tags={project.stack} />
              </div>

              {/* CTA */}
              <div className={`cta-area mt-8 ${hidden}`}>
                {project.url ? (
                  <MagneticButton
                    href={project.url}
                    target="_blank"
                    data-cursor-label="Visit site →"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-white/5"
                    style={{
                      borderColor: `${project.theme.accent}40`,
                      color: project.theme.accent,
                    } as React.CSSProperties}
                  >
                    Visit site →
                  </MagneticButton>
                ) : project.repo ? (
                  <MagneticButton
                    href={project.repo}
                    target="_blank"
                    data-cursor-label="View repo →"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-white/5"
                    style={{
                      borderColor: `${project.theme.accent}40`,
                      color: project.theme.accent,
                    } as React.CSSProperties}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View on GitHub →
                  </MagneticButton>
                ) : (
                  <StatusPill status={project.status} enlarged />
                )}
              </div>
            </div>

            {/* Right: devices */}
            <div ref={devicesRef} className="relative order-1 lg:order-2">
              <div className="relative" style={{ perspective: '1200px' }}>
                {/* Desktop */}
                <div
                  ref={desktopRef}
                  className={hidden}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <BrowserFrame url={browserUrl}>
                    {desktopExists ? (
                      <Image
                        src={project.screenshots.desktop}
                        alt={`${project.name} desktop screenshot`}
                        width={1440}
                        height={900}
                        className="h-full w-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <DevicePlaceholder
                        name={project.name}
                        accent={project.theme.accent}
                        accentSoft={project.theme.accentSoft}
                        variant="desktop"
                      />
                    )}
                  </BrowserFrame>
                </div>

                {/* Mobile */}
                <div
                  ref={mobileRef}
                  className={`absolute -bottom-8 -right-4 w-[28%] ${hidden} lg:-right-8`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <PhoneFrame>
                    {mobileExists ? (
                      <Image
                        src={project.screenshots.mobile}
                        alt={`${project.name} mobile screenshot`}
                        width={390}
                        height={844}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <DevicePlaceholder
                        name={project.name}
                        accent={project.theme.accent}
                        accentSoft={project.theme.accentSoft}
                        variant="mobile"
                      />
                    )}
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connective divider */}
      <div className="relative h-px w-full overflow-hidden">
        <div
          ref={dividerRef}
          className="h-full w-full origin-left"
          style={{
            backgroundColor: project.theme.accent,
            opacity: 0.15,
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </>
  );
}
