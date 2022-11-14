import {
    Center,
    Heading,
    VStack,
    HStack,
    Spacer,
    Box,
    Text,
    Grid,
    Divider
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import ColorToggle from "../components/ColorToggle"
import Display from "../components/Display"
import Head from "../components/Head"
import UploadButton from "../components/UploadButton"
import Fix from "../types/fix"
import getFix from "../utils/getFix"
import getQueries from "../utils/getQueries"
import getQueryVars from "../utils/getQueryVars"

const Home: NextPage = () => {
    const [file, setFile] = useState("")
    const [fixes, setFixes] = useState<Fix[]>([])

    useEffect(() => {
        console.log(1)
        const split: string[] = file.split(";")

        // Getting the queries from the file
        const queries = getQueries(split)

        const newFixes: Fix[] = []
        for (const q of queries) {
            // Getting variables used in the query
            const queryVars = getQueryVars(q)

            // Getting corrected query
            newFixes.push(getFix(split, q, queryVars))
        }
        console.log(newFixes)
        setFixes(newFixes)
    }, [file])

    return (
        <Center minH="100vh">
            <VStack p={8} spacing={8} w={file === "" ? "inherit" : "100%"}>
                <Head />
                <HStack justifyContent="center" alignItems="center" w="100%">
                    <Heading>SQLi Fix for PHP</Heading>
                    <Spacer />
                    {file !== "" && <UploadButton setFile={setFile} />}
                    <ColorToggle />
                </HStack>
                {file === "" && <UploadButton setFile={setFile} />}
                {fixes.map((f, i) => {
                    return (
                        <VStack key={f.before} spacing={4}>
                            <Heading size="lg">SQLi {i + 1}</Heading>
                            <Grid gap={4} templateColumns="repeat(2, 1fr)">
                                <Display heading="Before" text={f.before} />
                                <Display heading="After" text={f.after} />
                            </Grid>
                            <Divider borderColor="gray" rounded="md" />
                        </VStack>
                    )
                })}
            </VStack>
        </Center>
    )
}

export default Home
