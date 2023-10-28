import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import AddIntegration from '../pages/addIntegrationPage';

test('Login to lnp', async ({ page, baseURL }) => {
    const login = new LoginPage(page)
    await page.goto(`${baseURL}/ui/login`);
    await login.enterUsername('admin');
    await login.enterPassword('')
    await login.clickToLogin();

    // test add int
    await page.goto(`${baseURL}/ui/admin/pipelines/adminIntegrations/create`);
    const addIntegration = new AddIntegration(page);
    await addIntegration.enterIntegrationName("S_B_Jenkins");
    await addIntegration.selectIntegationType("Jenkins Server");
    await addIntegration.createIntegration({
        url: 'your-url',
        accessId: 'your-access-id',
        apiKey: 'your-api-key',
    });
});
