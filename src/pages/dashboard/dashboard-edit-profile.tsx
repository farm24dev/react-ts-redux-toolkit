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
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { useAccount } from "../../hooks/use-account";

export default function DashboardEditProfilePage() {
  const navigate = useNavigate();
  const { account } = useAccount();
  const schema = yup.object().shape({
    firstName: yup.string().required("กรุณากรอกชื่อจริง"),
    lastName: yup.string().required("กรุณากรอกนามสกุล"),
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
      //   const userCrendential = await registerUser(data.firstName, data.lastName);
      //   if (userCrendential.user != null) {
      //     toast.success("สมัครสมาชิกสำเร็จ");
      //     navigate("/");
      //   }
      console.log(JSON.stringify(data));
      toast.success("บันทึกข้อมูลสำเร็จ");
    } catch (error: any) {
      toast.error(error);
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
            แก้ไขข้อมูลส่วนตัว
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
                  value={account?.firstName}
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
                  value={account?.lastName}
                  fullWidth
                  label="Last Name"
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message ?? ""}
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
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
