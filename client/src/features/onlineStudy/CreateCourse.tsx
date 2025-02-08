import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createCourseAsync, fetchAllYearsPrograms } from "./courseSlice";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./courseValidation";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CreateCourse() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { years, currentCourseLoaded, currentCourse } = useAppSelector(
    (state) => state.course
  );
  const studyPrograms = useAppSelector((state) => state.course.programs);
  const filtersLoaded = useAppSelector((state) => state.course.filtersLoaded);

  const statusC = useAppSelector((state) => state.course.status);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // console.log(
  //   "GODINE I PROGRAMII :                         " + years,
  //   studyPrograms
  // );
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchAllYearsPrograms());
  }, [dispatch, filtersLoaded]);
  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset();

    const adjustedDate = new Date(localDate.getTime() - offset * 60000);
    const newCourse = {
      name: data.name,
      description: data.description,
      yearId: data.yearId,
      studyProgramId: data.studyProgramId,
      courseCreationDate: adjustedDate.toISOString(),
    };
    console.log(newCourse);

    // try {
    const resultAction = await dispatch(createCourseAsync(newCourse));
    // } catch (error: any) {
    //   console.log(error);
    // } finally {
    //   console.log(currentCourse);
    //   navigate(`/courses/${currentCourse.id}`);
    // }

    if (createCourseAsync.fulfilled.match(resultAction)) {
      navigate(`/courses/${resultAction.payload.id}`);
      console.log(statusC);
    } else {
      console.log("else" + statusC);
      console.error("Failed to create course:", resultAction.payload);
    }
  };
  if (!filtersLoaded) return <LoadingComponent message="Učitavanje..." />;

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ width: "40%", padding: 8, minWidth: "fit-content" }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            gap: 4,
            width: "100%",
            padding: 2,
            backgroundColor: "background.default",
            borderRadius: "20px",
            border: "2px solid",
            borderColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontFamily: "Raleway, sans-serif" }}
            mb={2}
          >
            Dodavanje kursa
          </Typography>

          <Grid>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Naziv"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ""}
                  {...register("name", {
                    required: "Naziv kursa je obavezan.",
                  })}
                  sx={{ height: "3.5rem", maxHeight: "3.5rem" }}
                />
              )}
            />
          </Grid>

          <Grid>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Opis"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ""}
                  {...register("description", {
                    required: "Opis kursa je obavezan.",
                  })}
                  sx={{ height: "8rem", maxHeight: "8rem" }}
                />
              )}
            />
          </Grid>

          <Grid>
            <FormControl
              fullWidth
              error={!!errors.yearId}
              sx={{ height: "3.5rem", maxHeight: "3.5rem" }}
            >
              <InputLabel id="yearId-label">Godina</InputLabel>
              <Controller
                name="yearId"
                control={control}
                rules={{ required: "Izbor godine je obavezan." }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      labelId="yearId-label"
                      value={field.value || "0"}
                      label="Godina"
                      error={!!fieldState.error}
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setValue("yearId", e.target.value || "0", {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <MenuItem value={0}>Izaberite godinu</MenuItem>
                      {years?.map((year) => (
                        <MenuItem key={year.id} value={year.id}>
                          {year.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error?.message || "Greška u izboru godine"}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
              {/* <FormHelperText>{errors.yearId?.message}</FormHelperText> */}
            </FormControl>
          </Grid>

          <Grid>
            <FormControl
              fullWidth
              error={!!errors.studyProgramId}
              sx={{ height: "3.5rem", maxHeight: "3.5rem" }}
            >
              <InputLabel id="studyProgramId-label">Smjer</InputLabel>
              <Controller
                name="studyProgramId"
                control={control}
                rules={{ required: "Izbor smjera je obavezan." }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      labelId="studyProgramId-label"
                      value={field.value || "0"}
                      label="Smjer"
                      error={!!fieldState.error}
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setValue("studyProgramId", e.target.value || "0", {
                          shouldValidate: true,
                        });
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 120,
                            overflowY: "auto",
                          },
                        },
                      }}
                    >
                      <MenuItem value={0}>Izaberite smjer</MenuItem>
                      {studyPrograms?.map((program) => (
                        <MenuItem key={program.id} value={program.id}>
                          {program.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error?.message || "Greška u izboru smjera"}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
              {/* <FormHelperText>{errors.yearId?.message}</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Lozinka"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ""}
                  {...register("password", {
                    required: "Lozinka je obavezna.",
                    minLength: {
                      value: 8,
                      message: "Lozinka mora imati najmanje 8 karaktera.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Lozinka može imati najviše 20 karaktera.",
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ height: "3.5rem", maxHeight: "3.5rem" }}
                />
              )}
            />
          </Grid>

          <Grid
            sx={{ display: "flex", justifyContent: "space-evenly", padding: 0 }}
          >
            <Button onClick={() => navigate(-1)}>Odustani</Button>
            <LoadingButton
              loading={loading}
              disabled={!methods.formState.isValid}
              type="submit"
              variant="contained"
              color="primary"
            >
              Pošalji
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
