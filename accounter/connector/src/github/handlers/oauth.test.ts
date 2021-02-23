import supertest from "supertest";
import app from "..";
import faker from "faker";
import nock from "nock";

describe("oauth", () => {
  it("returns oauth url", async () => {
    const oauthUrl = faker.internet.url()
    nock("https://api.github.com")
      .get("/app")
      .once()
      .reply(200, {
        id: 101725,
        slug: "accounter-development",
        node_id: "MDM6QXBwMTAxMjA5",
        owner: {
          login: "getaccounter",
          id: faker.random.uuid(),
          node_id: faker.random.uuid(),
          avatar_url: faker.image.imageUrl(),
          gravatar_id: "",
          url: faker.internet.url(),
          html_url: faker.internet.url(),
          followers_url: faker.internet.url(),
          following_url: faker.internet.url(),
          gists_url: faker.internet.url(),
          starred_url: faker.internet.url(),
          subscriptions_url: faker.internet.url(),
          organizations_url: faker.internet.url(),
          repos_url: faker.internet.url(),
          events_url: faker.internet.url(),
          received_events_url: faker.internet.url(),
          type: "Organization",
          site_admin: false,
        },
        name: "Accounter Integration",
        description:
          "Accounter Companion app to retrieve user information from your organization",
        external_url: "https://accounter.io",
        html_url: oauthUrl,
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        permissions: {
          members: "read",
          organization_administration: "read",
        },
        events: [],
        installations_count: 1,
      });

    const response = await supertest(app)
      .get("/oauth")
      .query({ redirectUri: faker.internet.url() });
      
    expect(response.body.url).toBe(oauthUrl);
  });
});
