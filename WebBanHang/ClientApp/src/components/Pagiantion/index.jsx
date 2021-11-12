import React from 'react';
import { Stack, Pagination as MuiPagination } from '@mui/material'

const Pagination = (props) => {
    const { totalPage, page, onChange } = props;


    return (
        <Stack>
            <MuiPagination count={totalPage} page={page} onChange={onChange} color="secondary" />
        </Stack>
    );
}

export default Pagination;
 