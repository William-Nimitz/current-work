export class ResourceSpec {
  id: number;
  name: string;
  description: string;
  mandatory: boolean;
  resourceType: string;
  alpha?: boolean;
  rank: number;
  width: number;
  height: number;
  maxWeight: number;
  maxVideoSize: number;
  maxLength: number;
  formatSpecId: number;
  opener: string;
  settingsKeys: string[];
  child: any[]
  constructor(init?: Partial<ResourceSpec>) {
    Object.assign(this, init);
  }
}
