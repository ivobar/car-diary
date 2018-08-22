import {Subject} from 'rxjs';

export class LoaderService {
  loaderStatusChanged = new Subject();

  activateLoader(reqType: number) {
    return this.loaderStatusChanged.next(reqType === 0);
  }
}
