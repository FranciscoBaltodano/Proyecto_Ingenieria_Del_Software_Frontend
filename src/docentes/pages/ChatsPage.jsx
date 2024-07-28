import React from 'react'
import { ChatsMainPage } from "../../chats/ChatsMainPage";
import { DocenteLayout } from '../layout/DocenteLayout'
import { Grid } from '@mui/material';

export const ChatsPage = () => {
  return (
    <DocenteLayout titulo='Chats'>
      <Grid height='100%' container>
      <ChatsMainPage />
      </Grid>
    </DocenteLayout>
  )
}
