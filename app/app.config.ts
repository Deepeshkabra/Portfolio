export default defineAppConfig({
  global: {
    picture: {
      dark: '/me.jpg',
      light: '/me.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/deepesh-kabra', 
    email: 'deepeshkabrawork@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built by Deepesh Kabra • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/users/736941420279103560',
      'target': '_blank',
      'aria-label': 'Deepesh Kabra on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/Deepesh_kabra',
      'target': '_blank',
      'aria-label': 'Deepesh Kabra on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Deepeshkabra',
      'target': '_blank',
      'aria-label': 'Deepesh Kabra on GitHub',
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/deepeshkabra/',
      'target': '_blank',
      'aria-label': 'Deepesh Kabra on LinkedIn',
    }]
  }
})
