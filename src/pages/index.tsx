import { Center, Heading, VStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "../components/Head"
import UploadButton from "../components/UploadButton"

const Home: NextPage = () => {
    return (
        <Center minH="100vh">
            <VStack p={8} spacing={4}>
                <Head />
                <Heading>SQLi Fix for PHP</Heading>
                <UploadButton />
            </VStack>
        </Center>
    )
}

export default Home
