<script setup lang="ts">
import { t } from '@/data/i18n'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="shell">
      <div class="about__grid">
        <div v-reveal>
          <p class="eyebrow"><i class="eyebrow__dot" aria-hidden="true"></i> {{ t('about.eyebrow') }}</p>
          <h2 id="about-title" class="about__statement">
            {{ t('about.leadA') }} <em class="serif">{{ t('about.leadB') }}</em> {{ t('about.leadC') }}
          </h2>
        </div>

        <div v-reveal="140">
          <div class="about__copy">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
          </div>

          <dl class="about__facts">
            <div class="about__fact">
              <dt>{{ t('about.focus') }}</dt>
              <dd>{{ t('about.focusValue') }}</dd>
            </div>
            <div class="about__fact">
              <dt>{{ t('about.also') }}</dt>
              <dd>{{ t('about.alsoValue') }}</dd>
            </div>
            <div class="about__fact">
              <dt>{{ t('about.standard') }}</dt>
              <dd>{{ t('about.standardValue') }}</dd>
            </div>
          </dl>

          <div v-reveal="220" class="about__extra">
            <div class="about__credential">
              <span>{{ t('about.eduLabel') }}</span>
              <p>{{ t('about.eduValue') }}</p>
            </div>
            <div class="about__credential">
              <span>{{ t('about.soloLabel') }}</span>
              <p>{{ t('about.soloValue') }}</p>
            </div>
            <div class="about__credential">
              <span>{{ t('about.certLabel') }}</span>
              <ul class="about__certs">
                <li>{{ t('about.cert1') }}</li>
                <li>{{ t('about.cert2') }}</li>
                <li>{{ t('about.cert3') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
