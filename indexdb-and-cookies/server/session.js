export const sessions = new Map();

export function getSession(sessionId) {
	const session = sessions.get(sessionId);
	if (!session) return null;

	if (Date.now() > session.expiresAt) {
		sessions.delete(sessionId);
		return null;
	}
	return session;
}
