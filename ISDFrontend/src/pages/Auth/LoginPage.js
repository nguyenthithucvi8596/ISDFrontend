import React, { useEffect, useState, useContext } from 'react';
import { observer, Observer } from 'mobx-react'
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputAdornment, MenuItem, Typography, makeStyles, Paper, OutlinedInput, FormControl, IconButton, Select } from '@material-ui/core';
import CustomSelect from 'components/Core/Select/CustomSelect';
import Visibility from 'components/Core/Icon/Visibility';
import VisibilityOff from 'components/Core/Icon/VisibilityOff';
import logo from '../../assets/logo.png';
import backgroundLogin from '../../assets/bg.jpg';
import { createCompanyStore } from 'store/companyStore';
import { userContext } from "store/store";
import { toJS } from "mobx";
const useStyles = makeStyles((theme) => ({
    backgroundLogin: {
        backgroundImage: `url(${backgroundLogin})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',

    },
    paperForm: {
        paddingTop: '1px',
        paddingBottom: '2px',


    },
    sizePaper: {
        width: '595px',
        height: '740px',
        padding: '50px 80px 70px 80px',
        margin: '100px auto',
    },
    input: {
        borderRadius: '48px',
        width: '435px',
        background: '#F7FAFB',
    },
    img: {
        width: '136px ',
        height: '80px',
        marginLeft: '160px'

    },
    title: {
        fontWeight: '600',
        fontSize: '24px',
        lineHeight: '33px',
        padding: '15px 0 20px 0',
        //   color:blackColorTitle
    },
    label: {
        //   color:blackColorTitle,
        fontWeight: '700',
        paddingBottom: '10px'
    },
    button: {
        background: '#0052cc',
        borderRadius: '40px',
        color: '#fff',
        height: '48px'
    },
    IconButton: {

    }
}))
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Email không được để trống'),
    //   .min(9, 'Ít nhất 3 ký tự')
    //   .max(12, 'Tối đa 255 ký tự'),
    password: Yup.string()
        .required('Mật khẩu không được để thống')
        .min(6, 'Mật khẩu ít nhất 6 ký tự')
        .max(16, 'Mật khẩu tối đa 16 ký tự')
});
const LoginPage = (props) => {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const [hiddenSelect, setHiddenSelect] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const company = useContext(userContext);

    //======================hidden show password==================//
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //======================= handle Submit form login ==============// 
    const onSubmit = data => {
        data.saleOrg = toJS(company.saleCode)[0].saleOrgCode;
        data.companyCode = selectCompany;
      
        company.login(data);


    };
    const onchangeUserName = e => {
        if (e.target.value) {
            setHiddenSelect(e.target.value)
        }
    };

    useEffect(() => {
        company.getCompany(hiddenSelect)

    }, [hiddenSelect]);

    useEffect(() => {
        company.saleORG(hiddenSelect, selectCompany)
    }, [hiddenSelect, selectCompany]);
    const handlechangeSelect = (e) => {
        setSelectCompany(e)
    };
    return (
        <div className={classes.backgroundLogin}>
            <div className={classes.paperForm}  >
                <Paper className={classes.sizePaper} >
                    <img
                        className={classes.img}
                        src={logo}
                        alt="logo"
                    />
                    <br />
                    <Typography className={classes.title}>Đăng Nhập</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Grid container spacing={4}>
                            <Grid item md={12} xs={12}>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <Typography className={classes.label}>
                                        userName
                                    </Typography>
                                    <OutlinedInput
                                        {...register('userName')}
                                        className={classes.input}
                                        placeholder="userName"
                                        onChange={(e) => onchangeUserName(e)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <FormControl variant="outlined">
                                    <Typography className={classes.label}>
                                        Mật khẩu
                                    </Typography>
                                    <OutlinedInput
                                        {...register('password')}
                                        className={classes.input}
                                        placeholder="Mật khẩu"
                                        type={values.showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    className={classes.IconButton}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                </FormControl>
                            </Grid>
                            {
                                hiddenSelect ?
                                    <Grid item md={12} xs={12}>
                                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                                            <Typography className={classes.label}>
                                                Công ty
                                            </Typography>
                                            <CustomSelect names={names} company={company.company}
                                                // selectData={selectData}
                                                handlechangeSelect={handlechangeSelect} />
                                        </FormControl>
                                    </Grid> : ''
                            }

                            <Grid item md={12} xs={12}>
                                <Typography >
                                    <a style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: '#0b6aaf'
                                    }}
                                    //   onClick={() => history.push('/reset-password')}
                                    >Quên mật khẩu?
                                    </a>
                                </Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Button type="submit" fullWidth variant="contained" className={classes.button}>ĐĂNG NHẬP</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

            </div>
        </div>
    )
        ;
};

const Login = observer(LoginPage);
export { Login }
