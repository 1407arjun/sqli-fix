import {
    Center,
    Heading,
    VStack,
    HStack,
    Spacer,
    Box,
    Text,
    Grid,
    Divider,
    Input,
    Button,
    RadioGroup,
    Stack,
    Radio
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import ColorToggle from "../components/ColorToggle"
import Display from "../components/Display"
import Head from "../components/Head"
import UploadButton from "../components/UploadButton"

const Home: NextPage = () => {
    const [value, setValue] = useState("0")

    return (
        <Center minH="100vh">
            <VStack p={8} spacing={8}>
                <Head />
                <HStack justifyContent="center" alignItems="center" w="100%">
                    <Heading>SQLi Attack PHP</Heading>
                    <Spacer />
                    <ColorToggle />
                </HStack>
                <form
                    action="http://localhost:8888/sqli-fix/php/view.php"
                    method="GET"
                    style={{ width: "100%" }}>
                    <VStack spacing={4}>
                        <Input
                            name="regno"
                            id="regno"
                            placeholder="Enter your register number"
                            size="lg"
                            required
                        />
                        <RadioGroup
                            onChange={setValue}
                            value={value}
                            name="method"
                            id="method"
                            defaultValue="0">
                            <Stack direction="row">
                                <Radio value="0">No protection</Radio>
                                <Radio value="1">Prepared Statements</Radio>
                                <Radio value="2">Whitelist Validation</Radio>
                            </Stack>
                        </RadioGroup>
                        <Button type="submit">Submit</Button>
                    </VStack>
                </form>
            </VStack>
        </Center>
    )
}

export default Home
