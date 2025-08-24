import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        const email = typeof (creds as any)?.email === 'string' ? (creds as any).email : ''
        const password = typeof (creds as any)?.password === 'string' ? (creds as any).password : ''
        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null

        // Plain-text demo fallback (seeded users) OR bcrypt compare if you later hash
        if (user.password && user.password === password) return user as any
        try {
          const ok = await compare(password, user.password || '')
          if (ok) return user as any
        } catch {}

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        ;(token as any).role = (user as any).role
        ;(token as any).uid = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).role = (token as any).role
      ;(session as any).uid = (token as any).uid
      return session
    }
  }
})
