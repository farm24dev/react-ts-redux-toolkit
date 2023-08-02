import Avatar from "@mui/material/Avatar";
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
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../redux-toolkit/hook";
import { getCurrentAccountThunk } from "../../redux-toolkit/auth/auth_thunk";
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

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
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
      const userCrendential = await login(data.email, data.password);
      if (userCrendential.user != null) {
        dispatch(getCurrentAccountThunk(userCrendential.user.uid));
        toast.success("เข้าสู่ระบบสำเร็จ");
        navigate("/dashboard");
      }
    } catch (error: any) {
      let message: string = "";
      if (error.code === "auth/user-not-found") {
        message = "ไม่พบผู้ใช้งานอยู่ในระบบ";
      } else if (error.code === "auth/wrong-password") {
        message = "รหัสผ่านไม่ถูกต้อง";
      } else {
        message = error.message;
      }
      toast.error(message);
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
              Login
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
