import {
  makeGenerateStaticParams,
  makeGenerateMetadata,
  makeProductPage,
  dynamicParams as _dynamicParams,
} from '@/lib/catalog/product-page-factory';

export const generateStaticParams = makeGenerateStaticParams('mascota');
export const generateMetadata = makeGenerateMetadata('mascota');
export const dynamicParams = _dynamicParams;

const Page = makeProductPage('mascota');
export default Page;
