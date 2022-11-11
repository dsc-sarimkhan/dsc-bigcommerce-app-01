import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function products(req: NextApiRequest, res: NextApiResponse) {
    var logTitle="index.ts :: products() ";
    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash);

        const { data } = await bigcommerce.get('/catalog/summary');
        console.log(logTitle+"data", data);
        res.status(200).json(data);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
