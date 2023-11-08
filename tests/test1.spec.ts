import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import AddIntegration from '../pages/addIntegrationPage';
import AddNodepoolStatic from '../pages/addNodepoolStatic';

test('Login to lnp', async ({ page, baseURL }) => {
    const login = new LoginPage(page)
    await page.goto(`${baseURL}/ui/login`);
    await login.enterUsername('admin');
    await login.enterPassword('password')
    await login.clickToLogin();

    // test add int
    await page.goto(`${baseURL}/ui/admin/pipelines/adminIntegrations/create`);
    const addIntegration = new AddIntegration(page);

    // Add a GitHub Integration
    await addIntegration.enterIntegrationName("github_test");
    await addIntegration.selectIntegationType("GitHub");
    await addIntegration.createIntegration({
        token: '1234567',
        accessId: 'admin',
        accessKey: 'password',
    });
    
    // Add a Artifactory Integration
    await page.goto(`${baseURL}/ui/admin/pipelines/adminIntegrations/create`);
    await addIntegration.enterIntegrationName("Artifactory_test");
    await addIntegration.selectIntegationType("Artifactory");
    await addIntegration.createIntegration({});

    // Add NodePool 
    // await page.getByRole('button', { name: ' Add Node Pool' }).click();
    // await page.locator('#dropdown-menu-1479').getByText('Static').click();
    const addNodepoolStatic = new AddNodepoolStatic(page)
    await addNodepoolStatic.navigateToCreateNodepool(baseURL)
    await addNodepoolStatic.enterUsername('test_nodepool');
    await addNodepoolStatic.enterAdditionalSetting('ARM64','Ubuntu_20.04');
    await addNodepoolStatic.clickToSaveNodePool();

});
