import { makeObservable, observable, runInAction } from "mobx"
import * as services from './service';
import { toJS } from "mobx";
export function createCompanyStore() {
  const store = observable({ company: [] });

  const getCompany =  async (username) => {
    console.log(toJS(username));
    const result = await services.companyList(username);
    runInAction(() => {
      store.company=result.data
    });

  };

  return {
    store,
    controller: {
      getCompany,
    }
  }
}



