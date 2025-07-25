import {Button, Dialog, Portal, useSlotRecipe} from "@chakra-ui/react"

interface Props {
    onCancel: () => void;
    onConfirm: () => void;
}


const dialogHeader = {
    p: 6,
    pb: 4
};


const dialogBody = {
    p: 6,
    pt: 2,
    color: "rgba(255, 255, 255, 0.9)"
};

const dialogFooter = {
    p: 6,
    pt: 4,
    gap: 3
};


const DeleteAlert = ({onConfirm, onCancel}: Props) => {


    const recipe = useSlotRecipe({key: "dialogHelper"})
    const styles = recipe()


    return (
        <Dialog.Root role="alertdialog" open={true}>
            <Portal>
                <Dialog.Backdrop css={styles.backdrop}/>
                <Dialog.Positioner>
                    <Dialog.Content css={styles.content}>
                        <Dialog.Header {...dialogHeader}>
                            <Dialog.Title css={styles.title}>
                                Are you sure?
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body {...dialogBody}>
                            <p>
                                This action cannot be undone. This will permanently delete your session
                                and all associated messages.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer {...dialogFooter}>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    css={styles.cancel}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button
                                css={{
                                    bg: "red.500",
                                   color: "white",
                                    borderRadius:"10px"
                                }}
                                onClick={onConfirm}
                            >
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default DeleteAlert;