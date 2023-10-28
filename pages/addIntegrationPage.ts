import { Page, expect } from '@playwright/test';
import assert from 'assert';

export default class AddIntegration {
    private integrationType: string;

    constructor(public page: Page) {}

    async enterIntegrationName(integratioName: string) {
        await this.page.getByRole('textbox').nth(2).fill(integratioName);
    }

    async selectIntegationType(integrationType: string) {
        // Set the integrationType property
        this.integrationType = integrationType;

        await this.page.getByPlaceholder('Select Integration Type').click();
        await this.page.locator('li').filter({ hasText: integrationType }).click();
    }

    async createIntegration({
        url = '',
        token = '',
        accessId = 'defaultParam1',
        accessKey = 'defaultParam1',
        apiKey = 'defaultParam1',
        generateKey = false,
    }: {
        url?: string;
        token?: string;
        accessId?: string;
        accessKey?: string;
        apiKey?: string;
        generateKey?: boolean;
    }){
        switch (this.integrationType){
            case "Digital Ocean":
                await this.page.getByPlaceholder('Your Digital Ocean API token').fill(`${token}`);
                break;
            case "Airbrake":
                await this.page.getByPlaceholder('Your Airbrake API token').fill(`${token}`);
                break;
            case "AWS":
                await this.page.getByPlaceholder('Your Amazon access key id').fill(`${accessId}`);
                await this.page.getByPlaceholder('Your Amazon secret access key').fill(`${accessKey}`);
                break;
            case "Artifactory":
                if(!generateKey){
                    await this.page.getByPlaceholder('Your Artifactory API key').fill(`${apiKey}`);
                } else{
                    // click on get API Key button
                }
                break;
            case "Azure Keys":

                break;
            case "Bitbucket":

                break;
            case "Bitbucket Server":

                break;
            case "Distribution":

                break;
            case "Docker Registry":

                break;
            case "File Server":

                break;

            case "Google Cloud":

                break;
            case "Generic Integration":

                break;
            case "GitHub":

                break;
            case "Github Enterprise":

                break;
            case "GitLab":

                break;
            case "Incoming Webhook":

                break;
            case "Jenkins Server":
                await this.page.getByPlaceholder('Your Jenkins URL').fill(url);
                await this.page.getByPlaceholder('Your Jenkins user name').fill(accessId);
                await this.page.getByPlaceholder('Your Jenkins API token').fill(apiKey);
                if(!generateKey){
                    await this.page.getByPlaceholder('Bearer token to configure in Jenkins Plugin').fill(token);
                } else {
                    // Click on generate button
                }

                break;
            case "Jira":

                break;
            case "Kubernetes":

                break;
            case "NewRelic":

                break;
            case "Outgoing Webhook":

                break;
            case "PagerDuty Events":

                break;
            case "PEM Key":

                break;
            case "Slack":

                break;
            case "SMTP Credentials":

                break;
            case "SSH Key":

                break;
            case "JFrog Platform Access Token":

                break;
            default:
                assert.fail(`Invalid integration type: ${this.integrationType}`);
            
        }   // switch-case ends here
        await this.page.getByRole('button', { name: 'Test connection' }).click();
        // test connection
        await expect(this.page.locator('text=Connection was successful')).toBeVisible();

        await this.page.getByRole('button', { name: 'Create' }).click();
    }
}
