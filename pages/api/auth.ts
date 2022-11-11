import { NextApiRequest, NextApiResponse } from 'next';
import { encodePayload, getBCAuth, setSession } from '../../lib/auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    var logTitle="auth.ts :: auth() ";
    try {
        console.log("req", req)
        // Authenticate the app on install
        const session = await getBCAuth(req.query);
        const encodedContext = encodePayload(session); // Signed JWT to validate/ prevent tampering
        console.log("session", session);
        await setSession(session);
        res.redirect(302, `/?context=${encodedContext}`);
    } catch (error) {
        console.log(logTitle+"error", error)
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
