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
  private readonly KEY_AUFNAHMEBEREICH = this.PREFIX + 'aufnahmebereich';

  static emptyStringAsUndefined(result: any): any {
    if (result === '') {
      return undefined;
    } else {
      return result;
    }
  }

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
    return LocalstorageService.emptyStringAsUndefined(this.storageService.get(this.KEY_NOTE));
  }

  public setNote(note: string) {
    this.storageService.set(this.KEY_NOTE, LocalstorageService.emptyStringAsUndefined(note));
  }

  public getAufnahmebereich(): string {
    return LocalstorageService.emptyStringAsUndefined(this.storageService.get(this.KEY_AUFNAHMEBEREICH));
  }

  public setAufnahmebereich(aufnahmebereich: string) {
    this.storageService.set(this.KEY_AUFNAHMEBEREICH, LocalstorageService.emptyStringAsUndefined(aufnahmebereich));
  }

  public getModelData(key: string, id: number): string {
    return LocalstorageService.emptyStringAsUndefined(this.storageService.get(this.createModelDataKey(key, id)));
  }

  public setModelData(key: string, id: number, value: any) {
    this.storageService.set(this.createModelDataKey(key, id), LocalstorageService.emptyStringAsUndefined(value));
  }

  private createModelDataKey(key: string, id: number): string {
    return this.KEY_MODELDATA + '__' + id + '-' + key;
  }
}
