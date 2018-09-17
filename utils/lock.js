import { setSecret } from './auth'

import uuid from 'uuid'

const getLock = options => {
  const config = require('~/config.json')
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = container => {
  const secret = uuid.v4()
  setSecret(secret)
  return {
    container,
    closable: false,
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    },
    theme: {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Atom_symbol_as_used_in_the_logo_of_the_television_series_The_Big_Bang_Theory_%28black%29.svg/470px-Atom_symbol_as_used_in_the_logo_of_the_television_series_The_Big_Bang_Theory_%28black%29.svg.png',
      primaryColor: 'darkkhaki'
    },
    languageDictionary: {
      title: 'ClimaScience'
    }
  }
}

export const showLogin = container => getLock(getOptions(container)).show()

export const logout = () => getLock().logout({ returnTo: getBaseUrl() })
