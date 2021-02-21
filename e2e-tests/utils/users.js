import faker from "faker";

export const generateUser = (options = {}) => {
  const firstName = options.firstName || faker.name.firstName();
  const lastName = options.lastName || faker.name.lastName();
  return {
    organization: options.organization || faker.company.companyName(),
    firstName,
    lastName,
    email: options.email || faker.internet.email(firstName, lastName),
    title: options.title || faker.name.jobTitle(),
    password: options.password || faker.internet.password(),
    slack: {
      id: faker.random.uuid(),
      displayName: faker.internet.userName(firstName),
    },
    google: {
      id: faker.random.uuid(),
      displayName: faker.internet.email(firstName, lastName, "google.com"),
    },
    zoom: {
      id: faker.random.uuid(),
      displayName: faker.internet.email(firstName, lastName),
    },
    github: {
      id: faker.random.uuid(),
      displayName: faker.internet.userName(firstName, lastName),
    }
  };
};
