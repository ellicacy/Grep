import * as React from 'react';

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material'
import { useState } from 'react';

import Header from '../../components/Navigation/Header';
import BottomPage from '../../components/Navigation/BottomPage';
import Panier from '../../components/Evenement/Evenement.Panier';
import EvenementCreer from '../../components/Evenement/Evenement.Creer';
import axiosClient from '../../axios-client';


const steps = ['Créez votre évènement', 'Sélectionnez vos prestations', 'Procédez au paiement'];

export default function Evenement() {

  const panier = useSelector((state) => state.panier);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep == 2) {
      console.log('ON COMMENCE LE PAIEMENT !')
      const data = {
        panier,
        idPersonne: user.idPersonne,
        personneNom: user.personneNom,
        personnePrenom: user.personnePrenom,
        personneLogin: user.personneLogin,
        personneRue: user.clientRue,
        personneCodePostal: user.clientCodePostal,
        personneVille: user.clientVille,
        personneNaissance: user.personneDateNaissance
      };

      axiosClient.post('/testPmt', data)
        .then((data) => {
          console.log('retour du paiement !!!!')
          const url = data.data;
          // console.log(url)
          window.location.href = url
        })
        .catch((error) => {
          console.log(error)
        })
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("Vous ne pouvez sautez une étape si vous n'avez pas rempli tous les éléments requis.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EvenementCreer />
      case 1:
        return <Panier panier={panier} />
      case 2:
        return 'Procédez au paiement';
      default:
        return 'Etape inconnue';
    }
  };

  React.useEffect(() => {
    if (panier.titreEvenement !== '' && panier.adresseEvenement !== '' && panier.npaEvenement !== '' && panier.villeEvenement !== '' && panier.dateEvenement !== '' && panier.packPanier.length !== 0) {
      setActiveStep(1);
    }
  }, [panier.packPanier])

  return (
    <>


      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item sx={{ flex: 1 }}>


          <Container>
            <Typography variant="h1" mt="50px">Panier</Typography>
            <Box width='100%' minHeight={'70vh'} mt={'20px'}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optionel</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Redémarrer</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Retour
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Passer
                      </Button>
                    )}

                    <Button
                      onClick={handleNext}
                      disabled={panier.titreEvenement === '' || panier.adresseEvenement === '' || panier.npaEvenement === '' || panier.villeEvenement === '' || panier.dateEvenement === '' || panier.packPanier.length < 1}
                    >
                      {activeStep === steps.length - 1 ? 'Payer' : 'Suivant'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Container>

        </Grid>
        <Grid item>
          <BottomPage sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} />
        </Grid>
      </Grid>


    </>
  );
}