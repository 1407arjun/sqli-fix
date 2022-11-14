import { AttachmentIcon } from "@chakra-ui/icons"
import { Box, Button, Textarea } from "@chakra-ui/react"
import { FormEvent, useState } from "react"

const UploadButton = () => {
    const [file, setFile] = useState("")

    const readFile = (event: FormEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        //@ts-ignore
        const { files } = event.target

        fileReader.readAsText(files[0], "UTF-8")
        fileReader.onload = (e) => {
            const content = e.target!.result?.toString().replace(/\r\n/g, "\n")
            if (content) setFile(content)
        }
    }

    return (
        <Box alignSelf="center">
            <form method="POST" action="/api/upload">
                <Textarea
                    name="file"
                    value={file}
                    style={{ display: "none" }}
                />
                <input
                    type="file"
                    accept=".php"
                    name="upload"
                    onChange={readFile}></input>
                <Button type="submit" leftIcon={<AttachmentIcon />}>
                    Upload PHP file
                </Button>
            </form>
        </Box>
    )
}

export default UploadButton
