<template>
  <section class="about container">
    <img :src="profilePic" alt="Bruno Emanuel" class="profile-pic" />

    <p class="intro">
      Hi! I'm <strong>Bruno Jaime</strong>, a {{ currentAge }}-year-old Frontend Developer from
      Goiânia, Brazil. I specialize in building dynamic and scalable interfaces using Vue.js and
      TypeScript.
    </p>

    <section class="section">
      <h2>Professional Summary</h2>
      <p>
        I’ve been working primarily with Vue.js (Vue 2 & 3) and TypeScript to develop dashboards and
        supply chain management tools. My focus lies in data visualization (especially using
        Highcharts), manipulating complex datasets such as sell-in, sell-out, and inventory data.
        <br />
        I also bring backend knowledge (Node.js, Java, C#), database experience (PostgreSQL, SQL
        Server), and IT infrastructure exposure, including SAP B1 integration, AWS, and network
        support.
      </p>
    </section>

    <section class="section">
      <h2>Technical Skills</h2>
      <ul>
        <li>
          <strong>Frontend:</strong> Vue 2 & 3, TypeScript, Vuetify, Highcharts, JavaScript ES6+
        </li>
        <li><strong>Backend:</strong> Node.js, Express, Java, C#, REST APIs</li>
        <li><strong>Databases:</strong> PostgreSQL, SQL Server, Oracle PL/SQL</li>
        <li><strong>Tools:</strong> Git, CI/CD, DevOps, SCRUM, Pentaho, Landix</li>
        <li><strong>ERP & Infra:</strong> SAP B1, AWS, Windows Servers, Networks & Firewalls</li>
      </ul>
    </section>

    <section class="section">
      <h2>Experience</h2>
      <ul>
        <li>
          <strong>Implanta IT (2021 - Present)</strong><br />
          Frontend Developer building and maintaining Vue-based dashboards with TypeScript,
          Highcharts, and Vuetify.
        </li>
        <li>
          <strong>Major Nutrição (2020 - 2021)</strong><br />
          Full-stack development with Java and Node.js, database routines, SAP B1 support, and
          infrastructure management.
        </li>
        <li>
          <strong>Gold Sistemas (2019)</strong><br />
          ERP support for Colosso and Antares systems, PL/SQL scripting, and client assistance via
          helpdesk.
        </li>
        <li>
          <strong>Síntese Comércio Hospitalar (2018 - 2019)</strong><br />
          IT intern handling infrastructure tasks and user support.
        </li>
        <li>
          <strong>Agrocria (2014 - 2016)</strong><br />
          Trainee in IT, supporting infra and internal users.
        </li>
      </ul>
    </section>

    <section class="section">
      <h2>Education</h2>
      <p><strong>Software Engineering (UFG) – Interrupted</strong></p>
      <p>Complementary: Modern Web with JavaScript (Udemy), PL/SQL (Rational Technology)</p>
    </section>

    <section class="section">
      <h2>Languages</h2>
      <ul>
        <li>Portuguese – Native</li>
        <li>English – Fluent</li>
      </ul>
    </section>

    <section class="section">
      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Email:</strong>
          <a href="mailto:emanuelbrunosj@gmail.com">emanuelbrunosj@gmail.com</a>
        </li>

        <li>
          <strong>Phone:</strong>
          <a href="https://api.whatsapp.com/send?phone=5562991532200&text=Ola!" target="_blank">
            +55 (62) 99153-2200
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>
          <a href="https://www.linkedin.com/in/bruno-jaime-898409135" target="_blank"
            >linkedin.com/in/bruno-jaime</a
          >
        </li>
        <li>
          <strong>GitHub:</strong>
          <a href="https://github.com/brunoemanuelsj" target="_blank">github.com/brunoemanuelsj</a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import profilePic from '@/assets/imgs/profile.jpg';

const birthDate = new Date('1998-12-10');
const today = new Date();

const age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();
const isBeforeBirthday =
  monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate());

const currentAge = isBeforeBirthday ? age - 1 : age;
</script>

<style scoped>
.container {
  max-width: 900px;

  padding: 3rem 2rem;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.6;
  color: #2d3748;
}

.section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  color: #2d3748;
  padding-bottom: 0.5rem;
}

.section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #4299e1, #48bb78);
}

.profile-pic {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  border: 4px solid white;
}

.profile-pic:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(66, 153, 225, 0.2);
}

.section {
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.section:hover {
  transform: translateY(-5px);
}

ul {
  padding-left: 1.5rem;
  list-style: none;
}

ul li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

ul li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: #4299e1;
}

.intro {
  font-size: 1.2rem;
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
}

a {
  color: #4299e1;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  margin-left: 5px;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #48bb78;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .profile-pic {
    width: 140px;
    height: 140px;
  }

  .section {
    padding: 1.5rem;
    margin: 2rem 0;
  }
}

.intro strong {
  background: linear-gradient(135deg, #4299e1, #48bb78);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

.experience li {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.experience li:hover {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
