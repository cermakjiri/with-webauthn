import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ParsedToken, User } from 'firebase/auth';

export type AuthSession =
    | {
          state: 'loading' | 'unauthenticated';
          authUser: null;
      }
    | {
          state: 'authenticated';
          authUser: User;
          tokenClaims: ParsedToken;
      };

export type AuthContextType = Readonly<{
    session: AuthSession;
    setSession: Dispatch<SetStateAction<AuthSession>>;
}>;

export const AuthContext = createContext<AuthContextType | null>(null);
