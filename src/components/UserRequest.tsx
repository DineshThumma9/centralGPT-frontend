import {Box, Editable, Flex, HStack, IconButton, VStack} from "@chakra-ui/react";
import {type Message} from "../entities/Message.ts";
import {Check, Copy, User} from "lucide-react";
import {LuCheck, LuPencilLine, LuX} from "react-icons/lu";
import {toaster} from "./ui/toaster.tsx";
import {useState} from "react";
import FileDisplayForUserMessage from "./FileDisplayForUserMessage.tsx";

interface Props {
    msg: Message;
}

const box = {
    bg: "linear-gradient(135deg, purple.500, violet.500)",
    px: 4,
    py: 1,
    borderRadius: "xl",
    fontSize: "md",
    color: "white",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
    overflowWrap: "break-word" as const,
    boxShadow: "0 2px 12px rgba(147, 51, 234, 0.3)",
    border: "1px solid",
    borderColor: "purple.400"
}

const editableInput = {
    wordBreak: "break-word" as const,
    overflowWrap: "break-word" as const,
    whiteSpace: "pre-wrap" as const,
    bg: "purple.600",
    border: "1px solid",
    borderColor: "purple.400",
    _focus: {
        borderColor: "purple.300",
        boxShadow: "0 0 0 1px rgba(147, 51, 234, 0.3)"
    }
}

const editableIcon = {
    variant: "outline" as const,
    size: "xs" as const,
    colorScheme: "purple",
    bg: "white",
    color: "purple.600",
    _hover: {bg: "purple.50"}
}

const actionButton = {
    size: "sm" as const,
    variant: "ghost" as const,
    _hover: {bg: "purple.50"}
}

const UserRequest = ({msg}: Props) => {
    const [copied, setCopied] = useState(false);

    // Debug logging
    console.log('UserRequest received message:', msg);
    console.log('Message files:', msg.files);
    console.log('Files exists:', !!msg.files);
    console.log('Files length:', msg.files?.length);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(msg.content.trimEnd());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toaster.create({
                title: "Failed to copy",
                type: "error",
                description: String(err),
                duration: 2000,
            });
        }
    };

    return (
        <Flex
            direction="column"
            align="flex-end"
            w="100%"
            maxW="100%"

            px={2} // Optional small padding
        >

            <Flex
                align="flex-end"
                direction="row"
                gap={3}
                w="100%"
                justify="flex-end"
            >
                {/* Files Section */}
                <VStack align="flex-end" gap={1} maxW="80%">
                    {msg.files && msg.files.length > 0 && (
                        <Box maxW="full">
                            <FileDisplayForUserMessage files={msg.files}/>
                        </Box>
                    )}
                    <Box maxW="full" display="inline-block">
                        <Box {...box}>
                            <Editable.Root defaultValue={msg.content}>
                                <Editable.Preview
                                    wordBreak="break-word"
                                    overflowWrap="break-word"
                                    whiteSpace="pre-wrap"
                                />
                                <Editable.Input {...editableInput} />
                                <Editable.Control>
                                    <Editable.CancelTrigger asChild>
                                        <IconButton
                                            {...editableIcon}
                                            aria-label="Cancel edit"
                                        >
                                            <LuX/>
                                        </IconButton>
                                    </Editable.CancelTrigger>
                                    <Editable.SubmitTrigger asChild>
                                        <IconButton
                                            {...editableIcon}
                                            aria-label="Submit edit"
                                        >
                                            <LuCheck/>
                                        </IconButton>
                                    </Editable.SubmitTrigger>
                                </Editable.Control>
                            </Editable.Root>
                        </Box>
                    </Box>
                </VStack>

                {/* Avatar - Fixed width */}
                <Box flexShrink={0} mt={1}>
                    <Box
                        p={2}
                        bg="linear-gradient(135deg, violet.500, purple.500)"
                        borderRadius="full"
                        boxShadow="0 2px 8px rgba(147, 51, 234, 0.3)"
                    >
                        <User size={16} color="white"/>
                    </Box>
                </Box>
            </Flex>

            {/* Action buttons */}
            <HStack gap={2} mr={12}>
                <IconButton
                    {...actionButton}
                    colorScheme={copied ? "purple" : "gray"}
                    onClick={handleCopy}
                    aria-label="Copy message"
                >
                    {copied ? <Check color="purple" size={16}/> : <Copy color="gray" size={16}/>}
                </IconButton>

                <IconButton
                    {...actionButton}
                    aria-label="Edit message"
                >
                    <LuPencilLine color="gray" size={16}/>
                </IconButton>
            </HStack>
        </Flex>
    );
};

export default UserRequest;