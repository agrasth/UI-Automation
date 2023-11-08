import { Page } from '@playwright/test';

export default class AddNodepoolStatic{
    constructor(public page: Page){}
    async navigateToCreateNodepool(baseURL?: string){
        await this.page.goto(`${baseURL}/ui/admin/pipelines/nodePools/add/static`);
    }
    async enterUsername(nodepoolName: string){
        await this.page.locator('//*[@id="app-pipe"]/div[2]/div/div[2]/div[1]/form/form/div[1]/div[1]/div/div/div/input').fill(nodepoolName); // Nodepool name
    }
    async enterAdditionalSetting(architectureName: string, osName: string){
        await this.page.getByPlaceholder('Select Architecture').click();
        await this.page.getByText(architectureName).click();
        await this.page.getByPlaceholder('Select OS').click();
        await this.page.getByText(osName).click();
    }
    async clickToSaveNodePool(){
        await this.page.locator('//*[@id="app-pipe"]/div[2]/div/div[2]/div[2]/div/button[2]').click(); // Nodepool name
    }
}