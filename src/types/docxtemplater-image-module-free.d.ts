declare module "docxtemplater-image-module-free" {
  interface ImageModuleOptions {
    centered?: boolean;
    fileType?: string;
    getImage?: (tagValue: string) => string;
    getSize?: (
      img: string,
      tagValue: string
    ) => { width: number; height: number } | null;
  }

  class ImageModule {
    constructor(options: ImageModuleOptions);
  }

  export = ImageModule;
}
