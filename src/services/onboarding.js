import axios from "axios";

async function completeOnboarding(firstName, lastName, companyName) {
  let retval = {
    hasError: false,
    error: null,
    project: null,
  };

  const body = {
    firstName,
    lastName,
    companyName,
  };

  try {
    const response = await axios.post("/onboarding", body);
    retval.project = response.data;
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.message;
  }

  return retval;
}

const OnboardingService = {
  completeOnboarding,
};

export default OnboardingService;
