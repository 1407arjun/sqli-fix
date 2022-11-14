import Query from "../types/query"
import QueryVar from "../types/query-var"

const getFix = (
    split: string[],
    q: Query,
    vars: QueryVar[]
): { before: string; after: string } => {
    const { query, start, end } = q
    console.log(start, end)
    const before = split.slice(start, end + 1).join(";") + ";"

    if (vars.length <= 0) {
        return {
            before: "",
            after: ""
        }
    }

    let ps = "$sql = " + query.substring(0, vars[0].start)

    // Making the prepared statement
    for (var i = 0; i < vars.length; i++) {
        if (i < vars.length - 1)
            ps += "?" + query.substring(vars[i].end + 1, vars[i + 1].start)
        else ps += "?" + query.substring(vars[i].end + 1)
    }

    ps += ";"

    const connVarSplit = split[end].split("$")
    let index = 0
    for (var i = 0; i < connVarSplit.length; i++) {
        if (connVarSplit[i].includes("->query(")) {
            index = i
            break
        }
    }
    const connVar = connVarSplit[index]
        .substring(0, connVarSplit[index].indexOf("->query("))
        .trim()

    // Preparing the statement
    const stmt = "$stmt = " + connVar + "->prepare($sql);"

    // Binding the variables
    const bind =
        '$stmt->bind_param("' +
        vars.map((v) => v.type).join("") +
        '", ' +
        vars.map((v) => v.var).join(", ") +
        ");"

    const after = ps + "\r\n" + stmt + "\r\n" + bind

    return {
        before,
        after
    }
}

export default getFix
