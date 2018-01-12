// @flow
import API, { APIResponse } from 'util/API';
import type { DashboardForm } from 'bundles/Story/modules/DashboardModule';

export default class StoryAPI extends API {
  async action(data: DashboardForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/story/action`, data);
    return response.json();
  }
}
