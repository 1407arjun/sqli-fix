import { NextApiRequest, NextApiResponse } from "next"
import getQueries from "../../utils/getQueries"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const split = req.body.file.split(";")

        const queries = getQueries(split)
        res.send(queries)
    }
}

export default handler
