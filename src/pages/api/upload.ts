import { NextApiRequest, NextApiResponse } from "next"
import getQueries from "../../utils/getQueries"
import getQueryVars from "../../utils/getQueryVars"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const split = req.body.file.split(";")

        // Getting the queries from the file
        const queries = getQueries(split)

        const queryVars = []
        for (const q of queries) {
            // Getting variables used in the query
            queryVars.push(getQueryVars(q))
        }
        console.log(queries)
        res.send(queryVars)
    }
}

export default handler
