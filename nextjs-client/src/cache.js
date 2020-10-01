import { makeVar, InMemoryCache } from '@apollo/client';
import { AUTH_TOKEN } from './constants'
import Cookies from 'js-cookie'

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar()
            }
          },
          favSubreddits: {
            read() {
              return favSubredditsVar()
            }
          }
        }
      }
    }
  });

export const isLoggedInVar = makeVar(!!Cookies.get(AUTH_TOKEN))
export const favSubredditsVar = makeVar([])
