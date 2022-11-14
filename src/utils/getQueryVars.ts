import Query from "../types/query"
import QueryVar from "../types/query-var"

const getQueryVars = (q: Query): QueryVar[] => {
    const vars: QueryVar[] = []
    const { query } = q

    for (var i = 0; i < query.length - 1; i++) {
        if (query.substring(i, i + 1).startsWith("$")) {
            const variable: QueryVar = { var: "", type: "", start: -1, end: -1 }

            if (query.substring(i - 1, i) === "'") {
                variable.var = query
                    .substring(i, query.substring(i).indexOf("'") + i)
                    .trim()
                variable.type = "s"
                variable.start = i - 1
                variable.end = variable.start + variable.var.length
            } else if (query.substring(i - 1, i) === '"') {
                variable.var = query
                    .substring(i, query.substring(i).indexOf('"') + i)
                    .trim()
                variable.type = "s"
                variable.start = i - 1
                variable.end = variable.start + variable.var.length
            } else {
                variable.var = query
                    .substring(i, query.substring(i).indexOf(" ") + i)
                    .trim()
                variable.type = "d"
                variable.start = i
                variable.end = variable.start + variable.var.length - 1
            }
            vars.push(variable)
        }
    }

    return vars
}

export default getQueryVars
