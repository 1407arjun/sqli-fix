import { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        console.log(req.body.file)
    }
}

export default handler
