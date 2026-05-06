import {
  makeGenerateStaticParams,
  makeGenerateMetadata,
  makeProductPage,
  dynamicParams as _dynamicParams,
} from '@/lib/catalog/product-page-factory';

export const generateStaticParams = makeGenerateStaticParams('hogar');
export const generateMetadata = makeGenerateMetadata('hogar');
export const dynamicParams = _dynamicParams;

const Page = makeProductPage('hogar');
export default Page;
