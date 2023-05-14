import { Button, Typography } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardElementForm from '../../component/CardElementForm'
import { formLoadallAction } from '../../redux/actions/FormAction'
import Navbar from '../../component/Navbar'

const UserFormsHistory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(formLoadallAction());
    }, []);
    const {forms,loading} = useSelector( (state) => state.allforms);
    const [data1, setData1] = useState([]);
    console.log(loading)
    console.log(forms)
    useEffect(() => {
      if (forms) {
        const formattedData = forms.map((candidat) => {
          return {
            id: candidat.id,
            formName: candidat.formName,
            createdAt: candidat.createdAt,
          };
        });
  
       
  
        setData1(formattedData);
      } else {
        setData1([]);
      }
    }, [forms]);
  



    return (
        <>
             <Navbar/>
            <Box>
                <Typography variant="h4" sx={{ color: 'black' }}> All Forms</Typography>
                { <Box>
                    {
                        data1 && data1.map((form, i) => (
                                            <CardElementForm
                                            key={i}
                                            id={form.id}
                                          formName={form.formName}
                                />
                        ))
                    }
                </Box> 
                }
            </Box>
        </>
    )
}

export default UserFormsHistory