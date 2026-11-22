<script setup lang="ts"></script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="shell">
      <div class="about__grid">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> 03 / About</p>
          <h2 id="about-title" class="about__statement" style="margin-top: 26px">
            Software that feels <em class="serif">considered.</em> Engineering quiet enough that the details do the talking.
          </h2>
        </div>

        <div v-reveal="140">
          <div class="about__copy">
            <p>
              I'm Burak, a developer working across creative frontend, interface engineering and browser games. I care about
              typography, pacing and the small decisions that make an interface feel inevitable.
            </p>
            <p>
              My work ranges from production web apps to an isometric farming world with real-time co-op. I like the whole
              arc: shaping an idea, building the system behind it, then tuning the last five percent in the browser.
            </p>
          </div>

          <dl class="about__facts">
            <div class="about__fact">
              <dt>Focus</dt>
              <dd>Frontend &amp; interface engineering</dd>
            </div>
            <div class="about__fact">
              <dt>Also</dt>
              <dd>Browser games &amp; real-time systems</dd>
            </div>
            <div class="about__fact">
              <dt>Standard</dt>
              <dd>Fast, accessible, built with care</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
