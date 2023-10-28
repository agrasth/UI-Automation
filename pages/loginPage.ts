import { Page } from '@playwright/test';

export default class LoginPage{
    constructor(public page: Page){}
    async enterUsername(userName: string){
        await this.page.locator('input[name="username"]').fill(userName);
    }
    async enterPassword(password: string){
        await this.page.locator('#password-input').fill(password);
    }
    async clickToLogin(){
        // await this.page.getByRole('button', { name: 'Login' }).click()

        await Promise.all([
            // await this.page.waitForNavigation({waitUntil: "networkidle"}),
            await this.page.getByRole('button', { name: 'Login' }).click(),
            await this.page.waitForSelector('xpath=//*[@id="app"]/div[2]/div/div[2]/div/div[3]/div[1]/div[1]')
        ])
    }

}