import { ValidationError } from '../../shared/errors/ValidationError';

export type ProjectTypeValue = 'website' | 'ecommerce' | 'webapp' | 'mobile' | 'seo' | 'maintenance' | 'other';

export class ProjectType {
  private constructor(private readonly value: ProjectTypeValue) {}

  static create(value: string): ProjectType {
    const validTypes: ProjectTypeValue[] = ['website', 'ecommerce', 'webapp', 'mobile', 'seo', 'maintenance', 'other'];
    
    if (!validTypes.includes(value as ProjectTypeValue)) {
      throw new ValidationError(`Invalid project type: ${value}`);
    }

    return new ProjectType(value as ProjectTypeValue);
  }

  getValue(): ProjectTypeValue {
    return this.value;
  }

  getLabel(): string {
    const labels: Record<ProjectTypeValue, string> = {
      website: 'Site Vitrine',
      ecommerce: 'E-commerce',
      webapp: 'Application Web',
      mobile: 'Application Mobile',
      seo: 'Référencement SEO',
      maintenance: 'Maintenance',
      other: 'Autre projet',
    };
    return labels[this.value];
  }
}
