import { LOADBALANCER_URL } from "../env";
import faker from "faker"

describe("GitHub", () => {
  it("should show the microsoft/Playwright project in the search if you search for Playwright", async () => {

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      company: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    // Go to http://localhost:8080/
    await page.goto(LOADBALANCER_URL);
    // Click text=Sign up for free
    await page.click("text=Sign up for free");
    // assert.equal(page.url(), `${LOADBALANCER_URL}/signup`);
    // Click input[name="org_name"]
    await page.click('input[name="org_name"]');
    // Fill input[name="org_name"]
    await page.fill('input[name="org_name"]', user.company);
    // Press Tab
    await page.press('input[name="org_name"]', "Tab");
    // Fill input[name="email"]
    await page.fill('input[name="email"]', user.email);
    // Press Tab
    await page.press('input[name="email"]', "Tab");
    // Fill input[name="password"]
    await page.fill('input[name="password"]', user.password);
    // Click text=Sign up
    await page.click("text=Sign up");
    // Click input[name="first_name"]
    await page.click('input[name="first_name"]');
    // Fill input[name="first_name"]
    await page.fill('input[name="first_name"]', user.firstName);
    // Press Tab
    await page.press('input[name="first_name"]', "Tab");
    // Fill input[name="last_name"]
    await page.fill('input[name="last_name"]', user.lastName);
    // Press Tab
    await page.press('input[name="last_name"]', "Tab");
    // Press ArrowDown
    await page.press('select[name="role"]', "ArrowDown");
    // Select gt50
    await page.selectOption('select[name="organization_size"]', "gt50");
    // Click text=Next
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:8080/onboarding/apps' }*/),
      page.click("text=Next"),
    ]);
    // Click img[alt="SLACK logo"]
    await page.click('img[alt="SLACK logo"]');
    // Click img[alt="GOOGLE logo"]
    await page.click('img[alt="GOOGLE logo"]');
    // Click text=Next
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:8080/onboarding/welcome' }*/),
      page.click("text=Next"),
    ]);
  });
});
