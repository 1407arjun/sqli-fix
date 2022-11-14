import Query from "../types/query"

const getQueries = (split: string[]): Query[] => {
    const queryRuns: number[] = []

    // Getting where queries are run
    for (var i = 0; i < split.length; i++) {
        if (split[i].includes("->query(")) queryRuns.push(i)
    }

    const queries: string[] = []
    const queryPos: number[] = []

    // Getting the query variables
    for (const i of queryRuns) {
        const start = split[i].indexOf("->query(") + "->query(".length
        const end = split[i].substring(start).indexOf(")") + start
        const queryVar = split[i].substring(start, end).trim()
        queries.push(queryVar)

        if (
            !(
                (queryVar.startsWith('"') && queryVar.endsWith('"')) ||
                (queryVar.startsWith("'") && queryVar.endsWith("'"))
            )
        )
            queryPos.push(-1)
        else queryPos.push(i)
    }

    // Getting the queries from the variables
    for (var i = 0; i < queries.length; i++) {
        if (
            !(
                (queries[i].startsWith('"') && queries[i].endsWith('"')) ||
                (queries[i].startsWith("'") && queries[i].endsWith("'"))
            )
        ) {
            let query = ""
            for (var j = queryRuns[i] - 1; j >= 0; j--) {
                if (split[j].includes(queries[i] + " = ")) {
                    const start =
                        split[j].indexOf(queries[i] + " =") +
                        (queries[i] + " =").length
                    query = split[j].substring(start).trim()
                    break
                } else if (split[j].includes(queries[i] + "=")) {
                    const start =
                        split[j].indexOf(queries[i] + "=") +
                        (queries[i] + "=").length
                    query = split[j].substring(start).trim()
                    break
                }
            }
            queries[i] = query
            queryPos[i] = j
        }
    }

    const formattedQueries: Query[] = []

    for (var i = 0; i < queries.length; i++) {
        formattedQueries.push({
            query: queries[i],
            start: queryPos[i],
            end: queryRuns[i]
        })
    }

    return formattedQueries
}

export default getQueries
