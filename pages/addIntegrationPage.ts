import { Page, expect } from '@playwright/test';
import assert from 'assert';

export default class AddIntegration {
    private integrationType: string;

    constructor(public page: Page) {}

    async enterIntegrationName(integrationName: string) {
        console.log({integrationName})
        await this.page.locator("//*[@id='app-pipe']/div[2]/div/div[2]/div[1]/form/form/div[1]/div/div/div/div[1]/input").fill(`${integrationName}`); // Integration Name
    }

    async selectIntegationType(integrationType: string) {
        // Set the integrationType property
        this.integrationType = integrationType;

        await this.page.getByPlaceholder('Select Integration Type').click();
        await this.page.locator('li').filter({ hasText: integrationType }).first().click();
    }

    async createIntegration({
        url = '0',
        token = '0',
        accessId = '0',
        accessKey = '0',
        apiKey = '0',
        protocol = '0',
        generateKey = false,
    }: {
        url?: string;
        token?: string;
        accessId?: string;
        accessKey?: string;
        apiKey?: string;
        protocol?: string;
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
                if(generateKey){
                    await this.page.getByPlaceholder('Your Artifactory API key').fill(`${apiKey}`);
                } else{
                    await this.page.getByRole('button', { name: 'Get API Key' }).click();
                }
                break;
            case "Azure Keys":
                await this.page.getByPlaceholder('Your Azure key app id').fill(`${accessId}`); // App id
                await this.page.getByPlaceholder('Your Azure key app password').fill(`${accessKey}`); // Password
                await this.page.getByPlaceholder('Your Azure key tenant').fill(`${token}`); // Tenant
                break;
            case "Bitbucket":
                await this.page.getByPlaceholder('Your Bitbucket user name').fill(`${accessId}`); // User name
                await this.page.getByPlaceholder('Your Bitbucket API app password').fill(`${token}`); // token
                break;
            case "Bitbucket Server":
                await this.page.getByPlaceholder('Your Bitbucket Server API Endpoint').fill(`${url}`); // URL
                await this.page.getByPlaceholder('Your Bitbucket Server user name').fill(`${accessId}`); // User Name
                await this.page.getByPlaceholder('Your Bitbucket Server API app password').fill(`${token}`); // Token

                break;
            case "Distribution":
                if(url != '0'){
                    await this.page.getByPlaceholder('Your Distribution URL').fill(`${url}`); // URL
                }
                if(accessId != '0'){ // If we want to edit user
                    await this.page.getByPlaceholder('Your Distribution user name').fill(`${accessId}`); // URL
                }
                if(generateKey){
                    await this.page.getByPlaceholder('Your Distribution API key').fill(`${apiKey}`); // API key
                } else{
                    await this.page.getByRole('button', { name: 'Get API Key' }).click();
                }
                await this.page.getByPlaceholder('Your Distribution Signing Key Passphrase').fill(`${token}`); // Signing Key Passphrase
                break;
            case "Docker Registry":
                await this.page.getByPlaceholder('Your Docker Registry URL').fill(`${url}`); // URL
                await this.page.getByPlaceholder('Your Docker Registry user name').fill(`${accessId}`); // User Name
                await this.page.getByPlaceholder('Your Docker Registry app password').fill(`${token}`); // Token
                break;
            case "File Server":
                if (protocol !== 'FTP' && protocol !== 'SFTP' && protocol !== 'SMB') {
                    assert.fail(`Invalid protocol type: ${protocol}`);
                }
                await this.page.getByPlaceholder('Select Protocol of your file server').click();
                await this.page.locator('li').filter({ hasText: protocol }).click();
                await this.page.getByPlaceholder('Your File Server URL').fill(`${url}`); // URL
                await this.page.getByPlaceholder('Your File Server user name').fill(`${accessId}`); // User Name
                await this.page.getByPlaceholder('Your File Server password').fill(`${token}`); // Password
                break;

            case "Google Cloud":

                break;
            case "Generic Integration":

                break;
            case "GitHub":
                await this.page.getByPlaceholder('Your GitHub API token').fill(`${token}`); // token
                await this.page.getByPlaceholder('Key for your http header key-value pair').fill(`${accessId}`); // Key for header
                await this.page.getByPlaceholder('Value for your http header key-value pair').fill(`${accessKey}`); // Value for header
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
                if(generateKey){
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

        // await expect(this.page.locator('text=Connection was successful')).toBeVisible();

        await this.page.getByRole('button', { name: 'Create' }).click();
    }
}
