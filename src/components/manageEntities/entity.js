import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

export default function Entity({
  rows,
  boxWidth,
  title,
  onClickView,
  onClickAdd,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <Box sx={{ width: `${boxWidth}%` }}>
      <Paper
        sx={{
          width: '90%',
          my: 2,
          mx: 'auto',
          borderRadius: 2,
          height: 300,
          overflowY: 'scroll',
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>

        <Tooltip title="Add">
          <IconButton onClick={onClickAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={() => onClickView(row._id)}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row._id}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onClickEdit(row._id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => onClickDelete(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
