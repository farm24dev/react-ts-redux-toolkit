import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstName: yup.string().required("กรุณากรอกชื่อจริง"),
    lastName: yup.string().required("กรุณากรอกนามสกุล"),
    email: yup
      .string()
      .required("กรุณากรอกอีเมล์")
      .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
    password: yup
      .string()
      .required("กรุณากรอกรหัสผ่าน")
      .min(6, "รหัสผ่าน 6 ตัวอักษรขึ้นไป"),
  });
  type FormData = yup.InferType<typeof schema>;
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const userCrendential = await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      if (userCrendential.user != null) {
        toast.success("สมัครสมาชิกสำเร็จ");
        navigate("/");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("มีผู้ใช้งานนี้อยู่ในระบบแล้ว");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  fullWidth
                  label="First Name"
                  autoFocus
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message ?? ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  fullWidth
                  label="Last Name"
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message ?? ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  fullWidth
                  label="Email Address"
                  error={errors.email ? true : false}
                  helperText={errors.email?.message ?? ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  fullWidth
                  label="Password"
                  type="password"
                  error={errors.password ? true : false}
                  helperText={errors.password?.message ?? ""}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
            >
              Sign Up
            </LoadingButton>
            <Grid
              container
              display="block"
              flexDirection="row-reverse"
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>{" "}
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
