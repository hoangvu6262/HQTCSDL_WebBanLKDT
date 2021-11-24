import React, { useState} from "react";
import CustomToggleButton from "../CustomToggleButton";
import { InputBase, Button, Divider } from "@mui/material";
import { styled } from "@mui/styles";

const InputAdd = styled('div')({
    border: "1px solid  #ddcece",
})

const AddButton = styled('div')({
    padding: "20px 0"
})

const Comment = (props) => {
    const { onClickAddComment } = props;
    const [addComment, setAddComment] = useState("")

    const handleOnChange = (e) => {
        setAddComment(e.target.value);
    }

    return (
        <div>
            <CustomToggleButton />
            <InputAdd>
                <InputBase
                    fullWidth
                    multiline={true}
                    autoComplete="off"
                    rows="5"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Add comments here!!"
                    inputProps={{ 'aria-label': 'Add comments here!!' }}
                    onChange={handleOnChange}
                />
            </InputAdd>
            <AddButton>
                <Button variant="outlined" color="info" onClick={() => onClickAddComment(addComment, setAddComment)}>Add comment</Button>
            </AddButton>
            <Divider />
        </div>
    );
}
export default Comment;