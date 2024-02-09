import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography, TextField } from "@mui/material";

function GenericModal({
    isOpenModal,
    message,
    input,
    inputHandlerFunction,
    closeModalHandler,
    optionalStyle,
}) {

    // modal styling
    const style = optionalStyle
        ? optionalStyle
        : {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
          };
    return (
        <Modal
            open={isOpenModal}
            onClose={(event, reason) => {
                // force a button click to close the modal
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
            }}
        >
            <Box sx={style}>
                <Typography>{message}</Typography>
                {inputHandlerFunction && (
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                    >
                        <TextField
                            onChange={(e) =>
                                inputHandlerFunction(e.target.value)
                            }
                        >{input}
                        </TextField>
                    </Box>
                )}
                <Button onClick={() => closeModalHandler()}>close Modal</Button>
            </Box>
        </Modal>
    );
}

export default GenericModal;
