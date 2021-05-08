import { LOADBALANCER_URL } from "../env";
import faker from "faker";

describe("Onboarding", () => {
  it("should let you enter all the information neccessary and present you a welcome screen", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      company: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await page.goto(LOADBALANCER_URL);
    await page.click("text=Sign up for free");
    await page.click('input[name="org_name"]');
    await page.fill('input[name="org_name"]', user.company);
    await page.press('input[name="org_name"]', "Tab");
    await page.fill('input[name="email"]', user.email);
    await page.press('input[name="email"]', "Tab");
    await page.fill('input[name="password"]', user.password);
    await page.click("text=Sign up");
    await page.click('input[name="first_name"]');
    await page.fill('input[name="first_name"]', user.firstName);
    await page.press('input[name="first_name"]', "Tab");
    await page.fill('input[name="last_name"]', user.lastName);
    await page.press('input[name="last_name"]', "Tab");
    await page.press('select[name="role"]', "ArrowDown");
    await page.selectOption('select[name="organization_size"]', "gt50");
    await Promise.all([
      page.waitForNavigation(),
      page.click("text=Next"),
    ]);
    await page.click('img[alt="Slack logo"]');
    await page.click('img[alt="Google logo"]');
    await Promise.all([
      page.waitForNavigation(),
      page.click("text=Next"),
    ]);
    
    await page.waitForNavigation()
    
    // welcome page is shown
    expect(page.url()).toBe(`${LOADBALANCER_URL}/betablocker`)

    await Promise.all([
      page.waitForNavigation(),
      page.click("text=Logout"),
    ]);

    await page.click('input[name="email"]');
    await page.fill('input[name="email"]', user.email);
    await page.press('input[name="email"]', "Tab");
    await page.fill('input[name="password"]', user.password);
    await Promise.all([
      page.waitForNavigation(),
      page.press('input[name="password"]', "Enter"),
    ]);
    
    await page.waitForNavigation()
    expect(page.url()).toBe(`${LOADBALANCER_URL}/betablocker`)
  });
});
