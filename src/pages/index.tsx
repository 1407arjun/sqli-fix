import { Center, Heading, VStack, HStack, Spacer } from "@chakra-ui/react"
import type { NextPage } from "next"
import ColorToggle from "../components/ColorToggle"
import Head from "../components/Head"
import UploadButton from "../components/UploadButton"

const Home: NextPage = () => {
    return (
        <Center minH="100vh">
            <VStack p={8} spacing={8}>
                <Head />
                <HStack justifyContent="center" alignItems="center" w="100%">
                    <Heading>SQLi Fix for PHP</Heading>
                    <Spacer />
                    <ColorToggle />
                </HStack>
                <UploadButton />
            </VStack>
        </Center>
    )
}

export default Home
