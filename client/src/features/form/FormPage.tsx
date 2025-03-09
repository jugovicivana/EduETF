import {
  Breadcrumbs,
  Typography,
  Divider,
  LinearProgress,
  Button,
  useTheme,
} from "@mui/material";
 import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from '@mui/icons-material/Close';

import { Grid, Box } from "@mui/system";
import { Link } from "react-router-dom";
import FormTable from "./components/FormTable";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useRef, useState } from "react";
import { fetchAllFormsAsync } from "./formSlice";
import AddNewForm from "./components/AddNewForm";

const LinearBuffer = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress((prev) => prev + 5);
        setBuffer((prev) => Math.min(100, prev + Math.random() * 15));
      }
    };
  }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ width: "30%", height: "2vh", mt: 1 }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
};

export default function FormPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);

  const forms = useAppSelector((state) => state.form.forms);
  const formsLoaded = useAppSelector((state) => state.form.formsLoaded);
  const theme = useTheme();

  // const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false); // Stanje za prikaz forme
  // const [question, setQuestion] = useState(""); // Stanje za pitanje
  // const [endDate, setEndDate] = useState<Date | null>(null); // Stanje za datum zatvaranja
  // const [isMultipleAnswer, setIsMultipleAnswer] = useState(false); // Stanje za tip ankete
  // const [options, setOptions] = useState<CreateOption[]>([]); // Stanje za opcije

  const topOfPageRef = useRef<HTMLDivElement>(null);
  //   const createFormRef = useRef<HTMLDivElement>(null); // Ref za box za kreiranje ankete

  useEffect(() => {
    if (topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, []);
  // interface FormData {
  //   topic: string;
  //   endDate: string;
  //   options: { text: string }[];
  //   multipleAnswer?: boolean; // Opciono polje, može biti boolean ili undefined
  // }

  // const methods = useForm<FormData>({
  //   mode: "all", // Validacija na svaku promjenu
  //   resolver: yupResolver(formValidation),
  //   defaultValues: {
  //     topic: "",
  //     endDate: "",
  //     options: [],
  //     multipleAnswer: false,
  //   },
  // });

  // const {
  //   control,
  //   handleSubmit,
  //   setValue,
  //   getValues,
  //   reset,
  //   setError,
  //   register,
  //   trigger,
  //   formState: { errors },
  // } = methods;

  const handleShowCreateForm = () => {
    setIsCreatingForm(!isCreatingForm);
    setTimeout(() => {
      const createFormElement = document.getElementById("createFormElement");
      if (createFormElement) {
        createFormElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100); // Mali timeout kako bi se osiguralo da se forma prvo prikaže
  };

  //-----------------POPRAVITI----------------CIM DODA OPCIJU ODMAH JE PROVJERI I CRVENI; STAVITI DA JE BUTTON DODAJ DISABLED DOK NISU SVA POTREBNA POLJA POPUNJENA
  // Funkcija za dodavanje opcije
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleAddOption = () => {
  //   const currentOptions = getValues("options");
  //   const newOptions = [...currentOptions, { text: "" }];
  //   setValue("options", newOptions, { shouldValidate: false }); // Dodaj opciju bez validacije
  //   trigger("options")
  // };

  // const handleRemoveOption = (index: number) => {
  //   const currentOptions = getValues("options");
  //   const newOptions = currentOptions.filter((_, i) => i !== index);
  //   setValue("options", newOptions); // Ažurirajte stanje forme
  //   trigger("options"); // Obavijestite react-hook-form da je došlo do promjene
  // };
  // // Funkcija za ažuriranje opcije
  // const handleUpdateOption = (index: number, value: string) => {
  //   const newOptions = [...options]; // Napravite kopiju niza
  //   newOptions[index] = { ...newOptions[index], text: value }; // Ažurirajte text polje
  //   setOptions(newOptions); // Postavite novi niz
  // };

  // Funkcija za kreiranje ankete
  // const onSubmit = async (data: FormData) => {
  //   //   const isValid = await trigger(); // Ručno pokreni validaciju
  //   // if (!isValid) {
  //   //   console.log("Forma nije validna");
  //   //   return;
  //   // }
  //   setIsSubmitted(true); // Postavi da je forma pokušana biti poslana
  //   const isValid = await trigger();
  //   if (!isValid) return;

  //   try {
  //     // Priprema podataka za slanje
  //     const newForm = {
  //       topic: data.topic,
  //       endDate: data.endDate,
  //       multipleAnswer: data.multipleAnswer || false, // Ako je undefined, koristimo false
  //       options: data.options.map((option) => ({ text: option.text })), // Mapiranje opcija
  //     };

  //     console.log("Nova anketa:", newForm);

  //     // Slanje podataka na backend preko Redux akcije
  //     await dispatch(createForm(newForm)).unwrap();

  //     console.log("Anketa uspešno kreirana");

  //     // Resetovanje forme
  //     setIsCreatingForm(false);

  //     reset(); // Resetuje sva polja forme na podrazumevane vrednosti
  //     // setIsCreatingForm(false);
  //   } catch (error) {
  //     console.error("Greška pri kreiranju ankete:", error);
  //   }
  // };

  // const onSubmit = async (data: FieldValues) => {
  //   console.log(data);
  //   const localDate = new Date();
  //   const offset = localDate.getTimezoneOffset();

  //   const adjustedDate = new Date(localDate.getTime() - offset * 60000);
  //   const newCourse = {
  //     name: data.name,
  //     description: data.description,
  //     yearId: data.yearId,
  //     studyProgramId: data.studyProgramId,
  //     courseCreationDate: adjustedDate.toISOString(),
  //     password: data.password,
  //   };
  //   console.log(newCourse);

  //   const resultAction = await dispatch(createCourseAsync(newCourse));

  //   if (createCourseAsync.fulfilled.match(resultAction)) {
  //     navigate(`/courses/${resultAction.payload.id}`);
  //     console.log(statusC);
  //   } else {
  //     console.log("else" + statusC);
  //     console.error("Failed to create course:", resultAction.payload);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchAllFormsAsync());
  }, [dispatch]);

  return (
    <>
      <div ref={topOfPageRef}></div>
      <Grid
        container
        sx={{
          display: "block",
          direction: "column",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            paddingX: 10,
            paddingY: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="small" />}
              sx={{ pl: 0 }}
            >
              <Box
                component={Link}
                to="/onlineStudy"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <SchoolIcon
                  sx={{
                    color: "text.primary",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      color: "primary.dark",
                    },
                  }}
                />
              </Box>

              <Typography
                component={Typography}
                color="neutral"
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.dark",
                  },
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                Moje ankete
              </Typography>
            </Breadcrumbs>
          </Box>
          <div
            style={
              {
                //   marginTop: "32px",
                //   marginBottom: "32px",
                //   display: "flex",
                //   justifyContent: "space-between",
                //   alignItems: "center",
              }
            }
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: "bolder",
                color: "primary.main",
                fontSize: "3.75rem",
              }}
            >
              Ankete
            </Typography>
            <Box
              sx={{
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontFamily: "Raleway, sans-serif" }}>
                Moje ankete &bull; Pregled i upravljanje
              </Typography>
              {user && !isCreatingForm && (
                <Button
                  title="Dodaj anketu"
                  onClick={handleShowCreateForm} // Koristimo novu funkciju
                  sx={{
                    backgroundColor: "primary.dark",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                    height: "fit-content",
                    width: "3rem",
                    boxSizing: "border-box",
                  }}
                >
                  <AddIcon sx={{ fontSize: "16pt" }} />
                </Button>
              )}
            </Box>
          </div>

          <Divider sx={{ mb: 3, mt: 3 }} />
          {!formsLoaded ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "40vh",
                width: "100%",
                margin: 0,
                padding: 1,
              }}
            >
              <LinearBuffer />
            </Box>
          ) : (
            forms && <FormTable forms={forms} />
          )}

          {/* <div id="createFooormElement"> */}
          {isCreatingForm && (
            <AddNewForm setIsCreatingForm={setIsCreatingForm}/>
          )}
        </Grid>
      </Grid>
    </>
  );
}
