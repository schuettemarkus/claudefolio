'use client';

import { LenisProvider } from '@/components/LenisProvider';
import { Nav } from '@/components/Nav';
import { GrainOverlay } from '@/components/GrainOverlay';
import { Cursor } from '@/components/Cursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Intro } from '@/components/Intro';
import { ProjectScene } from '@/components/ProjectScene';
import { Stats } from '@/components/Stats';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { EasterEgg } from '@/components/EasterEgg';
import { projects } from '@/data/projects';
import { resetTheme } from '@/lib/theme';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    resetTheme();
  }, []);

  return (
    <LenisProvider>
      <Cursor />
      <GrainOverlay />
      <EasterEgg />
      <ScrollProgress />
      <Nav />

      <Hero />
      <Marquee />
      <Intro />

      <div id="work">
        {projects.map((project, i) => (
          <ProjectScene key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Stats />
      <Contact />
      <Footer />
    </LenisProvider>
  );
}
