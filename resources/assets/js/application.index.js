const locales = {
  en: () => require('react-intl?locale=en!./language/en.json'),
  es: () => require('react-intl?locale=es!./language/es.json')
}

const loadLocaleData = locale =>
  new Promise( resolve =>
    locales[locale]()(resolve)
  )

loadLocaleData('es').then( messages => {
  global.locale='es'
  global.messages=messages
  require('./application')
})
