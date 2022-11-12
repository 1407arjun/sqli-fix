import { AttachmentIcon } from "@chakra-ui/icons"
import { Box, Button } from "@chakra-ui/react"

const UploadButton = () => {
    return (
        <Box alignSelf="center">
            <form method="POST" action="/upload">
                <input type="file" accept=".php"></input>
                <Button leftIcon={<AttachmentIcon />}>Upload PHP file</Button>
            </form>
        </Box>
    )
}

export default UploadButton
