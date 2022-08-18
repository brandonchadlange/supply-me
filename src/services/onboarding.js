import { getPost } from '../libs/http';

async function completeOnboarding(firstName, lastName, companyName) {
  const url = "/users/onboarding"

  const request = {
    firstName,
    lastName,
    companyName,
  };

  const post = getPost(url, request);
  return await post();
}

const OnboardingService = {
  completeOnboarding,
};

export default OnboardingService;
