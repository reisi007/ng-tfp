import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {
  }

  private readonly PREFIX = 'reisishot_contract_';
  private readonly KEY_MODEL = this.PREFIX + 'models';
  private readonly KEY_NOTE = this.PREFIX + 'note';
  private readonly KEY_MODELDATA = this.PREFIX + 'modeldata';

  public setCustomers(models: Array<object>) {
    this.storageService.set(this.KEY_MODEL, models);
  }

  public getCustomers(): Array<object> {
    const stored = this.storageService.get(this.KEY_MODEL);
    if (!stored) {
      return [{}];
    } else {
      return stored;
    }
  }

  public getNote(): string {
    return this.emptyStringAsUndefined(this.storageService.get(this.KEY_NOTE));
  }

  public setNote(note: string) {
    this.storageService.set(this.KEY_NOTE, this.emptyStringAsUndefined(note));
  }

  public getModelData(key: string, id: number): string {
    return this.emptyStringAsUndefined(this.storageService.get(this.createModelDataKey(key, id)));
  }

  public setModelData(key: string, id: number, value: any) {
    this.emptyStringAsUndefined(this.storageService.set(this.createModelDataKey(key, id), this.emptyStringAsUndefined(value)));
  }

  private emptyStringAsUndefined(result: any): any {
    if (result === '') {
      return undefined;
    } else {
      return result;
    }
  }

  private createModelDataKey(key: string, id: number): string {
    return this.KEY_MODELDATA + '__' + id + '-' + key;
  }
}
