import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ["/", "/auth(.*)", "/portal(.*)", '/images(.*)'],
	ignoredRoutes: ["/chatbot", '/favicon.ico'],
});

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}